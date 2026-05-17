"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import AppSplashScreen from "@/components/AppSplashScreen";
import LoginClient from "./login/LoginClient";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <AppSplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      
      {!showSplash && <LoginClient />}
    </>
  );
}
