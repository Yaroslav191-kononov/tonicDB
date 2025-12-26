import React, { useEffect, useState } from 'react';
import './TonicsSeoText.css';

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
const TonicsSeoText = () => {
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetchMockData()
      .then((data) => {
        if (!mounted) return;
        const t = data?.tonics_seo_text_full;
        if (t) {
          setPage(t);
          setBlocks(Array.isArray(t.items) ? t.items : []);
        } else {
          setPage(null);
          setBlocks([]);
        }
      })

    return () => {
      mounted = false;
    };
  }, []);

  const title = page?.title ?? 'ОПИСАНИЕ ТОНИКОВ КАК ЯВЛЕНИЯ';

  return (
    <section className="TonicsSeoText_section">
      <div className="TonicsSeoText_container">
        {/* Левая колонка: Заголовок */}
        <div className="TonicsSeoText_left">
          <h2 className="TonicsSeoText_title">{title}</h2>
        </div>

        {/* Правая колонка: Два текстовых блока (или больше, если придут через API) */}
        <div className="TonicsSeoText_right">
          {blocks.length > 0 ? (
            blocks.map((b) => (
              <div key={b.blockOrder} className="TonicsSeoText_block">
                <h3 className="TonicsSeoText_subtitle">{b.subtitle}</h3>
                <p className="TonicsSeoText_text">{b.text}</p>
              </div>
            ))
          ) : (
            <>
              <div className="TonicsSeoText_block">
                <h3 className="TonicsSeoText_subtitle">Загруска</h3>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Декоративные элементы фона */}
      <div className="TonicsSeoText_bg_glow"></div>
    </section>
  );
};

export default TonicsSeoText;
