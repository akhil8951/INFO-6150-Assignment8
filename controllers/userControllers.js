const User = require("../models/userModels");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};
exports.postUser = async (request, response) => {
  try {
    const { fullName, emailId, password, gender } = await request.body;
    const newUser = new User({
      fullName,
      emailId,
      password,
      gender,
    });
    await newUser.save();
    response.status(200).json({ message: "Successful" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
exports.updateUser = async (request, response) => {
  try {
    const userEmailId = request.query.emailId;

    const { fullName, password } = request.body;
    const user = await User.findOne({ emailId: userEmailId });

    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    user.fullName = fullName;
    user.password = password;

    await user.save();

    response.json({
      message: "user updated succefully",
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
exports.deleteuser = async (request, response) => {
  try {
    const userEmailId = request.query.emailId;
    if (!userEmailId) {
      return response.status(400).json({ message: "user not found" });
    }
    const deleteUser = await User.deleteOne({ emailId: userEmailId });
    response.json({
      deletCount: deleteUser.deletedCount,
      message: "Deleted Successfully",
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
