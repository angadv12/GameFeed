import { createContext, useState, useEffect } from 'react'
import { getUser, loginUser, registerUser, logoutUser, updateUser, refreshAccessToken } from './authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null)
  const [ accessToken, setAccessToken ] = useState(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
          setAccessToken(localStorage.getItem('token'))
        }
      } catch (error) {
        setUser(null)
      }
    }
    checkLoggedIn()
  }, [])

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password)
      setUser(userData)
      setAccessToken(userData.token);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const register = async (name, email, password) => {
    try {
      const userData = await registerUser(name, email, password)
      setUser(userData)
      setAccessToken(userData.token);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
    setAccessToken(null);
    localStorage.removeItem('token');
  }

  const updateProfile = async (updates) => {
    try {
      const updatedUser = await updateUser(accessToken, updates);
      setUser(updatedUser);
    } catch (error) {
      if (error.message === 'Token expired') {
        try {
          const newAccessToken = await refreshAccessToken();
          setAccessToken(newAccessToken);
          localStorage.setItem('token', newAccessToken);
          const updatedUser = await updateUser(newAccessToken, updates);
          setUser(updatedUser);
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          throw new Error(refreshError.message);
        }
      } else {
        throw new Error(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateProfile }}>
      { children }
    </AuthContext.Provider>
  )
}