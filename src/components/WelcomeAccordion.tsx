'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export default function WelcomeAccordion({ title, children, defaultOpen = false, id }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className="w-full rounded-lg border border-emerald-200 bg-white/95 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 scroll-mt-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30"
      >
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <ChevronDown
          className={`h-5 w-5 text-zinc-600 transition-transform dark:text-zinc-400 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-emerald-200 p-4 dark:border-emerald-800">
          {children}
        </div>
      </div>
    </div>
  );
}
