"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  isDarkMode: boolean;
}

export default function Preloader({ isDarkMode }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const primaryColor = isDarkMode ? "#60a5fa" : "#3b82f6"; // Soft blue
  const glowColor = isDarkMode ? "rgba(96, 165, 250, 0.4)" : "rgba(59, 130, 246, 0.6)";
  const textColor = "var(--color-foreground)";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "var(--color-background)" }}
    >
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-bg-pulse"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}08 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Logo with refined orbiting particles and soft glow */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <Image
            src={isDarkMode ? "/logo1.png" : "/logo2.png"}
            alt="Vickins Technologies Logo"
            width={200}
            height={200}
            className="absolute inset-0 m-auto drop-shadow-2xl animate-logo-float"
            priority
          />

          {/* Orbiting particles with trail effect */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full animate-orbit-smooth"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 12px ${glowColor}`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "8s",
              }}
            >
              {/* Trail */}
              <div
                className="absolute inset-0 rounded-full animate-orbit-trail"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                  opacity: 0.6,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            </div>
          ))}

          {/* Soft central halo */}
          <div
            className="absolute inset-0 rounded-full animate-central-glow"
            style={{
              boxShadow: `inset 0 0 60px 20px ${glowColor}`,
              background: `${glowColor}20`,
            }}
          />
        </div>

{/* Company name with elegant letter reveal */}
<div className="flex flex-col items-center gap-8">
  <h1
    className="text-4xl sm:text-5xl font-bold tracking-wider overflow-hidden" // Changed from font-extralight to font-bold
    style={{ color: textColor }}
  >
    <span className="inline-block animate-letter-reveal">
      {"VICKINS TECHNOLOGIES".split("").map((letter, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{
            animation: `letterFade 0.03s ease-out forwards`,
            animationDelay: `${1.2 + i * 0.03}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  </h1>

  {/* Sleek scanning loader bar */}
  <div className="relative w-72 h-1 bg-white/10 rounded-full overflow-hidden">
    <div
      className="absolute inset-y-0 left-0 w-32 animate-scan-bar"
      style={{
        background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    />
    <div className="absolute inset-0 animate-bar-glow" />
  </div>
</div>
      </div>

      <style jsx>{`
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-bg-pulse {
          animation: bg-pulse 10s ease-in-out infinite;
        }

        @keyframes logo-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        .animate-logo-float {
          animation: logo-float 6s ease-in-out infinite;
        }

        @keyframes orbit-smooth {
          from {
            transform: rotate(0deg) translateX(110px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(110px) rotate(-360deg);
          }
        }
        .animate-orbit-smooth {
          animation: orbit-smooth linear infinite;
        }

        @keyframes orbit-trail {
          0% { transform: scaleX(1); opacity: 0.6; }
          100% { transform: scaleX(3); opacity: 0; }
        }
        .animate-orbit-trail {
          animation: orbit-trail 1s ease-out infinite;
          transform-origin: left center;
        }

        @keyframes central-glow {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-central-glow {
          animation: central-glow 5s ease-in-out infinite;
        }

        @keyframes letterFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-letter-reveal span span {
          display: inline-block;
        }

        @keyframes scan-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scan-bar {
          animation: scan-bar 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          height: 100%;
          border-radius: inherit;
        }

        @keyframes bar-glow {
          0%, 100% { box-shadow: 0 0 10px ${glowColor}; }
          50% { box-shadow: 0 0 20px ${glowColor}; }
        }
        .animate-bar-glow {
          animation: bar-glow 3s ease-in-out infinite;
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}