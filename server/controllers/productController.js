const slugify = require("slugify");
const fs = require("node:fs");
const productModel = require("../models/productModel");

const multer = require("multer");

//configure multer

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
});

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;
    const photo = req.file;

    //validation

    let validationMessage = "";

    switch (true) {
      case !name:
        validationMessage = "Name is required";
        break;

      case !description:
        validationMessage = "Description is required";
        break;
      case !price:
        validationMessage = "Price is required";
        break;
      case isNaN(price):
        validationMessage = "Price must be a number";
        break;
      case !category:
        validationMessage = "Category is required";
        break;
      case !quantity:
        validationMessage = "Quantity is required";
        break;
      case isNaN(quantity):
        validationMessage = "Quantity must be a number";
        break;
      case shipping === undefined:
        validationMessage = "Shipping information is required";
        break;
      case photo && photo.size > 1000000: // Assuming 1MB size limit
        validationMessage = "Photo size should be less than 1MB";
        break;
    }

    if (validationMessage) {
      return res
        .status(400)
        .send({ success: false, message: validationMessage });
    }

    //save product
    const products = new productModel({ ...req.body, slug: slugify(name) });

    if (photo) {
      products.photo.data = photo.buffer;
      products.photo.contentType = photo.mimetype;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "error in product create",
      error,
    });
  }
};

//get product controller

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order. Use 1 for ascending.
      .limit(10); // photo field excluded hoye jabe

    res.status(200).send({
      success: true,
      message: " all product get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get product",
      error: error.message,
    });
  }
};

//get single product

const getSingleProduct = async (req, res) => {
  try {
    const singleproduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!singleproduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single product fetched successfully",
      singleproduct, // Return singleproduct field
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching single product",
      error: error.message,
    });
  }
};

//photo get controller

const productPhotoController = async (req, res) => {
  try {
    const productPhoto = await productModel
      .findById(req.params.pid)
      .select("photo");

    if (productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in photo",
      error: error.message,
    });
  }
};

//delete product

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete product",
      error: error.message,
    });
  }
};

// update product controller
const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;
    const photo = req.file;

    //validation

    let validationMessage = "";

    switch (true) {
      case !name:
        validationMessage = "Name is required";
        break;

      case !description:
        validationMessage = "Description is required";
        break;
      case !price:
        validationMessage = "Price is required";
        break;
      case isNaN(price):
        validationMessage = "Price must be a number";
        break;
      case !category:
        validationMessage = "Category is required";
        break;
      case !quantity:
        validationMessage = "Quantity is required";
        break;
      case isNaN(quantity):
        validationMessage = "Quantity must be a number";
        break;
      case shipping === undefined:
        validationMessage = "Shipping information is required";
        break;
      case photo && photo.size > 1000000: // Assuming 1MB size limit
        validationMessage = "Photo size should be less than 1MB";
        break;
    }

    if (validationMessage) {
      return res
        .status(400)
        .send({ success: false, message: validationMessage });
    }

    //save product
    const products = await productModel.findByIdAndUpdate(req.params.pid, {
      ...req.body,
      slug: slugify(name),
    }, { new: true });

    if (photo) {
      products.photo.data = photo.buffer;
      products.photo.contentType = photo.mimetype;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "error in product update",
      error,
    });
  }
};



module.exports = {
  createProductController,
  upload,
  getProductController,
  getSingleProduct,
  productPhotoController,
  deleteProductController,
  updateProductController,
};
