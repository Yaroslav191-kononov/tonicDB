const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');

module.exports = (query) => {
   const r = Router();
   r.get(
    '/',
    endpoint(async (req) => {
            const { id } = req.params;
      const rows = await query(`
        SELECT id, product_id, name, description FROM characteristic
      `,[]);
      return rows.map((r) => ({
        name: r.name,
        product_id:r.product_id,
        description: r.description,
      }));
    })
    );
    return r;
}
