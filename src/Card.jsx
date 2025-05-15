import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ book, user, favoriteBooks, refreshFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteBooks && favoriteBooks.some(fav => fav.id === book.id)) {
      setIsFavorite(true);
    }
  }, [favoriteBooks, book.id]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("You must be logged in to modify favorites.");
      return;
    }

    const accessToken = Cookies.get('access_token');

    try {
      if (isFavorite) {
        await axios.post(
          'https://web-production-f9c35.up.railway.app/api/user/favorites/remove/',
          { book_id: book.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.info(`"${book.title}" removed from favorites.`);
      } else {
        await axios.post(
          'https://web-production-f9c35.up.railway.app/api/user/favorites/add/',
          { book_id: book.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success(`"${book.title}" added to favorites.`);
      }

      setIsFavorite(!isFavorite);
      refreshFavorites();
    } catch (error) {
      toast.error("An error occurred while updating favorites.");
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <div className='z-30'>
      <div className="card w-96 h-[520px] shadow-2xl shadow-red-500 mb-6 rounded-3xl p-4 overflow-hidden">
        <figure>
        <img
  className="w-full h-[300px] rounded-2xl mb-3"
  src={`https://res.cloudinary.com/dsrtib66j/${book.image}`}
  alt={book.title}
/>
        </figure>
        <div className="card-body">
          <h2 className="font-bold text-2xl mb-2">{book.title.toUpperCase().slice(0, 20)}</h2>
          <p>Author: {book.author}</p>
          <p>Release Year: {book.release_year}</p>
          <p className='font-bold mb-3'>Price: {book.price}$</p>

          <div className="card-actions justify-between">
            <button
              type="button"
              onClick={() => user ? window.location.href = `/book/${book.id}` : toast.error("You must be logged in to read books.")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Read Now
            </button>

            <button
              type="button"
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded ${isFavorite ? 'bg-yellow-500' : 'bg-gray-300'} hover:opacity-80`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
