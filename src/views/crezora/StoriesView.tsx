import React from 'react';
import {
  FileText,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { GlobalEcosystemSwitcher } from '../../components/common/GlobalEcosystemSwitcher';
import { Footer } from '../../components/common/Footer';
import { SupportedLanguage } from '../../services/i18n';

interface StoriesViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

/**
 * CREZORA Stories.
 *
 * The previous version rendered eight "editorial" articles with invented
 * authors and claims about the platform. They were not real reporting, so the
 * list is empty until genuine, attributed writing exists.
 */
export const StoriesView: React.FC<StoriesViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth
}) => {
  const plannedTopics = [
    'Working notes from the KalaaVerse studios',
    'Interviews with creators who have agreed to be named',
    'Honest write-ups of what we shipped and what broke',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden">
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
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-purple-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>CREZORA STORIES</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GlobalEcosystemSwitcher currentView="stories" onNavigate={onNavigate} />
            <button
              onClick={() => onNavigate('crezora')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        {/* Editorial Headline */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs font-mono uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>The CREZORA Journal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 uppercase leading-[1.08]">
            ESSAYS ON CRAFT, <br />
            <span className="text-purple-700">
              LANGUAGE & COMPUTING
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            No issues have been published yet. When there are real, attributed pieces, they will
            appear here.
          </p>
        </section>

        {/* Honest empty state */}
        <section className="p-10 sm:p-14 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Nothing published yet</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            This journal will carry only work that is written, credited and true. Until then it stays
            empty rather than publishing placeholder articles.
          </p>
        </section>

        {/* Planned topics */}
        <section className="space-y-4 max-w-3xl">
          <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
            Planned, not published
          </span>
          <ul className="space-y-2 text-sm text-slate-600">
            {plannedTopics.map(topic => (
              <li key={topic} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-4">
          <button
            onClick={() => onNavigate('crezora')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer hover:scale-105 shadow-lg shadow-purple-600/20"
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
