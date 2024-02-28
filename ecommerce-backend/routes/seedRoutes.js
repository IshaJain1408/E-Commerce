
import express from 'express';
import Product from '../models/productModel.js'; 
import data from '../data.js';
import User from '../models/userModel.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    //   await Product.remove({});


    // Insert new seed data
    const insertedProducts = await Product.insertMany(data.products);
    await User.deleteMany({});
    //   await User.remove({});
  const createdUsers = await User.insertMany(data.users);
    res.send({ message: 'Seed data inserted successfully', products: insertedProducts,users:createdUsers });
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default seedRouter;
