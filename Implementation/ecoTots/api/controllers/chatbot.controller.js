import axios from 'axios';

export const sendChatMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Call Ollama API
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral:latest',  // Use the model available (from curl)
      prompt: message,
      stream: false,
    });

    // Extract the response from Ollama
    const botReply = response.data.response.trim();

    res.status(200).json({ success: true, reply: botReply });
  } catch (error) {
    console.error("Error in sendChatMessage:", error.message);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
};
