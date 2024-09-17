const express = require('express');
const jwt = require('jsonwebtoken');
const Expense = require('../models/expense');
const router = express.Router();

const TOKEN_KEY = process.env.TOKEN_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, TOKEN_KEY, (err, user) => {
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
