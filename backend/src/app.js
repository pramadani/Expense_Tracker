const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

const retryDelay = 5000;

const connectToDatabase = () => {
  return sequelize.sync()
    .then(() => {
      console.log('Database connection established.');
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error);
      setTimeout(connectToDatabase, retryDelay);
    });
};

connectToDatabase();