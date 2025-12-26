const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const fs = require('fs');
const path = require('path');

module.exports = (query) => {
  const r = Router();

  // DELETE /<id>
  r.delete(
    '/:id',
    endpoint(async (req) => {
      const { id } = req.params;
      if (!id) {
        return { ok: false, error: 'Missing id' };
      }

      // если нужно удалить файл
      // const productRows = await query('SELECT image FROM products WHERE id=?', [id]);
      // const imagePath = productRows?.[0]?.image;

      // Удаление записи
      await query('DELETE FROM `products` WHERE `id`=?', [id]);

      // если нужно удалить файл
      // if (imagePath) {
      //   const fullPath = path.resolve(imagePath);
      //   fs.unlink(fullPath, (err) => {
      //     if (err) console.error('Не удалось удалить файл изображения:', err);
      //   });
      // }

      return { ok: true, id };
    })
  );

  return r;
};
