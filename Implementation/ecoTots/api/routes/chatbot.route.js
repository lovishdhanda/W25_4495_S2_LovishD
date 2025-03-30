import express from 'express';
import { sendChatMessage } from '../controllers/chatbot.controller.js'; // Ensure this path is correct
import ChatbotResponse from '../models/chatbot.model.js'; // Import the chatbot model

const router = express.Router();

// Handle POST request for sending chat messages
router.post('/send', sendChatMessage);

// Example of an additional route for retrieving previous chat history
router.get('/history', async (req, res) => {
  try {
    const chatHistory = await ChatbotResponse.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ success: true, history: chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
