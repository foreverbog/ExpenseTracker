const Expense = require("../schemas/Expense");
const Trip = require("../schemas/Trip");
const User = require("../schemas/User");

//*create expense
const createExpense = async (req, res) => {
  const { icon, name, date, value, type } = req.body;
  const { id } = req.params;

  try {
    const expense = await Expense.create({
      owner: id,
      icon,
      name,
      date,
      value,
      type,
    });

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: { expenses: expense._id },
      },
      { new: true }
    );

    if (!user) {
      await Expense.findByIdAndDelete(expense._id);
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(201).json({ expense, user });
    // console.log(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Get only 1 expense
const getOneExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* Edit expense
const editExpense = async (req, res) => {
  const { icon, name, date, value, type } = req.body;
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        icon,
        name,
        date,
        value,
        type,
      },
      { new: true }
    );
    if (!expense) {
      return res.status(404).json({ error: "Expense not found!" });
    }
    res.status(200).json({ expense, message: "Updated successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Delete expense
const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found!" });
    }

    res
      .status(200)
      .json({ deletedExpense, message: "Expense was deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExpense,
  getOneExpense,
  editExpense,
  deleteExpense,
};
