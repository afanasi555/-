import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages from the server when the component mounts
    const fetchMessages = async () => {
      const response = await axios.get(`/api/rooms/${roomId}/messages`);
      setMessages(response.data);
    };
    fetchMessages();
  }, [roomId]);

  const sendMessage = async () => {
    const message = { text: newMessage, roomId };
    await axios.post(`/api/rooms/${roomId}/messages`, message);
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
