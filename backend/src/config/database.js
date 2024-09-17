const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'yourpassword', {
  host: 'mysql',
  dialect: 'mysql',
});

module.exports = sequelize;
