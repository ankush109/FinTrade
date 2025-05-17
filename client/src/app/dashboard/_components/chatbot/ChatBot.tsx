"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Draggable from "react-draggable";
import { BsChatDots } from "react-icons/bs";
import { Bot, CircleUser, SendIcon } from "lucide-react";
import { useGetUserChatsQuery } from "@/hooks/query/useGetUserChats";
import { useCreateUserChatMutation } from "@/hooks/mutation/useCreateChatMutation";
import toast from "react-hot-toast";
import { useGetUserDetailsQuery } from "@/hooks/query/useGetUserDetails";

const ChatBot = () => {
  const { data: chatData } = useGetUserChatsQuery();
  const { mutate: createChat } = useCreateUserChatMutation();
  const { data: userData } = useGetUserDetailsQuery();

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Chat data:", chatData);
    if (userData?.user?.name) {
      setChats([
        {
          role: "assistant",
          message: `Hi ${userData.user.name}! How can I help you today?`,
        },
      ]);
    }
  }, [userData?.user.name]);

  useEffect(() => {
    if (chatData && chatData.length > 0) {
      setChats((prev) => [...prev, ...chatData]);
    }
  }, [chatData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isTyping]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    const userMessage = { role: "user", message };
    setChats((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    createChat(message, {
      onSuccess: (response) => {
        setTimeout(() => {
          setChats((prev) => [
            ...prev,
            {
              role: "assistant",
              message: response?.message ?? "Not sure I understood that.",
            },
          ]);
          setIsTyping(false);
        }, 2000);
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        setIsTyping(false);
        toast.error("Failed to send message");
      },
    });
  }, [message, createChat]);

  const renderChatMessage = (chat, index) => (
    <div
      key={index}
      className={`flex ${
        chat.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`${
          chat.role === "user"
            ? "bg-gray-200 text-gray-800"
            : "bg-blue-100 text-blue-800"
        } p-2 rounded-lg flex items-center gap-2 max-w-[80%]`}
      >
        {chat.role === "user" ? <CircleUser /> : <Bot />}
        <span>{chat.message}</span>
      </div>
    </div>
  );

  return isOpen ? (
    <Draggable handle=".handle">
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg flex flex-col resize overflow-hidden w-[350px] h-[500px]">
        <div className="handle cursor-move p-4 bg-blue-600 text-white flex justify-between items-center">
          <h2 className="text-lg font-bold">Finance ChatBot</h2>
          <button onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chats.map(renderChatMessage)}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-lg flex items-center gap-2 max-w-[80%]">
                <Bot />
                <span className="italic animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Type your expense..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg"
              disabled={isTyping}
            >
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  ) : (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <BsChatDots size={30} />
      </button>
    </div>
  );
};

export default ChatBot;
