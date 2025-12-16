'use client';

import { useState } from 'react';
import { Users, Target, Trophy, List, AlertTriangle, ChevronDown } from 'lucide-react';

export default function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const stats = [
    {
      icon: Users,
      value: '10',
      label: 'Spelers',
      subtitle: 'Kies jouw team',
    },
    {
      icon: Target,
      value: '10',
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
    'Maak een team van 6 spelers uit de totale pool van 10 spelers',
    'Selecteer per event 3 van je 6 spelers om punten te scoren',
    'Wijs 1 kopman aan die dubbele punten verdient',
    'Teams worden gelocked na het eerste event',
    'Punten: 1e = 10pt, 2e = 9pt, ..., 10e = 1pt (kopman x2)',
  ];

  return (
    <div className="w-full">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-8 shadow-lg transition-all hover:shadow-xl dark:border-emerald-900 dark:from-emerald-950 dark:to-green-950"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500 p-3">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
              Welkom bij Ardeno Fantasy Sports!
            </h2>
          </div>
          <ChevronDown
            className={`h-8 w-8 text-emerald-700 transition-transform dark:text-emerald-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        <p className="mt-4 text-left text-lg text-emerald-800 dark:text-emerald-200">
          Stel jouw ultieme A-Team samen en domineer de Ardennen! Kies 6 spelers, selecteer per
          event je beste 3, en kroon een kopman die dubbele punten scoort.
        </p>
      </button>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-8 pt-8">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl dark:border-emerald-800 dark:bg-zinc-900"
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-emerald-100 opacity-20 transition-transform group-hover:scale-110 dark:bg-emerald-900" />
              <div className="relative">
                <Icon className="mb-3 h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                <div className="mb-2 text-4xl font-bold text-emerald-900 dark:text-emerald-50">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                  {stat.label}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                  {stat.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules Section */}
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-lg dark:border-emerald-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center gap-3">
          <List className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">Spelregels</h3>
        </div>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                {index + 1}
              </div>
              <p className="flex-1 pt-1 text-emerald-800 dark:text-emerald-200">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Section */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-md dark:border-amber-700 dark:bg-amber-950">
        <div className="flex gap-4">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <h4 className="mb-2 font-bold text-amber-900 dark:text-amber-100">Let op!</h4>
            <p className="text-amber-800 dark:text-amber-200">
              Events kunnen geannuleerd worden vanwege Corona, stakingen, of andere onvoorziene
              omstandigheden. Net als bij de Tour de France!
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
