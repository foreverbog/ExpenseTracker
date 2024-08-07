const express = require("express");
const {
  loginUser,
  signupUser,
  getUser,
  editUser,
  deleteUser,
  getUserExpenses,
  getUserExpensesByType,
} = require("../controllers/userControllers");

const app = express.Router();

app.post("/signup", signupUser);
app.post("/login", loginUser);

app.get("/:id", getUser);

app.put("/:id", editUser);

app.delete("/:id", deleteUser);

app.get("/:id/expenses", getUserExpenses);
app.get("/:id/expenses/type", getUserExpensesByType);

module.exports = app;
