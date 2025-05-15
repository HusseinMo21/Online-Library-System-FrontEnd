import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', {
        email,
        name,
        password,
      });

      setSuccess('✅ Registration successful! Please check your email to verify your account.');

      // مسح البيانات بعد التسجيل
      setEmail('');
      setName('');
      setPassword('');

      // ⏳ تحويل المستخدم إلى صفحة "التحقق من البريد" بعد 4 ثواني
      setTimeout(() => {
        navigate('/check-email');
      }, 4000);
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed.';
      setError(`❌ ${msg}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-lg border rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-lg border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-lg border rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
