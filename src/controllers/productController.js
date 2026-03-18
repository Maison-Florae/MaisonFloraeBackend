import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, inStock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      inStock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};
