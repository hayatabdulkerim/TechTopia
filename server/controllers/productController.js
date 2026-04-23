const mongoose = require("mongoose");
const Product = require("../models/productModel");

// get all products

const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products);
};

//get a single product

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

// create a product

const createProduct = async (req, res) => {
  const { name, category, description, price, stock, imageLink } = req.body;

  // handling empty fields

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!stock) {
    emptyFields.push("stock");
  }
  if (!imageLink) {
    emptyFields.push("imageLink");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const product = await Product.create({
      name,
      category,
      description,
      price,
      stock,
      imageLink,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete product 


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};


// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const product = await Product.findOneAndUpdate({ _id: id }, {
    ...req.body  // destructure it into the new onject
  });            // takes two parameters the id and the updates we wanna make 
  
  if (!product) {
    return res.status(404).json({ error: "No such product " });
  }
  res.status(200).json(product);
};



module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};