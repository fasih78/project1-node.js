const ProductModel = require("./product_cartmodel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config();
const moment = require('moment')
const upload = require("../../middleware/multer_auth");

cloudinary.config({
  cloud_name: process.env.AUTH_CLOUD_NAME,
  api_key: process.env.AUTH_API_KEY,
  api_secret: process.env.AUTH_API_SECRET,
  cloudinary_url: process.env.AUTH_CLOUD_URL,
});

 const uploads = upload.single("file");

const product = async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      if (err) {
        console.log(err, "err");
        return res.status(500).send({
          message: "Only Supported Image Files Are Allowed!",
          success: false,
        });
      }

      if (req.file == undefined) {
        return res.status(400).send({ message: "Please Upload A File!" });
      }

      const { name, price } = req.body;
      console.log(req.body.name);
      const { path } = req.file; // Fix: Use req.file instead of req.image

      const data = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      const cloudinaryUrl = data.secure_url;
      const publicIdRegex = /\/v\d+\/([^/]+)_(\w+)(?:\.\w+)?/;
      const matches = cloudinaryUrl.match(publicIdRegex);

      if (matches && matches[1] && matches[2]) {
        const publicId = `${matches[1]}_${matches[2]}`;
        let query = data.secure_url;
        const image = new ProductModel({
          cloudinary_url: query,
          public_id: publicId,
          name,
          price,
          filePath: path,
          Date: moment(new Date()).format("YYYY-MM-DD"),
        });
        await image.save();
        console.log("Public ID:", publicId);
      } else {
        console.log("Public ID not found in the URL.");
      }

      res.status(200).send({
        message: "Product created && product  image  Uploaded Successfully!",
        success: true,
      });
    })
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


const Product_find = async(req,res)=>{
    try {
        const find = await ProductModel.find();
        return res.status(200).send({data:find});

    } catch (err) {
        res.status(500).send({ error: err.message });

    }
}

const Product_findById =  async(req,res)=>{
    try {
        
const id = req.params.id
const findbyid = await ProductModel.findById({id}).exec()

return res.status(200).send({data:findbyid})

    } catch (err) {
        res.status(500).send({ error: err.message });

    }
}

const Product_deletebyid = async(req,res)=>{

    try {
        const id = req.params.id
        const findbyid = await ProductModel.findByIdAndDelete({id})
        return res.status(200).send({data:findbyid})
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}


const Product_deleteall = async(req,res)=>{
    try {
        
        const deleteall = await ProductModel.deleteMany({}).exec()
        return res.status(200).send({data:deleteall})
    } catch (err) 
    {
        res.status(500).send({ error: err.message });
    }
}




module.exports = product;
