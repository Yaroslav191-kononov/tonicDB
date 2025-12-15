// Footer.jsx
import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../../../assets/Image/Logo.svg';
import Kant from '../../../assets/Image/KantLogo.svg';
import vkIcon from '../../../assets/Image/VkLogo.svg';
import telegramIcon from '../../../assets/Image/TgLogo.svg';
import WhatsappIcon from '../../../assets/Image/WhLogo.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1025 : false
  );

  // Загружаем данные с сервера
useEffect(() => {
    let mounted = true;
  fetchMockData()
  .then((data) => {
    if (mounted) {
      const f = data?.footer ?? data;
      setFooterData(f);
    }
  })
  .catch((err) => {
    console.error('Footer data load error:', err);
  });

  const onResize = () => setIsDesktop(window.innerWidth >= 1025);
  window.addEventListener('resize', onResize);

  return () => {
    mounted = false;
    window.removeEventListener('resize', onResize);
  };
}, []);

  // Лёгкая реактивная заглушка, если данные ещё не подгрузились
  if (!footerData) {
    return (
      <footer className="Footer">
        <div className="Footer_container container">Загрузка...</div>
      </footer>
    );
  }

  const socialLinks = [
    { icon: vkIcon, href: '#', alt: 'VK' },
    { icon: telegramIcon, href: '#', alt: 'Telegram' },
    { icon: WhatsappIcon, href: '#', alt: 'YouTube' },
  ];

  const splitLinksResponsive = (links) => {
    if (isDesktop && links.length === 6) {
      return [links.slice(0, 3), links.slice(3, 6)];
    }
    return [links];
  };

  return (
    <footer className="Footer">
      <div className="Footer_container container">
        <div className="Footer_main">
          {/* Лого */}
          <div className="Footer_logo_block">
            <img src={logo} alt="Тоники Жизни" className="Footer_logo" />
            <div className="Footer_social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="Footer_social_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={social.icon} alt={social.alt} />
                </a>
              ))}
            </div>
          </div>

          {/* Колонки навигации (данные пришли с сервера) */}
          {Object.values(footerData).map((column, index) => (
            <div key={index} className={`Footer_column Footer_column_${index}`}>
              <h4 className="Footer_column_title">{column.title}</h4>
              <div className="Footer_column_content">
                {splitLinksResponsive(column.links).map((chunk, chunkIndex) => (
                  <ul key={chunkIndex} className="Footer_column_list">
                    {chunk.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="Footer_bottom">
          <p className="Footer_copyright">Политика ОПД</p>
          <p className="Footer_policy">
            Сайт разработан <img src={Kant} alt="Kant" />
          </p>
        </div>
      </div>
    </footer>
  );
};
