const express = require("express");
const router = express.Router();
const { requireSignin, isadmin } = require("../middleware/authMiddleware");
const {
  createProductController,
  upload,
  getProductController,
  getSingleProduct,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productlistController,
} = require("../controllers/productController");

//routes

//create product route
router.post(
  "/create-product",
  requireSignin,
  isadmin,
  upload.single("photo"),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignin,
  isadmin,
  upload.single("photo"),
  updateProductController
);

//get product route
router.get("/get-product", getProductController);

//single product

router.get("/single-product/:slug", getSingleProduct);

//get photo

router.get("/product-photo/:pid", productPhotoController);

//delete product

//filters

router.post("/product-filters", productFilterController);

//product count

router.get("/product-count", productCountController);

//product count by page wise

router.get("/product-list/:page", productlistController);

// delete product
router.delete(
  "/product-delete/:pid",
  requireSignin,
  isadmin,
  deleteProductController
);
module.exports = router;
