import React, { useEffect, useState } from 'react';
import './Blog.css';
import blogImg1 from '../../../assets/Image/blog-1.svg';
import blogImg2 from '../../../assets/Image/blog-2.svg';
import blogImg3 from '../../../assets/Image/blog-3.svg';
import blogImg4 from '../../../assets/Image/blog-4.svg';
import blogImg5 from '../../../assets/Image/blog-5.svg';
import Pointer from '../../../assets/Image/Pointer.svg';

// импорт функции загрузки данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const Blog = () => {
  // Инициализация данными по умолчанию
  const [mainArticle, setMainArticle] = useState({
    id: '',
    title: '',
    tag: '',
    image: '',
    link: '',
  });

  const [articles, setArticles] = useState([]);

  // Загрузка данных из data.js через fetchMockData
  useEffect(() => {
    fetchMockData()
      .then((data) => {
        const blogData = data?.blog || { title: '', articles: [] };
        const items = blogData.articles ?? [];
        if (items.length > 0) {
          const [first, ...rest] = items;
          setMainArticle({
            id: first.id,
            title: first.title,
            tag: first.tag || '',
            image: first.image,
            link: first.link || `/blog/${first.id}`,
          });
          setArticles(
            rest.map((a) => ({
              id: a.id,
              title: a.title,
              tag: a.tag || '',
              image: a.image,
              link: a.link || `/blog/${a.id}`,
            }))
          );
        }
      })
      .catch((err) => {
        console.error('Blog mock fetch error:', err);
        // можно оставить фолбэки изначальных данных
      });
  }, []);

  return (
    <section className="Blog_section">
      <div className="Blog_container container">
        <div className="Blog_header">
          <h2 className="Blog_title">Блог</h2>
          <a href="#" className="Blog_link">
            ВСЕ СТАТЬИ
            <img src={Pointer} />
          </a>
        </div>

        <div className="Blog_grid">
          {/* Большая карточка */}
          <a href={mainArticle?.link} className="Blog_card Blog_card_large">
            <div className="Blog_card_content">
              <span className="Blog_card_tag">{mainArticle?.tag}</span>
              <h3 className="Blog_card_title">{mainArticle?.title}</h3>
            </div>
            <div className="Blog_card_image_wrapper">
              <img
                src={mainArticle?.image}
                alt={mainArticle?.title}
                className="Blog_card_image"
              />
            </div>
          </a>

          {/* Маленькие карточки */}
          {articles.map((article) => (
            <a key={article?.id} href={article?.link} className="Blog_card Blog_card_small">
              <div className="Blog_card_content">
                <span className="Blog_card_tag">{article?.tag}</span>
                <h3 className="Blog_card_title">{article?.title}</h3>
              </div>
              <div className="Blog_card_image_wrapper">
                <img
                  src={article?.image}
                  alt={article?.title}
                  className="Blog_card_image"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
