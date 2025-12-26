const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');

module.exports = (query) => {
  const r = Router();

  r.get(
    '/:id',
    endpoint(async (req) => {
      const { id } = req.params;
      const { category } = req.query;

      const categories = await query(`
        SELECT id, name
        FROM product_categories
        WHERE id=?
      `, [id]);

      let products;
      if (category && category !== 'all') {
        products = await query(`
          SELECT id, name, price, image, size, category_id, discription, active, views, quantity, category
          FROM products
          WHERE category_id=? AND name=?
        `, [id, category]);
      } else {
        products = await query(`
          SELECT id, name, price, image, size, category_id, discription, active, views, quantity, category
          FROM products
          WHERE category_id=?
        `, [id]);
      }

      return {
        title: categories[0]?.name,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: imageUrl(p.image),
          size: p.size,
          category_id: p.category_id,
          discription: p.discription,
          active: p.active,
          views: p.views,
          quantity: p.quantity,
          category: p.category,
        })),
      };
    })
  );

  return r;
};
