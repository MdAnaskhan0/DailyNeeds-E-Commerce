const express = require("express");
const router = express.Router();

// Import the controller
const {
  registerController,
  loginController,
  testcontroller,
} = require("../controllers/authController");
//import middlware
const {requireSignin,isadmin}=require("../middleware/authMiddleware")
// Define the route

//register post method
router.post("/register", registerController);

//login method
router.post("/login", loginController);

router.get("/test",requireSignin,isadmin,testcontroller)
module.exports = router;
