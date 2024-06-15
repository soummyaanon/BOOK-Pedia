import React from 'react';

const BookCard = ({ book, onAdd, showButton = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={book.thumbnail || 'default_cover_url'}
          alt={book.title}
          className="w-full h-48 object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={book.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            View on Google Books
          </a>
        </div>
      </div>
      <div className="p-4"> 
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1"> 
          {book.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-1"> 
          Author: {book.authors?.[0] || 'Unknown'}
        </p>
        {showButton && (
          <button
            onClick={() => onAdd(book)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Add to Bookshelf
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;