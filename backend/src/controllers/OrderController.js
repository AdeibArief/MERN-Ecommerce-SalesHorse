import Order from "../models/model.order.js";

export const orders = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items found" });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Create order error", error);
    res.status(500).json({
      success: false,
      message: "failed to create order",
      error: error,
    });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "name image");

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.log("Get order errors", error);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name image");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (order.user._id.toString() !== req.user._id.toString()) {
    return res.status(404).json({
      success: false,
      message: "Not authorized",
    });
  }

  res.json({ sucess: true, data: order });
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "Not authorized to cancel" });
    }

    if (order.orderStatus !== "Pending" && order.orderStatus !== "Processing") {
      return res.status(404).json({
        success: false,
        message: "cannot cancel order that is already delivered",
      });
    }

    order.orderStatus = "Cancelled";

    const updatedOrder = await order.save();
    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};
