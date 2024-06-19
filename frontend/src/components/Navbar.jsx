import { Link, useLocation } from "react-router-dom";
import logo from '../assets/BallLogo.png';
import { FaArrowRightToBracket, FaUser, FaArrowRightFromBracket, FaBasketball, FaFootball, FaArrowTurnDown } from 'react-icons/fa6';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import showConfirmationAlert from "./ConfirmationAlert";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get the current location
  const [selectedLeague, setSelectedLeague] = useState(location.pathname); // Track the selected league

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    showConfirmationAlert(logout);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedLeague(location.pathname); // Update selected league when location changes
  }, [location]);

  return (
    <section className="mx-4 relative flex items-center rounded-lg py-8 bg-bgNavbar z-40">
      <div className="pl-3 absolute left-0">
        <Link className="flex items-center" to="/">
          <img className="size-12" src={logo} alt="Logo" />
          <h1 className="text-white font-medium pl-2 text-2xl"> GameFeed </h1>
        </Link>
      </div>
      <div className="flex items-center absolute left-48">
        <Link 
          to='/nba' 
          className={`relative text-white text-lg font-semibold px-2 pt-1 pb-1 mx-3 flex flex-row justify-center items-center ${selectedLeague === '/nba' ? 'after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-0.5 after:bg-red-500' : ''}`}
        >
          <FaBasketball className="mr-2"/> NBA
        </Link>
        <Link 
          to='/nfl' 
          className={`relative text-white text-lg font-semibold px-2 pt-1 pb-1 mx-3 flex flex-row justify-center items-center ${selectedLeague === '/nfl' ? 'after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-0.5 after:bg-red-500' : ''}`}
        >
          <FaFootball className="mr-2"/> NFL
        </Link>
      </div>
      <div className="text-white flex items-center absolute right-0 mr-5">
        {user ? (
          <>
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user.profilePicture}
                alt="Profile"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 w-48 bg-bgNavbar rounded-md shadow-lg z-50 mt-4">
                  <div className="py-2 text-white">
                    <p className="flex items-center px-4">
                      <FaUser className="mr-2"/> {user.name} <FaArrowTurnDown className=" ml-2 mt-3" />
                    </p>
                    <Link to="/profile" className="px-4 py-1 mt-2 hover:bg-zinc-700 hover:rounded-lg flex flex-col justify-center">
                      <p className="ml-4"> See Profile</p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-700 hover:rounded-lg flex items-center"
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
            <Link to='/login' className="border-2 border-white px-2 py-1 rounded-md mx-3 text-white flex items-center">
              <FaArrowRightToBracket className="mr-2" />
              Login
            </Link>
            <Link to='register' className="border-2 border-white px-2 py-1 rounded-md text-white flex items-center">
              <FaUser className="mr-2"/>
              Register
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
