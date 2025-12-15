const express = require('express');
const { initPool, query } = require('./server_config/db');
const { PORT } = require('./server_config/config');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());

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