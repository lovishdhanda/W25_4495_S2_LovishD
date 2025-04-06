import Chatbot from '../models/chatbot.model.js';
import Listing from '../models/listing.model.js';
import axios from 'axios';

// Call Ollama locally to get AI-generated response
async function getOllamaResponse(prompt) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "mistral",
      prompt,
      stream: false,
    });
    return response.data.response;
  } catch (err) {
    console.error("Ollama error:", err.message);
    return "Sorry, I couldn't generate a response right now.";
  }
}

export const sendChatMessage = async (req, res) => {
  const { message } = req.body;

  try {
    // Search in name, brand, category fields using regex
    const matchingListings = await Listing.find({
      $or: [
        { name: { $regex: message, $options: 'i' } },
        { brand: { $regex: message, $options: 'i' } },
        { category: { $regex: message, $options: 'i' } }
      ]
    });

    if (matchingListings.length > 0) {
      const productList = matchingListings.map(item => {
        return `🧸 ${item.name} (${item.brand || 'No brand'})\n💲 Price: $${item.discountedPrice || item.price}\n📦 Condition: ${item.condition}\n👕 Size: ${item.size.join(", ")}`;
      }).join('\n\n');

      const responseText = `Yes! We found the following items matching your search:\n\n${productList}`;

      await new Chatbot({ message, response: responseText }).save();

      return res.status(200).json({
        success: true,
        message,
        response: responseText,
        source: 'MongoDB',
      });
    }

    // Fallback to AI if nothing is found
    const ollamaResponse = await getOllamaResponse(message);

    await new Chatbot({ message, response: ollamaResponse }).save();

    res.status(200).json({
      success: true,
      message,
      response: ollamaResponse,
      source: 'Ollama',
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
