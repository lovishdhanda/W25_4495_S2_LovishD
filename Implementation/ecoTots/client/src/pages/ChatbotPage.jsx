import React, { useState } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    setLoading(true);

    // Add the user's message to the chat history
    setChatHistory([...chatHistory, { sender: 'user', message }]);

    try {
      // Send the message to the backend API for data-driven response
      const response = await axios.post('http://localhost:3000/api/chatbot/send', {
        message: message,
      });

      // Add the bot's response to the chat history
      setChatHistory([
        ...chatHistory,
        { sender: 'user', message },
        { sender: 'bot', message: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Handling error response
      setChatHistory([
        ...chatHistory,
        { sender: 'user', message },
        { sender: 'bot', message: error.response ? error.response.data.error : "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="h-80 overflow-y-auto mb-4 p-2 border border-gray-200 rounded-lg">
          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-lg ${entry.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
            >
              <span>{entry.message}</span>
            </div>
          ))}
        </div>

        {loading && <div className="text-center text-gray-500">Typing...</div>}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; // This line ensures it has a default export.
