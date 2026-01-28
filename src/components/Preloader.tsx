// src/components/Preloader.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  isDarkMode: boolean;
}

export default function Preloader({ isDarkMode }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // ← new state

  // Detect mobile only after mount (client-side only)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide after timeout (shorter on mobile)
  useEffect(() => {
    const duration = isMobile ? 3500 : 4200;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [isMobile]);

  if (!isVisible) return null;

  const primaryColor = isDarkMode ? "#60a5fa" : "#3b82f6";
  const glowColor = isDarkMode ? "rgba(96, 165, 250, 0.4)" : "rgba(59, 130, 246, 0.6)";
  const textColor = "var(--color-foreground)";

  // Use isMobile state instead of window.innerWidth directly
  const particleCount = isMobile ? 4 : 6;
  const orbitRadius = isMobile ? 70 : 110;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-800 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "var(--color-background)" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-bg-pulse"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}08 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 sm:gap-10 md:gap-12 z-10">
        {/* Logo + particles */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          <Image
            src={isDarkMode ? "/logo1.png" : "/logo2.png"}
            alt="Vickins Technologies Logo"
            width={224}
            height={224}
            className="absolute inset-0 m-auto drop-shadow-2xl animate-logo-float w-32 sm:w-40 md:w-48"
            priority
          />

          {/* Orbiting particles */}
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-orbit-smooth"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${glowColor}`,
                animationDelay: `${i * 0.35}s`,
                animationDuration: "7s",
                transform: `rotate(${i * 60}deg) translateX(${orbitRadius}px) rotate(-${i * 60}deg)`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full animate-orbit-trail"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                  opacity: 0.5,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            </div>
          ))}

          {/* Central glow */}
          <div
            className="absolute inset-0 rounded-full animate-central-glow"
            style={{
              boxShadow: `inset 0 0 40px 15px ${glowColor}`,
              background: `${glowColor}20`,
            }}
          />
        </div>

        {/* Text + loader bar */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider overflow-hidden whitespace-nowrap"
            style={{ color: textColor }}
          >
            {"VICKINS TECHNOLOGIES".split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block opacity-0"
                style={{
                  animation: `letterFade 0.03s ease-out forwards`,
                  animationDelay: `${1.0 + i * 0.035}s`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <div className="relative w-60 sm:w-72 md:w-80 h-0.5 sm:h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-24 sm:w-32 animate-scan-bar"
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                boxShadow: `0 0 16px ${glowColor}`,
              }}
            />
            <div className="absolute inset-0 animate-bar-glow" />
          </div>
        </div>
      </div>

      {/* Keyframes remain the same */}
      <style jsx global>{`
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
        }
        .animate-bg-pulse {
          animation: bg-pulse 10s ease-in-out infinite;
        }

        @keyframes logo-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
        .animate-logo-float {
          animation: logo-float 6s ease-in-out infinite;
        }

        @keyframes orbit-smooth {
          from { transform: rotate(0deg) translateX(var(--orbit-radius, 110px)) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(var(--orbit-radius, 110px)) rotate(-360deg); }
        }
        .animate-orbit-smooth {
          animation: orbit-smooth linear infinite;
        }

        @keyframes orbit-trail {
          0% { transform: scaleX(1); opacity: 0.5; }
          100% { transform: scaleX(2.5); opacity: 0; }
        }
        .animate-orbit-trail {
          animation: orbit-trail 1.2s ease-out infinite;
          transform-origin: left center;
        }

        @keyframes central-glow {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 0.65; transform: scale(1.1); }
        }
        .animate-central-glow {
          animation: central-glow 5s ease-in-out infinite;
        }

        @keyframes letterFade {
          to   { opacity: 1; transform: translateY(0); }
          from { opacity: 0; transform: translateY(16px); }
        }

        @keyframes scan-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(180%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scan-bar {
          animation: scan-bar 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes bar-glow {
          0%, 100% { box-shadow: 0 0 8px var(--glow-color); }
          50%  { box-shadow: 0 0 16px var(--glow-color); }
        }
        .animate-bar-glow {
          animation: bar-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}