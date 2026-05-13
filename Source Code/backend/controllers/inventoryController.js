const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// 🚀 Add New Resource
const addProduct = asyncHandler(async (req, res) => {
  const { name, stock, category, description } = req.body;

  if (!name || !stock || !category) {
    res.status(400);
    throw new Error("Name, stock, and category are required.");
  }

  const product = new Product({
    name,
    description,
    category,
    stock,
    createdBy: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


const getInventory = asyncHandler(async (req, res) => {
  const inventory = await Product.find(); // Fetch all products from DB
  res.status(200).json(inventory);
});

// 📌 Update Resource in Inventory
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, stock, category, description } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Resource not found");
  }

  product.name = name || product.name;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.description = description || product.description;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// 🚀 Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Missing product ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
});

module.exports = { getInventory,addProduct, updateProduct, deleteProduct };
