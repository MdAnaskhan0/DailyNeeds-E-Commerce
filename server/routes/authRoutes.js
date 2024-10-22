const express = require("express");
const router = express.Router();

// Import the controller
const {
  registerController,
  loginController,
  testcontroller,
  forgotPasswordController,
} = require("../controllers/authController");
//import middlware
const { requireSignin, isadmin } = require("../middleware/authMiddleware");
// Define the route

//register post method
router.post("/register", registerController);

//login method
router.post("/login", loginController);

router.get("/test", requireSignin, isadmin, testcontroller);

//protected  user auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route
router.get("/admin-auth", requireSignin, isadmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//forgot password

router.post("/forgot-password", forgotPasswordController);

module.exports = router;
//
