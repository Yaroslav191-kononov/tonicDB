import React from 'react';
import './Hero.css';
import { mockData,fetchMockData } from '../../../data/data.js';
import { Button } from '../Button/Button.jsx';
import heroImage from '../../../assets/Image/HeroImage.svg'; // Замени на свой путь к изображению

export const Hero = () => {
    const { hero: mockHero } = mockData;

const [heroFromApi, setHeroFromApi] = React.useState(null);

React.useEffect(() => {
    let mounted = true;
    (async () => {
            const data = await fetchMockData();
            if (mounted && data?.hero) setHeroFromApi(data.hero);
    })();
    return () => {
        mounted = false;
    };
}, []);

// Используем данные из API, если они есть; иначе — из mockData
const hero = heroFromApi ?? mockHero;

return (
    <section className="Hero_section">
        <div className="Hero_content">

            {/* ===== DESKTOP/TABLET HERO ===== */}
            <div className="Hero_desktop">
                <div className="Hero_title_wrapper">
                    <h1 className="Hero_title Hero_title--left">
                        {hero?.titleLeft}
                    </h1>

                    <div className="Hero_image_container">
                        <img
                            src={hero?.imageAlt}
                            alt="Земля"
                            className="Hero_image"
                        />
                    </div>

                    <h1 className="Hero_title Hero_title--right">
                        {hero?.titleRight}
                    </h1>
                </div>

                <p className="Hero_subtitle">{hero?.subtitle}</p>

                <div className="Hero_buttons">
                    {hero?.buttons.map((btn, index) => (
                        <Button
                            key={index}
                            variant={btn.primary ? 'primary' : 'outline'}
                        >
                            {btn.text}
                        </Button>
                    ))}
                </div>
            </div>

            {/* ===== MOBILE HERO ===== */}
            <div className="Hero_mobile">
                <div className="Hero_image_container">
                    <img
                        src={heroImage}
                        alt={hero?.imageAlt}
                        className="Hero_image"
                    />
                </div>

                <div className="Hero_mobile_text">
                    <h1 className="Hero_mobile_title">
                        {hero?.titleLeft} {hero?.titleRight}
                    </h1>
                    <p className="Hero_mobile_subtitle">{hero?.subtitle}</p>
                </div>

                <div className="Hero_mobile_buttons">
                    {hero?.buttons.map((btn, index) => (
                        <Button
                            key={index}
                            variant={btn.primary ? 'primary' : 'outline'}
                        >
                            {btn.text}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
};