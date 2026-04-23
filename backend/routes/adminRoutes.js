const express = require("express");
const { getDashboardStats, getAllOrders, getAllUsers, getRevenueAnalytics } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Dashboard Overview
router.get("/dashboard", protect, authorize("admin", "resource_manager"), getDashboardStats);

// Fetch All Orders
router.get("/orders", protect, authorize("admin", "resource_manager"), getAllOrders);

// Fetch All Users
router.get("/users", protect, authorize("admin", "resource_manager"), getAllUsers);

router.get("/revenue-analytics", protect, authorize("admin", "resource_manager"), getRevenueAnalytics);

module.exports = router;
