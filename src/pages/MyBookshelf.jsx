import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

const MyBookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">My Bookshelf</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {bookshelf.map(book => (
    <BookCard key={book.key} book={book} showButton={false} />
  ))}
</div>
      <Link to="/" className="block mt-4 text-blue-500 hover:underline">Back to Search</Link>
    </div>
  );
};

export default MyBookshelf;