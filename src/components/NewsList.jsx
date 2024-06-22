import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setCategory, setPage } from '../features/news/newsSlice';
import { Link } from 'react-router-dom';

const NewsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { articles, status, category, page } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ category, page, searchTerm }));
  }, [category, page, searchTerm, dispatch]);

  const toggleFavorite = (article) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.find((fav) => fav.url === article.url)) {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter((fav) => fav.url !== article.url)));
      alert('removed from favourites')
    } else {
      favorites.push(article);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('added to favourites')
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">News Articles</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <select
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="p-2 border rounded"
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
          </select>
          <Link to="/favorites" className="ml-4 p-2 rounded bg-blue-500 hover:bg-blue-700 duration-300 ease-linear text-white">Favourites</Link>
        </div>
      </div>

      {status === 'loading' && <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
  <div>
    <h1 className="text-xl md:text-7xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" strokeWidth="0"
        viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
        </path>
      </svg> ading . . .</h1>
  </div>
</div>}
      {status === 'failed' && <p>Error loading articles</p>}
      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <div key={article.url} className="border bg-white rounded p-4 relative">
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-center mb-2" />
                <h2 className="text-xl font-bold mb-2">
                  <Link to={`/article/${encodeURIComponent(article.url)}`}>{article.title}</Link>
                </h2>
                <p>{article.description}</p>
                <div className='flex justify-end mt-4'>
                <button
                  onClick={() => toggleFavorite(article)}
                  className=" p-1 rounded bg-red-500 text-white"
                >
                  {JSON.parse(localStorage.getItem('favorites'))?.find((fav) => fav.url === article.url) ? 'Unfavourite' : 'Favourite'}
                </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1}
              className="p-2 border bg-white rounded"
            >
              Previous
            </button>
            <button
              onClick={() => dispatch(setPage(page + 1))}
              className="p-2 border bg-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
