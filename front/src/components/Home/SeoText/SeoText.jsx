import React, { useEffect, useState } from 'react';
import './SeoText.css';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const SeoText = (id) => {
  const [seoBlock, setSeoBlock] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch('http://localhost:3000/api/seo/'+id.id || 1).then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const seo = data ?? {};
        setSeoBlock(seo);
      })
      .catch((err) => {
        console.error('SeoText data load error:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!seoBlock) {
    return (
      <section className="SeoText_section">
        <div className="SeoText_container container">Загрузка...</div>
      </section>
    );
  }

  const title = seoBlock.title ?? 'Сео текст';
  const text1 = seoBlock.text1 ?? '';
  const text2 = seoBlock.text2 ?? '';

  return (
    <section className="SeoText_section">
      <div className="SeoText_container container">
        <h2 className="SeoText_title">{title}</h2>

        <div className="SeoText_columns">
          <div className="SeoText_column">
            <p className="SeoText_text">{text1}</p>
          </div>

          <div className="SeoText_column">
            <p className="SeoText_text">{text2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
