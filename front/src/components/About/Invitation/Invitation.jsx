import React, { useEffect, useState } from 'react';
import './Invitation.css';
import InvitePhoto from '../../../assets/Image/PhotoInvite.jpg';
import StarIcon from '../../../assets/Image/Star.svg';
import { mockData, fetchMockData } from '../../../data/data.js';

const Invitation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchMockData()
      .then((payload) => {
        if (!mounted) return;

        const rawInvitation = payload?.invitation ?? payload;
        if (!rawInvitation) {
          throw new Error('Нет данных приглашения');
        }

        let finalData = rawInvitation;
        if (rawInvitation?.contentJson) {
          finalData = {
            ...rawInvitation,
            ...rawInvitation.contentJson,
          };
        }

        setData(finalData);

        const firstCat = finalData?.categories?.[0]?.id ?? null;
        setActiveCategory(firstCat);

        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="invitation">
        <div className="container">
          <div className="row_container">
            <h2 className="invitation__title">Загрузка...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="invitation">
        <div className="container">
          <div className="row_container">
            <h2 className="invitation__title">Ошибка загрузки данных</h2>
          </div>
        </div>
      </section>
    );
  }

  // Данные после подготовки
  const {
    title = '',
    subtitle = '',
    categories = [],
    image,
    contentBlock = {},
  } = data || {};

  // Логика выборки контента для активной категории
  // contentBlock может быть как { byCategory: { ... }, default: { ... } } или просто { question, offer } и т.д.
  let contentForActive = {};

  if (contentBlock?.byCategory && activeCategory) {
    contentForActive = contentBlock.byCategory[activeCategory] ?? {};
  } else {
    // простая структура contentBlock
    contentForActive = contentBlock || {};
  }

  // Если структура не содержит явного question/offer, можно попутно взять просто поля
  const {
    question = contentForActive?.question ?? '',
    offer = contentForActive?.offer ?? {},
  } = contentForActive;

  const offerLabel = offer?.label ?? 'Что предлагаем:';
  const offerText = offer?.text ?? '';

  // Изображение
  const imageUrl = image?.url ?? InvitePhoto;
  const imageAlt = image?.alt ?? 'Лаборатория';

  return (
    <section className="invitation">
      <div className="container">
        <div className="row_container">
          <h2 className="invitation__title">{title}</h2>
          <p className="invitation__subtitle">{subtitle}</p>
        </div>

        <div className="invitation__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`invitation__category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="invitation__content">
          <div className="invitation__text-block">
            <p className="invitation__question">{question}</p>

            <div className="invitation__offer">
              <div className="invitation__offer-label">{offerLabel}</div>
              <p className="invitation__offer-text">{offerText}</p>
            </div>
          </div>

          <div className="invitation__image-wrapper">
            <img src={imageUrl} alt={imageAlt} className="invitation__image" />
          </div>
        </div>

        <div className="invitation__footer">
          <div className="invitation__icon">
            <img src={StarIcon} alt="*" />
          </div>
          <p className="invitation__cta">
            Если вы узнали в одном из этих пунктов себя и вам откликается наш подход, —давайте знакомиться!
            Вместе мы сможем раскрыть неочевидное и создать будущее, в котором хочется жить.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Invitation;