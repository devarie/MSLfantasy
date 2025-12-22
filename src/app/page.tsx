import CompetitionsWrapper from "@/components/CompetitionsWrapper";
import FantasyScoresWrapper from "@/components/FantasyScoresWrapper";
import Welcome from "@/components/Welcome";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import DarkModeToggle from "@/components/DarkModeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation */}
      <MorphicNavbar />

      {/* Fixed Dark Mode Toggle */}
      <div className="fixed right-4 z-50" style={{ top: '18vh' }}>
        <DarkModeToggle />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 font-sans dark:from-slate-900 dark:via-emerald-950 dark:to-stone-900">
        {/* Hero Image Section */}
        <section id="hero" className="relative h-screen min-h-[500px] md:h-[60vh] w-full overflow-hidden">
          <Image
            src="/images/MSL visual.webp"
            alt="MSL Fantasy Ardennen"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
        </section>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <section id="welkom" className="scroll-mt-20">
            <Welcome />
          </section>

          {/* Scores Section */}
          <section id="scores" className="scroll-mt-20">
            <div className="mt-12">
              <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
                Competitie Standen
              </h2>
              <CompetitionsWrapper />
            </div>

            {/* Fantasy score cards below */}
            <FantasyScoresWrapper />
          </section>
        </main>
      </div>
    </>
  );
}
