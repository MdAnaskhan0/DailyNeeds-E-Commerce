// Define the controller
const { hashpassword, comparepassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
require("dotenv").config();

const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    //validation
    if (!name) return res.send({ error: "name is required " });
    if (!email) return res.send({ error: "email is required " });
    if (!password) return res.send({ error: "password is required " });
    if (!address) return res.send({ error: "address is required " });
    if (!phone) return res.send({ error: "phone is required" });

    //check existing user
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Already exists please login ",
      });
    }

    //register user
    const hashedpassword = await hashpassword(password);

    //for save
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedpassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (e) {
    console.log("register controller error", e);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      e,
    });
  }
};

//login controller

const loginController = async = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //matching username and password
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid Password",
      });
    }

    //token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: "3d" }
    );

    //after match and create token return respond
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in login",
    });
  }
};

// Export the controller
module.exports = {registerController,loginController};

