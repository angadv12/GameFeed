import { Link } from "react-router-dom"
import logo from '../assets/BallLogo.png'
import placeholder from '../assets/pfpPlaceholder.png'
import { FaArrowRightToBracket, FaUser, FaArrowRightFromBracket, FaBasketball, FaFootball } from 'react-icons/fa6'
import { useContext, useState } from 'react'
import { AuthContext } from '../features/auth/AuthContext'
import showConfirmationAlert from "./ConfirmationAlert"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    showConfirmationAlert(logout)
  }

  return (
    <section className=" border-b-2 border-slate-300/10 mx-4 relative flex items-center pt-5 pb-8">
        <div className="pl-3 absolute left-0">
          <Link className="flex items-center" to="/">
            <img className="size-12" src={logo} alt="Logo" />
            <h1 className="text-white font-medium pl-2 text-2xl"> GameFeed </h1>
          </Link>
        </div>
        <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              <Link to='/nba' className="text-white font-semibold px-2 py-1 rounded-md mx-3 flex flex-row justify-center items-center">
                <FaBasketball className="mr-2"/> NBA
              </Link>
              <Link to='/nfl' className="text-white font-semibold px-2 py-1 rounded-md mx-3 flex flex-row justify-center items-center">
                <FaFootball className="mr-2"/> NFL
              </Link>
        </div>
        <div className="text-white flex items-center absolute right-0">
        { user ? (
          <>
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user.profilePicture || placeholder }
                alt="Profile"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg z-10 mt-3">
                <div className="py-2">
                  <Link to="/profile" className=" px-4 py-2 text-bgDark hover:bg-gray-200 flex items-center">
                    <FaUser className="mr-2"/> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-bgDark hover:bg-gray-200 flex items-center"
                  >
                    <FaArrowRightFromBracket className="mr-2"/> Logout
                  </button>
                </div>
              </div>
              )}
            </div>
          </>
          ) : (
            <div className="flex items-center">
              <Link to='/login' className=" border-2 border-white px-2 py-1 rounded-md mx-3 text-white flex items-center">
                <FaArrowRightToBracket className="mr-2" />
                Login
              </Link>
              <Link to='register' className=" border-2 border-white px-2 py-1 rounded-md text-white flex items-center">
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