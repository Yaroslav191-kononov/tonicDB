const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');

module.exports = (query) => {
    const r = Router();

    r.get(
        '/categories',
        endpoint(async (req) => {
            const categoryCounts = await query(`
                SELECT 
                    COUNT(p.id) AS count,p.name
                FROM products p
                WHERE category_id=3
                GROUP BY p.name
                ORDER BY count DESC;
            `);

            return categoryCounts.map(cat => ({name: cat.name, count: cat.count}));
        })
    );

    return r;
};
