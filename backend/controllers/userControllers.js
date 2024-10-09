const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

//* create token function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

//* User Signup
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });

    console.log(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* get user
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await User.findById(id)
      .select("-password")
      .populate("expenses")
      .populate("trips");
    if (!findUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json(findUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* edit user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    //Validate names
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "First and last name are required!" });
    }

    //Check length
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({
        error: "First and last name should contain atleast 2 letters!",
      });
    }

    //Check to be only text
    if (!/^[a-zA-Z\s-]+$/.test(firstName) || !/^[a-zA-Z\s-]+$/.test(lastName)) {
      return res
        .status(400)
        .json({ error: "First and last name should containt only letters!" });
    }

    const udpatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
      },
      { new: true }
    );

    if (!udpatedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(202).json({ udpatedUser, message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    res
      .status(200)
      .json({ deletedUser, message: "User deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* get user expense, sort by type,date,value,year,month
//? queries:
//? type= monthly || yearly
//? sortBy = date || value
//? order = asc || desc
//? year = NUMBER , month=NUMBER
const getUserExpensesSort = async (req, res) => {
  const { id } = req.params;
  const { sortBy = "date", order = "desc", month, year, type } = req.query;

  try {
    // Validation for sortBy, order, and type
    if (!["date", "value"].includes(sortBy)) {
      return res
        .status(400)
        .json({ error: "Invalid sort field. Use 'date' or 'value'." });
    }

    if (!["asc", "desc"].includes(order)) {
      return res
        .status(400)
        .json({ error: "Invalid sort order. Use 'asc' or 'desc'." });
    }

    // Allow type to be "monthly", "yearly",  or an empty string (normal)
    if (type && !["monthly", "yearly", ""].includes(type)) {
      return res.status(400).json({
        error:
          "Invalid type. Use 'monthly', 'yearly', or empty string for normal.",
      });
    }

    if (year && isNaN(year)) {
      return res
        .status(400)
        .json({ error: "Invalid year. Provide a valid year." });
    }

    if (month && (isNaN(month) || month < 1 || month > 12)) {
      return res
        .status(400)
        .json({ error: "Invalid month. Provide a month between 1 and 12." });
    }

    // Dynamic filtering
    const filter = {};

    if (type !== undefined) {
      // Check if type is explicitly provided (including empty string "")
      filter.type = type;
    }

    if (year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filter.date = { $gte: startDate, $lte: endDate }; // Filter by month and year range
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      filter.date = { $gte: startDate, $lte: endDate }; // Filter by year only
    }

    // Find user and populate expenses based on the filter
    const user = await User.findById(id).populate({
      path: "expenses",
      match: filter, // Apply the dynamically built filter
      options: {
        sort: { [sortBy]: order === "asc" ? 1 : -1 },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json(user.expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  editUser,
  deleteUser,

  getUserExpensesSort,
};
