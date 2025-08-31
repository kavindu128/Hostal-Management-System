import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex flex-col items-center justify-center">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-10 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-b-2 border-black py-2">
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none flex-grow text-lg placeholder-black text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="text-black" />
          </div>

          <div className="flex items-center border-b-2 border-black py-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-grow text-lg placeholder-black text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="text-black" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-full mt-4 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex justify-between text-sm mt-6 font-medium text-black">
          <span>Demo Admin: admin/admin</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;