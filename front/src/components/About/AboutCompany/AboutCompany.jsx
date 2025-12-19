import React, { useEffect, useState } from 'react';
import './AboutCompany.css';
import AboutImage from '../../../assets/Image/AboutCompany.jpg';
//
import { mockData, fetchMockData } from '../../../data/data.js';
const AboutCompany = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchMockData()
      .then((resp) => {
        if (canceled) return;
        let data = resp?.seoAbout.content_json ?? resp;
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch { data = null; }
        }
        if (data) {
          setAbout(data.seoAbout);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!canceled) {
          setLoading(false);
        }
      });
    return () => { canceled = true; };
  }, []);

  const resolveImage = (url) => {
    if (!url) return AboutImage;
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
      return url;
    }
    // Путь к локальным изображениям в public/assets/Image/
    return `/assets/Image/${url}`;
  };

  if (loading) return (
    <section className="ProductInfo">
      <div className="ProductInfo_container container">Загрузка...</div>
    </section>
  );

  if (!about) {
    return (
      <section className="ProductInfo">
        <div className="ProductInfo_container container">Нет данных</div>
      </section>
    );
  }

  const desktop = about.contentJson.sections?.find(s => s.variant === 'desktop');
  console.log(desktop)
  const mobile = about.contentJson.sections?.find(s => s.variant === 'mobile' || s.grid);
    console.log(mobile)

  return (
    <section className="about">
      <div className="container">
        <h2 className="about__label">{about.title}</h2>

        {desktop && (
          <div className="about__inner about__inner--desktop">
            <div className="about__left">
              <p className="about__subtitle">
                {desktop.left?.subtitle}
              </p>
              {desktop.image?.url && (
                <div className="about__image-wrapper">
                  <img src={resolveImage(desktop.image.url)} alt={desktop.image?.alt ?? ''} className="about__image" />
                </div>
              )}
            </div>

            <div className="about__right">
              <p className="about__lead">{desktop.right?.lead}</p>

              {desktop.mission?.text && (
                <div className="about__mission">
                  <p className="about__mission-text">{desktop.mission.text}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {mobile && (
          <div className="about__inner about__inner--mobile">
            <div className="about__grid">
              {mobile.grid?.map((g, idx) => (
                <div key={idx} className="about__column about__column--left">
                  <p className="about__subtitle">{g?.left?.subtitle}</p>
                  <p className="about__lead">{g?.right?.lead}</p>
                </div>
              ))}
            </div>
            {mobile.image?.url && (
              <div className="about__image-wrapper">
                <img src={resolveImage(mobile.image.url)} alt={mobile.image?.alt ?? ''} className="about__image" />
              </div>
            )}
            {mobile.mission?.text && (
              <div className="about__mission">
                <p className="about__mission-text">{mobile.mission.text}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutCompany;
