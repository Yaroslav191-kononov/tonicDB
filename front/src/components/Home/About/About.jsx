import React, { useEffect, useState } from 'react';
import './About.css';
import aboutPhotoDesktop from '../../../assets/Image/about-factory.svg';
import aboutPhotoTablet from '../../../assets/Image/about-factory-table.svg';
import aboutPhotoMobile from '../../../assets/Image/about-factory-mobile.svg';
import Pointer from '../../../assets/Image/Pointer.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';

export const About = () => {
  // Данные раздела about: title, description, philosophyTitle, philosophyItems
  const [about, setAbout] = useState({
    title: '',
    description: '',
    philosophyTitle: '',
    philosophyItems: [],
  });

  // Загружаем данные из data.js (через fetchMockData)
  useEffect(() => {
    let isMounted = true;

    fetchMockData()
      .then((data) => {
        if (!data || !isMounted) return;
        const aboutData = data?.about;
        setAbout({
          title: aboutData.title ?? '',
          description: aboutData.description ?? '',
          philosophyTitle: aboutData.philosophyTitle ?? '',
          philosophyItems: aboutData.philosophyItems ?? []
        });
      })
      .catch((err) => {
        console.error('Failed to fetch about via mock data', err);
        // можно оставить дефолтные значения
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="About_section section-dark container">
      {/* Фото-пазл с адаптивными изображениями */}
      <picture className="About_picture">
        <source media="(max-width: 767px)" srcSet={aboutPhotoMobile} />
        <source
          media="(min-width: 768px) and (max-width: 1024px)"
          srcSet={aboutPhotoTablet}
        />
        <img src={aboutPhotoDesktop} alt="Наше производство" className="About_image" />
      </picture>

      {/* Текст в левом пропуске */}
      <div className="About_content">
        {/* Левая колонка - текст */}
        <div className="About_left_column">
          <h2 className="About_title">КТО МЫ И ЗАЧЕМ ВСЁ ЭТО</h2>

          <p className="About_text">
            {about.description ||
              'Мы — команда исследователей, которым небезразлично качество собственной жизни, наших детей и семей, людей вокруг и планеты. Наши продукты помогают организму жить в ресурсе — на уровне клеток, гормонов, ощущений. Создавая Tonics, мы основываемся на человечности во отношениях к самим себе, людям и природе.'}
          </p>
        </div>

        {/* Правая колонка - таблица философии */}
        <div className="About_philosophy_table">
          <h3 className="About_subtitle">{about.philosophyTitle || 'Наша философия:'}</h3>
          <div className="About_philosophy_line"></div>

          {about.philosophyItems?.length > 0 &&
            about.philosophyItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className="About_philosophy_title">{item?.term || ''}</div>
                <div className="About_philosophy_description">{item?.desc || ''}</div>
                <div className="About_philosophy_line"></div>
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Кнопка в правом верхнем углу */}
      <button className="About_button">
        ПОДРОБНЕЕ
        <img src={Pointer} alt="pointer" />
      </button>
    </section>
  );
};