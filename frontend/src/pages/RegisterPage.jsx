import { FaSignInAlt } from "react-icons/fa"
import { useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      setError('')
      navigate('/')
    } catch (err) {
      setError(err.message)
      throw new Error(error)
    }
  }

  return <>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-white text-3xl font-bold mb-8 text-center">
          Create an Account
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          <FaSignInAlt className="mr-2"/> Register
        </button>
      </form>
    </div>
  </>
}
export default RegisterPage