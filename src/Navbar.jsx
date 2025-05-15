import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Logo from './assets/1.png';
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="md:absolute md:top-10 md:z-50 md:left-14 md:right-14  max-w-7xl mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-amber-200 border border-amber-200 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <Link to="/"><img src={Logo} alt="Logo" className="w-30 h-30" /></Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {isLoggedIn ? (
              <>
               
                <Link to="/" className="hover:text-gray-200">
                  <i className="fa-solid fa-house text-2xl text-green-300"></i>
                </Link>
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                <button
                  onClick={() => logout()}
                  className="hover:text-gray-200 bg-red-500 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-gray-200">
                  <i className="fa-solid fa-house text-2xl text-green-300"></i>
                </Link>
                <Link to="/login" className="hover:text-gray-200">Login</Link>
                <Link to="/register" className="hover:text-gray-200">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 px-4 py-4 space-y-3 transition-all duration-300">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block hover:text-gray-200">Dashboard</Link>
              
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="block hover:text-gray-200">
                <i className="fa-solid fa-house text-green-300 text-xl"></i> Home
              </Link>
              <Link to="/login" className="block hover:text-gray-200">Login</Link>
              <Link to="/register" className="block hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
