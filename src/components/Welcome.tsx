import { Users, Target, Trophy, AlertTriangle } from 'lucide-react';
import WelcomeAccordion from './WelcomeAccordion';

interface CompetitionData {
  success: boolean;
  sheets: Array<{
    name: string;
    data: string[][];
  }>;
}

async function getCompetitionsData(): Promise<CompetitionData | null> {
  try {
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/competitions`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch competitions data:', error);
    return null;
  }
}

export default async function Welcome() {
  const data = await getCompetitionsData();

  // Calculate counts from data
  const deelnemersSheet = data?.sheets.find(sheet => sheet.name === 'Deelnemers');
  const playerCount = deelnemersSheet?.data ? deelnemersSheet.data.length - 1 : 10; // -1 for header
  const eventCount = data?.sheets ? data.sheets.filter(sheet => sheet.name !== 'Deelnemers').length : 10;

  const stats = [
    {
      icon: Users,
      value: playerCount.toString(),
      label: 'Spelers',
      subtitle: 'Kies jouw team',
    },
    {
      icon: Target,
      value: eventCount.toString(),
      label: 'Events',
      subtitle: 'Van outfit tot klimmen',
    },
    {
      icon: Trophy,
      value: '1',
      label: 'Winnaar',
      subtitle: 'Wordt jij kampioen?',
    },
  ];

  const rules = [
    'Maak een team van 6 spelers uit de totale pool van 10 spelers. Kies jezelf niet. Jij zit altijd in je team.',
    'Selecteer per evenement 3 van je 6 spelers om punten te scoren. Niet jezelf, jij speelt altijd mee.',
    'Wijs 1 kopman aan per evenement die dubbele punten verdient. Je mag hier ook jezelf kiezen',
    'Deadline voor de eerste 6 man voor aankomst in de Ardennen. Deadline 3 man + kopman voor elke event. Stuur je team naar Minne voor de deadline',
    'Puntenverdeling 1ste 10pt, 2de 8pt, 3de 6pt (Kopman x2). Games in teamverband. Iedereen uit het winnende team krijgt 10 punten',
  ];

  return (
    <div className="w-full space-y-6">
      {/* Welcome Text - Outside Accordions */}
      <div className="rounded-lg border border-emerald-200 bg-white/95 p-6 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50">
        <div className="mb-4 flex flex-col items-center gap-3">
          <div className="rounded-full bg-emerald-600 p-2">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Welkom bij de Mike Sports Leaque Fantasy!
          </h2>
          <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 text-center">
            Speel nu mee in de eerste Fantasy Sports game van 2026!
          </p>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-center">
          Stel jouw ultieme Mike-Team samen en domineer de Ardennen! Kies 6 Mike's, en selecteer per event je beste 3, en kroon/kies een kopman die dubbele punten scoort.
        </p>
      </div>

      {/* Accordions - closer spacing */}
      <div className="space-y-3">
        {/* Accordion 1: Rules */}
        <WelcomeAccordion title="Spelregels" id="spelregels">
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                {index + 1}
              </div>
              <p className="flex-1 text-zinc-700 dark:text-zinc-300">{rule}</p>
            </div>
          ))}
        </div>
      </WelcomeAccordion>

      {/* Accordion 2: Warning */}
      <WelcomeAccordion title="Let op!">
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h4 className="mb-1 font-semibold text-amber-900 dark:text-amber-100">Annuleringen mogelijk</h4>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Events kunnen geannuleerd worden vanwege Corona, stakingen, of andere onvoorziene
                omstandigheden. Hierin wordt altijd de organisatie van het desbetreffende evenement gevolgd.
              </p>
            </div>
          </div>
        </div>
      </WelcomeAccordion>
      </div>

      {/* Statistics Section - Outside Accordions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm dark:border-emerald-700 dark:bg-emerald-900/30"
            >
              <Icon className="mb-2 h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              <div className="mb-1 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                {stat.label}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
