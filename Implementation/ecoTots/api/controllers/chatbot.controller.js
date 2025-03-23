import axios from 'axios';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';

const openaiApiKey = process.env.OPENAI_API_KEY;  // This should access the API key

export const sendChatMessage = async (req, res) => {
  const { listingId, sellerId } = req.body;

  if (!listingId || !sellerId) {
    return res.status(400).json({ error: "Listing ID and Seller ID are required." });
  }

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const message = await generateMessage(listing, seller);

    console.log(`Sending message to seller ${seller.username}: ${message}`);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

const generateMessage = async (listing, seller) => {
  try {
    const prompt = `Generate a polite and friendly message asking if the item listed on marketplace by seller ${seller.username} is still available. The listing is: ${listing.name} (Category: ${listing.category}, Size: ${listing.size.join(', ')}, Price: $${listing.price})`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',  // or 'gpt-4' if you want to use GPT-4
        prompt: prompt,
        max_tokens: 60,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stop: ["\n"],
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,  // Using the API key from the .env file
        }
      }
    );

    console.log('OpenAI response:', response.data);  // Log the OpenAI response
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error in generateMessage:", error.response ? error.response.data : error.message);  // Log detailed error
    throw new Error(error.response ? error.response.data : error.message);  // Throw error with more detailed message
  }
};
