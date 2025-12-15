const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { imageUrl } = require('../utils/image');

module.exports = (query) => {
   const r = Router();
   r.get(
    '/',
    endpoint(async () => {
      const rows = await query(`
        SELECT id, title, text1, text2
        FROM seo_text
        LIMIT 1
      `);
      const r = rows[0] || { title: '', text1: '', text2: '' };
      return {
        title: r.title,
        text1: r.text1,
        text2: r.text2,
      };
    })
    );
    return r;
}
