import { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Ai from "../assets/agent.png";
import ReactMarkdown from "react-markdown";

export default function ChatbotPlugin({ isOpen, setIsOpen }) {
  const API_URL = "https://mortgage-ai-api.onrender.com/chat";

  const [messages, setMessages] = useState([
    { text: "Hello! 😊 How can I help you? ", type: "bot" },
  ]);

  const chatRef = useRef(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to display AI response with typing effect
  const typeBotMessage = (message, delay = 50) => {
    setIsTyping(true);
    let currentText = "";
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        currentText += message[index];
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.type === "bot") {
            return [
              ...prevMessages.slice(0, -1),
              { text: currentText, type: "bot" },
            ];
          } else {
            return [...prevMessages, { text: currentText, type: "bot" }];
          }
        });
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, delay);
  };

  const sendMessageToBackend = async (userMessage) => {
    setIsTyping(true);

    const payload = {
      user_id: "101",
      message: userMessage,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const result = await response.json(); // Parse JSON properly
      const botMessage = result.response; // Extract actual bot response

      // Use typing effect to display AI response
      typeBotMessage(botMessage, 50);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't process that. Try again.", type: "bot" },
      ]);
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, type: "user" }]);
    sendMessageToBackend(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbox UI */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-40"
          onClick={() => setIsOpen(false)}
        >
          {/* Chatbox UI */}
          <div
            className="relative bottom-12 right-4 w-80 shadow-2xl rounded-xl bg-white border border-gray-300 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary text-white p-3 rounded-t-xl">
              <div className="flex items-center gap-2">
                <img
                  src={Ai}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-semibold">Mortgage Mate AI</h2>
                  <p className="text-xs opacity-80">Agentic AI Bot</p>
                </div>
              </div>
              <XMarkIcon
                className="cursor-pointer w-5 h-5"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              />
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-auto p-3 flex flex-col gap-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 text-sm rounded-lg ${
                    msg.type === "bot"
                      ? "bg-gray-100 self-start"
                      : "bg-green-100 self-end"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
              {isTyping && (
                <div className="self-start bg-gray-100 p-2 text-sm rounded-lg italic">
                  Typing...
                </div>
              )}
            </div>

            {/* Quick Reply Buttons */}
            <div className="p-2 flex gap-2">
              {["Houses", "Flats", "Bungalows"].map((option) => (
                <button
                  key={option}
                  className="border rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() =>
                    setMessages([...messages, { text: option, type: "user" }])
                  }
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border p-2 text-sm rounded-lg focus:outline-none"
                placeholder="Type here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                aria-label="Type a message"
              />
              <PaperAirplaneIcon
                className="bg-primary text-white p-2 rounded-lg w-8 h-8 cursor-pointer"
                size={16}
                onClick={handleSendMessage}
                aria-label="Send message"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
