const express = require("express");
const {
  createExpense,
  editExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const app = express.Router();

//*Create trip
app.post("/:id/expenses", createExpense);

//*Edit trip
app.put("/:id/expenses/:expenseId", editExpense);

//*Delete trip
app.delete("/:id/expenses/:expenseId", deleteExpense);

module.exports = app;
