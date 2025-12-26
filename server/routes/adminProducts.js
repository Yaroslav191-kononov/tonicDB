const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');
module.exports = (query) => {
  const r = Router();

  r.get(
    '/',
    endpoint(async (req) => {
      const rows = await query(
        `
SELECT
  p.id,
  MAX(p.name) AS name,
  MAX(p.count) AS count,
  MAX(p.price) AS price,
  MAX(p.category) AS usefull,
  MAX(p.type) AS type,
  MAX(p.discription) AS description,
  MAX(oi.date) AS dateGHJ,
  MAX(p.image) AS image,
  MAX(p.active) AS active,
  SUM(oi.quantity) AS total_quantity,
  COUNT(v.id) AS views_count,
  SUM(oi.quantity * oi.price) AS total_revenue
FROM products AS p
LEFT JOIN views_date AS v ON v.product_id = p.id
LEFT JOIN order_items AS oi ON oi.product_id = p.id
WHERE p.category_id = 3
GROUP BY p.id;
        `,
        []
      );
      const allProducts = rows.map((r) => ({
        id: r.id,
        productId:r.id,
        name: r.name,
        category: r.type,
        views: r.views_count || 0,
        price: r.price,
        quantity: r.count,
        active: Boolean(r.active),
        date: r.dateGHJ || "2025-12-23",
        status: r.count>0?'in_stock':'out_of_stock',
        image: imageUrl(r.image) || null ,
        total_revenue: r.total_revenue,
        usefull:r.usefull,
        description:r.description,
        total_quantity:r.total_quantity
      }));

      return allProducts;
    })
  );

  return r;
};
