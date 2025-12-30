'use client';

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

interface CardFlipProps {
  name: string;
  avatar: string;
  bio: string;
}

export default function CardFlip({ name, avatar, bio }: CardFlipProps) {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasValidAvatar = avatar && avatar !== '/images/avatars/placeholder.jpg' && !imageError;

  // Render a skeleton during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-[90vh] md:h-[700px] w-full max-w-md md:max-w-2xl flex items-center justify-center">
        <div className="text-emerald-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] md:h-[750px] w-full max-w-md md:max-w-2xl">
      <div className="relative h-full w-full">
        {/* Single Side with Avatar, Name, and Bio */}
        <div className="h-full flex flex-col items-center rounded-2xl md:rounded-3xl border-2 md:border-4 border-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 md:p-8 shadow-2xl dark:from-emerald-900 dark:to-emerald-950">
          {/* Avatar */}
          <div className="mb-3 md:mb-6 rounded-full border-2 md:border-4 border-emerald-600 bg-white shadow-lg dark:border-emerald-500 dark:bg-emerald-800">
            {hasValidAvatar ? (
              <div className="relative h-32 w-32 md:h-40 md:w-40">
                <Image
                  src={avatar}
                  alt={name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover rounded-full"
                  onError={() => setImageError(true)}
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-700 dark:to-emerald-800">
                <User className="h-16 w-16 md:h-20 md:w-20 text-emerald-600 dark:text-emerald-300" />
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="mb-3 md:mb-6 text-center text-2xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-100">
            {name}
          </h3>

          {/* Bio */}
          <div className="flex-1 w-full overflow-y-auto rounded-xl md:rounded-2xl bg-white/80 dark:bg-emerald-900/50 p-4 md:p-6 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700">
            <div className="text-sm md:text-lg leading-relaxed text-emerald-900 dark:text-emerald-100 space-y-2 md:space-y-4">
              {bio.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
