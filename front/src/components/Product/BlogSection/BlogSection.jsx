import React, { useEffect, useState } from 'react';
import './BlogSection.css';
// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';

export const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [loading, setLoading] = useState(true);


useEffect(() => {
    let mounted = true;
    fetchMockData()
      .then((data) => {
        const items = data.blogProduct.articles ?? [];
        const title = data?.blogProduct.blog_title ?? '';
        const mapped = items.map((a, idx) => ({
          id: a.id ?? idx,
          type: idx === 0 ? 'large' : 'medium',
          image: a.image ?? null,
          date: a.date ?? '',
          title: a.title ?? '',
          excerpt: a.excerpt ?? (a.title ? a.title.substring(0, 120) : '')
        }));

        if (mounted) {
          setArticles(mapped);
          setBlogTitle(title);
          setLoading(false);
        }
    })
    .catch(() => {
        if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
}, []);


return (
<section className="BlogSection">
    <div className="BlogSection_container container">
        <h2 className="BlogSection_title">{blogTitle || 'Читать'}</h2>
    {loading ? (
      <div>Загрузка...</div>
    ) : (
      <div className="BlogSection_grid">
        {articles.map((article) => (
          <article
            key={article.id}
            className={`BlogSection_card BlogSection_card--${article.type}`}
          >
            <div className="BlogSection_card_image">
              {article.image ? (
                <img src={article.image} alt={article.title} />
              ) : null}
            </div>
            <div className="BlogSection_card_content">
              <time className="BlogSection_card_date">{article.date}</time>
              <h3 className="BlogSection_card_title">{article.title}</h3>
              <p className="BlogSection_card_excerpt">{article.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    )}
    <button className="BlogSection_button">показать еще</button>
  </div>
</section>

);
};