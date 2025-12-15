module.exports = {
  PORT: process.env.PORT || 3000,
  IMAGE_BASE: 'http://localhost:3000/images/',
  DB_CONFIG: {
    host: 'MySQL-8.0',
    user: 'root',
    password: '',
    database: 'tonik',
    port: 3306,
  },
};