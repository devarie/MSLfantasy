import CompetitionsWrapper from "@/components/CompetitionsWrapper";
import FantasyScoresWrapper from "@/components/FantasyScoresWrapper";
import Welcome from "@/components/Welcome";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation */}
      <MorphicNavbar />

      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 font-sans dark:from-slate-900 dark:via-emerald-950 dark:to-stone-900">
        {/* Hero Image Section */}
        <section id="hero" className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-b from-sky-100 to-emerald-50 dark:from-slate-800 dark:to-emerald-950">
          <Image
            src="/images/MSL visual.webp"
            alt="MSL Fantasy Ardennen"
            fill
            priority
            className="object-contain md:object-cover"
          />
        </section>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <section id="welkom" className="scroll-mt-20">
            <Welcome />
          </section>

          {/* Spelregels Section - This will be part of Welcome accordions */}
          <section id="spelregels" className="scroll-mt-20">
            {/* Empty section, spelregels is in Welcome accordion */}
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
