import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Favorites = () => {
  const navigate = useNavigate()  
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div className="container mx-auto p-4">
        <div className='mb-4'><button onClick={()=>navigate('/')} className='px-3 py-1 bg-slate-700 text-lg font-semibold rounded-md text-white'>🡸</button></div>
      <h1 className="text-2xl font-bold mb-4">Favourite Articles</h1>
      {favorites.length === 0 ? (
        <p>No favorite articles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((article) => (
            <div key={article.url} className="border bg-white rounded p-4 relative">
              <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-center mb-2" />
              <h2 className="text-xl font-bold mb-2">
                <Link to={`/article/${encodeURIComponent(article.url)}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
