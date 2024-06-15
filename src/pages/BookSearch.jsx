import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { RotatingLines } from 'react-loader-spinner';
import { FaSearch } from 'react-icons/fa';

const BookSearch = () => {
  const [query, setQuery] = useState('Technology');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!bookshelf.some(b => b.title === book.title)) {
      localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
      alert('Book added to your bookshelf!');
    } else {
      alert('This book is already in your bookshelf!');
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim()) {
        setLoading(true);
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${(page - 1) * 10}&maxResults=12`);
        const booksWithLinks = response.data.items.map(book => {
          const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default_image_url';
          return { ...book.volumeInfo, link: book.volumeInfo.previewLink, thumbnail };
        });
        setBooks(booksWithLinks);
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(fetchBooks, 500);
    return () => clearTimeout(timeoutId);
  }, [query, page]);

  return (
    <div className="p-9 bg-gray-900 min-h-screen flex flex-col items-center text-gray-100">
      <h1 className="text-4xl font-bold mb-6">BOOK-Pedia: Your Gateway to Endless Knowledge</h1>
      <SearchBar setQuery={setQuery} />
      <Link to="/bookshelf" className="text-gray-200 underline mb-4">
        Go to My Bookshelf
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full col-span-full">
            <RotatingLines
              visible={true}
              height="50"
              width="50"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        ) : (
          books.map(book => (
            <BookCard key={book.id} book={book} onAdd={addToBookshelf} />
          ))
        )}
      </div>
      {!loading && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setPage(oldPage => oldPage + 1)}
          >
            Load More
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <p className="text-gray-300 mr-2">Can't find your book?</p>
        <a href="#search-bar" className="text-blue-500 hover:text-blue-700">
          <FaSearch />
        </a>
      </div>
    </div>
  );
};

export default BookSearch;
