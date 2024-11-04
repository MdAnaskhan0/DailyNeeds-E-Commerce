const express = require("express");
const { requireSignin, isadmin } = require("../middleware/authMiddleware");
const {createCatagoryController,updateCatagoryController, getallCatagoryController, getSingleCatagories, deleteCatagoryController} = require("../controllers/catagoryController");
const router = express.Router();

//post method
router.post(
  "/create-catagory",
  requireSignin,
  isadmin,
  createCatagoryController
);
router.put("/update-catagory/:id",requireSignin,isadmin,updateCatagoryController);

//get all catagory

router.get("/get-catagory",getallCatagoryController)

//single catagory
router.get("/single-catagory/:slug",getSingleCatagories);


//delete catagory

router.delete("/delete-catagory/:id",requireSignin,isadmin,deleteCatagoryController);
module.exports = router;
