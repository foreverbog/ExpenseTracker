const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
});

userSchema.statics.signup = async function (email, password, confirmPassword) {
  //check if email exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use!");
  }

  //check if all fields are filled in
  if (!email || !password) {
    throw Error("All fields must be filled in!");
  }

  //check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Invalid email address!");
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
  const user = await this.create({ email, password: hash });

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
