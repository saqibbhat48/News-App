import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './components/NewsList';
import ArticleDetail from './components/ArticleDetail';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/article/:url" element={<ArticleDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
