import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import Pointer from '../../../assets/Image/Pointer.svg';
import Search from '../../../assets/Image/search.svg';
import GalochkaPrime from '../../../assets/Image/GalochkaPrime.svg';

// Импорт функции загрузки данных
import { fetchMockData } from '../../../data/data.js';

export const Blog = ({
  variant = 'default',
  title = 'Блог',
  showAllLink = true,
  showSearchBar = false,
  categories = [],          // опционально можно переопределить видимые категории
}) => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [allArticles, setAllArticles] = useState([]);
  const [availableCategories, setAvailableCategories] = useState(['Все']);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Загружаем данные и формируем список категорий из data?.blog
  useEffect(() => {
    fetchMockData()
      .then((data) => {
        const blogData = data?.blog ?? { articles: [] };
        const items = blogData.articles ?? [];
        setAllArticles(items);

        // Собираем уникальные категории/таг из статей
        const cats = Array.from(
          new Set(items.map((i) => i.category).filter(Boolean))
        );
        setAvailableCategories(['Все', ...cats]);
      })
      .catch((err) => {
        console.error('Blog mock fetch error:', err);
      });
  }, []);

  // Фильтруем статьи по выбранной категории и по названию
  const filteredArticles = useMemo(() => {
    if (!allArticles) return [];
    const q = searchQuery.toLowerCase();
    return allArticles.filter((a) =>
      (activeCategory === 'Все' ? true : a.category === activeCategory) &&
      (q ? a.title.toLowerCase().includes(q) : true)
    );
  }, [allArticles, activeCategory, searchQuery]);

  // Разбираем блоки на основе отфильтрованных статей
  const mainArticle = filteredArticles[0] ?? null;
  const articles = filteredArticles.slice(1, 5);
  const extendedArticles = filteredArticles.slice(5, 9);
  const largeArticle = filteredArticles[9] ?? null;

  // Функция навигации по статье
  const handleArticleClick = (e, articleId) => {
    e.preventDefault();
    navigate(`/blog/${articleId}`);
  };

  // Поддержка возможности переопределить видимые категории prop'ом
  const displayCategories = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    return availableCategories;
  }, [categories, availableCategories]);

  return (
    <section className={`Blog_section Blog_section--${variant}`}>
      <div className="Blog_container container">
        <div className="Blog_header">
          <h2 className="Blog_title">{title}</h2>

          {showAllLink && (
            <a href="/blog" className="Blog_link">
              ВСЕ СТАТЬИ
              <img src={Pointer} alt="" />
            </a>
          )}

          {showSearchBar && (
            <div className="Blog_search">
              <input
                type="text"
                placeholder="Поиск по названию..."
                className="Blog_search_input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={Search} alt="Search" className="Blog_search_icon" />
            </div>
          )}
        </div>

        {/* Категории для extended варианта на основе данных (из data?.blog) */}
        {variant === 'extended' && displayCategories.length > 1 && (
          <div className="Blog_categories">
            {displayCategories.map((category) => (
              <button
                key={category}
                className={`Blog_category_btn ${
                  activeCategory === category ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Default вариант: 1 большая + 4 маленьких = 5 карточек */}
        {variant === 'default' && (
          <div className="Blog_grid Blog_grid--default">
            {/* Большая карточка слева */}
            {mainArticle && (
              <a
                href={`/blog/${mainArticle.id}`}
                className="Blog_card Blog_card_large"
                onClick={(e) => handleArticleClick(e, mainArticle.id)}
              >
                <div className="Blog_card_content">
                  <span className="Blog_card_tag">{mainArticle.tag}</span>
                  <h3 className="Blog_card_title">{mainArticle.title}</h3>
                </div>
                <div className="Blog_card_image_wrapper">
                  <img
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    className="Blog_card_image"
                  />
                </div>
              </a>
            )}

            {/* 4 маленьких карточки справа */}
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/blog/${article.id}`}
                className="Blog_card Blog_card_small"
                onClick={(e) => handleArticleClick(e, article.id)}
              >
                <div className="Blog_card_content">
                  <span className="Blog_card_tag">{article.tag}</span>
                  <h3 className="Blog_card_title">{article.title}</h3>
                </div>
                <div className="Blog_card_image_wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="Blog_card_image"
                  />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Extended вариант: 1 большая + 4 маленьких + 4 маленьких + 1 большая = 10 карточек */}
        {variant === 'extended' && (
          <>
            {/* Первый блок: 1 большая слева + 4 маленьких справа */}
            <div className="Blog_grid Blog_grid--default">
              {mainArticle && (
                <a
                  href={`/blog/${mainArticle.id}`}
                  className="Blog_card Blog_card_large"
                  onClick={(e) => handleArticleClick(e, mainArticle.id)}
                >
                  <div className="Blog_card_content">
                    <span className="Blog_card_tag">{mainArticle.tag}</span>
                    <h3 className="Blog_card_title">{mainArticle.title}</h3>
                  </div>
                  <div className="Blog_card_image_wrapper">
                    <img
                      src={mainArticle.image}
                      alt={mainArticle.title}
                      className="Blog_card_image"
                    />
                  </div>
                </a>
              )}

              {articles.map((article) => (
                <a
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="Blog_card Blog_card_small"
                  onClick={(e) => handleArticleClick(e, article.id)}
                >
                  <div className="Blog_card_content">
                    <span className="Blog_card_tag">{article.tag}</span>
                    <h3 className="Blog_card_title">{article.title}</h3>
                  </div>
                  <div className="Blog_card_image_wrapper">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="Blog_card_image"
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Второй блок: 4 маленьких слева + 1 большая справа */}
            <div className="Blog_grid Blog_grid--extended">
              {extendedArticles.map((article) => (
                <a
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="Blog_card Blog_card_small"
                  onClick={(e) => handleArticleClick(e, article.id)}
                >
                  <div className="Blog_card_content">
                    <span className="Blog_card_tag">{article.tag}</span>
                    <h3 className="Blog_card_title">{article.title}</h3>
                  </div>
                  <div className="Blog_card_image_wrapper">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="Blog_card_image"
                    />
                  </div>
                </a>
              ))}

              {largeArticle && (
                <a
                  href={`/blog/${largeArticle.id}`}
                  className="Blog_card Blog_card_large Blog_card_large--extended"
                  onClick={(e) => handleArticleClick(e, largeArticle.id)}
                >
                  <div className="Blog_card_content">
                    <span className="Blog_card_tag">{largeArticle.tag}</span>
                    <h3 className="Blog_card_title">{largeArticle.title}</h3>
                  </div>
                  <div className="Blog_card_image_wrapper">
                    <img
                      src={largeArticle.image}
                      alt={largeArticle.title}
                      className="Blog_card_image"
                    />
                  </div>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};