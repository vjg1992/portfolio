import { useState, useEffect, useRef, useCallback } from "react";
import { FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";

// Define types for chatbot messages and quick replies
interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  quickReplies?: QuickReply[];
}

interface QuickReply {
  text: string;
  action: string;
}

// Predefined bot responses with simplified terms handling
const botResponses: Record<string, { response: string[]; quickReplies: QuickReply[] }> = {
  hi: {
    response: ["Hello! How can I assist you today?", "Hi there! What would you like to know?"],
    quickReplies: [{ text: "About Vijay", action: "who is vijay g" }]
  },
  "who is vijay g": {
    response: ["Vijay G is a passionate full-stack developer specializing in React, Node.js, and more."],
    quickReplies: [
      { text: "Projects", action: "projects" },
      { text: "Skills", action: "skills" },
      { text: "Contact", action: "contact" }
    ]
  },
  projects: {
    response: ["I have worked on Logic-I (WMS) and ShopPlusPlus (Pet e-commerce)."],
    quickReplies: [
      { text: "Skills", action: "skills" },
      { text: "Contact", action: "contact" }
    ]
  },
  skills: {
    response: ["I work with React, Node.js, TypeScript, PostgreSQL, and Tailwind CSS."],
    quickReplies: [
      { text: "Projects", action: "projects" },
      { text: "Contact", action: "contact" }
    ]
  },
  contact: {
    response: ["You can contact Vijay G at vijayg@example.com or visit his LinkedIn profile."],
    quickReplies: [
      { text: "Projects", action: "projects" },
      { text: "Skills", action: "skills" }
    ]
  },
  quote: {
    response: ["Success is not the key to happiness. Happiness is the key to success."],
    quickReplies: [{ text: "Contact", action: "contact" }]
  },
  default: {
    response: ["I'm not sure about that. You can ask about Vijay G's skills, projects, or contact details."],
    quickReplies: [
      { text: "Skills", action: "skills" },
      { text: "Projects", action: "projects" },
      { text: "Contact", action: "contact" }
    ]
  }
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Add a new message to the chat
  const addMessage = useCallback((text: string, sender: "user" | "bot", quickReplies: QuickReply[] = []) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender, quickReplies, timestamp: new Date().toLocaleTimeString() }
    ]);
  }, []);

  // Automatic greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage("Hi there! I'm Vijay G's assistant. How can I help you?", "bot", botResponses["hi"].quickReplies);
      }, 1000);
    }
  }, [isOpen, messages.length, addMessage]);

  // Handle user input and bot response
  const handleSendMessage = useCallback(() => {
    if (!userInput.trim()) return;

    addMessage(userInput, "user");
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const inputLower = userInput.toLowerCase().trim();
      const response = botResponses[inputLower] || botResponses["default"];

      addMessage(response.response[Math.floor(Math.random() * response.response.length)], "bot", response.quickReplies);
      setIsTyping(false);
    }, Math.min(2000, userInput.length * 50));
  }, [userInput, addMessage]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat"
        >
          <FaComments className="text-2xl" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-teal-500 dark:bg-teal-700 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Chat with Vijay G</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <FaTimes className="text-white text-xl" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-80 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.sender === "user" ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {msg.text}
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Quick Replies */}
          {messages.length > 0 && messages[messages.length - 1]?.quickReplies && (
            <div className="p-3 flex gap-2 flex-wrap">
              {messages[messages.length - 1].quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setUserInput(reply.action)}
                  className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white text-xs"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="p-4 border-t dark:border-gray-700 flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-400"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="ml-2 bg-teal-500 text-white p-3 rounded-lg">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
