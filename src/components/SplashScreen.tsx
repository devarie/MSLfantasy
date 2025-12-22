'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after animation (1.5s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 dark:from-slate-900 dark:via-emerald-950 dark:to-stone-900">
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
    </div>
  );
}
