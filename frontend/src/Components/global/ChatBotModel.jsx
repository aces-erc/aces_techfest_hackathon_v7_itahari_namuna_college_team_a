import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Send, Loader2 } from 'lucide-react';

const ChatBotModel = ({ isOpen, closeModal }) => {
  const [socket, setSocket] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with sample messages
  const [messages, setMessages] = useState([
    {
      type: 'response',
      text: "Hello! I'm your AI assistant. I can help you with various tasks like answering questions, writing code, or analyzing data. How can I help you today?"
    },
    {
      type: 'prompt',
      text: "Can you explain what features this chatbot has?"
    },
    {
      type: 'response',
      text: "Of course! This chatbot comes with several key features:\n\n1. Real-time messaging with instant responses\n2. Support for code snippets and technical discussions\n3. Dark mode compatibility\n4. Message history tracking\n5. Responsive design for all devices\n\nYou can start by asking any question or requesting assistance with a task."
    },
    {
      type: 'prompt',
      text: "That sounds great! Can you help me with some coding?"
    },
    {
      type: 'response',
      text: "Absolutely! I can help you with various programming tasks including:\n\n- Writing and debugging code\n- Explaining programming concepts\n- Providing code examples\n- Solving algorithmic problems\n- Offering best practices and optimization tips\n\nWhat specific programming help do you need?"
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      const newSocket = io('https://6q8ckzgr-9000.inc1.devtunnels.ms/');
      setSocket(newSocket);

      newSocket.on('response', (data) => {
        setMessages((prev) => [...prev, { type: 'response', text: data }]);
        setIsLoading(false);
      });

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [isOpen]);

  const handleSend = () => {
    if (prompt.trim() && socket) {
      socket.emit('send_prompt', prompt);
      setMessages((prev) => [...prev, { type: 'prompt', text: prompt }]);
      setPrompt('');
      setIsLoading(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className=" inset-0 flex mb-4 items-center justify-center ">
      <div className="relative w-full bg-white shadow-xl flex flex-col h-full ">
        {/* Header */}
        <div className="p-4 border-b fixed top-12 bg-white w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 ">AroGen AI</h1>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 px-20 space-y-4 mb-[8rem] mt-[4rem]" >
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.type === 'prompt' ? 'justify-end' : ''}`}>
              {message.type === 'response' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">AI</span>
                </div>
              )}
              <div className="flex-1 max-w-[60%]">
                <div className={`rounded-lg p-4 ${message.type === 'prompt'
                  ? 'bg-primary text-white ml-[50%]'
                  : 'bg-gray-100 dark:bg-neutral-800'
                  }`}>
                  <p className={`whitespace-pre-wrap ${message.type === 'response' ? 'text-gray-800 dark:text-white' : ''}`}>
                    {message.text}
                  </p>
                </div>
              </div>
              {message.type === 'prompt' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">You</span>
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">AI</span>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-4 dark:bg-neutral-800">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 dark:border-neutral-700 fixed bottom-[-1.35rem] left-0 w-[81.6%] ml-[18.5%]">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg resize-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800 border-neutral-700 text-white"
              placeholder="Type your message..."
              rows="3"
            />
            <button
              onClick={handleSend}
              disabled={!prompt.trim() || isLoading}
              className="absolute right-2 bottom-[50%] translate-y-[50%] p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="send-button-group h-full ">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModel;