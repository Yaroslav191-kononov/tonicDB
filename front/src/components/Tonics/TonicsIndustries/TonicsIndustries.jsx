import React, { useState, useEffect } from 'react';
import './TonicsIndustries.css';
import industryImg from '../../../assets/Image/industry.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
const TonicsIndustries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [industries, setIndustries] = useState([

  ]);

  // Подгрузка данных с API и замена массива индустрий
  useEffect(() => {
      let mounted = true;
    fetchMockData()
    .then((data) => {
        if (!mounted) return;
        const items = Array.isArray(data) ? data : (data?.industries ?? []);
        if (items.length) {
          const mapped = items.map((r, idx) => ({
            id: typeof r.id === 'number' ? r.id : idx,
            name: r.name,
            image: r.image ?? industryImg,
            description: r.description ?? '',
          }));
          setIndustries(mapped);
          if (activeIndex >= mapped.length) setActiveIndex(0);
        }
      })
    return () => {
      mounted = false;
    };
  }, []); 

  return (
    <section className="TonicsIndustries_section">
      {/* ДЕСКТОП версия - НЕ ТРОГАЕМ */}
      <div className="TonicsIndustries_wrapper TonicsIndustries_desktop">
        {/* Левая колонка */}
        <div className="TonicsIndustries_listWrapper">
          <ul className="TonicsIndustries_list">
            {industries.map(item => (
              <li
                key={item.id}
                className={
                  'TonicsIndustries_item' +
                  (activeIndex === item.id ? ' TonicsIndustries_item--active' : '')
                }
                onClick={() => setActiveIndex(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Правая колонка */}
        <div className="TonicsIndustries_card">
          <div className="TonicsIndustries_cardImage">
            <img
              src={industries[activeIndex]?.image}
              alt={industries[activeIndex]?.name}
            />
          </div>
          <div className="TonicsIndustries_cardContent">
            <p>{industries[activeIndex]?.description}</p>
          </div>
        </div>
      </div>

      {/* МОБИЛКА/ПЛАНШЕТ версия - Accordion */}
      <div className="TonicsIndustries_mobile">
        <div className="TonicsIndustries_accordion">
          {industries.map(item => (
            <div
              key={item.id}
              className={
                'TonicsIndustries_accordionItem' +
                (activeIndex === item.id ? ' TonicsIndustries_accordionItem--active' : '')
              }
            >
              <div
                className="TonicsIndustries_accordionHeader"
                onClick={() => setActiveIndex(item.id)}
              >
                {item.name}
              </div>

              {/* Показываем карточку только если элемент активен */}
              {activeIndex === item.id && (
                <div className="TonicsIndustries_accordionContent">
                  <div className="TonicsIndustries_cardImage">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="TonicsIndustries_cardContent">
                    <p>{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TonicsIndustries;
