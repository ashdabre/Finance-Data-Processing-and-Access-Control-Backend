const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/summary", auth, (req, res) => {
  const income = db.prepare(`SELECT SUM(amount) AS total FROM records WHERE type='income'`).get();
  const expense = db.prepare(`SELECT SUM(amount) AS total FROM records WHERE type='expense'`).get();

  res.json({
    totalIncome: income.total || 0,
    totalExpense: expense.total || 0,
    netBalance: (income.total || 0) - (expense.total || 0)
  });
});

module.exports = router;