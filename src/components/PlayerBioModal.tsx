'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import CardFlip from './CardFlip';
import { PlayerBio } from '@/data/playerBios';

interface PlayerBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerBio | null;
}

export default function PlayerBioModal({ isOpen, onClose, player }: PlayerBioModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-20 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Sluit speler bio"
        >
          <X className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
        </button>

        {/* Card Flip */}
        <CardFlip
          name={player.name}
          avatar={player.avatar}
          bio={player.bio}
        />
      </div>
    </div>
  );
}
