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
