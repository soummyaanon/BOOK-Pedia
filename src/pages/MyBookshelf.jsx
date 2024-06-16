import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';


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
    <div className="p-9 bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">My Bookshelf</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={resetBookshelf}
      >
        Reset Bookshelf
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {bookshelf.map(book => (
          <div key={book.id} className="bg-gray-800 rounded-md p-4 flex flex-col justify-between">
            <BookCard book={book} />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => removeFromBookshelf(book.id)}
            >
              Remove from Bookshelf
            </button>
          </div>
        ))}
      </div>
      <Link to="/" className="text-blue-500 hover:underline mt-6">
        Back to Search
      </Link>
      <Footer />
    </div>
  );
};

export default MyBookshelf;