"use client"

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { sendMessageRoute, recieveMessageRoute } from '@/utils/ApiRoutes';

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("token") as string);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat,
      });
      setMessages(response.data);
    };
    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("token") as string)._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async () => {
    // Your sending message logic here
    console.log('Message sent:', inputMessage);
    setInputMessage(''); // Clear input after sending
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-8 py-4 flex justify-center items-center text-gray-200">
        Your chat
      </div>
      <div className="px-8 py-4 flex-grow justify-end overflow-scroll">
        {messages.map((message) => (
          <div
            key={uuidv4()}
            className={`message flex items-center py-2 ${message.fromSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`content p-3 rounded-xl ${message.fromSelf ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.message}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="px-8 py-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            onClick={handleSendMsg}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}