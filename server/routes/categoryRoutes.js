const express = require("express");
const { requireSignin, isadmin } = require("../middleware/authMiddleware");
const {createCategoryController,
  updateCategoryController,
  getallCategoryController,
  getSingleCategories,
  deleteCategoryController} = require("../controllers/categoryController");
const router = express.Router();

//post method
router.post(
  "/create-category",
  requireSignin,
  isadmin,
  createCategoryController
);
router.put("/update-category/:id",requireSignin,isadmin,updateCategoryController);

//get all category

router.get("/get-category",getallCategoryController)

//single category
router.get("/single-category/:slug",getSingleCategories);


//delete category

router.delete("/delete-category/:id",requireSignin,isadmin,deleteCategoryController);
module.exports = router;
