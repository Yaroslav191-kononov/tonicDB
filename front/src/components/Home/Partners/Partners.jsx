import React, { useEffect, useState } from 'react';
import './Partners.css';
import Pointer from '../../../assets/Image/Pointer.svg';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const Partners = () => {
  const [partnersSection, setPartnersSection] = useState({ title: '', items: [] });

  useEffect(() => {
    fetchMockData()
      .then((data) => {
        const p = data?.partners ?? { title: '', items: [] };
        // Гибкая логика на случай разных форматов
        if (Array.isArray(p.items)) {
          setPartnersSection({ title: p.title ?? '', items: p.items });
        } else {
          // Если пришёл другой формат
          setPartnersSection({
            title: data?.partners?.title ?? '',
            items: data?.partners?.items ?? [],
          });
        }
      })
      .catch((err) => {
        console.error('Partners fetch error:', err);
      });
  }, []);

  return (
    <section className="Partners_section">
      <div className="Partners_container container">
        <div className="Partners_header">
          <h2 className="Partners_title">
            <span className="Partners_title_full">{partnersSection.title || 'Наши партнеры'}</span>
            <span className="Partners_title_short">Партнеры</span>
          </h2>
          <a href="#" className="Partners_link">
            {partnersSection.title || ""}
            <img src={Pointer} alt="pointer" />
          </a>
        </div>

        <div className="Partners_grid">
          {partnersSection.items.map((item, idx) => (
            <div key={item.id ?? idx} className="Partners_card">
              <img
                src={item.logo}
                alt={item.name}
                className="Partners_card_logo"
              />
              <div className="Partners_card_title">{item.name}</div>
              {item.link && (
                <a href={item.link} className="Partners_card_link">
                  ПОДРОБНЕЕ
                  <img src={Pointer} alt="" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
