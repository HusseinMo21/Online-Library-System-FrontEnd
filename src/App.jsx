import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Intro from './Intro';
import MainContent from './MainContent';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import { useAuth } from './context/AuthContext'; 
import PublicRoute from './PublicRoute';
import PasswordReset from './auth/PasswordReset';
import VerifyAccount from './auth/verifyAccount';
import Setpassword from './auth/Setpassword';
import CheckEmail from './auth/CheckEmail';
// ✅ استيراد Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { isLoggedIn } = useAuth();

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />

      <div>
        <Routes>
          <Route
            path="/"
            element={showIntro ? <Intro onFinish={handleIntroFinish} /> : <MainContent />}
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <PasswordReset />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password/:uid/:token"
            element={
              <PublicRoute>
                <Setpassword />
              </PublicRoute>
            }
          />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route
            path="/verify-email/:uid/:token"
            element={<VerifyAccount />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {/* ✅ إضافة ToastContainer هنا */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
