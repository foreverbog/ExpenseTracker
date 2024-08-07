const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String, //*monthly/yearly//trip
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
