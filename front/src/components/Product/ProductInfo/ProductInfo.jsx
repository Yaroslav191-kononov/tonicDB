import React, { useEffect, useState } from 'react';
import './ProductInfo.css';
import { mockData, fetchMockData } from '../../../data/data.js';

export const ProductInfo = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    setLoading(true);

    fetchMockData()
      .then((data) => {
        if (canceled) return;
        //data = [{...}, ...] или data = { cards: [{...}, ...] }
        const payload = Array.isArray(data)
          ? data
          : data?.cards ?? [];
        //сортировка по cardOrder
        const sorted = payload.slice().sort((a, b) => {
          const ao = a.cardOrder ?? a.id ?? 0;
          const bo = b.cardOrder ?? b.id ?? 0;
          return ao - bo;
        });
        setCards(sorted);
        setLoading(false);
      })
      .catch(() => {
        if (!canceled) {
          setLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, []);

  const quoteText = 'Анфельция — это не про обещания. Это про отклик. Если вы чувствуете, что пора не лечиться, а жить, не бороться, а настраиваться — возможно, это она.';
  const letters = ['I', 'II', 'III'];

  const renderHighlightedText = (parts) =>
    parts.map((part, i) =>
      part.highlighted ? (
        <span key={i} className="highlight">{part.text}</span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );

  const renderCardContent = (card) => {
    //Контент как список элементов с parts
    if (
      card.isList ||
      (Array.isArray(card.content) &&
        card.content.length > 0 &&
        card.content[0] &&
        card.content[0].parts)
    ) {
      return (
        <ul className="ProductInfo_list">
          {card.content.map((item, i) => (
            <li key={i} className="ProductInfo_list_item">
              {item?.parts ? renderHighlightedText(item.parts) : null}
            </li>
          ))}
        </ul>
      );
    }

    //Контент как абзацы/параграфы
    return (
      <div className="ProductInfo_card_content">
        {card.content &&
          card.content.map((paragraph, i) => {
            if (typeof paragraph === 'string') {
              return (
                <p key={i} className="ProductInfo_card_text">
                  {paragraph}
                </p>
              );
            }

            const text = paragraph.text;
            const parts = paragraph.parts;
            const highlights = paragraph.highlights;

            return (
              <p key={i} className="ProductInfo_card_text">
                {text ?? null}
                {parts ? renderHighlightedText(parts) : null}
                {highlights ? renderHighlightedText(highlights) : null}
              </p>
            );
          })}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="ProductInfo">
        <div className="ProductInfo_container container">
          Загрузка...
        </div>
      </section>
    );
  }

  return (
    <section className="ProductInfo">
      <div className="ProductInfo_container container">
        <div className="ProductInfo_grid">
          {cards.map((card, index) => (
            <React.Fragment key={card.id ?? index}>
              <div className="ProductInfo_quote">
                <div className="ProductInfo_letter">{letters[index] ?? index + 1}</div>
                <p className="ProductInfo_quote_text">{quoteText}</p>
              </div>

              <div className="ProductInfo_card">
                <h3 className="ProductInfo_card_title">{card.title}</h3>
                {renderCardContent(card)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
