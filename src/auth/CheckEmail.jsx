import React from 'react';

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Almost there! 📧</h1>
        <p className="text-gray-700">
          We've sent a confirmation link to your email. Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
