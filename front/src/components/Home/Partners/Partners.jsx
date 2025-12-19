import React, { useEffect, useState } from 'react';
import './Partners.css';
import partnerLogo from '../../../assets/Image/partner-logo.svg';
import Pointer from '../../../assets/Image/Pointer.svg';

// Импортируем общий загрузчик данных
import { mockData, fetchMockData } from '../../../data/data.js';

export const Partners = ({
  variant = 'default',
  title = 'Наши партнеры',
  titleShort = 'Партнеры',
  showAllLink = true,
  featuredItems = [] 
}) => {
  const [partnersSection, setPartnersSection] = useState({ title: '', items: [] });

  useEffect(() => {
    fetchMockData()
      .then((data) => {
        const p = data?.partners ?? { title: '', items: [] };
        if (Array.isArray(p.items)) {
          setPartnersSection({ title: p.title ?? title, items: p.items });
        } else {
          // Если пришёл другой формат
          setPartnersSection({
            title: data?.partners?.title ?? title,
            items: data?.partners?.items ?? [],
          });
        }
      })
      .catch((err) => {
        console.error('Partners fetch error:', err);
        setPartnersSection({ title, items: [] });
      });
  }, [title]);

  const getPartnersCount = () => {
    if (variant === 'featured-double') return 8;
    return 8;
  };

  const basePartners = Array.from({ length: getPartnersCount() }, () => ({
    title: 'Суверенный курс',
    logo: partnerLogo,
    link: '#',
  }));

  const itemsFromState = Array.isArray(partnersSection.items) ? partnersSection.items : [];
  const partnersToRender = itemsFromState.length > 0
    ? itemsFromState.map((it) => ({
        title: it.name ?? it.title ?? 'Партнёр',
        logo: it.logo ?? partnerLogo,
        link: it.link ?? '#',
      }))
    : basePartners;

  return (
    <section className={`Partners_section Partners_section--${variant}`}>
      <div className="Partners_container container">
        <div className="Partners_header">
          <h2 className="Partners_title">
            <span className="Partners_title_full">{partnersSection.title || title}</span>
            <span className="Partners_title_short">{titleShort}</span>
          </h2>
          {showAllLink && (
            <a href="/partners" className="Partners_link">
              {partnersSection.title}
              <img src={Pointer} alt="pointer" />
            </a>
          )}
        </div>

        <div className={`Partners_grid Partners_grid--${variant}`}>
          {/* Первый большой блок (если есть) */}
          {variant === 'featured-double' && featuredItems[0] && (
            <div className="Partners_featured Partners_featured--1">
              <div className="Partners_featured_header">
                <h3 className="Partners_featured_title">
                  {featuredItems[0].title}
                </h3>
              </div>

              {/* Контент по центру */}
              {featuredItems[0].content && (
                <div className="Partners_featured_content">
                  {featuredItems[0].content}
                </div>
              )}

              <a href={featuredItems[0].link || '#'} className="Partners_featured_link">
                ПОДРОБНЕЕ
                <img src={Pointer} alt="" />
              </a>
            </div>
          )}

          {/* Обычные карточки партнеров */}
          {partnersToRender.map((partner, index) => (
            <div key={index} className="Partners_card">
              <div className="Partners_card_title">{partner.title}</div>
              <img
                src={partner.logo}
                alt={partner.title}
                className="Partners_card_logo"
              />
              <a href={partner.link} className="Partners_card_link">
                ПОДРОБНЕЕ
                <img src={Pointer} alt=""/>
              </a>
            </div>
          ))}

          {/* Второй большой блок */}
          {variant === 'featured-double' && featuredItems[1] && (
            <div className="Partners_featured Partners_featured--2">
              <div className="Partners_featured_header">
                <h3 className="Partners_featured_title">
                  {featuredItems[1].title}
                </h3>
              </div>

              {/* Контент по центру */}
              {featuredItems[1].content && (
                <div className="Partners_featured_content">
                  {featuredItems[1].content}
                </div>
              )}

              <a href={featuredItems[1].link || '#'} className="Partners_featured_link">
                ПОДРОБНЕЕ
                <img src={Pointer} alt=""/>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};