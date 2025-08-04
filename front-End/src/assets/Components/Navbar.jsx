// 
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">HostelMS</div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 text-lg absolute md:static bg-blue-600 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-auto px-6 md:px-0 transition-all duration-300 ease-in ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <a href="#home" className="block hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#dashboard" className="block hover:text-gray-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#register" className="block hover:text-gray-300">
              Register
            </a>
          </li>
          <li>
            <a href="#about" className="block hover:text-gray-300">
              About
            </a>
          </li>
          <li className="md:ml-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full border border-blue-600 
            hover:bg-blue-600 hover:text-white hover:border-white transition-colors duration-300">
                Sign up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
