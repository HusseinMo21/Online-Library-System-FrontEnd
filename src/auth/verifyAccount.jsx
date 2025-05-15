import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
  // Extract uid and token from the URL parameters
  const { uid, token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // POST the uid and token to the backend verification endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/user/verify-email/', { uid, token });
        if (response.data && response.data.message) {
          setMessage(response.data.message + " You will be redirected to the dashboard.");
        } else {
          setMessage("Email verified successfully!");
        }
        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        console.error("Verification error: ", err.response?.data || err);
        setMessage(err.response?.data?.error || "An error occurred during verification.");
      }
    };

    verifyEmail();
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Verify Your Email</h2>
        <p className="text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default VerifyAccount;