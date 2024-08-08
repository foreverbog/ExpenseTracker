const express = require("express");
const {
  loginUser,
  signupUser,
  getUser,
  editUser,
  deleteUser,

  getUserExpensesSort,
} = require("../controllers/userControllers");

const app = express.Router();

app.post("/signup", signupUser);
app.post("/login", loginUser);

app.get("/:id", getUser);

app.put("/:id", editUser);

app.delete("/:id", deleteUser);

app.get("/:id/expenses", getUserExpensesSort);

module.exports = app;
