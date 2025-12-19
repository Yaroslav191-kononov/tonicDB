import React, { useEffect, useState, useMemo } from 'react';
import './BlogArticle.css';
import WhatsAppIcon from '../../assets/Image/WhLogo.svg';
import TelegramIcon from '../../assets/Image/TgLogo.svg';
import VKIcon from '../../assets/Image/VkLogo.svg';
//
import { mockData, fetchMockData } from '../../data/data.js';

function getRandomElements(array, count) {
    if (!array) return []; // Добавлена проверка на null/undefined
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// BlogArticleRelated вынесен за пределы BlogArticle
const BlogArticleRelated = ({ relatedArticles }) => { // Принимает relatedArticles как пропс
    const randomRelatedArticles = useMemo(() => {
        return getRandomElements(relatedArticles, Math.min(3, relatedArticles?.length || 0));
    }, [relatedArticles]);

    return (
        <div className="BlogArticle_related">
            <h2 className="BlogArticle_related_title">ДРУГИЕ СТАТЬИ</h2>
            <div className="BlogArticle_related_grid">
                {randomRelatedArticles.map((relArticle, index) => (
                    <a
                        key={relArticle.id}
                        href={`/blog/${relArticle.id}`}
                        className={`BlogArticle_related_card ${index === 0 ? 'large' : 'medium'}`}
                    >
                        <div className="BlogArticle_related_card_image_wrapper">
                            <img
                                src={relArticle.image}
                                alt={relArticle.title}
                                className="BlogArticle_related_card_image"
                            />
                        </div>

                        <div className="BlogArticle_related_card_content">
                            <p className="BlogArticle_related_card_date">
                                {relArticle.date}
                            </p>
                            <h3 className="BlogArticle_related_card_title">
                                {relArticle.title}
                            </h3>
                            <p className="BlogArticle_related_card_excerpt">
                                {relArticle.excerpt}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            <button className="BlogArticle_load_more">
                показать еще
            </button>
        </div>
    );
};

export const BlogArticle = ({ articleData }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [article, setData] = useState(articleData || {
        id: 1,
        title: "НАЗВАНИЕ СТАТЬИ",
        author: "Автор Иванов Иван",
        date: "Дата публикации: 25.09.25",
        heroImage: "/images/blog-hero.jpg",
        sections: [
            {
                id: 1,
                title: "1. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                content: [
                    "Анфелиция Тобочиинская — это красная водоросль, которая появилась на Планете задолго до того, как человек научился лечить. Она вобрала в себя силу стихий, минералов и первозданного солнца. Ее клеточная структура несет в себе память о жизни в чистом виде.",
                    "И когда эта структура входит в контакт с организмом — он настраивается. Без насилия, без побочных эффектов. Просто возвращается то, что было заложено природой."
                ],
                type: "text"
            },
            {
                id: 2,
                title: "2. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                image: "/images/blog-section-1.jpg",
                type: "image"
            },
            {
                id: 3,
                title: "3. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                content: [
                    "Анфелиция Тобочиинская — это красная водоросль, которая появилась на Планете задолго до того, как человек научился лечить. Она вобрала в себя силу стихий, минералов и первозданного солнца. Ее клеточная структура несет в себе память о жизни в чистом виде.",
                    "И когда эта структура входит в контакт с организмом — он настраивается. Без насилия, без побочных эффектов. Просто возвращается то, что было заложено природой."
                ],
                type: "text"
            },
            {
                id: 4,
                title: "4. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                content: [
                    "Анфелиция Тобочиинская — это красная водоросль, которая появилась на Планете задолго до того, как человек научился лечить. Она вобрала в себя силу стихий, минералов и первозданного солнца. Ее клеточная структура несет в себе память о жизни в чистом виде.",
                    "И когда эта структура входит в контакт с организмом — он настраивается. Без насилия, без побочных эффектов. Просто возвращается то, что было заложено природой."
                ],
                type: "text"
            },
            {
                id: 5,
                title: "5. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                image: "/images/blog-section-2.jpg",
                type: "image"
            },
            {
                id: 6,
                title: "6. Раздел",
                heading: "ЧТО ТАКОЕ АНФЕЛИЦИЯ?",
                content: [
                    "Анфелиция Тобочиинская — это красная водоросль, которая появилась на Планете задолго до того, как человек научился лечить. Она вобрала в себя силу стихий, минералов и первозданного солнца. Ее клеточная структура несет в себе память о жизни в чистом виде.",
                    "И когда эта структура входит в контакт с организмом — он настраивается. Без насилия, без побочных эффектов. Просто возвращается то, что было заложено природой."
                ],
                type: "text"
            }
        ],
        relatedArticles: [
            {
                id: 1,
                title: "Название статьи название статьи",
                excerpt: "Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи",
                date: "16 июля 2025",
                image: "/images/blog-6.jpg"
            },
            {
                id: 2,
                title: "Название статьи название статьи",
                excerpt: "Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи",
                date: "16 июля 2025",
                image: "/images/blog-7.jpg"
            },
            {
                id: 3,
                title: "Название статьи название статьи",
                excerpt: "Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи",
                date: "16 июля 2025",
                image: "/images/blog-8.jpg"
            }
        ]
    });

    useEffect(() => {
        let canceled = false;
        fetchMockData()
            .then(async (resp) => {
                if (articleData.id) return;
                let data = resp;
                setData(data.blogSection);
            });
        return () => { canceled = true; };
    }, []);

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = article.title;

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
                break;
            case 'vk':
                window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
                break;
            default:
                break;
        }
    };

    const scrollToSection = (index) => {
        setActiveSection(index);
        const element = document.getElementById(`section-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="BlogArticle">
            {/* Header (название и автор) НАД фото */}
            <div className="container">
                <div className="BlogArticle_header">
                    <h1 className="BlogArticle_title">{article.title}</h1>
                    <div className="BlogArticle_meta">
                        <p className="BlogArticle_author">{article.author}</p>
                        <p className="BlogArticle_date">{article.date}</p>
                    </div>
                </div>
            </div>

            {/* Hero Section (фото) */}
            <div className="container">
                <div className="BlogArticle_hero">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="BlogArticle_hero_image"
                    />
                </div>
            </div>

            {/* Table of Contents */}
            <div className="container">
                <div className="BlogArticle_toc">
                    <h2 className="BlogArticle_toc_title">Содержание статьи</h2>
                    <div className="BlogArticle_toc_buttons">
                        {article.sections.map((section, index) => (
                            <button
                                key={section.id}
                                className={`BlogArticle_toc_btn ${activeSection === index ? 'active' : ''}`}
                                onClick={() => scrollToSection(index)}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections (3 ряда x 2 колонки = 6 карточек) */}
            <div className="container">
                <div className="BlogArticle_content">
                    {article.sections.map((section, index) => (
                        <div
                            key={section.id}
                            id={`section-${index}`}
                            className="BlogArticle_section"
                        >
                            {section.type === 'text' ? (
                                <div className="BlogArticle_text_block">
                                    <h2 className="BlogArticle_section_heading">{section.heading}</h2>
                                    {section.content.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="BlogArticle_paragraph">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <div className="BlogArticle_image_block">
                                    <img
                                        src={section.image}
                                        alt={section.heading}
                                        className="BlogArticle_section_image"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Share (ПОСЛЕ карточек контента) */}
            <div className="container">
                <div className="BlogArticle_share">
                    <p className="BlogArticle_share_text">Поделиться статьей</p>
                    <div className="BlogArticle_share_icons">
                        <button onClick={() => handleShare('whatsapp')} className="BlogArticle_share_icon">
                            <img src={WhatsAppIcon} alt="WhatsApp" />
                        </button>
                        <button onClick={() => handleShare('telegram')} className="BlogArticle_share_icon">
                            <img src={TelegramIcon} alt="Telegram" />
                        </button>
                        <button onClick={() => handleShare('vk')} className="BlogArticle_share_icon">
                            <img src={VKIcon} alt="VK" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Articles */}
            <div className="container">
                <BlogArticleRelated relatedArticles={article.relatedArticles} />
            </div>

        </div>
    );
};

export default BlogArticle;
