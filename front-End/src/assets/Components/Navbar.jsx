import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              HostelMS
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/about' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
              }`}
            >
              About
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname.startsWith('/dashboard') 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="ml-4 flex items-center">
                  <span className="mr-2 text-blue-100">Welcome, {currentUser.username}</span>
                  <button 
                    onClick={onLogout}
                    className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-200 border border-blue-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-200 border border-blue-200">
                  Login
                </button>
              </Link>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'bg-white text-blue-600' 
                  : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === '/about' 
                  ? 'bg-white text-blue-600' 
                  : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {currentUser && (
              <Link 
                to="/dashboard" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/dashboard') 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-blue-500 hover:bg-opacity-25'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {currentUser ? (
              <div className="pt-4 pb-3 border-t border-blue-500">
                <div className="flex items-center px-3">
                  <div className="text-sm text-blue-200">Logged in as</div>
                  <div className="text-sm font-medium text-white ml-1">{currentUser.username}</div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-25"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-25"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;