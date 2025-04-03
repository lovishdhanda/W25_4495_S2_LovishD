import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import chatbotRouter from './routes/chatbot.route.js'; // Make sure this import is correct

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();

// CORS setup to allow requests from your frontend (localhost:5173)
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Enable CORS with specific options

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cookieParser()); // Parse cookies in the request

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/chatbot', chatbotRouter); // Chatbot route for handling /send and /history

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace for easier debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log("Ollama is running: 'ollama serve'"); // Reminder for Ollama service
});
