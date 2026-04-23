const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@resotrack.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Employee User",
        email: "employee@resotrack.com",
        password: hashedPassword,
        role: "employee",
      },
      {
        name: "Resource Manager",
        email: "manager@resotrack.com",
        password: hashedPassword,
        role: "resource_manager",
      },
    ]);

    const adminId = users[0]._id;
    const employeeId = users[1]._id;

    const resources = await Product.insertMany([
      {
        name: "MacBook Pro 16\"",
        description: "High-performance laptop for development",
        stock: 5,
        category: "Hardware",
        createdBy: adminId,
      },
      {
        name: "Dell UltraSharp Monitor",
        description: "27-inch 4K monitor",
        stock: 12,
        category: "Hardware",
        createdBy: adminId,
      },
      {
        name: "Conference Room A",
        description: "Large meeting room with projector, seats 10",
        stock: 1, // Only 1 room
        category: "Space",
        createdBy: adminId,
      },
      {
        name: "Adobe Creative Cloud License",
        description: "Full suite license for 1 month",
        stock: 20,
        category: "Software",
        createdBy: adminId,
      },
      {
        name: "Company Car - Sedan",
        description: "Reserved for client visits",
        stock: 2,
        category: "Vehicle",
        createdBy: adminId,
      }
    ]);

    await Order.insertMany([
      {
        customer: employeeId,
        items: [
          {
            product: resources[0]._id,
            name: resources[0].name,
            quantity: 1,
            price: 2500, // Mock value
          }
        ],
        justification: "Need a high-performance laptop for compiling the new backend architecture.",
        orderStatus: "Approved",
        trackingId: "TRACK-1001"
      },
      {
        customer: employeeId,
        items: [
          {
            product: resources[3]._id,
            name: resources[3].name,
            quantity: 1,
            price: 80,
          }
        ],
        justification: "Required to design mockups for the new marketing campaign.",
        orderStatus: "Pending",
        trackingId: "TRACK-1002"
      },
      {
        customer: employeeId,
        items: [
          {
            product: resources[4]._id,
            name: resources[4].name,
            quantity: 1,
            price: 50,
          }
        ],
        justification: "I want to drive the car to a personal vacation this weekend.",
        orderStatus: "Rejected",
        trackingId: "TRACK-1003"
      }
    ]);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
