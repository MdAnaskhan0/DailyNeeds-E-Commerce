const catagoryModel = require("../models/catagoryModel");
const slugify = require("slugify");

//create catagory controller
const createCatagoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "name is required" });

    //check if catagory already there or not
    const existingCatagory = await catagoryModel.findOne({ name });
    if (existingCatagory)
      return res
        .status(200)
        .send({ success: true, message: "already present this catagory" });

    //save

    const catagory = await new catagoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "new catagory created",
      catagory,
    });
    //error
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: "error in catagory",
    });
  }
};

//update catagory controller

const updateCatagoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    console.log(id);

    const catagory = await catagoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "catagory updated successfully",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update catagory",
      error,
    });
  }
};

//get all catagory

const getallCatagoryController = async (req, res) => {
  try {
    const allcatagory = await catagoryModel.find({});

    res.status(200).send({
      success:true,
      message:"All catagory",
      allcatagory
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting getallcatagory",
    });
  }
};

//single catagories

const getSingleCatagories=async(req,res)=>{

  try {
    
    const {slug} =req.params;
    const catagory =  await catagoryModel.findOne({slug});
    res.status(200).send({

      success:true,
      message:"single catagory get successfully",
      catagory
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({

      success:false,
      error,
      message:"Error while getting single catagory"
    })
  }
}


//delete catagory

const deleteCatagoryController=async(req,res)=>{
try {
  
  const {id}=req.params;
  const catagory=await catagoryModel.findByIdAndDelete(id)

  res.status(200).send({

    success:true,
    message:"catagory deleted successfully",
    catagory
  })
} catch (error) {
  console.log(error);
  res.status(500).send({

    success:false,
    message:"Error in delete catagory",
    error
    
  })
  
}

}
module.exports = {
  createCatagoryController,
  updateCatagoryController,
  getallCatagoryController,
  getSingleCatagories,
  deleteCatagoryController
};
