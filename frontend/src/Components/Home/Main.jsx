import {
    Activity,
    Heart,
    Plus,
    Thermometer,
    Stethoscope,
    Pill,
} from "lucide-react";
import React, { useEffect } from "react";
// import { render } from "react-dom";
import HomeSvg from "../../images/svg/home.svg";
import { Link } from "react-router-dom";
export default function HeroSection() {
    useEffect(() => {
        const handleParallax = (e) => {
            const icons = document.querySelectorAll(".floating-icon");
            const depth = 20;
            const moveX = (e.clientX * depth) / window.innerWidth;
            const moveY = (e.clientY * depth) / window.innerHeight;
            icons.forEach((icon) => {
                icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };
        window.addEventListener("mousemove", handleParallax);
        return () => window.removeEventListener("mousemove", handleParallax);
    }, []);
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-green-50 to-blue-50">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-noise opacity-50"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid opacity-20"></div>

            {/* Floating Background Icons */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-icon absolute opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 5}s linear infinite, 
                           fade ${3 + Math.random() * 2}s ease-in-out infinite`,
                        }}
                    >
                        {i % 6 === 0 ? (
                            <Heart size={24} className="text-green-500" />
                        ) : i % 6 === 1 ? (
                            <Activity size={24} className="text-blue-500" />
                        ) : i % 6 === 2 ? (
                            <Plus size={24} className="text-green-500" />
                        ) : i % 6 === 3 ? (
                            <Thermometer size={24} className="text-red-500" />
                        ) : i % 6 === 4 ? (
                            <Stethoscope size={24} className="text-blue-500" />
                        ) : (
                            <Pill size={24} className="text-green-500" />
                        )}
                    </div>
                ))}
            </div>

            {/* DNA Helix Animation */}
            <div className="absolute right-0 h-full w-32 opacity-10">
                <div className="dna-helix"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <main className=" h-[100vh] container mx-auto px-4 py-0">
                    <nav className="bg-transparent flex justify-between items-center p-6  ">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                            AroHealth
                        </h1>
                        <div className="flex gap-4">
                            <Link to='/login'>
                                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </nav>
                    <div className=" h-full grid lg:grid-cols-2 gap-2 items-center justify-center pb-40">
                        <div className="space-y-8 h-full  flex flex-col justify-center">
                            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                                    Health made simple, care made personal
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-lg">
                                Experience the future of healthcare delivery with our innovative
                                platform
                            </p>
                            <div className="flex gap-4">
                                <Link to="/login">
                                    <button className="px-8 py-3 bg-primary text-white rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                                        Get Started
                                    </button>
                                </Link>
                                <button className="px-8 py-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="relative w-[50vw]  h-full">
                            <img
                                src={HomeSvg}
                                alt="Medical professionals using modern technology"
                                className="relative rounded-2xl "
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Modern Wave Animation */}
            <div className="absolute bottom-0 w-full">
                <svg
                    className="animate-wave"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#gradient)"
                        fillOpacity="0.1"
                        d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>

            <style jsx>{`
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
  
          .bg-grid {
            background-size: 30px 30px;
            background-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.05) 1px,
                transparent 1px
              ),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          }
  
          .dna-helix {
            height: 100%;
            background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(76, 175, 80, 0.1) 10px,
              rgba(76, 175, 80, 0.1) 20px
            );
            animation: dna-scroll 20s linear infinite;
          }
  
          @keyframes dna-scroll {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 1000px;
            }
          }
  
          @keyframes float {
            0%,
            100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(10px, 10px);
            }
          }
  
          @keyframes fade {
            0%,
            100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.3;
            }
          }
  
          @keyframes wave {
            0% {
              transform: translateX(0) translateY(0);
            }
            50% {
              transform: translateX(-25%) translateY(2px);
            }
            100% {
              transform: translateX(0) translateY(0);
            }
          }
  
          .animate-wave {
            animation: wave 20s ease-in-out infinite;
          }
        `}</style>
        </div>
    );
}