import express from 'express';
import { sendChatMessage } from '../controllers/chatbot.controller.js'; // Ensure correct path
import Chatbot from '../models/chatbot.model.js'; // Import the Chatbot model

const router = express.Router();

// Handle POST request for sending chat messages
router.post('/send', sendChatMessage);

// Example of an additional route for retrieving previous chat history
router.get('/history', async (req, res) => {
  try {
    const chatHistory = await Chatbot.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ success: true, history: chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
