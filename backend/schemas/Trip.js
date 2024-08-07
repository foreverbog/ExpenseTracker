const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roundTrip: {
    type: Boolean,
    reqiured: true,
  },
  roundTripCost: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

module.exports = mongoose.model("Trip", tripSchema);
