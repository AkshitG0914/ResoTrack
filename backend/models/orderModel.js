const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    justification: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Returned", "Cancelled"], 
      default: "Pending",
    },
    trackingId: {
      type: String,
      unique: true,
      required: true, 
    },
    qrCode: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
