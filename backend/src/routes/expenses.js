const express = require('express');
const jwt = require('jsonwebtoken');
const Expense = require('../models/expense');
const User = require('../models/user');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/expenses', authenticateToken, async (req, res) => {
  const { amount, description } = req.body;
  try {
    const expense = await Expense.create({
      amount,
      description,
      userId: req.user.id
    });
    res.status(201).json({ id: expense.id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/expenses', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
