'use client';

import { useState, useEffect } from 'react';
import { Beer, Wind, User, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageModal from './ImageModal';

interface MenuItem {
  id: string;
  label: string;
  icon: typeof Beer;
  imageSrc: string;
  imageAlt: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'biertje',
    label: 'Tussen Biertje',
    icon: Beer,
    imageSrc: '/images/mike tussen biertje.webp',
    imageAlt: 'Mike tussen biertje',
  },
  {
    id: 'snuifje',
    label: 'Tussen Snuifje',
    icon: Wind,
    imageSrc: '/images/mike-tussen-snuifje2.png',
    imageAlt: 'Mike tussen snuifje',
  },
  {
    id: 'stand',
    label: 'Tussen Stand',
    icon: User,
    imageSrc: '/images/mike tussen stand.webp',
    imageAlt: 'Mike tussen stand',
  },
];

export default function ScrollSideMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scoresSection = document.getElementById('scores');
      if (scoresSection) {
        const rect = scoresSection.getBoundingClientRect();
        // Show menu when scores section is in view
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Side Menu */}
      <div
        className={`fixed right-0 top-1/2 z-50 -translate-y-1/2 transition-all duration-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col gap-3 rounded-l-2xl border-y-4 border-l-4 border-emerald-600 bg-gradient-to-l from-emerald-50 to-emerald-100 p-3 shadow-2xl dark:from-emerald-950 dark:to-emerald-900">
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center justify-center rounded-xl border-2 border-emerald-600 bg-emerald-600 px-3 py-2 transition-all hover:scale-105 hover:bg-emerald-700 dark:border-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            aria-label={isExpanded ? 'Sluit menu' : 'Open menu'}
          >
            {isExpanded ? (
              <ChevronRight className="h-5 w-5 text-white" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-white" />
            )}
          </button>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group flex items-center rounded-xl border-2 border-emerald-600 bg-white py-3 transition-all hover:scale-105 hover:border-emerald-700 hover:bg-emerald-50 hover:shadow-lg dark:border-emerald-700 dark:bg-emerald-950 dark:hover:border-emerald-600 dark:hover:bg-emerald-900 ${
                  isExpanded ? 'gap-3 px-4' : 'justify-center px-3'
                }`}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-emerald-700 transition-colors group-hover:text-emerald-800 dark:text-emerald-400 dark:group-hover:text-emerald-300" />
                {isExpanded && (
                  <span className="whitespace-nowrap text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.imageSrc || ''}
        imageAlt={selectedImage?.imageAlt || ''}
      />
    </>
  );
}
