const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");
const user = require("./routes/user");
const expense = require("./routes/expense");
const trip = require("./routes/trip");

//*middlewares
const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker API");
});

//*Routes:
app.use("/", user);
app.use("/", expense);
app.use("/", trip);

app.listen(PORT, () => {
  const boldUrl = `http://localhost:${PORT}`.bold.underline;
  console.log(`Server is listening to ${boldUrl}`.yellow);
});
