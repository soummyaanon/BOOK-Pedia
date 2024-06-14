import React from 'react';

const BookCard = ({ book, onAdd, showButton = true }) => {
  return (
    <div className="bg-gray-400 p-4 rounded shadow-lg w-full md:w-64 h-auto md:h-85 m-4 flex flex-col overflow-hidden">
      <img className="w-full h-36 object-cover mb-2 rounded transform transition-transform duration-500 hover:scale-110" src={book.thumbnail || 'default_cover_url'} alt={book.title} />
      <h3 className="text-lg font-bold mb-1 text-gray-900 overflow-ellipsis overflow-hidden">{book.title}</h3>
      <p className="text-gray-600 mb-1 overflow-ellipsis overflow-hidden">Author: {book.authors?.[0] || 'Unknown'}</p>
      <div className="mt-auto">
        {showButton && (
          <button 
            onClick={() => onAdd(book)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2 transition-colors duration-200 text-sm w-full text-center shadow-md hover:shadow-lg"
          >
            Add to Bookshelf
          </button>
        )}
        <a 
          href={book.previewLink} 
          target="_blank" 
          rel="noreferrer" 
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2 transition-colors duration-200 text-sm w-full text-center shadow-md hover:shadow-lg"
        >
          View on Google Books
        </a>
      </div>
    </div>
  );
};

export default BookCard;