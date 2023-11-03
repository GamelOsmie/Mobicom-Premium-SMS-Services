const { Sequelize } = require('sequelize');
const path = require('path');

// const dev_db = new Sequelize({
//   dialect: 'sqlite',
//   storage: path.join(__dirname, '..', 'db.sqlite'),
// });
// const prod_db = new Sequelize('postgres://user:pass@example.com:5432/dbname'); // Example for postgres

// const sequelize = process.env.NODE_ENV === 'production' ? prod_db : dev_db

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite'),
});

module.exports = sequelize;
