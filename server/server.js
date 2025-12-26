const express = require('express');
const { initPool, query } = require('./server_config/db');
const { PORT } = require('./server_config/config');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use('/images', express.static(path.join(__dirname, 'images')));
const CERTS_BASE_DIR = path.join(__dirname, 'images');
// маршрут для скачивания файлов
app.get('/download/:filename', (req, res) => {
  const requested = req.params.filename;
  if (!requested) {
    return res.status(400).json({ error: 'Missing filename' });
  }
  const filePath = path.resolve(CERTS_BASE_DIR, requested);
  if (!filePath.startsWith(CERTS_BASE_DIR)) {
    return res.status(400).json({ error: 'Invalid path' });
  }
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error', err);
        res.status(500).json({ error: 'Could not download file' });
      }
    });
  });
});
// Подключение к БД и запуск маршрутизаторов
async function startServer() {
  await initPool();

  // подключаем маршрутизаторы, передав функцию query
  const routes = require('./routes');

  app.use('/api', routes(query));
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

startServer().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});