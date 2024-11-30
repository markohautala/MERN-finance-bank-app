import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {  // when we receive a GET request for /products
  try {
    const products = await Product.find();  // get all products from the database
    res.status(200).json(products);  // send the products as a response
  } catch (error) {  // if an error occurs
    res.status(404).json({ message: error.message });  // send the error message as a response
  }
});


export default router;