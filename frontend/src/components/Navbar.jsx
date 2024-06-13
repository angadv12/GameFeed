import { Link } from "react-router-dom"
import logo from '../assets/BallLogo.png'
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <section className=" py-4 border-b-2 border-slate-300/10 mx-4 relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-start items-center pl-3">
          <img className="size-12" src={logo} alt="Logo" />
          <h1 className="text-white font-medium pl-2 text-2xl"> GameFeed </h1>
        </div>
        { user ? (
            <div className="text-white flex flex-row items-center">
              <h2 className="text-white">Welcome, {user.name}</h2>
              <button className="border-2 border-white px-2 py-1 rounded-md mx-3 flex flex-row items-center" onClick={logout}>
                <FaSignOutAlt className="mr-2"/> Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-end items-center pr-8">
              <Link to='/login' className=" border-2 border-white px-2 py-1 rounded-md mx-3 text-white flex flex-row items-center">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link to='register' className=" border-2 border-white px-2 py-1 rounded-md text-white flex flex-row items-center">
                <FaUser className="mr-2"/>
                Register
              </Link>
            </div>
          )
        }
      </div>
    </section>

  )
}
export default Navbar