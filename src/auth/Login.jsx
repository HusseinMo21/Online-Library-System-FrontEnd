import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Cookies from 'js-cookie';

const Login = () => {
  const { login ,setUserBooks } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', {
        email,
        password,
      });

      // Save tokens in cookies and localStorage
      const { access, refresh, user } = response.data;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/favorites/', {
          headers: { Authorization: `Bearer ${access}` },
        });
        setUserBooks(response.data);
        Cookies.set('favorite_books', JSON.stringify(response.data), { expires: 1 });
      } catch (error) {
        console.error('Error fetching user books after login:', error);
      }
      // Store the access token in localStorage
      localStorage.setItem('access_token', access); 

      // Store the refresh token in HttpOnly cookie
      Cookies.set('refresh_token', refresh, { expires: 7, secure: true, httpOnly: true });

      // Update AuthContext
      login(user, access, refresh);

      // Navigate to the dashboard page
      navigate('/dashboard');
    } catch (err) {
     const errmasg =(err.response.data.error);
      setError(`${errmasg}`);
    } finally {
      setLoading(false); // Set loading to false after the request ends
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 animate__animated animate__fadeIn animate__delay-1s">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-lg text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 text-lg border rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-lg text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-2 text-lg border rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transform transition-all duration-300 ease-in-out hover:scale-105"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</a>
        </p>
        <p className="text-center text-gray-500 text-sm">
          forgot password?{' '}
          <a href="/reset-password" className="text-indigo-600 hover:text-indigo-700 font-medium">forgot password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
