"use client"

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { sendMessageRoute, recieveMessageRoute } from '@/utils/ApiRoutes';

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

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

  const handleSendMsg = async (msg: string) => {
    const data = await JSON.parse(localStorage.getItem("token") as string);
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const updatedMessages = [...messages, { fromSelf: true, message: msg }];
    setMessages(updatedMessages);
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
    <div className="grid grid-rows-3 h-full overflow-hidden">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <div className="text-white">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <></>
      </div>
      <div className="px-8 py-4 overflow-auto">
        {messages.map((message) => (
          <div key={uuidv4()} className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
            <div className="content">{message.message}</div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <></>
    </div>
  );
}
