import React from "react";
const WaveComponent = () => {
    return (
        <div className=" w-full overflow-hidden leading-none z-[-1]">
            <svg
                className="relative block w-full h-[60px] md:h-[120px]"
                data-name="Wave"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4CAF50" />
                        <stop offset="100%" stopColor="#388E3C" />
                    </linearGradient>
                </defs>
                <path
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    fill="url(#waveGradient)"
                >
                    <animate
                        attributeName="d"
                        dur="10s"
                        repeatCount="indefinite"
                        values="
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </path>
                <path
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    fill="url(#waveGradient)"
                    opacity="0.5"
                >
                    <animate
                        attributeName="d"
                        dur="8s"
                        repeatCount="indefinite"
                        values="
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </path>
                <path
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    fill="url(#waveGradient)"
                    opacity="0.25"
                >
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        values="
              M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
              M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </path>
            </svg>
        </div>
    );
};
export default WaveComponent;