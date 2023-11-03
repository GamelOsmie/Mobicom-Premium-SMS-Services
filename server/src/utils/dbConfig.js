const { Sequelize } = require('sequelize');
const path = require('path');

// const dev_db = new Sequelize({
//   dialect: 'sqlite',
//   storage: path.join(__dirname, '..', 'db.sqlite'),
// });
// const prod_db = new Sequelize('postgres://user:pass@example.com:5432/dbname'); // Example for postgres

// const sequelize = process.env.NODE_ENV === 'production' ? prod_db : dev_db

const dev_db = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite'),
});

const prod_db = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  ssl: true, // Enable SSL
  dialectOptions: {
    ssl: {
      require: true, // Force SSL
    },
  },
});
const sequelize = process.env.NODE_ENV == 'development' ? dev_db : prod_db;

module.exports = sequelize;
