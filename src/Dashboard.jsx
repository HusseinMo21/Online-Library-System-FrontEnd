import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { userProfile } = useAuth();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
        console.log(favoriteBooks);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      axios
        .get('https://web-production-f9c35.up.railway.app/api/user/favorites/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setFavoriteBooks(res.data))
        .catch((err) => console.error('Error fetching favorites in dashboard:', err));
    }
  }, []);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          Welcome, {userProfile.name} 👋
        </h1>

        <div className="space-y-4 text-lg text-gray-700">
          <div className="flex items-center">
            <span className="font-semibold w-32">Full Name:</span>
            <span>{userProfile.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Email:</span>
            <span>{userProfile.email}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-indigo-600">Your Favorite Books</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteBooks.length > 0 ? (
              favoriteBooks.map(book => (
                <div
                  key={book.id}
                  className="bg-white shadow-md rounded p-4 flex flex-col items-center text-center border"
                >
                  <img
                    src={`https://res.cloudinary.com/dsrtib66j/${book.image}`}
                    alt={book.title}
                    className="w-24 h-36 object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">Released: {book.release_year}</p>
                  <p className="text-sm text-gray-500">Price: ${book.price}</p>
                  <p className="text-sm text-gray-500">
                    Read: {book.is_read ? 'Yes' : 'No'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">You have no favorite books yet.</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
