import { createContext, useState, useEffect } from 'react'
import { getUser, loginUser, registerUser, logoutUser } from './authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
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
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const register = async (name, email, password) => {
    try {
      const userData = await registerUser(name, email, password)
      setUser(userData)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      { children }
    </AuthContext.Provider>
  )
}