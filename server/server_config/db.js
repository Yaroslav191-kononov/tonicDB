const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');

let pool;
//сщединение с БД
async function initPool() {
  pool = await mysql.createPool({
    ...DB_CONFIG,
    waitForConnections: true,
    connectionLimit: 10,
  });
}
//единый запрос к БД
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { initPool, query };