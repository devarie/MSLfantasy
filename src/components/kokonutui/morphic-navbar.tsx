"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = {
  "#welkom": {
    name: "Welkom",
  },
  "#spelregels": {
    name: "Spelregels",
  },
  "#scores": {
    name: "Scores",
  },
};

export function MorphicNavbar() {
  const [activePath, setActivePath] = useState("#welkom");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = Object.keys(navItems);
      for (const section of sections) {
        const element = document.getElementById(section.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActivePath(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setActivePath(href);
  };

  const isActiveLink = (path: string) => {
    return activePath === path;
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-emerald-50/90 shadow-md backdrop-blur-md dark:bg-emerald-950/90"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        {/* Mobile: Logo above navigation */}
        <div className="mb-3 flex justify-center md:hidden">
          <Image
            src="/images/MSL-logo.webp"
            alt="MSL Fantasy Logo"
            width={180}
            height={60}
            className="h-auto w-auto max-h-15"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Desktop: Logo on the left */}
          <div className="hidden md:block">
            <Image
              src="/images/MSL-logo.webp"
              alt="MSL Fantasy Logo"
              width={225}
              height={75}
              className="h-auto w-auto max-h-18"
            />
          </div>

          {/* Center navigation */}
          <div className="glass flex items-center justify-between overflow-hidden rounded-xl shadow-lg">
            {Object.entries(navItems).map(([path, { name }], index, array) => {
              const isActive = isActiveLink(path);
              const isFirst = index === 0;
              const isLast = index === array.length - 1;
              const prevPath = index > 0 ? array[index - 1][0] : null;
              const nextPath =
                index < array.length - 1 ? array[index + 1][0] : null;

              return (
                <button
                  className={clsx(
                    "flex items-center justify-center bg-emerald-800 p-2 px-6 text-sm text-emerald-50 transition-all duration-300 hover:bg-emerald-700 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-800",
                    isActive
                      ? "mx-2 rounded-xl font-semibold bg-emerald-600 text-white dark:bg-emerald-700"
                      : clsx(
                          (isActiveLink(prevPath || "") || isFirst) &&
                            "rounded-l-xl",
                          (isActiveLink(nextPath || "") || isLast) &&
                            "rounded-r-xl"
                        )
                  )}
                  key={path}
                  onClick={() => scrollToSection(path)}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
