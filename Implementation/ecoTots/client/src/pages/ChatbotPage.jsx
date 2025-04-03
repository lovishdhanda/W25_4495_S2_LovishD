import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    // Add the user's message immediately to the chat history
    setChatHistory(prev => [...prev, { sender: 'user', message }]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/chatbot/send', { message });
      // Append bot response using response.data.response
      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', message: response.data.response }
      ]);
    } catch (error) {
      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', message: "Sorry, I couldn't process your request." }
      ]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  return (
    <section className="mt-1 text-center bg-gray-100 py-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-slate-700">Chat with Us</h2>
      <p className="text-gray-500 mt-2">Have questions? Get instant help from our AI assistant.</p>
      <div className="h-60 overflow-y-auto bg-white p-3 mt-3 border border-gray-300 rounded-lg text-left">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`my-1 p-2 rounded-lg ${entry.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200'}`}
          >
            {entry.message}
          </div>
        ))}
      </div>
      {loading && <p className="text-gray-500 mt-2">Typing...</p>}
      <div className="flex justify-center mt-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="border p-3 rounded-lg w-2/3"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg ml-2 hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Chatbot;
