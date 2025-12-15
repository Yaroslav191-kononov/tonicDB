// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../../assets/Image/Logo.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let mounted = true;
    fetchMockData()
      .then((data) => {
        if (!mounted) return;
        const items = data?.navigation?.items ?? [];
        setNavItems(items);
      })
      .catch(() => {
      });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Рендеринг ссылок: если данные есть — используем их, иначе — дефолтные ссылки
  const renderNavLinks = () => {
    const list = navItems && navItems.length > 0
      ? navItems
      : [

        ];

    return list.map((item) => (
      <a
        key={item.id ?? item.url}
        href={item.url}
        className="Header_nav_link"
      >
        {item.label}
      </a>
    ));
  };

  return (
    <>
      <header className="Header">
        <div className="container">
          <div className="Header_container">
            {/* Логотип */}
            <div className="Header_logo">
              <a href="/" className="Header_nav_link">
                <img src={Logo} alt="Logo" />
              </a>
            </div>

            {/* Десктопная навигация */}
            <nav className="Header_nav">
              {renderNavLinks()}
            </nav>

            {/* Действия справа */}
            <div className="Header_actions">
              {/* Бургер-кнопка */}
              <button
                className={`Header_burger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Меню"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`Header_mobile_overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Мобильное меню - те же ссылки, динамические */}
      <nav className={`Header_mobile_menu ${isMenuOpen ? 'active' : ''}`}>
        {/* Кнопка закрытия */}
        <button
          className="Header_mobile_close"
          onClick={closeMenu}
          aria-label="Закрыть меню"
        >
          ✕
        </button>

        <div className="Header_mobile_nav">
          {renderNavLinks()}
        </div>
      </nav>
    </>
  );
};

export default Header;
