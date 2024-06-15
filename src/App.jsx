import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import MyBookshelf from './pages/MyBookshelf';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center">
        <div className="container mx-auto max-w-7xl px-4 py-8 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<BookSearch />} />
            <Route path="/bookshelf" element={<MyBookshelf />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;