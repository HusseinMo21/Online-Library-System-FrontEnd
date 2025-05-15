import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import LandingPage from './LandingPage';
import BookSearch from './BookSearch';
import './app.css';
import { useAuth } from './context/AuthContext';
import Cookies from 'js-cookie';

function MainContet() {
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null); // رابط الصفحة التالية
  const [prevPage, setPrevPage] = useState(null); // رابط الصفحة السابقة
  const { user } = useAuth();

  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (user) {
      const accessToken = Cookies.get('access_token');
      fetchFavorites(accessToken);  // Load favorites on mount if user exists
    }
  }, [user]);

  // Fetch books function (with pagination)
  const fetchBooks = (url = 'https://web-production-f9c35.up.railway.app/api/v1/books/') => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setBooks(response.data.results);
        setNextPage(response.data.next); // Save next page URL
        setPrevPage(response.data.previous); // Save previous page URL
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // Fetch favorites
  const fetchFavorites = (accessToken) => {
    axios
      .get('https://web-production-f9c35.up.railway.app/api/user/favorites/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => setFavoriteBooks(res.data))
      .catch((err) => console.error(err));
  };

  // Handle search function
  const handleSearch = (query, category) => {
    setLoading(true);
    let url = 'https://web-production-f9c35.up.railway.app/api/v1/books/';
    const params = [];

    if (query) params.push(`search=${query}`);
    if (category) params.push(`search=${category}`); // Use correct parameter name for category

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    axios
      .get(url)
      .then((res) => {
        setBooks(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Navigate to the next page
  const handleNextPage = () => {
    if (nextPage) {
      fetchBooks(nextPage);
    }
  };

  // Navigate to the previous page
  const handlePrevPage = () => {
    if (prevPage) {
      fetchBooks(prevPage);
    }
  };

  return (
    <>
      <LandingPage />
      <BookSearch handleSearch={handleSearch} />

      {loading ? (
        <div className="text-center text-white mt-5">Loading...</div>
      ) : (
        <div className="mt-10">
          {books.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <Card
                  key={book.id}
                  book={book}
                  user={user}
                  favoriteBooks={favoriteBooks}
                  refreshFavorites={() => fetchFavorites(Cookies.get('access_token'))} // Refresh favorites every time i click on a bookfavr or remove and passthe acess token to avoid 404 unauthorized
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-white">No books found.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4 mb-10">
            <button
              onClick={handlePrevPage}
              disabled={!prevPage}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {/* Dynamically display page numbers */}
            <button
              onClick={handleNextPage}
              disabled={!nextPage}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainContet;
