import React from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Mail, Sparkles } from 'lucide-react';
import { SITE, hasContactEmail } from '../../config/site';
import { SupportedLanguage } from '../../services/i18n';
import { getCorporateCopy } from '../../locales/corporate';

interface SahayakAIViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
}

/**
 * Honest status page for Sahayak AI.
 *
 * Sahayak is a product concept in this build. There is no model, no tutoring
 * backend and no generated lesson content. The page says that plainly.
 */
export const SahayakAIView: React.FC<SahayakAIViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
}) => {
  // Concept pages have no full product-app dictionary yet. Keep the whole page
  // in English rather than mixing a translated heading with English body copy.
  const copy = getCorporateCopy('en');
  const item = copy.items.sahayak;

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-slate-800 flex flex-col font-sans">
      <header className="border-b border-[#E4DCCB] bg-[#F7F3EC]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            onClick={() => onNavigate('corporate')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-purple-800"
          >
            <ArrowLeft className="h-4 w-4" />
            CREZORA.CO
          </button>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-800">
            {copy.products.concept}
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-100 text-amber-800">
            <GraduationCap className="h-6 w-6" />
          </span>
          <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800">
            {item.category} · {copy.products.concept}
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Sahayak AI
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-600">
            {copy.hero.tagline}
          </p>
          {currentLanguage !== 'en' && (
            <p className="mt-3 text-xs font-medium text-slate-500">
              This concept page is currently in English. The corporate site follows
              your selected language.
            </p>
          )}

          <div className="mt-8 rounded-3xl border border-[#E0D6C5] bg-white/75 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h2 className="text-base font-bold text-slate-950">Not available yet</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.summary} There is no teaching model, lesson generator or student data
                  pipeline in this build.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={() => onNavigate('corporate')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-bold text-white hover:bg-purple-900"
            >
              Back to the ecosystem
              <ArrowRight className="h-4 w-4" />
            </button>
            {hasContactEmail() && (
              <a
                href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent('Sahayak AI concept')}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CCB7] bg-white/70 px-5 py-3 text-xs font-semibold text-slate-800 hover:bg-white"
              >
                <Mail className="h-4 w-4" />
                Discuss the concept
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
