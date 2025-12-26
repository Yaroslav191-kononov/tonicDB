const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const path = require('path');
const fs = require('fs').promises;

const IMAGES_DIR = path.resolve(__dirname, '../images');

// вспомогательные преобразования
function dataURLToBuffer(dataUrl) {
  const m = /^data:(.*?);base64,(.*)$/i.exec(dataUrl);
  if (!m) return Buffer.from(dataUrl);
  return Buffer.from(m[2], 'base64');
}

async function saveDataUrlToFile(dataUrl, dir, filename) {
  const buf = dataURLToBuffer(dataUrl);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buf);
  return filename;
}

module.exports = (query) => {
  const r = Router();

  r.post(
    '/',
    endpoint(async (req, res) => {
      const {
        name, description, category, price, catalogSection, type,
        quantity, cost, images,
        cerf, cerfFile, features
      } = req.body;

      let imageForDb = null;
      // 1) сохранить изображения (как ранее)
      try {
        if (Array.isArray(images) && images.length > 0) {
          for (const img of images) {
            const { dataUrl, name: origName } = img;
            if (dataUrl) {
              const ext = path.extname(origName) || '';
              const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
              await saveDataUrlToFile(dataUrl, IMAGES_DIR, filename);
              if (!imageForDb) imageForDb = filename;
            }
          }
        }
      } catch (err) {
        console.error('Error saving product images:', err);
      }

      let productId;

      // 2) вставка в products
      try {
        const sqlProduct = `
          INSERT INTO products
          (name, discription, price, image, size, category_id, active, views, quantity, category, type, count)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const productParams = [
          name || null,
          description || null,
          price != null ? Number(price) : null,
          imageForDb,
          "big",
          catalogSection ?? null,
          true,
          0,
          0,
          category ?? null,
          type ?? null,
          quantity != null ? Number(quantity) : 0
        ];
        const result = await query(sqlProduct, productParams);
        productId = result.insertId;
      } catch (err) {
        console.error('Error inserting product:', err);
        return res.status(500).json({ ok: false, error: 'Database error' });
      }

      // 3) cerf: сохранить файлы и вставить записи
      try {
        if (Array.isArray(cerf) && cerf.length > 0) {
          const cerfFilesArr = Array.isArray(cerfFile) ? cerfFile : [];
          const count = Math.min(cerf.length, cerfFilesArr.length);

          for (let i = 0; i < count; i++) {
            const header = cerf[i]?.header ?? null;
            const fileObj = cerfFilesArr[i];
            let filename = null;

            if (fileObj && fileObj.dataUrl) {
              const ext = path.extname(fileObj.name || '') || '';
              filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
              await saveDataUrlToFile(fileObj.dataUrl, IMAGES_DIR, filename);
            }

            const sqlCerf = `INSERT INTO cerf (product_id, header, url) VALUES (?, ?, ?)`;
            await query(sqlCerf, [productId, header, filename]);
          }
        }

        // 4) features -> характеристики
        if (Array.isArray(features) && features.length > 0) {
          for (const f of features) {
            const nameFeat = f?.header ?? f?.name ?? null;
            const descFeat = f?.description ?? null;

            const sqlFeat = `INSERT INTO characteristic (product_id, name, description) VALUES (?, ?, ?)`;
            await query(sqlFeat, [productId, nameFeat, descFeat]);
          }
        }

        res.json({ ok: true, id: productId });
        return;
      } catch (err) {
        console.error('Error inserting cerf/features:', err);

        // Компенсационные удаления
        try {
          // удалить введённые cerf
          if (productId) await query('DELETE FROM cerf WHERE product_id = ?', [productId]);
        } catch (_) {}

        try {
          // удалить введённые характеристики
          if (productId) await query('DELETE FROM characteristic WHERE product_id = ?', [productId]);
        } catch (_) {}

        try {
          // удалить продукт
          if (productId) await query('DELETE FROM products WHERE id = ?', [productId]);
        } catch (_) {}

        res.status(500).json({ ok: false, error: 'Database error (partial insert, compensating deletes applied)' });
      }
    })
  );
  r.post('/update',
    endpoint(async (req, res) => {
      const {
        id,
        name, description, category, price, catalogSection, type,
        quantity, images,
        certs, cerfFile, features,cerf
      } = req.body;

      if (!id) {
        return res.status(400).json({ ok: false, error: 'Missing id' });
      }

      // 1) Обновление главной картинки (image) и/или пути к изображениям
      try {
        let imageForDb = null;

        if (Array.isArray(images) && images.length > 0) {
          for (const img of images) {
            const { dataUrl, name: origName, url } = img;
            if (dataUrl) {
              const ext = path.extname(origName || '') || '';
              const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
              await saveDataUrlToFile(dataUrl, IMAGES_DIR, filename);
              imageForDb = filename;
              break;
            } else if (url) {
              // взять имя файла из url
              const nameFromUrl = path.basename(url);
              imageForDb = nameFromUrl;
              break;
            }
          }
        }

        // Обновляем поле image, если получили новое
        if (imageForDb) {
          const sqlUpdImg = `
            UPDATE products
            SET image = ?
            WHERE id = ?
          `;
          await query(sqlUpdImg, [imageForDb, id]);
        }
      } catch (err) {
        console.error('Error updating product image:', err);
      }

      // 2) Обновление базовых полей продукта
      try {
        const sqlUpdateProduct = `
          UPDATE products
          SET name = ?, discription = ?, price = ?, count = ?, category_id = ?, category = ?, type = ?
          WHERE id = ?
        `;
        const productParams = [
          name ?? null,
          description ?? null,
          price != null ? Number(price) : null,
          quantity != null ? quantity: 100,
          catalogSection ?? null,
          category ?? null,
          type ?? null,
          id
        ];
        await query(sqlUpdateProduct, productParams);
      } catch (err) {
        console.error('Error updating product:', err);
        return res.status(500).json({ ok: false, error: 'Database error' });
      }

      // 3) cerf: обновление сертификатов
      try {
        // удаляем текущие записи сертификатов для продукта
        await query('DELETE FROM cerf WHERE product_id = ?', [id]);

        // вставляем новые сертификаты (если есть)
        if (Array.isArray(certs) && certs.length > 0) {
          const cerfsArr = certs;
          let ind=0;
          for (const c of cerfsArr) {
            const header = c?.header ?? null;
            let urlFile = null;
            const fileObj = cerf[ind];
            ind++;
            if (fileObj && typeof fileObj === 'object') {
              if (fileObj.dataUrl) {
                const ext = path.extname(fileObj.name || '') || '';
                const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
                await saveDataUrlToFile(fileObj.dataUrl, IMAGES_DIR, filename);
                urlFile = filename;
              } else if (fileObj.url) {
                urlFile = path.basename(fileObj.url);
              }
            } else if (typeof fileObj === 'string') {
              urlFile = fileObj;
            } else if (c?.url) {
              urlFile = c.url;
            }
            const sqlCerf = `INSERT INTO cerf (product_id, header, url) VALUES (?, ?, ?)`;
            await query(sqlCerf, [id, header, urlFile]);
          }
        }
      } catch (err) {
        console.error('Error updating cerf:', err);
        // не прерываем основной процесс, продолжаем
      }

      // 4) features: обновление характеристик
      try {
        if (Array.isArray(features) && features.length > 0) {
          for (const f of features) {
            const fid = f?.id;
            const nameFeat = f?.name ?? null;
            const descFeat = f?.description ?? null;
                         console.log(fid);
            if (fid) {
                                       console.log(123);
              const sqlFeatUpd = `UPDATE characteristic SET name=?, description=? WHERE id=? AND product_id=?`;
              await query(sqlFeatUpd, [nameFeat, descFeat, fid, id]);
            } else {
                                                   console.log(123);
              const sqlFeatIns = `INSERT INTO characteristic (product_id, name, description) VALUES (?, ?, ?)`;
              await query(sqlFeatIns, [id, nameFeat, descFeat]);
            }
          }
        }
      } catch (err) {
        console.error('Error updating features:', err);
      }

      res.json({ ok: true, id });
    })
  );

  return r;
};