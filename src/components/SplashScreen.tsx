'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AttractButton from '@/components/kokonutui/attract-button';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show button after animation completes (5s)
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(buttonTimer);
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    // Hide splash screen after fade-out animation (0.5s)
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 dark:from-slate-900 dark:via-emerald-950 dark:to-stone-900 ${isFadingOut ? 'animate-fade-out' : ''}`}>
      <div className="animate-spin-y">
        <Image
          src="/images/mike 40 visual.webp"
          alt="Mike 40"
          width={400}
          height={400}
          priority
          className="h-auto w-auto max-w-[80vw] md:max-w-md"
        />
      </div>

      {showButton && (
        <div className="animate-fade-in">
          <AttractButton
            onClick={handleEnter}
            className="bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
          >
            Enter MSL Fantasy
          </AttractButton>
        </div>
      )}
    </div>
  );
}
