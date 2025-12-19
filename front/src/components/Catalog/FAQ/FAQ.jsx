import React, { useEffect, useState } from 'react';
import './FAQ.css';
//
import { mockData, fetchMockData } from '../../../data/data.js';
const FAQ = () => {
    const [faqData, setAbout] = useState({articles:[{
            id: 1,
            type: 'small',
            question: 'Что такое тоники жизни?',
            answer: 'Тоники жизни – натуральные комплексы \n' +
                'для поддержки организма на глубинном уровне. Они восстанавливают баланс, поддерживают здоровье и адаптируют к изменениям среды.'
        },
        {
            id: 2,
            type: 'small',
            question: 'Подходит ли Анфельция всем?',
            answer: 'Да, продукт разработан для широкого круга людей – от тех, кто ищет поддержку иммунитета, до людей с высокими физическими \n' +
                'и умственными нагрузками.'
        },
        {
            id: 3,
            type: 'large',
            question: 'Есть ли научные исследования о свойствах Анфельций?',
            answer: 'Да, изучение Анфельции ведется уже многие годы. Научные работы подтверждают ее биоактивные свойства, в том числе способность очищать организм, укреплять иммунитет и улучшать обменные процессы.'
        },

        // Ряд 2
        {
            id: 4,
            type: 'large',
            question: 'Чем Анфельция отличается от других добавок?',
            answer: 'Анфельция  восполняет дефицит витаминов или минералов – \n' +
                'она помогает организму самостоятельно находить ресурсы \n' +
                'для восстановления. Ее клеточная структура содержит информацию \n' +
                'о первозданных процессах жизни, что делает ее уникальной.'
        },
        {
            id: 5,
            type: 'small',
            question: 'Как правильно принимать продукт?',
            answer: 'Способы приема зависят от формы выпуска. \n' +
                'Для максимального эффекта важно учитывать особенности организма и текущие потребности – подробные рекомендации даны на упаковке.'
        },
        {
            id: 6,
            type: 'small',
            question: 'Можно ли совмещать Анфельцию с другими средствами?',
            answer: 'Да, Анфельция совместима с большинством продуктов и лекарственных средств, но для достижения наилучших результатов важно подобрать индивидуальный режим приема.'
        }]});
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        let canceled = false;
        setLoading(true);
        fetchMockData()
          .then((resp) => {
            if (canceled) return;
            let data = resp;
            if (data) {
              setAbout(data.blogKatalog);
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
    return (
        <section className="faq">
            <div className="container">
                <h2 className="faq__title">{faqData?.blog_title}</h2>

                <div className="faq__grid">
                    {faqData?.articles.map((item,key) => (
                        <div
                            key={item.id}
                            className={`faq-card faq-card--${item.type} faq-card-${item.key}`}
                        >
                            <h3 className="faq-card__question">{item.title}</h3>
                            <p className="faq-card__answer">{item.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
