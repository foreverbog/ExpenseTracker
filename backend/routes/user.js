const express = require("express");
const { loginUser, signupUser } = require("../controllers/userControllers");

const app = express.Router();

app.post("/signup", signupUser);
app.post("/login", loginUser);

module.exports = app;
