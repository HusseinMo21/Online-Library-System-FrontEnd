import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // استيراد المكتبة
import 'react-toastify/dist/ReactToastify.css'; // استيراد الـ CSS الخاص بالـ Toast

const SetNewPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/user/set-new-password/', {
        uid,
        token,
        password,
      });

      toast.success("✅ Password has been reset successfully!");

      // بعد 2 ثانية، نوجه المستخدم للـ login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      toast.error("❌ Failed to reset password. The link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Reset Password'}
          </button>
        </form>
      </div>

      {/* إضافة الـ ToastContainer هنا */}
      <ToastContainer />
    </div>
  );
};

export default SetNewPassword;
