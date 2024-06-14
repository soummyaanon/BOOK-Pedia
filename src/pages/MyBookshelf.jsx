import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

const MyBookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (id) => {
    const updatedBookshelf = bookshelf.filter(book => book.id !== id);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const resetBookshelf = () => {
    setBookshelf([]);
    localStorage.setItem('bookshelf', JSON.stringify([]));
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">My Bookshelf</h1>
      <button onClick={resetBookshelf}>Reset Bookshelf</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookshelf.map(book => (
          <div key={book.id}>
            <BookCard book={book} />
            <button onClick={() => removeFromBookshelf(book.id)}>Remove from Bookshelf</button>
          </div>
        ))}
      </div>
      <Link to="/" className="block mt-4 text-blue-500 hover:underline">Back to Search</Link>
    </div>
  );
};

export default MyBookshelf;