import React, { useState, useRef, useEffect } from 'react';
import { Send, MinusCircle, Maximize2, MessageCircle, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'quickReplies';
  options?: QuickReply[];
}

interface QuickReply {
  text: string;
  action: string;
}

interface BotResponse {
  responses: string[];
  quickReplies?: QuickReply[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial quick replies
  const initialQuickReplies: QuickReply[] = [
    { text: "👋 Say Hello", action: "hi" },
    { text: "👨‍💻 About Vijay", action: "who is vijay g" },
    { text: "🛠️ Skills", action: "what technologies do you work with" },
    { text: "📂 Projects", action: "tell me about your projects" },
    { text: "📧 Contact", action: "how can i contact you" }
  ];

  // Define bot responses with more concise content
  const botResponses: { [key: string]: BotResponse } = {
    "greeting": {
      responses: ["Hi! I'm Vijay's assistant. How can I help you today?"],
      quickReplies: [
        { text: "About Vijay", action: "who is vijay g" },
        { text: "View Skills", action: "what technologies do you work with" },
        { text: "See Projects", action: "tell me about your projects" }
      ]
    },
    "identity": {
      responses: [
        "Vijay is a full-stack developer specializing in React and Node.js, with a passion for building scalable web applications and exploring new technologies."
      ],
      quickReplies: [
        { text: "Skills", action: "what technologies do you work with" },
        { text: "Projects", action: "tell me about your projects" }
      ]
    },
    "technologies": {
      responses: [
        "🔹 Frontend: React, Next.js, TypeScript, Tailwind\n" +
        "🔹 Backend: Node.js, Express, GraphQL\n" +
        "🔹 Database: PostgreSQL, MongoDB\n" +
        "🔹 DevOps: Docker, AWS, CI/CD"
      ],
      quickReplies: [
        { text: "See Projects", action: "tell me about your projects" },
        { text: "Contact Info", action: "how can i contact you" }
      ]
    },
    "projects": {
      responses: [
        "Recent Projects:\n\n" +
        "🔸 Logic-I: Warehouse management system (React, Node.js)\n" +
        "🔸 ShopPlusPlus: E-commerce platform (Next.js, Firebase)\n" +
        "🔸 To-Do List App: Comprehensive, feature-rich App (Typescript, Tailwindcss)\n\n" +
        "Want to see more?"
      ],
      quickReplies: [
        { text: "GitHub", action: "github" },
        { text: "Contact", action: "how can i contact you" }
      ]
    },
    "contact": {
      responses: [
        "📧 vijayshankar871992@gmail.com\n" +
        "💼 linkedin.com/in/1992vijayg\n" +
        "🐙 github.com/vijayg92"
      ]
    },
    "github": {
      responses: [
        "Check out my projects on GitHub: github.com/vijayg92\n" +
        "Star the repos you like! ⭐"
      ]
    },
    "default": {
      responses: [
        "Ah, that sounds like a great question, let's connect and discuss more about it!"
      ],
      quickReplies: initialQuickReplies
    }
  };

  // Function to match user input to response patterns
  const findBestResponse = (input: string): BotResponse => {
    const patterns: { [key: string]: string[] } = {
      "greeting": ["hi", "hello", "hey", "greetings"],
      "identity": ["who is", "about vijay", "tell me about yourself"],
      "technologies": ["tech", "technologies", "stack", "work with", "skills"],
      "projects": ["project", "portfolio", "work", "built", "tell me about your projects"],
      "contact": ["contact", "email", "reach", "linkedin"],
      "github": ["github", "repository", "repo", "code"]
    };

    const inputLower = input.toLowerCase();
    
    for (const [category, phrases] of Object.entries(patterns)) {
      if (phrases.some(phrase => inputLower.includes(phrase))) {
        return botResponses[category];
      }
    }

    return botResponses.default;
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot', quickReplies?: QuickReply[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type: quickReplies ? 'quickReplies' : 'text',
      options: quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (action: string) => {
    addMessage(action, 'user');
    handleBotResponse(action);
  };

  const handleBotResponse = (userInput: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = findBestResponse(userInput);
      const randomResponse = response.responses[Math.floor(Math.random() * response.responses.length)];
      addMessage(randomResponse, 'bot', response.quickReplies);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    setInputMessage('');
    handleBotResponse(inputMessage);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 md:w-96 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[32rem]'}`}>
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-teal-500" />
              <h3 className="font-semibold text-gray-800 dark:text-white">Vijay's Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <MinusCircle className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {initialQuickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.action)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col space-y-1 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        {message.sender === 'bot' && <Bot className="w-4 h-4 text-teal-500" />}
                        {message.sender === 'user' && <User className="w-4 h-4 text-gray-500" />}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>

                      {message.options && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(option.action)}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-teal-500" />
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;