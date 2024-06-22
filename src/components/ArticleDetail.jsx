import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArticleDetail = () => {
  const { url } = useParams();
  const article = useSelector((state) =>
    state.news.articles.find((article) => article.url === decodeURIComponent(url))
  );

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} className="w-full h-96 object-center mb-4" />
      <p className="mb-4">{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Read more
      </a>
    </div>
  );
};

export default ArticleDetail;
