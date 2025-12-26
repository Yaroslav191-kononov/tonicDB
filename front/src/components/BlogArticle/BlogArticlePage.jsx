import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogArticle } from './BlogArticle';
// import blogImg1 from '../../assets/Image/blog-1.jpg'; // Не нужны, если данные в mockData
// import blogImg2 from '../../assets/Image/blog-2.jpg';
// import blogImg3 from '../../assets/Image/blog-3.jpg';
// import blogImg6 from '../../assets/Image/blog-6.jpg';
// import blogImg7 from '../../assets/Image/blog-7.jpg';
// import blogImg8 from '../../assets/Image/blog-8.jpg';

import { fetchMockData } from '../../data/data.js';

export const BlogArticlePage = () => {
    const { id } = useParams();
    const [articleData, setArticleData] = useState(null); // Инициализируем state для данных статьи

    // Скролл наверх при загрузке страницы
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMockData();
                const foundArticle = data.blogSection.find(article => article.id === parseInt(id));
                foundArticle.relatedArticles=data.blog.articles;
                console.log(foundArticle.relatedArticles);
                if (foundArticle) {
                    setArticleData(foundArticle);
                } else {
                    // Обработка случая, когда статья не найдена
                    console.error(`Статья с ID ${id} не найдена`);
                    setArticleData(null); // Или можно установить состояние ошибки
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                setArticleData(null); // Обработка ошибки при загрузке
            }
        };

        fetchData();
    }, [id]);

    //  Рендер компонента BlogArticle только после загрузки данных
    return (
        <>
            {articleData ? ( // Проверяем, загружены ли данные
                <BlogArticle articleData={articleData} />
            ) : (
                <p>Загрузка...</p> // Или отображаем сообщение о загрузке
            )}
        </>
    );
};
