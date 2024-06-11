import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim()) {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setBooks(response.data.docs);
      }
    };

    const timeoutId = setTimeout(fetchBooks, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!bookshelf.some(b => b.key === book.key)) {
      localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
      alert('Book added to your bookshelf!');
    } else {
      alert('This book is already in your bookshelf!');
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Search Books</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard key={book.key} book={book} onAdd={addToBookshelf} />
        ))}
      </div>
      <Link to="/bookshelf" className="block mt-4 text-blue-500 hover:underline">Go to My Bookshelf</Link>
    </div>
  );
};

export default BookSearch;