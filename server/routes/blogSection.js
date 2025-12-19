const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');

module.exports = (query) => {
    const r = Router();

    r.get(
        '/',
        endpoint(async (req) => {

            // Получаем данные статьи
            const articleData = await query(`
                SELECT id, title, tag, image, link, blog_id, type, date_published, excerpt, author
                FROM articles
                WHERE blog_id=1
            `, []);

            // Получаем связанные статьи
            const relatedArticlesData = await query(`
                SELECT id, article_id, title, excerpt, date, image
                FROM related_articles
            `, []);

            // Получаем секции статьи
            const articleSectionsData = await query(`
                SELECT id, article_id, title, heading, type, content, image
                FROM article_sections
            `, []);
            const article = articleData ? articleData.map(article => {
                const currentArticleSections = articleSectionsData.filter(section => article.id === section.article_id);
                const currentRelatedArticles = relatedArticlesData.filter(ra => article.id === ra.article_id);

                return {
                  id: article.id,
                  title: article.title,
                  author: article.author,
                  date: `Дата публикации: ${article.date_published}`,
                  heroImage: imageUrl(article.image),
                  sections: currentArticleSections.map(section => ({
                    id: section.id,
                    title: section.title,
                    heading: section.heading,
                    content: section.content ? [section.content] : [],
                    image: section.image ? imageUrl(section.image) : null,
                    type: section.type,
                  })),
                  relatedArticles: currentRelatedArticles.map(ra => ({
                    id: ra.id,
                    title: ra.title,
                    excerpt: ra.excerpt,
                    date: ra.date,
                    image: imageUrl(ra.image),
                    article_id:ra.article_id,
                  }))
                };
            }) : [];
            return article;
        })
    );

    return r;
};
