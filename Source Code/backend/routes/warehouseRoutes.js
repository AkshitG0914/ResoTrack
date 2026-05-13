const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getWarehouseStats ,
  getStockItems,
  updateStockQuantity,
  addWarehouse,
  getWarehouses
} = require("../controllers/warehouseController");

const router = express.Router();

// 📌 Add stock item (Restricted to warehouse managers & admins)
router.post("/",  addWarehouse);

// 📌 Get all stock items (More roles can access if needed)
router.get("/", getWarehouses);

// 📌 Update stock quantity (Restricted to warehouse managers & admins)

router.put("/:id", protect, authorize("resource_manager", "admin"), updateStockQuantity);

router.get("/stats", getWarehouseStats); 

module.exports = router;
