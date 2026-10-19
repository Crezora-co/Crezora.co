import React from 'react';
import {
  Zap,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  Volume2,
  GraduationCap,
} from 'lucide-react';
import { GlobalEcosystemSwitcher } from '../../components/common/GlobalEcosystemSwitcher';
import { Footer } from '../../components/common/Footer';
import { SupportedLanguage } from '../../services/i18n';

interface LabsViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

/**
 * CREZORA Labs.
 *
 * Earlier versions of this page listed experiments with invented results,
 * benchmark scores and named leads. None of that research exists, so it has
 * been removed. What remains is an honest statement of interest areas.
 */
export const LabsView: React.FC<LabsViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth
}) => {
  const interests = [
    {
      icon: Layers,
      title: 'Indic typography & typesetting',
      note: 'Better defaults for complex scripts, line metrics and vertical rhythm.',
    },
    {
      icon: Volume2,
      title: 'Speech & pronunciation tools',
      note: 'Only with a real, consented dataset and an honest accuracy statement.',
    },
    {
      icon: Cpu,
      title: 'Local-first creative software',
      note: 'Tools that work offline and keep your files on your own device.',
    },
    {
      icon: GraduationCap,
      title: 'Craft documentation',
      note: 'Recording technique with the practitioner’s consent and credit.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans selection:bg-cyan-200 selection:text-cyan-900 relative overflow-x-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8FF]/95 backdrop-blur-xl border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('crezora')}
              className="flex items-center gap-2 text-slate-500 hover:text-purple-700 transition-colors cursor-pointer text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>CREZORA.CO</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>CREZORA LABS</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GlobalEcosystemSwitcher currentView="labs" onNavigate={onNavigate} />
            <button
              onClick={() => onNavigate('crezora')}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        {/* Editorial Header */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-600" />
            <span>Research & Exploration</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 uppercase leading-[1.08]">
            CREZORA <br />
            <span className="text-cyan-700">
              LABS
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            There are no published experiments yet. This page lists the areas we are curious about,
            not results we have achieved.
          </p>
        </section>

        {/* Honest empty state */}
        <section className="p-10 sm:p-14 rounded-3xl bg-white border border-dashed border-cyan-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No research is published in this build</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            This page will document genuine work with verifiable results. Until then it stays empty —
            no benchmarks, deployment figures or named researchers are claimed.
          </p>
        </section>

        {/* Areas of interest */}
        <section className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-700 font-bold">
              Areas of interest
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Things we would like to understand better
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              These are questions, not products. No timelines are promised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interests.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-3xl bg-white border border-purple-100 hover:border-cyan-300 transition-all duration-200 flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pt-4 text-center">
          <button
            onClick={() => onNavigate('crezora')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all cursor-pointer hover:scale-105 shadow-lg shadow-cyan-600/20"
          >
            <span>Back to the CREZORA Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      <Footer currentLanguage={currentLanguage} onNavigate={onNavigate} onOpenAuth={onOpenAuth} />
    </div>
  );
};
