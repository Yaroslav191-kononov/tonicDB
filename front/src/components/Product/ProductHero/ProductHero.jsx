import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockData, fetchMockData } from '../../../data/data.js';
import './ProductHero.css';
import coralImage from '../../../assets/Image/Tonic.svg';

export const ProductHero = ({ id: propId, title = 'Загрузка', subtitle = 'Загрузка', description = 'Загрузка' }) => {


  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
      setLoading(true);
      fetchMockData()
        .then((data) => {
          if (canceled) return;
          const payloadHero = data?.productHero.hero ?? data ?? null;
          setHero(payloadHero);
          setLoading(false);
        })
        .catch((err) => {
          if (!canceled) {
            setError(err?.toString() ?? 'Ошибка загрузки');
            setLoading(false);
          }
        });
    return () => {
      canceled = true;
    };
  }, []);

  // Рендер блока героя (ссылка на CTA, изображение и т.д.)
  const renderHeroContent = () => {
    // При загрузке вызывается ниже, здесь только визуальные элементы
    const titleLine1 = hero?.title ?? title;
    const subtitleLine = hero?.subtitle ?? subtitle;
    const desc = hero?.description ?? description;
    const imageSrc = hero?.imageUrl ?? coralImage;
    const ctaText = hero?.cta?.text ?? null;
    const ctaLink = hero?.cta?.link ?? null;

    return (
      <>
        <div className="ProductHero_top">
          <div className="ProductHero_text_wrapper">
            <h2 className="ProductHero_subtitle">{subtitleLine}</h2>
            <p className="ProductHero_description">{desc}</p>
          </div>

          <div className="ProductHero_coral">
            <img src={imageSrc} alt={titleLine1} />
          </div>
        </div>

        <h1 className="ProductHero_title">{titleLine1}</h1>

      </>
    );
  };

  return (
    <section className="ProductHero">
      <div className="ProductHero_container container">
        <div className="ProductHero_wrapper">
          {loading && <div className="ProductHero_loading">Загрузка...</div>}

          {!loading && hero && renderHeroContent()}

          {!loading && !hero && (
            <>
              <div className="ProductHero_top">
                <div className="ProductHero_text_wrapper">
                  <h2 className="ProductHero_subtitle">{subtitle}</h2>
                  <p className="ProductHero_description">{description}</p>
                </div>

                <div className="ProductHero_coral">
                  <img src={coralImage} alt={title} />
                </div>
              </div>

              <h1 className="ProductHero_title">{title}</h1>
            </>
          )}

          {error && <div className="ProductHero_error">Ошибка: {error}</div>}
        </div>
      </div>
    </section>
  );
};
