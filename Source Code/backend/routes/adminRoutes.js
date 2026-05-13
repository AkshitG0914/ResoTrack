const express = require("express");
const {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  createUser,
  deleteUser,
  getRevenueAnalytics,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard Overview
router.get("/dashboard", protect, authorize("admin", "resource_manager"), getDashboardStats);

// Requests / Orders
router.get("/orders", protect, authorize("admin", "resource_manager"), getAllOrders);

// User Management
router.get("/users", protect, authorize("admin", "resource_manager"), getAllUsers);
router.post("/users", protect, authorize("admin"), createUser);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

// Analytics
router.get("/revenue-analytics", protect, authorize("admin", "resource_manager"), getRevenueAnalytics);

module.exports = router;
