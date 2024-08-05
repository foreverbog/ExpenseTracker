const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `MongoDB connected to ${conn.connection.name.brightCyan.bold.underline}`
      .cyan
  );
};

module.exports = connectDB;
