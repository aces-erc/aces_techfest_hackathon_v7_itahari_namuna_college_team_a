import React, { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8000");


const ChatBotModel = ({ isOpen, closeModal }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample messages for initial chat state
  const [messages, setMessages] = useState([
    {
      type: 'response',
      text: "This AI dataset, developed by Itahari Namuna College Team A, offers personalized health insights, pain relief methods, medical treatments, and preventive measures.",
    },
  ]);



  useEffect(() => {

    socket.on("response", async data => {

      console.log(data);
      setMessages(prev => [
        ...prev,
        {
          type: 'response',
          text: data,
        },
      ]);

    });

    // Clean up the socket listener when the component is unmounted
    return () => {
      socket.off("response");
    };
  }, []);

  const handlePrompt = () => {
    setMessages(prev => [
      ...prev,
      {
        type: 'prompt',
        text: prompt,
      },
    ]);

    // Emit the prompt message to the server
    socket.emit("send_prompt", prompt);
  };


  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full flex flex-col h-full">
        {/* Messages */}
        <div className="p-2 flex flex-col gap-2 overflow-y-hidden w-full h-[calc(100vh-7rem)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.type === 'prompt' ? 'justify-end' : ''}`}
            >
              {message.type === 'response' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">AI</span>
                </div>
              )}
              <div className="flex-1 max-w-[60%]">
                <div
                  style={{ width: 'fit-content' }}
                  className={`rounded-lg p-4 ${message.type === 'prompt'
                    ? 'bg-primary text-white ml-auto'
                    : 'bg-gray-100 dark:bg-neutral-800'
                    }`}
                >
                  <p
                    className={`whitespace-pre-wrap ${message.type === 'response' ? 'text-gray-800 dark:text-white' : ''
                      }`}
                  >
                    {typeof message.text === 'string' ? message.text : JSON.stringify(message.text)}
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
        </div>


        {/* Input Area */}
        <div className="dark:border-neutral-700 sticky bottom-0 left-0 w-full p-4">
          <div className="relative flex items-center">
            <textarea
              onChange={(el) => setPrompt(el.target.value)}
              className="w-full p-4 pr-12 rounded-lg resize-none focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 border border-neutral-700 text-white"
              placeholder="Type your message..."
              rows="2"
            />
            <button
              onClick={handlePrompt}
              disabled={!prompt.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModel;
