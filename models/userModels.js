const mongoose = require("mongoose");

// Creating a model with all the required fields in the DB. (Basically like a Schema)
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
  },
  passWord: {
    type: String,
    // required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
