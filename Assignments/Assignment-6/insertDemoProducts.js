// Script to insert demo products into MongoDB Atlas
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const demoProducts = [
  {
    name: "Classic Denim Jacket",
    price: 1299,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    category: "Jackets",
    description: "A timeless denim jacket for all seasons."
  },
  {
    name: "Summer Floral Dress",
    price: 999,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Dresses",
    description: "Light and breezy floral dress for summer."
  },
  {
    name: "Trendy Sneakers",
    price: 1599,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    category: "Shoes",
    description: "Comfortable and stylish sneakers for everyday wear."
  }
];

async function insertProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(demoProducts);
    console.log("Demo products inserted!");
    process.exit(0);
  } catch (err) {
    console.error("Error inserting products:", err);
    process.exit(1);
  }
}

insertProducts();
