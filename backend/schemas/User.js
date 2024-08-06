const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

//Regex for text only
const isTextOnly = (str) => /^[a-zA-Z]+$/.test(str);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  currency: {
    type: String,
  },
});

userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  //check if email exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use!");
  }

  //check if all fields are filled in
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw Error("All fields must be filled in!");
  }

  //check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Invalid email address!");
  }

  //check first/last name lenght > 2
  if (firstName.length < 2) {
    throw Error("First name should contain at least two letters!");
  }
  if (lastName.length < 2) {
    throw Error("Last name should contain at least two letters!");
  }

  //check if first/last name are text only
  if (!isTextOnly(firstName)) {
    throw Error("First name should contain only letters!");
  }

  if (!isTextOnly(lastName)) {
    throw Error("Last name should contain only letters!");
  }

  //check if password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one uppercase, one lowercase, a number and a symbol!"
    );
  }

  //check if password matches confirmPassword
  if (password !== confirmPassword) {
    throw Error("Passwords do not match!");
  }

  //generate salt and hash the password
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //check if email or password are filled in
  if (!email || !password) {
    throw Error("All fields must be filled in!");
  }

  //check if the user exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email!");
  }

  //check if the password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
