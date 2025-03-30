import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
  message: { type: String, required: true },
  response: { type: String, required: true },
});

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

export default Chatbot;