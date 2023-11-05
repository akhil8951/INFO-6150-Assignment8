const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

//Defining routes for "users" resources
router.get("/user/getAll", userController.getAllUsers);
router.post("/user/create", userController.postUser);
router.put("/user/edit", userController.updateUser);
router.delete("/user/delete", userController.deleteuser);

//export routes
module.exports = router;
