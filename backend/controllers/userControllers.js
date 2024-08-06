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

    res.status(200).json({ email, token });
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
    const findUser = await User.findById(id).select("-password");
    // .populate("expenses")
    // .populate("trips");
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
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
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

module.exports = {
  signupUser,
  loginUser,
  getUser,
  editUser,
};
