'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import CardFlip from './CardFlip';
import { PlayerBio } from '@/data/playerBios';

interface PlayerBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerBio | null;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function PlayerBioModal({ isOpen, onClose, player, onNext, onPrevious }: PlayerBioModalProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !player) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 flex items-center gap-2 md:gap-4 w-full max-w-[95vw] md:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous button */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="rounded-full bg-white p-2 md:p-3 shadow-lg transition-all hover:scale-110 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-900 shrink-0"
            aria-label="Vorige speler"
          >
            <ChevronLeft className="h-5 w-5 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
          </button>
        )}

        {/* Card content */}
        <div className="relative flex-1">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 md:-right-4 md:-top-4 z-20 rounded-full bg-white p-1.5 md:p-2 shadow-lg transition-all hover:scale-110 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            aria-label="Sluit speler bio"
          >
            <X className="h-5 w-5 md:h-6 md:w-6 text-zinc-900 dark:text-zinc-100" />
          </button>

          {/* Card */}
          <CardFlip
            name={player.name}
            avatar={player.avatar}
            bio={player.bio}
          />
        </div>

        {/* Next button */}
        {onNext && (
          <button
            onClick={onNext}
            className="rounded-full bg-white p-2 md:p-3 shadow-lg transition-all hover:scale-110 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-900 shrink-0"
            aria-label="Volgende speler"
          >
            <ChevronRight className="h-5 w-5 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
          </button>
        )}
      </div>
    </div>
  );
}
