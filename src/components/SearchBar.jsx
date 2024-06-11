const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a book..."
      className="w-full p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-black"
    />
  );
};

export default SearchBar;