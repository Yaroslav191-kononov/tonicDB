const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');

module.exports = (query) => {
   const r = Router();
   r.get(
    '/:id',
    endpoint(async (req) => {
            const { id } = req.params;
      const categories = await query(`
        SELECT id, name
        FROM product_categories
        WHERE id=?
      `,[id]);
      const products = await query(`
        SELECT id, name, price, image, size, category_id,discription
        FROM products
        WHERE category_id=?
      `,[id]);
      return {
        title: categories[0]?.name,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: imageUrl(p.image),
          size: p.size,
          category_id: p.category_id,
          discription:p.discription,
        })),
      };
    })
    );
    return r;
}
