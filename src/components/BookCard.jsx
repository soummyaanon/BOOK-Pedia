import React from 'react';

const BookCard = ({ book, onAdd, showButton = true }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg w-56 h-72 m-4">
      <img className="w-full h-36 object-cover mb-2 rounded" src={book.cover_url || 'default_cover_url'} alt={book.title} />
      <h3 className="text-lg font-bold mb-1 text-gray-900 overflow-ellipsis overflow-hidden">{book.title}</h3>
      <p className="text-gray-600 mb-1 overflow-ellipsis overflow-hidden">Author: {book.author_name?.[0] || 'Unknown'}</p>
      {showButton && (
        <button 
          onClick={() => onAdd(book)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2 transition-colors duration-200 text-sm"
        >
          Add to Bookshelf
        </button>
      )}
    </div>
  );
};

export default BookCard;