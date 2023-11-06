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
    // const saltRounds = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
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
    const userID = request.query.id;
    const updatedUser = await User.replaceOne({ _id: userID }, request.body);
    response.json({
      updatedCount: updatedUser.modifiedCount,
    });
  } catch (error) {
    response.status(400).json({ message: error });
  }
};
exports.deleteuser = async (request, response) => {
  try {
    const userId = request.query.id;
    if (!userId) {
      return response.status(400).json("please mention the user ID");
    }
    const deleteUser = await User.deleteOne({ _id: userId });
    response.json({ deletCount: deleteUser.deletedCount });
  } catch (error) {
    response.status(400).json({ message: error });
  }
};
