import axios from 'axios';
import Chatbot from '../models/chatbot.model.js'; // Make sure the path is correct

export const sendChatMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Call Ollama API for chatbot response
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral:latest',  // Ensure the correct model name
      prompt: message,
      stream: false,
    });

    // Extract the response from Ollama
    const botReply = response.data.response.trim();

    // Save the message and bot reply in the database
    const chatMessage = new Chatbot({
      message: message,
      response: botReply,
    });

    await chatMessage.save(); // Save the chat message to MongoDB

    // Respond with the bot's reply
    res.status(200).json({ success: true, reply: botReply });
  } catch (error) {
    console.error("Error in sendChatMessage:", error.message);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
};
