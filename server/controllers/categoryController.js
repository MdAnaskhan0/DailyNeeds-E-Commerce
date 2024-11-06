const categoryModel = require("../models/categoryModel");
// const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

//create category controller
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "name is required" });

    //check if category already there or not
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(200)
        .send({ success: true, message: "already present this category" });

    //save

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
    //error
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

//update category controller

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    console.log(id);

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update category",
      error,
    });
  }
};

//get all catagory

const getallCategoryController = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});

    res.status(200).send({
      success:true,
      message:"All category",
      allCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting getAllCategory",
    });
  }
};

//single catagories

const getSingleCategories=async(req,res)=>{

  try {
    
    const {slug} =req.params;
    const category =  await categoryModel.findOne({slug});
    res.status(200).send({

      success:true,
      message:"single category get successfully",
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({

      success:false,
      error,
      message:"Error while getting single category"
    })
  }
}


//delete category

const deleteCategoryController=async(req,res)=>{
try {
  
  const {id}=req.params;
  const category=await categoryModel.findByIdAndDelete(id)

  res.status(200).send({

    success:true,
    message:"category deleted successfully",
    category
  })
} catch (error) {
  console.log(error);
  res.status(500).send({

    success:false,
    message:"Error in delete category",
    error
    
  })
  
}

}
module.exports = {
  createCategoryController,
  updateCategoryController,
  getallCategoryController,
  getSingleCategories,
  deleteCategoryController
};
