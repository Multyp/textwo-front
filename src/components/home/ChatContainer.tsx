"use client"

/* Global imports */
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io-client';
import axios from 'axios';
/* Scoped imports */
/* Local imports */
import { sendMessageRoute, recieveMessageRoute } from '@/utils/ApiRoutes';
import Msg from '@/types/Messages';
import User from '@/types/User';

export default function ChatContainer({ currentContact, socket }: { currentContact: User, socket: Socket }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Msg | null>(null);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("token") as string);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentContact._id,
      });
      setMessages(response.data);
    };
    fetchData();
  }, [currentContact]);

  useEffect(() => {
    const getcurrentContact = async () => {
      if (currentContact) {
        await JSON.parse(localStorage.getItem("token") as string)._id;
      }
    };
    getcurrentContact();
  }, [currentContact]);

  const handleSendMsg = async (msg: string) => {
    const data = await JSON.parse(
      localStorage.getItem("token") as string
    );
    socket.current.emit("send-msg", {
      to: currentContact._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentContact._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    setInputMessage('');
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh]">
      <div className="px-8 py-4 flex justify-center items-center border-b-2 border-gray-500 gap-2">
        {currentContact.avatarImage !== "" ? (
          <Image
            src={`data:image/svg+xml;base64,${currentContact.avatarImage}`}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
            width={50}
            height={50}
          />
        ) : (
            <Image
              src="/blank-profile-picture.png"
              alt="Blank Profile Picture"
              className="w-8 h-8 rounded-full"
              width={50}
              height={50}
            />
        )}
        <span className="text-gray-200">{currentContact.username}</span>
      </div>
      <div className="px-8 py-4 flex-grow justify-end overflow-scroll no-scrollbar">
        {messages.map((message) => (
          <div
            key={uuidv4()}
            className={`message flex items-center py-2 ${message.fromSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`content p-3 rounded-xl max-w-lg
             ${message.fromSelf ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.message}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="px-8 py-4 border-t-2 border-gray-500">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            onClick={() => handleSendMsg(inputMessage)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
