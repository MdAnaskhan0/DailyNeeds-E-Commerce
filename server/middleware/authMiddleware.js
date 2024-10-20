const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

//protected routes token based

const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRECT_KEY
    );
    req.user = decode; // eta korle _id pai amra
    console.log(req.user)
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin middleware

const isadmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin Middleware",
    });
  }
};

module.exports = {
  requireSignin,
  isadmin,
};
