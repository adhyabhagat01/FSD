import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Local MongoDB');
  } catch (error) {
    console.log('Local MongoDB failed, using In-Memory Database for demonstration.');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to In-Memory MongoDB');
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

connectDB();
