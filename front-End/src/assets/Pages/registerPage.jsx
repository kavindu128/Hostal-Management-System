import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex flex-col items-center">
     
      <div className="mt-20 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-10 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Login</h2>
        <form className="space-y-6">
          <div className="flex items-center border-b-2 border-black py-2">
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none flex-grow text-lg placeholder-black text-black"
            />
            <FaUser className="text-black" />
          </div>

          <div className="flex items-center border-b-2 border-black py-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-grow text-lg placeholder-black text-black"
            />
            <FaLock className="text-black" />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-full mt-4 hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between text-sm mt-6 font-medium text-black">
          <a href="#" className="hover:underline">Create an account</a>
          <a href="#" className="hover:underline">Forget Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
