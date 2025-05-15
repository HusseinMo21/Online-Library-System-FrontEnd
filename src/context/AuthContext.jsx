import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const storedUser = Cookies.get('user');

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);

      // Retrieve user data from cookies if exists
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing user cookie:', err);
        }
      }

      // Fetch profile from API
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      
      const fetchUserBooks = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/favorites/', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log(response.data);
          Cookies.set('favorite_books', JSON.stringify(response.data), { expires: 1 });
          setUserBooks(response.data);
        } catch (error) {
          console.error('Error fetching user books:', error);
        }
      };
      fetchUserProfile();
     
      fetchUserBooks();

    
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setUserProfile(null);
    }
  }, []);

  // Handle login: save tokens and user info
  const login = async (userData, accessToken, refreshToken) => {
    setIsLoggedIn(true);
    setUser(userData);
    Cookies.set('access_token', accessToken, { expires: 1 });
    Cookies.set('refresh_token', refreshToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 1 });
``
   //fetch user books
   try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/favorites/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    
    setUserBooks(response.data);
    Cookies.set('favorite_books', JSON.stringify(response.data), { expires: 1 });
    
  } catch (error) {
    console.error('Error fetching user books after login:', error);
  }
    // Fetch profile right after login
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile after login:', error);
    }
   
  };
  

  // Handle logout: remove tokens and user info
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem('access_token');

    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userProfile, login, logout , userBooks,setUserBooks}}>
      {children}
    </AuthContext.Provider>
  );
};
