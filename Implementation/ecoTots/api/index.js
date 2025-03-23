import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import chatbotRouter from './routes/chatbot.route.js'; 
import cors from 'cors';

dotenv.config();

console.log(process.env.OPENAI_API_KEY); 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // To parse cookies in the request

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/chatbot', chatbotRouter);  // Use the chatbot route

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
