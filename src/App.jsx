import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import MyBookshelf from './pages/MyBookshelf';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4 bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/bookshelf" element={<MyBookshelf />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;