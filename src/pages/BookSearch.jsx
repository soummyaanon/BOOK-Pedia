import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { RotatingLines } from 'react-loader-spinner';
import { FaSearch } from 'react-icons/fa';


const BookSearch = () => {
  const [query, setQuery] = useState('Indian+Authors+Books+Bestsellers+2021+fiction+nonfiction+technology');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!bookshelf.some(b => b.id === book.id)) {
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
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Search Books</h1>
      <SearchBar  setQuery={setQuery} />
      
      <Link to="/bookshelf" className="text-gray-100 underline">Go to My Bookshelf</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-screen">
        {loading ? 
          <div className="flex justify-center items-center h-full">
            <RotatingLines
              visible={true}
              height="20"
              width="150"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          : 
          books.map(book => (
            <BookCard key={book.id} book={book} onAdd={addToBookshelf} />
          ))
        }
      </div>
<div className="flex justify-center mt-4">
  <button onClick={() => setPage(oldPage => oldPage + 1)}>Load More</button>
</div>
<div className="flex justify-center mt-4">
  <p>Don't find your book? Search here:</p>
  <a href="#search-bar">
    <FaSearch />
  </a>
</div>
</div>
  );
};

export default BookSearch;