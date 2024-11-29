const express = require("express");
const {
  createTrip,
  getOneTrip,
  editTrip,
  deleteTrip,
  createTripExpense,
} = require("../controllers/tripController");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();

app.use(requireAuth);
//*Create Trip
app.post("/:id/trips", createTrip);

//*Create Trip Expense
app.post("/:id/trips/:tripId", createTripExpense);

//*Get one Trip
app.get("/:id/trips/:tripId", getOneTrip);

//*Edit Trip
app.put("/:id/trips/:tripId", editTrip);

//*Delete trip
app.delete("/:id/trips/:tripId", deleteTrip);

module.exports = app;
