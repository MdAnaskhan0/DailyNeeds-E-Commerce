// Define the controller
const { hashpassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
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

// Export the controller
module.exports = registerController;
