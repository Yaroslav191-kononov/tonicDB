// TonicsPage.jsx
import React, { useEffect, useState } from 'react';
import './Tonics.css';
import coralGlow from '../../../assets/Image/coral-glow.svg';
import Pointer from "../../../assets/Image/Pointer.svg";

// импорт функции загрузки данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const Tonics = () => {

  const [words, setWords] = useState([

  ]);
  // Подгрузка данных из БД при монтировании
  useEffect(() => {
    let isMounted = true;
        fetchMockData()
          .then((data) => {
            if (!data || !isMounted) return;
            const productsData = data?.ingredients;
            setWords({
              title:productsData.title,
              productsData:productsData.items
            });
          })
        return () => {
          isMounted = false;
        };
  }, []);

  // выбор координат по ширине
  const getPosition = (word) => {
    if (typeof window === 'undefined') {
      // SSR / начальный рендер — desktop
      return word.desktop;
    }

    const width = window.innerWidth;

    if (width <= 767) return word.placement_mobile;
    if (width <= 1024) return word.placement_tablet;
    return word.placement_desktop;
  };

  return (
    <section className="Tonics_section container">
      <div className="Tonics_header">
        <h2 className="Tonics_title">{words.title}</h2>
        <a href="#all" className="Tonics_link_all">ВСЕ ТОНИКИ
          <img src={Pointer} alt="pointer" />
        </a>
      </div>

      <div className="Tonics_visual">
        {/* коралл + блюр */}
        <div className="Tonics_coral_container">
          <div className="Tonics_circle_blur" />
          <img src={coralGlow} alt="Coral" className="Tonics_coral_image" />
        </div>

        {/* остальные слова с позициями только из words */}
        {words.productsData?.map((word, index) => {
          const pos = getPosition(word);
          return (
            <span
              key={index}
              className={`Tonics_word ${word.size === 'main' ? 'Tonics_word_main' : `Tonics_word_${word.size}`}`}
              style={{
                top:    pos.top    ?? 'auto',
                right:  pos.right  ?? 'auto',
                bottom: pos.bottom ?? 'auto',
                left:   pos.left   ?? 'auto',
                transform: pos.transform ?? undefined,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </section>
  );
};
