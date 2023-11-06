const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

//ignore character and locale to validate the name
const locale = "en-US";
const options = [" "];

// Creating a model with all the required fields in the DB. (Basically like a Schema)
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    validate: [
      {
        validator: (value) => {
          const length = value.length;
          return length < 20 && length > 1;
        },
        message: "Name Should be between 1 and 20 Characters",
      },
      {
        validator: (value) => {
          return /^[a-zA-Z\s]*$/.test(value);
        },
        message: "Name should only contain Alphabets",
      },
    ],
  },
  emailId: {
    type: String,
    validate: [
      {
        validator: (value) => {
          return (
            validator.isEmail(value) && value.endsWith("@northeastern.edu")
          );
        },
        message: "Only Northeastern mail id accepted",
      },
    ],
  },
  password: {
    type: String,
    required: true,
    validate: [
      {
        validator: (value) => {
          return value.length < 10 && value.length > 1;
        },
        message: "Password should be less than 10 Characters",
      },
      {
        validator: (value) => {
          return /[A-Z]/.test(value);
        },
        message: "Password should contain at least one UpperCase Alphabet",
      },
      {
        validator: (value) => {
          return /\d/.test(value);
        },
        message: "Password should contain at least one digit",
      },
      {
        validator: (value) => {
          return /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])/.test(value);
        },
        message: "Password should contain at least one Special Character",
      },
    ],
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
