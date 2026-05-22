import Order from "../models/order.js";

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to fetch orders",
    });
  }
};

// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to fetch order",
    });
  }
};

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      deliveryAddress,
      items,
      totalPrice,
      status,
      paymentStatus,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !deliveryAddress ||
      !items?.length ||
      totalPrice === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (customerName.trim().length < 2) {
      return res.status(400).json({
        message: "Customer name is too short",
      });
    }

    if (deliveryAddress.trim().length < 5) {
      return res.status(400).json({
        message: "Delivery address is too short",
      });
    }

    if (totalPrice < 0) {
      return res.status(400).json({
        message: "Total price cannot be negative",
      });
    }

    const invalidQuantity = items.some(
      (item) => !item.quantity || item.quantity < 1,
    );

    if (invalidQuantity) {
      return res.status(400).json({
        message: "Item quantity must be at least 1",
      });
    }

    const invalidPrice = items.some((item) => {
      return item.price === undefined || item.price === null || item.price < 0;
    });

    if (invalidPrice) {
      return res.status(400).json({
        message: "Item price cannot be negative",
      });
    }

    const newOrder = await Order.create({
      customerName,
      customerEmail,
      deliveryAddress,
      items,
      totalPrice,
      status,
      paymentStatus,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to create order",
    });
  }
};

// UPDATE ORDER
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to update order",
    });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to delete order",
    });
  }
};
