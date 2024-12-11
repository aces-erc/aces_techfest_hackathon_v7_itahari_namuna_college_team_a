import React from 'react';

const HeartbeatLoader = () => {
  return (
    <div className="flex items-center justify-center h-32 w-64">
      <div className="relative w-full h-full flex items-center">
        
        {/* SVG for heartbeat */}
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,20 
               L 15,20 
               L 20,10 
               L 25,30 
               L 30,20 
               L 35,20 
               L 40,20
               L 45,20 
               L 50,20"
            fill="none"
            stroke="#4caf50"
            strokeWidth="2"
            className="heartbeat-line"
          />
        </svg>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes heartbeat-wave {
    0% {
      opacity: 0;
      stroke-dashoffset: 100;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
  }

  .heartbeat-line {
    stroke-dasharray: 100;
    animation: heartbeat-wave 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;
document.head.appendChild(style);

export default HeartbeatLoader;