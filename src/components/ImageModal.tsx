'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 max-h-[90vh] max-w-[90vw] md:max-w-[70vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-20 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Sluit foto"
        >
          <X className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
        </button>

        {/* Image container */}
        <div className="overflow-hidden rounded-2xl border-4 border-emerald-600 shadow-2xl">
          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-contain brightness-90"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
