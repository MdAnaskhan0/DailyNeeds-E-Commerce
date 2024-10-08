const express = require("express");
const router = express.Router();

// Import the controller
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// Define the route

//register post method
router.post("/register", registerController);

//login method
router.post("/login", loginController);
module.exports = router;
