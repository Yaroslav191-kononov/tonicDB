import React, { useEffect, useState } from 'react';
import { mockData, fetchMockData } from '../../../data/data.js';
import './ForWhom.css';
import childIcon from '../../../assets/Image/child.svg';
import pregnantIcon from '../../../assets/Image/download.svg';
import overloadIcon from '../../../assets/Image/back.svg';
import menIcon from '../../../assets/Image/Element.svg';
import athletesIcon from '../../../assets/Image/Biology.svg';
import returnIcon from '../../../assets/Image/Dnk.svg';

export const ForWhom = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchMockData()
      .then((data) => {
        // ожидаем data.tonics_seo_text_fullProduct.title и data.tonics_seo_text_fullProduct.items
        if (!mounted) return;
        setTitle(data?.tonics_seo_text_fullProduct?.title ?? '');
        setItems(data?.tonics_seo_text_fullProduct?.items ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const renderIcon = (order) => {
    switch (order) {
      case 1: return returnIcon;
      case 2: return childIcon;
      case 3: return pregnantIcon;
      case 4: return athletesIcon;
      case 5: return menIcon;
      case 6: return overloadIcon;
      default: return null;
    }
  };

  // Разделяем блоки на: subtitle (для описания) и text (для карточек)
  const subtitleBlocks = items.filter((b) => b.subtitle && b.subtitle.toString().trim() !== '');
  const textBlocks = items.filter((b) => b.text && b.text.toString().trim() !== '');

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки: {String(error)}</div>;

  return (
    <section className="ForWhom">
      <div className="ForWhom_container container">
        <h2 className="ForWhom_title">{title || 'Для кого она?'}</h2>

        <div className="ForWhom_description">
          {subtitleBlocks.map((b, idx) => (
            <p key={idx}>{b.subtitle}</p>
          ))}
        </div>

        <div className="ForWhom_grid">
          {textBlocks.map((item) => (
            <div key={item.blockOrder ?? item.id ?? Math.random()} className="ForWhom_card">
              <p className="ForWhom_card_text">
                {item.text}
                {item.highlight && <span className="highlight">{item.highlight}</span>}
              </p>
              <div className="ForWhom_card_icon">
                {renderIcon(item.blockOrder) && (
                  <img src={renderIcon(item.blockOrder)} alt={item.text} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};