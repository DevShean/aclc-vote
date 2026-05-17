"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface AppSplashScreenProps {
  onComplete?: () => void;
}

export default function AppSplashScreen({ onComplete }: AppSplashScreenProps) {
  const [systemReady, setSystemReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SECURE PROTOCOL...");

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 4500; // 4.5 seconds total loading sequence

    const animateProgress = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(progressPercent);

      // Dynamically update cyber status text
      if (progressPercent < 25) {
        setStatusText("ENCRYPTING BALLOT KEYS...");
      } else if (progressPercent < 50) {
        setStatusText("ESTABLISHING SECURE GATEWAY...");
      } else if (progressPercent < 75) {
        setStatusText("SYNCHRONIZING ELECTION LEDGER...");
      } else if (progressPercent < 98) {
        setStatusText("VERIFYING DATABASE INTEGRITY...");
      } else {
        setStatusText("PORTAL READY & GATEWAY OPEN");
      }

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setSystemReady(true);
      }
    };

    const animationFrameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (systemReady && onComplete) {
      const exitTimer = window.setTimeout(() => {
        onComplete();
      }, 1000); // 1s buffer for users to view system ready state
      return () => window.clearTimeout(exitTimer);
    }
  }, [systemReady, onComplete]);



  return (
    <div className="fixed inset-0 z-9999 flex min-h-dvh items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#050b14_0%,#0a1526_55%,#10223b_100%)] px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <div className="relative flex items-center justify-center">
          {/* Dynamic background glow centered on the logos */}
          <div
            className={`absolute h-56 w-56 rounded-full blur-2xl transition-all duration-1000 ${
              systemReady ? "bg-emerald-500/15" : "bg-blue-500/15"
            }`}
          />

          {/* Three-Logo Floating Flex container with drop shadow */}
          <div className="logo-wrap relative flex items-center justify-center gap-4 sm:gap-6 z-10">
            {/* SSC Logo (Left) */}
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 opacity-90 transition-transform duration-300 hover:scale-105">
              <Image
                src="/img/logo/SSC LOGO.png"
                alt="SSC Logo"
                fill
                priority
                sizes="(max-width:640px) 56px,80px"
                className="object-contain"
              />
            </div>

            {/* Main ACLC Logo (Center) - Larger size */}
            <div className="relative h-20 w-20 sm:h-28 sm:w-28 transition-transform duration-300 hover:scale-105">
              <Image
                src="/img/logo/aclclogo.png"
                alt="ACLC Logo"
                fill
                priority
                sizes="(max-width:640px) 80px,112px"
                className="object-contain"
              />
            </div>

            {/* SSLG Logo (Right) */}
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 opacity-90 transition-transform duration-300 hover:scale-105">
              <Image
                src="/img/logo/SSLG LOGO.png"
                alt="SSLG Logo"
                fill
                priority
                sizes="(max-width:640px) 56px,80px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Central Ballot Box Loading Animation */}
        <div className="relative mb-5 mt-1 flex flex-col items-center" aria-hidden="true">
          {/* Voting Ballot Box SVG Icon with continuous falling paper and shadow */}
          <svg width="64" height="72" viewBox="0 0 64 72" className="mt-3 animate-ballot-breathe">
            {/* 1. Falling Paper (Rendered behind the lid and front box face for depth) */}
            <g className="ballot-paper">
              <rect
                x="24"
                y="-10"
                width="16"
                height="22"
                rx="2"
                fill={systemReady ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.95)"}
                stroke={systemReady ? "#34d399" : "#60a5fa"}
                strokeWidth="2"
                className="transition-all duration-700"
              />
              {/* Ballot Checkmark */}
              <path
                d="M28 1l3 3 5-5"
                fill="none"
                stroke={systemReady ? "#10b981" : "#3b82f6"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-700"
              />
            </g>
            
            {/* 2. Ballot Box Lid (Front Part) */}
            <path
              d="M10 42l6-10h32l6 10z"
              fill={systemReady ? "rgba(16, 185, 129, 0.25)" : "rgba(59, 130, 246, 0.15)"}
              stroke={systemReady ? "#34d399" : "#60a5fa"}
              strokeWidth="2"
              strokeLinejoin="round"
              className="transition-all duration-700"
            />

            {/* 3. Slot Opening Line (drawn exactly on the lid entry) */}
            <line
              x1="20"
              y1="32"
              x2="44"
              y2="32"
              stroke={systemReady ? "#10b981" : "#3b82f6"}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-700"
            />

            {/* 4. Ballot Box Front Body */}
            <rect
              x="14"
              y="42"
              width="36"
              height="24"
              rx="3"
              fill={systemReady ? "rgba(16, 185, 129, 0.15)" : "rgba(15, 23, 42, 0.85)"}
              stroke={systemReady ? "#10b981" : "#3b82f6"}
              strokeWidth="2"
              className="transition-all duration-700"
            />
          </svg>

          {/* Smooth Horizontal Progress Bar & Ticker */}
          <div className="relative mt-6 w-64 flex flex-col items-center">
            {/* Status & Percent row */}
            <div className="w-full flex justify-between items-center px-0.5 mb-1.5 font-mono text-[9px] uppercase tracking-wider font-bold">
              <span className={systemReady ? "text-emerald-400 animate-pulse" : "text-blue-300/80"}>
                {statusText}
              </span>
              <span className={systemReady ? "text-emerald-400" : "text-cyan-400"}>
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Track */}
            <div className="relative w-full h-1 bg-slate-950/60 rounded-full overflow-hidden border border-white/4 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all ${
                  systemReady 
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] duration-700" 
                    : "bg-[linear-gradient(90deg,#3b82f6,#06b6d4)] duration-75"
                }`}
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
          </div>
        </div>

        <p className="font-inter text-xs uppercase tracking-[0.25em] text-cyan-100/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          ACLC Student Council
        </p>
        <h1 className="font-lexend mt-2 text-2xl font-bold text-slate-100 sm:text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
          Official Voting Portal
        </h1>
        <p
          className={`font-inter mt-2 text-sm italic transition-colors duration-700 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] ${
            systemReady ? "text-emerald-200/85" : "text-sky-100/70"
          }`}
        >
          Secure Ballot • Real-time Tallying • Democratic Representation
        </p>
      </div>

      <div className="font-inter absolute bottom-8 text-xs text-cyan-100/55 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
        ACLC Elections Operations Console v1.0
      </div>

      <style jsx>{`
        .logo-wrap {
          animation: logo-float 2.8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.75));
        }

        @keyframes logo-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }


        @keyframes ballot-slide {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          70% {
            opacity: 1;
            transform: translateY(34px);
          }
          95%, 100% {
            opacity: 0;
            transform: translateY(44px);
          }
        }

        .ballot-paper {
          animation: ballot-slide 2.2s ease-in-out infinite;
        }

        @keyframes ballot-breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .animate-ballot-breathe {
          animation: ballot-breathe 2.4s ease-in-out infinite;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
        }
      `}</style>
    </div>
  );
}
