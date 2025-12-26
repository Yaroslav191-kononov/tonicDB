import React, { useEffect, useState } from 'react';
import './TonicsHero.css';
import { Button } from '../../../components/Home/Button/Button.jsx'; // Проверь правильность пути к Button
import EarthPhoto from '../../../assets/Image/Earth.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';


const TonicsHero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchMockData().then((data) => {
      const t = data?.tonics_hero[0];
      if (mounted) setHero(t);
    }).catch(() => {

    });
    return () => { mounted = false; };
  }, []);


  return (
    <section className="TonicsHero_section">
      <div className="TonicsHero_content">
        {/* Левая часть: Текст */}
        <div className="TonicsHero_left">
          <h1 className="TonicsHero_title">
            {hero?.titleLine1}<br />{hero?.titleLine2}
          </h1>

          <p className="TonicsHero_description">
            {hero?.description}
          </p>

          {/* Используем твой компонент Button с динамическим текстом */}
          <Button variant="primary">
            {hero?.ctaText}
          </Button>
        </div>

        {/* Правая часть: Планета */}
        <div className="TonicsHero_right">
          <img
            src={hero?.image || EarthPhoto}
            alt="Тоники жизни планета"
            className="TonicsHero_image"
          />
        </div>
      </div>
    </section>
  );
};

export default TonicsHero;