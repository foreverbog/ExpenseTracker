const express = require("express");
const {
  createExpense,
  getOneExpense,
  editExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const app = express.Router();

//*Create Expense
app.post("/:id/expenses", createExpense);

//*Get one Expense
app.get("/:id/expenses/:expenseId", getOneExpense);

//*Edit Expense
app.put("/:id/expenses/:expenseId", editExpense);

//*Delete Expense
app.delete("/:id/expenses/:expenseId", deleteExpense);

module.exports = app;
