import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]); // State to store received messages
  const [input, setInput] = useState(''); // State for the message input
  const [socket, setSocket] = useState(null); // State to hold the WebSocket instance

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket('ws://localhost:5003'); // Adjust to your server URL
    setSocket(ws);

    // Event handler for when the connection is opened
    ws.addEventListener('open', (event) => {
      console.log('Connected to the WebSocket server');
    });

    // Event handler for when a message is received from the server
    ws.addEventListener('message', (event) => {
      console.log('Message from server:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]); // Update state with new message
    });

    // Event handler for when the connection is closed
    ws.addEventListener('close', (event) => {
      console.log('Disconnected from the WebSocket server');
    });

    // Event handler for when an error occurs
    ws.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;