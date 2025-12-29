'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface CardFlipProps {
  name: string;
  avatar: string;
  bio: string;
}

export default function CardFlip({ name, avatar, bio }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-[600px] w-full max-w-lg" style={{ perspective: '1000px' }}>
      <div
        className="relative h-full w-full cursor-pointer transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-4 border-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 shadow-2xl [backface-visibility:hidden] dark:from-emerald-900 dark:to-emerald-950">
          <div className="mb-6 overflow-hidden rounded-full border-4 border-emerald-600 bg-white shadow-lg dark:border-emerald-500 dark:bg-emerald-800">
            {avatar && avatar !== '/images/avatars/placeholder.jpg' ? (
              <Image
                src={avatar}
                alt={name}
                width={240}
                height={240}
                className="h-60 w-60 object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-60 w-60 items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-700 dark:to-emerald-800">
                <User className="h-32 w-32 text-emerald-600 dark:text-emerald-300" />
              </div>
            )}
          </div>
          <h3 className="text-center text-3xl font-bold text-emerald-900 dark:text-emerald-100">
            {name}
          </h3>
          <p className="mt-4 text-center text-sm text-emerald-700 dark:text-emerald-300">
            Klik om bio te lezen
          </p>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 flex flex-col rounded-2xl border-4 border-emerald-600 bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] dark:from-emerald-700 dark:to-emerald-900">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="mb-4 text-center text-2xl font-bold text-white">
            {name}
          </h3>
          <div className="flex-1 overflow-y-auto rounded-xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="whitespace-pre-line text-sm leading-relaxed text-white">
              {bio}
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-white/80">
            Klik om terug te gaan
          </p>
        </div>
      </div>
    </div>
  );
}
