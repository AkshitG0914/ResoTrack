const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/User");
const Product = require("../models/productModel");
const bcrypt = require("bcryptjs");

const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments() || 0;

    const revenueResult = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: null, totalRevenue: { $sum: "$items.quantity" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const totalUsers = await User.countDocuments() || 0;

    const stockResult = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } }
    ]);
    const totalStock = stockResult.length > 0 ? stockResult[0].totalStock : 0;

    res.json({
      orders: totalOrders,
      revenue: totalRevenue,
      users: totalUsers,
      stock: totalStock,
    });

  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
});

// 📌 Fetch All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("customer", "name email")
    .populate("items.product", "name");
  res.json(orders);
});

// 📌 Fetch All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 📌 Admin Create User (with default password "password123")
const createUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    res.status(400);
    throw new Error("Name, email and role are required.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);

  const user = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    message: "User created. Temporary credentials generated for onboarding.",
  });
});

// 📌 Admin Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User deleted successfully", userId: req.params.id });
});

const getRevenueAnalytics = asyncHandler(async (req, res) => {
  try {
    const revenueByMonth = await Order.aggregate([
      { $match: { orderStatus: { $in: ["Delivered", "Approved"] } } },
      { $unwind: "$items" },
      { $group: { _id: { $month: "$createdAt" }, totalRevenue: { $sum: "$items.quantity" } } },
      { $sort: { _id: 1 } }
    ]);

    const formattedData = Array.from({ length: 12 }, (_, index) => {
      const monthData = revenueByMonth.find((data) => data._id === index + 1);
      return {
        month: new Date(2024, index, 1).toLocaleString("en-US", { month: "short" }),
        revenue: monthData ? monthData.totalRevenue : 0
      };
    });

    res.json(formattedData);
  } catch (error) {
    console.error("❌ Error fetching revenue analytics:", error);
    res.status(500).json({ message: "Error fetching revenue analytics" });
  }
});

module.exports = {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  createUser,
  deleteUser,
  getRevenueAnalytics,
};
