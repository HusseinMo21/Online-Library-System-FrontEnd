import { useEffect, useState } from 'react';
import axios from 'axios';

const BookSearch = ({ handleSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');  // سيتم إرسال الـ slug هنا
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://web-production-f9c35.up.railway.app/api/v1/allcateigories/')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch(query, category);  // إرسال الـ query والـ category (slug)
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, category]);

  return (
    <div className="p-4 max-w-3xl mx-auto relative top-25">
      <h1 className="text-2xl font-bold mb-4 font-serif">Search Books</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-32">
        <input
          type="text"
          placeholder="Search by Title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-red-700 hover:border-amber-400 transition-all ease-in-out p-2 rounded w-full"
        />

        <select
          value={category}  // سيتم إرسال الـ slug هنا
          onChange={(e) => setCategory(e.target.value)}  // إرسال الـ slug من الفئة
          className="border p-2 rounded w-full sm:w-1/3 bg-amber-700 text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>  {/* إرسال الـ slug */}
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookSearch;
