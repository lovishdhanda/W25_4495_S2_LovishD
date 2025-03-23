import express from 'express';
import { sendChatMessage } from '../controllers/chatbot.controller.js';  // Ensure the path is correct

const router = express.Router();

// Route to handle the chatbot message sending
router.post('/send', sendChatMessage);

export default router;
