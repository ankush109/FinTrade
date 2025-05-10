import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { BsChatDots } from "react-icons/bs";
import { Bot, CircleUser, SendIcon } from "lucide-react";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      role: "assistant",
      message: "Hello! How can I help you today?",
    },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const createExpense = async () => {
    if (!message.trim()) return;

    const res = await fetch("http://localhost:4000/v1/user/create-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ chat: message }),
    });

    const data = await res.json();
    if (data.success) {
      setChats((prev) => [...prev, { role: "user", message: message }]);
      setMessage("");
    }
  };

  const getChats = async () => {
    const res = await fetch("http://localhost:4000/v1/user/get-ai-chats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      setChats(data.message);
    }
  };

  useEffect(() => {
    getChats();
  }, [message]);

  return (
    <>
      {isOpen ? (
        <Draggable handle=".handle">
          <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg flex flex-col resize overflow-hidden w-[350px] h-[500px]">
            <div className="handle cursor-move p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-lg font-bold">Finance ChatBot</h2>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chats.map((chat, index) => (
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
              ))}
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
                />
                <button
                  onClick={createExpense}
                  className="bg-blue-500 text-white p-2 rounded-lg"
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
      )}
    </>
  );
}

export default ChatBot;
