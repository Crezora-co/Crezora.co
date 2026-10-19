import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Palette,
  Heart,
  Languages,
  ShieldCheck,
  Compass,
  Globe,
  Zap,
} from 'lucide-react';
import { GlobalEcosystemSwitcher } from '../../components/common/GlobalEcosystemSwitcher';
import { Footer } from '../../components/common/Footer';
import { SupportedLanguage } from '../../services/i18n';
import { SITE, FEATURES } from '../../config/site';

interface AboutViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden">
      {/* Top Floating Ecosystem Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8FF]/95 backdrop-blur-xl border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('crezora')}
              className="flex items-center gap-2 text-slate-500 hover:text-purple-700 transition-colors cursor-pointer text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{SITE.parentBrand}</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-purple-700">
              Manifesto & Story
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GlobalEcosystemSwitcher currentView="about" onNavigate={onNavigate} />
            <button
              onClick={() => onNavigate('crezora')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Explore Worlds →
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-24">
        {/* Editorial Headline */}
        <section className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The CREZORA Company Story</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] uppercase">
            WE ARE BUILDING <br />
            <span className="text-purple-700">
              A WORLD WHERE POTENTIAL
            </span> <br />
            IS EASIER TO FIND.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed font-light">
            This is an early-stage idea, not a finished platform. We are starting with a small,
            honest creative workspace and expanding only as real capabilities are built.
          </p>
        </section>

        {/* SECTION 1: WHY CREZORA EXISTS */}
        <section className="border-t border-purple-100 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">
              01 / THE CONVICTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Why CREZORA Exists
            </h2>
          </div>
          <div className="md:col-span-8 space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg">
            <p>
              In India and across the global South, extraordinary creative work is often invisible to
              the people who would value it most. The distribution platforms creators are given tend
              to reward engagement volume rather than craft.
            </p>
            <p>
              We want to try a different starting point: a calm workspace that helps a creator finish
              and present their work, and that says clearly what it can and cannot do.
            </p>
            <p className="text-slate-900 font-medium pl-4 border-l-2 border-purple-500 italic">
              "Our first commitment is honesty. A product that pretends to have a marketplace,
              payments or intelligence it does not have is not a product worth trusting."
            </p>
          </div>
        </section>

        {/* SECTION 2: WHAT WE BELIEVE */}
        <section className="border-t border-purple-100 pt-16 space-y-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">
              02 / THE MANIFESTO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              What We Believe
            </h2>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-purple-100 space-y-3 hover:border-purple-300 transition-colors shadow-sm">
              <span className="text-xs font-mono text-purple-600">STATEMENT I</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                EVERY PERSON HAS SOMETHING TO CREATE.
              </p>
              <p className="text-sm sm:text-base text-slate-500">
                Creativity is not the exclusive privilege of elite studios in metropolitan centers.
                Good tools should be available in every district, town and rural atelier.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-purple-100 space-y-3 hover:border-teal-300 transition-colors shadow-sm">
              <span className="text-xs font-mono text-teal-600">STATEMENT II</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                EVERY LANGUAGE HAS SOMETHING TO SAY.
              </p>
              <p className="text-sm sm:text-base text-slate-500">
                Language carries grief, humor, philosophy and collective memory. Any translation work
                we ship must respect that, and we would rather ship none than ship a convincing fake.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-purple-100 space-y-3 hover:border-amber-300 transition-colors shadow-sm">
              <span className="text-xs font-mono text-amber-600">STATEMENT III</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                EVERY IDEA DESERVES A CHANCE.
              </p>
              <p className="text-sm sm:text-base text-slate-500">
                The gap between an idea and its realisation should not be gatekept by intermediaries
                who profit from obscurity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-purple-100 space-y-3 hover:border-rose-300 transition-colors shadow-sm">
              <span className="text-xs font-mono text-rose-600">STATEMENT IV</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                EVERY HUMAN DESERVES TO BE HEARD.
              </p>
              <p className="text-sm sm:text-base text-slate-500">
                Software should hold space for quiet moments and human wellbeing rather than demand
                constant attention.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT EXISTS TODAY */}
        <section className="border-t border-purple-100 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">
              03 / THE ECOSYSTEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              What Exists Today
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              No part of this build connects to a server. Everything runs in your browser and is
              stored on this device.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">01 — KalaaVerse: creative workspace</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Writing, visual art, music and photo studios, a personal library and local profile
                  setup. This is the part of the ecosystem that actually runs. Payments, a public
                  marketplace and verified credentials do not exist.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">02 — Chitti: a concept only</h3>
                <p className="text-sm text-slate-500 mt-1">
                  A concept for a calmer kind of companion interface. There is no AI provider
                  connected in this build, so Chitti is not offered as a working product.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">03 — BhashaVerse: translation, when configured</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {FEATURES.translationEngine
                    ? 'A translation endpoint is configured for this deployment. Coverage depends on that service.'
                    : 'No translation endpoint is configured for this build, so the translation engine is switched off. No sample translations are shown.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT COMES NEXT */}
        <section className="border-t border-purple-100 pt-16 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">
              04 / THE HORIZON
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              What We Would Like To Build
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              These are intentions, not commitments. None of them are available today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
              <Zap className="w-6 h-6 text-cyan-600 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">CREZORA Labs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explorations in Indic speech, craft documentation and spatial heritage archival.
                Nothing here is shipped.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
              <Globe className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">A real network</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connecting Indian artisans with contemporary studios requires real infrastructure and
                real contracts — neither exists in this build.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Creator data rights</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Any future dataset work would need explicit consent and clear attribution. We do not
                train models on your work today.
              </p>
            </div>
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={() => onNavigate('crezora')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all cursor-pointer hover:scale-105"
            >
              <span>Enter The CREZORA Universe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Honest footer note */}
        <section className="border-t border-purple-100 pt-8 flex items-start gap-3 text-xs text-slate-500">
          <Compass className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {SITE.productName} is in {SITE.releaseLabel.toLowerCase()}. This page describes an
            intention and the current state of the build — not a finished company, product suite or
            customer base.
          </p>
        </section>
      </main>

      <Footer currentLanguage={currentLanguage} onNavigate={onNavigate} onOpenAuth={onOpenAuth} />
    </div>
  );
};
