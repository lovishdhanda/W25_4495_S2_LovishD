import express from 'express';
import { sendChatMessage } from '../controllers/chatbot.controller.js'; // Ensure this path is correct

const router = express.Router();

// Handle POST request for sending chat messages
router.post('/send', sendChatMessage);

export default router;
