import React, { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

const ChatBotModel = ({ isOpen, closeModal }) => {
  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  // Sample messages for initial chat state
  const [messages, setMessages] = useState([
    {
      type: 'response',
      text: 'This AI dataset, developed by Itahari Namuna College Team A, offers personalized health insights, pain relief methods, medical treatments, and preventive measures.',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/show_all_user_information', {
          method: 'GET',
          credentials: 'include',
        });

        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response

        function convertDataToParagraphs(data) {
          return data.map((entry, index) => {
            return `
              Date: ${new Date(entry.date).toLocaleDateString()}
              Description: ${entry.description || 'No description available.'}
              Blood Pressure: ${entry.bloodPressure || 'N/A'}
              Sugar Level: ${entry.sugarLevel || 'N/A'}
            `;
          }).join('\n');
        }

        console.log(data.Tests_and_Reports)
        const paragraph = convertDataToParagraphs(data.data.Tests_and_Reports);
        console.log(paragraph)
        setData(paragraph);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'response',
          text: data,
        },
      ]);
    });

    // Clean up the socket listener when the component is unmounted
    return () => {
      socket.off('response');
    };
  }, []);

  const handlePrompt = () => {
    if (count === 0) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'prompt',
          text: data + prompt,
        },
      ]);
      setCount((prev) => prev + 1);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'prompt',
          text: prompt,
        },
      ]);
    }

    // Emit the prompt message to the server
    socket.emit('send_prompt', prompt);
    setPrompt('');
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="relative w-full  bg-white  rounded-lg shadow-lg overflow-hidden h-full">
        {/* Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <h3 className="text-lg font-semibold ">AroGen AI</h3>
        </div>

        {/* Messages */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-15rem)]">
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
              <div className="flex-1 max-w-[80%]">
                <div
                  style={{ width: 'fit-content' }}
                  className={`rounded-lg p-4 ${message.type === 'prompt' ? 'bg-gray-400 text-white ml-auto' : 'bg-primary  '
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">You</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className=" bg-primary p-4 flex items-center sticky bottom-0 w-full">
          <div className='flex items-center w-full bg-white overflow-clip rounded-xl'>

            <textarea
              onChange={(el) => setPrompt(el.target.value)}
              className="w-full outline-none border-transparent p-4 pr-16 rounded-lg resize-none text-black focus:ring-blue-500  border bg-white text-white"
              value={prompt}
              placeholder="Type your message..."
              rows="2"
            />
            <button
              onClick={handlePrompt}
              disabled={!prompt.trim() || isLoading}
              className="p-4 rounded-full m-2  h-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatBotModel;
