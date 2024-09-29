const express = require("express");
const router = express.Router();

// Import the controller
const registerController = require("../controllers/authController");

// Define the route
router.post("/register", registerController);

module.exports = router;
