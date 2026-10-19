import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Languages,
  Palette,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Zap,
  Users,
  Compass,
  BookOpen,
  Volume2,
  ChevronRight,
  Search,
  FileText,
  Clock,
  Camera,
  Code,
  Info,
} from 'lucide-react';
import { GlobalEcosystemSwitcher } from '../../components/common/GlobalEcosystemSwitcher';
import { Footer } from '../../components/common/Footer';
import { SupportedLanguage } from '../../services/i18n';
import { SITE, FEATURES } from '../../config/site';

interface CrezoraPortalViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
  onOpenCommandPalette?: () => void;
}

/**
 * The CREZORA public portal.
 *
 * This is a light editorial page for the parent brand. It describes only what
 * this build actually contains:
 *   - KalaaVerse, a local-first creative workspace in Early Access.
 *   - Chitti and BhashaVerse, which are concepts / disabled in this build.
 *
 * All previous interactive "demos" (scripted AI moods and canned translations)
 * have been removed because they simulated capabilities that do not exist.
 */
export const CrezoraPortalView: React.FC<CrezoraPortalViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth,
  onOpenCommandPalette
}) => {
  const [selectedOrbit, setSelectedOrbit] = useState<'crezora' | 'kalaaverse' | 'chitti' | 'bhashaverse'>('kalaaverse');

  const translationLabel = FEATURES.translationEngine ? 'Configured' : 'Not configured';

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden">

      {/* ═══ 1. GLOBAL STICKY ECOSYSTEM HEADER ════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#FAF8FF]/95 backdrop-blur-xl border-b border-purple-100 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                    CREZORA<span className="text-purple-600">.CO</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    {SITE.releaseLabel}
                  </span>
                </div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 leading-none">
                  Human-Centered Tech
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#hero" className="hover:text-purple-700 transition-colors">Vision</a>
            <a href="#what-is-crezora" className="hover:text-purple-700 transition-colors">What is CREZORA</a>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1 font-bold text-purple-700"
            >
              Services
            </button>
            <a href="#visualization" className="hover:text-purple-700 transition-colors">Ecosystem</a>
            <a href="#manifesto" className="hover:text-purple-700 transition-colors">Principles</a>
            <button
              onClick={() => onNavigate('labs')}
              className="hover:text-cyan-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-600" />
              <span>Labs</span>
            </button>
            <button
              onClick={() => onNavigate('stories')}
              className="hover:text-purple-700 transition-colors cursor-pointer"
            >
              Stories
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-purple-700 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <GlobalEcosystemSwitcher currentView="crezora" onNavigate={onNavigate} />

            <button
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Ctrl+K)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-slate-600 text-xs font-mono border border-purple-100 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-purple-600" />
              <kbd className="text-[10px] text-slate-400">Ctrl+K</kbd>
            </button>

            <button
              onClick={() => onNavigate('landing')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105"
            >
              <span>Enter KalaaVerse</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ 2. HERO ══════════════════════════════════════════════════════ */}
      <section id="hero" className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl space-y-8 text-left">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200 bg-white text-purple-700 text-xs font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>CREATIVE TECHNOLOGY STUDIO · EARLY STAGE</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight text-slate-900 leading-[0.98] uppercase font-sans">
              WE BUILD <br />
              <span className="text-purple-700">
                WHAT'S NEXT.
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-slate-600 max-w-2xl font-light leading-relaxed">
              CREZORA is a small, early-stage studio. We are starting with one working product — a
              creative workspace called KalaaVerse — and being explicit about the rest.
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed border-l-2 border-purple-400 pl-4">
            "Technology should amplify human potential." We are interested in creativity, language,
            culture and human connection. We are not claiming to have solved them.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#what-is-crezora"
              className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>EXPLORE CREZORA</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#visualization"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>SEE WHAT EXISTS</span>
              <ChevronRight className="w-4 h-4 text-purple-600" />
            </a>

            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm transition-all cursor-pointer flex items-center gap-2 hover:scale-105 shadow-lg shadow-indigo-600/20"
            >
              <span>WORK WITH CREZORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Core Pillars */}
          <div className="pt-10 border-t border-purple-100 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Creativity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Language</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span>Culture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Craft</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Human Connection</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2B. SECTION: WHAT IS CREZORA? ═════════════════════════════════ */}
      <section id="what-is-crezora" className="relative z-10 py-20 bg-white border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="max-w-4xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
              THE CREZORA PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
              WE DON'T JUST BUILD SOFTWARE. <br />
              <span className="text-purple-700">WE BUILD PRODUCTS.</span> WE BUILD EXPERIENCES. <br />
              WE SOLVE PROBLEMS. <span className="text-indigo-700">WE CREATE POSSIBILITIES.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light max-w-2xl leading-relaxed">
              That is the ambition. The current reality is smaller: a browser-based creative workspace,
              a handful of studios, and a public statement of what is still missing. We would rather
              show you the latter than invent the former.
            </p>
          </div>

          {/* Product creation process */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
              HOW WE APPROACH PRODUCT WORK
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { step: '01', name: 'IDEA', desc: 'Raw spark & hypothesis', color: 'border-purple-200 bg-purple-50' },
                { step: '02', name: 'RESEARCH', desc: 'Talk to practitioners', color: 'border-indigo-200 bg-indigo-50' },
                { step: '03', name: 'DESIGN', desc: 'Interaction & structure', color: 'border-pink-200 bg-pink-50' },
                { step: '04', name: 'ENGINEERING', desc: 'Small, testable code', color: 'border-cyan-200 bg-cyan-50' },
                { step: '05', name: 'RELEASE', desc: 'Honest early access', color: 'border-amber-200 bg-amber-50' },
                { step: '06', name: 'LEARN', desc: 'Listen and revise', color: 'border-emerald-200 bg-emerald-50' }
              ].map((phase, idx) => (
                <div
                  key={phase.step}
                  className={`p-4 rounded-xl border ${phase.color} flex flex-col justify-between space-y-3 relative group hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500">{phase.step}</span>
                    {idx < 5 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />}
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-slate-900 block tracking-wide">{phase.name}</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{phase.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 2C. SECTION: THE TWO WORLDS ══════════════════════════════════ */}
      <section id="two-worlds" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-700 font-bold">
            THE TWO WORLDS OF CREZORA
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
            STUDIO & PRODUCTS
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-light">
            Client services and our own product work. Only one of those products is live today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* WORLD 01: CREZORA SERVICES */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-indigo-200 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-indigo-400 transition-all shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 uppercase">
                  WORLD 01
                </span>
                <span className="text-xs font-mono text-slate-500">CLIENT STUDIO</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
                CREZORA SERVICES
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                For startups, brands and independent teams. We can discuss software, web and mobile
                product work, interface design and creative technology. Enquiries are handled
                personally — there is no automated hiring flow on this site.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-indigo-700 uppercase tracking-wider font-bold block">
                  Capabilities include:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {['Software Development', 'Web & Mobile Apps', 'UI/UX & Product Design', 'Creative Technology', 'Cloud & DevOps', 'Technical Writing'].map(cap => (
                    <div key={cap} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 group-hover:scale-105"
              >
                <span>EXPLORE CREZORA SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-slate-400">Enquiry-based</span>
            </div>
          </div>

          {/* WORLD 02: CREZORA PRODUCTS */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-purple-200 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-purple-400 transition-all shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200 uppercase">
                  WORLD 02
                </span>
                <span className="text-xs font-mono text-slate-500">OUR OWN PRODUCTS</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
                CREZORA PRODUCTS
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Our own product ideas. One is available to use; the others are not implemented and are
                labelled as such.
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-purple-700 uppercase tracking-wider font-bold block">
                  Product status:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-between gap-3">
                    <div>
                      <strong className="text-slate-900 block font-bold">1. KalaaVerse</strong>
                      <span className="text-slate-500 text-[11px]">Local-first creative workspace & studios</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 shrink-0">EARLY ACCESS</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <strong className="text-slate-900 block font-bold">2. Chitti</strong>
                      <span className="text-slate-500 text-[11px]">Companion interface concept — no AI connected</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">CONCEPT</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <strong className="text-slate-900 block font-bold">3. BhashaVerse</strong>
                      <span className="text-slate-500 text-[11px]">Translation studio — requires a configured endpoint</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{translationLabel.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <a
                href="#visualization"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 group-hover:scale-105"
              >
                <span>EXPLORE THE PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs font-mono text-slate-400">1 live · 2 not available</span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 3. INTERACTIVE ECOSYSTEM ORBIT VISUALIZATION ═════════════════ */}
      <section id="visualization" className="relative z-10 py-20 bg-white border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
              THE ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              ONE IDEA, THREE DIRECTIONS
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-light">
              Select a node to see exactly what exists, what does not, and where to go next.
            </p>
          </div>

          {/* Interactive Orbit Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Visual Nodes */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-3xl bg-[#FAF8FF] border border-purple-100 relative min-h-[420px]">
              {/* Center Node: CREZORA */}
              <button
                onClick={() => setSelectedOrbit('crezora')}
                className={`relative z-20 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                  selectedOrbit === 'crezora'
                    ? 'bg-purple-600 ring-4 ring-purple-200 scale-110'
                    : 'bg-white border border-purple-200 hover:border-purple-400'
                }`}
              >
                <Sparkles className={`w-7 h-7 ${selectedOrbit === 'crezora' ? 'text-white' : 'text-purple-600'}`} />
                <span className={`text-[10px] font-mono font-bold mt-1 ${selectedOrbit === 'crezora' ? 'text-white' : 'text-slate-800'}`}>CREZORA</span>
                <span className={`text-[8px] ${selectedOrbit === 'crezora' ? 'text-purple-100' : 'text-slate-400'}`}>CORE</span>
              </button>

              {/* Connecting orbit rings */}
              <div className="absolute inset-8 rounded-full border border-purple-200 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-purple-200 pointer-events-none" />

              {/* Orbiting Node 1: KalaaVerse */}
              <button
                onClick={() => setSelectedOrbit('kalaaverse')}
                className={`absolute top-6 right-6 sm:right-12 z-20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer ${
                  selectedOrbit === 'kalaaverse'
                    ? 'bg-purple-600 text-white ring-2 ring-purple-200 scale-105'
                    : 'bg-white border border-purple-200 hover:border-purple-400 text-slate-700'
                }`}
              >
                <Palette className={`w-4 h-4 ${selectedOrbit === 'kalaaverse' ? 'text-white' : 'text-pink-500'}`} />
                <div className="text-left">
                  <div className="text-xs font-bold">KalaaVerse</div>
                  <div className={`text-[9px] font-mono ${selectedOrbit === 'kalaaverse' ? 'text-purple-100' : 'text-emerald-700'}`}>Live · Early Access</div>
                </div>
              </button>

              {/* Orbiting Node 2: Chitti */}
              <button
                onClick={() => setSelectedOrbit('chitti')}
                className={`absolute bottom-8 left-6 sm:left-10 z-20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer ${
                  selectedOrbit === 'chitti'
                    ? 'bg-sky-600 text-white ring-2 ring-sky-200 scale-105'
                    : 'bg-white border border-slate-200 hover:border-sky-400 text-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${selectedOrbit === 'chitti' ? 'text-white' : 'text-sky-500'}`} />
                <div className="text-left">
                  <div className="text-xs font-bold">Chitti</div>
                  <div className={`text-[9px] font-mono ${selectedOrbit === 'chitti' ? 'text-sky-100' : 'text-slate-500'}`}>Concept · Not available</div>
                </div>
              </button>

              {/* Orbiting Node 3: BhashaVerse */}
              <button
                onClick={() => setSelectedOrbit('bhashaverse')}
                className={`absolute bottom-8 right-6 sm:right-10 z-20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer ${
                  selectedOrbit === 'bhashaverse'
                    ? 'bg-teal-600 text-white ring-2 ring-teal-200 scale-105'
                    : 'bg-white border border-slate-200 hover:border-teal-400 text-slate-700'
                }`}
              >
                <Languages className={`w-4 h-4 ${selectedOrbit === 'bhashaverse' ? 'text-white' : 'text-teal-500'}`} />
                <div className="text-left">
                  <div className="text-xs font-bold">BhashaVerse</div>
                  <div className={`text-[9px] font-mono ${selectedOrbit === 'bhashaverse' ? 'text-teal-100' : 'text-slate-500'}`}>{translationLabel}</div>
                </div>
              </button>
            </div>

            {/* Right: Active Node Detail Panel */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-purple-100 space-y-6 shadow-sm">
              {selectedOrbit === 'kalaaverse' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-mono">
                    <Palette className="w-3.5 h-3.5" />
                    <span>01 — CREATIVITY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    KalaaVerse: Creative Workspace
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A browser-based workspace with writing, visual art, music and photo studios, a
                    personal library and a local profile. Everything is stored on your device.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      Working studios and a personal library
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      No server, no payments, no public marketplace
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      Profiles you create stay on this device
                    </li>
                  </ul>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('landing')}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer transition-all flex items-center gap-2"
                    >
                      <span>Launch KalaaVerse</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('discover')}
                      className="px-5 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-slate-700 font-semibold text-xs cursor-pointer transition-all"
                    >
                      Open Discovery
                    </button>
                  </div>
                </div>
              )}

              {selectedOrbit === 'chitti' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-mono">
                    <Heart className="w-3.5 h-3.5" />
                    <span>02 — COMPANION CONCEPT</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Chitti: Not Available
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Chitti is a design exploration for a gentler companion interface. There is no AI
                    provider connected in this build, so there is no chat, voice or emotional analysis
                    to try. The page is reachable from the ecosystem menu but offers no working features.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      No language model is integrated.
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      No voice capture or emotional inference is implemented.
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      disabled
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed"
                    >
                      Not available in this build
                    </button>
                  </div>
                </div>
              )}

              {selectedOrbit === 'bhashaverse' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-mono">
                    <Languages className="w-3.5 h-3.5" />
                    <span>03 — LANGUAGE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    BhashaVerse: Translation Studio
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A translation interface that only works when a real translation service is
                    configured for the deployment. {FEATURES.translationEngine
                      ? 'An endpoint is configured for this build, so the studio can be opened.'
                      : 'No endpoint is configured here, so the engine is disabled and no sample translations are shown.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      Language coverage depends entirely on the configured service.
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      We do not claim dialect or idiom preservation we cannot verify.
                    </li>
                  </ul>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('translation')}
                      className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer transition-all flex items-center gap-2"
                    >
                      <span>{FEATURES.translationEngine ? 'Open BhashaVerse' : 'View Translation Status'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {selectedOrbit === 'crezora' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CORPORATE CORE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    CREZORA.CO: The Parent Studio
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A young studio working on creative software. We publish our principles and our
                    limitations in the same place.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('about')}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer transition-all flex items-center gap-2"
                    >
                      <span>Read Our Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('labs')}
                      className="px-5 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-slate-700 font-semibold text-xs cursor-pointer transition-all"
                    >
                      CREZORA Labs
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE CREZORA MANIFESTO ═════════════════════════════════════ */}
      <section id="manifesto" className="relative z-10 py-24 sm:py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
            PRINCIPLES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            WE BELIEVE:
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-16 border-l-2 border-purple-200 pl-6 sm:pl-10">
          <div className="space-y-2 group">
            <span className="text-xs font-mono text-purple-600 uppercase">I</span>
            <p className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase leading-tight group-hover:text-purple-700 transition-colors">
              EVERY PERSON HAS <br />
              SOMETHING TO CREATE.
            </p>
          </div>

          <div className="space-y-2 group">
            <span className="text-xs font-mono text-teal-600 uppercase">II</span>
            <p className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase leading-tight group-hover:text-teal-700 transition-colors">
              EVERY LANGUAGE HAS <br />
              SOMETHING TO SAY.
            </p>
          </div>

          <div className="space-y-2 group">
            <span className="text-xs font-mono text-amber-600 uppercase">III</span>
            <p className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase leading-tight group-hover:text-amber-700 transition-colors">
              EVERY IDEA <br />
              DESERVES A CHANCE.
            </p>
          </div>

          <div className="space-y-2 group">
            <span className="text-xs font-mono text-rose-600 uppercase">IV</span>
            <p className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase leading-tight group-hover:text-rose-700 transition-colors">
              EVERY HUMAN <br />
              DESERVES TO BE HEARD.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-sm">
          <Compass className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Principles are not features. We list them because they guide what we choose to build, not
            as evidence that we have built it.
          </p>
        </div>
      </section>

      {/* ═══ 5. THREE PRODUCT WORLDS ══════════════════════════════════════ */}
      <section id="worlds" className="relative z-10 py-20 bg-white border-t border-purple-100 space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
              A CLOSER LOOK
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              THE THREE DIRECTIONS
            </h2>
          </div>

          {/* WORLD 1: KALAAVERSE */}
          <div className="rounded-3xl bg-gradient-to-b from-purple-50 to-white border border-purple-200 p-8 sm:p-12 relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-mono text-purple-700 uppercase font-bold tracking-widest">
                  DIRECTION 01 — CREATIVE WORKSPACE
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
                  "WHERE IMAGINATION MEETS OPPORTUNITY."
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  KalaaVerse is the only product in this ecosystem you can actually use today. It
                  gathers writing, art, music and photo studios into one local workspace with a
                  personal library. There is no public marketplace, no payments and no verified
                  reputation — those are explicitly out of scope for this build.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-purple-700">
                  <span className="px-3 py-1 rounded-lg bg-white border border-purple-200">Local-first</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-purple-200">No account server</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-purple-200">Four creative studios</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-purple-200">Personal library</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('landing')}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm cursor-pointer transition-all flex items-center gap-2"
                  >
                    <span>ENTER KALAAVERSE →</span>
                  </button>
                  <button
                    onClick={() => onNavigate('discover')}
                    className="px-6 py-3 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-700 font-semibold text-xs cursor-pointer transition-all"
                  >
                    OPEN DISCOVERY →
                  </button>
                </div>
              </div>

              {/* Creative fragments */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-purple-200">
                {[
                  { icon: Camera, label: 'Cinematography', sub: 'Lighting & composition', color: 'text-purple-600' },
                  { icon: Palette, label: 'Illustration', sub: 'Traditional & digital', color: 'text-pink-600' },
                  { icon: Volume2, label: 'Music', sub: 'Practice & composition', color: 'text-cyan-600' },
                  { icon: Code, label: 'Creative code', sub: 'Generative experiments', color: 'text-amber-600' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="p-3 rounded-xl bg-[#FAF8FF] border border-purple-100 text-xs">
                      <Icon className={`w-4 h-4 ${item.color} mb-1`} />
                      <span className="font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[10px] text-slate-500">{item.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* WORLD 2: CHITTI */}
          <div className="rounded-3xl bg-gradient-to-b from-sky-50 to-white border border-sky-200 p-8 sm:p-12 relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-mono text-sky-700 uppercase font-bold tracking-widest">
                  DIRECTION 02 — COMPANION CONCEPT
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
                  "A CALMER KIND OF INTERFACE."
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  Chitti is a sketch of software that listens rather than interrupts. It is not
                  available to use: no model, no speech recognition and no emotional analysis are
                  connected. We are keeping the idea written down instead of faking a demo.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-500">
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200">Concept only</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200">No AI provider</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200">No voice capture</span>
                </div>
                <div className="pt-2">
                  <button
                    disabled
                    className="px-6 py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed"
                  >
                    NOT AVAILABLE IN THIS BUILD
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-sky-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-sky-500" />
                    <span className="font-bold text-slate-900">Chitti · status</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">CONCEPT</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 leading-relaxed">
                  There is no simulated conversation here. A scripted "AI" exchange would misrepresent
                  a capability the product does not have.
                </div>
              </div>
            </div>
          </div>

          {/* WORLD 3: BHASHAVERSE */}
          <div className="rounded-3xl bg-gradient-to-b from-teal-50 to-white border border-teal-200 p-8 sm:p-12 relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-mono text-teal-700 uppercase font-bold tracking-widest">
                  DIRECTION 03 — TRANSLATION STUDIO
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
                  "LANGUAGE SHOULDN'T LIMIT EXPRESSION."
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  BhashaVerse is an interface for translation, not a translation model. It only
                  produces output when a real translation service is configured for the deployment.
                  {FEATURES.translationEngine
                    ? ' This deployment has an endpoint configured; coverage and quality are those of that service.'
                    : ' This deployment has no endpoint configured, so the studio is disabled.'}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-teal-700">
                  <span className="px-3 py-1 rounded-lg bg-white border border-teal-200">
                    {FEATURES.translationEngine ? 'Endpoint configured' : 'Endpoint not configured'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-teal-200">No bundled dictionary</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-teal-200">No sample translations</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('translation')}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm cursor-pointer transition-all flex items-center gap-2"
                  >
                    <span>VIEW TRANSLATION STATUS →</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-teal-200 space-y-4">
                <div className="text-[10px] uppercase font-mono text-teal-700 font-bold">
                  Translation availability
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Any translation shown here would have to come from a real provider. This page
                  deliberately shows no sample output for text it has not processed.
                </p>
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {FEATURES.translationEngine
                      ? 'Open the studio to use the configured provider.'
                      : 'The engine is off until a provider is configured at deploy time.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. WHAT YOU CAN DO NOW ═══════════════════════════════════════ */}
      <section id="miniexperiences" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-purple-700 font-bold">
            HONEST STATUS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
            WHAT YOU CAN DO NOW
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-light">
            Three products, three different levels of readiness. No simulated demos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* KalaaVerse */}
          <div className="p-6 rounded-3xl bg-white border border-purple-200 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-bold uppercase flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-600" />
                  <span>KalaaVerse</span>
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  LIVE
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">Start creating</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Open a studio, begin a draft, practice an instrument or set up a local profile. Your
                work is saved in this browser.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Writing, art, music and photo studios
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Personal library on this device
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  No account required to explore
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('landing')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Open KalaaVerse</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chitti */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600 font-bold uppercase flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-sky-500" />
                  <span>Chitti</span>
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200">
                  CONCEPT
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">Not available</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                There is no AI provider in this build. The Chitti page is reachable from the ecosystem
                menu but offers no working features.
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>We will not simulate a conversation to make this look finished.</span>
              </div>
            </div>

            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed"
            >
              Coming in a later release
            </button>
          </div>

          {/* BhashaVerse */}
          <div className="p-6 rounded-3xl bg-white border border-teal-200 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-700 font-bold uppercase flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-teal-600" />
                  <span>BhashaVerse</span>
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  FEATURES.translationEngine
                    ? 'bg-teal-50 text-teal-700 border-teal-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  {FEATURES.translationEngine ? 'CONFIGURED' : 'DISABLED'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                {FEATURES.translationEngine ? 'Translation available' : 'Engine not configured'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {FEATURES.translationEngine
                  ? 'A translation endpoint is configured for this deployment. Open the studio to use it.'
                  : 'No translation endpoint is configured, so no translation is produced and no sample output is shown.'}
              </p>

              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">No sample output</span>
                <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">Provider-dependent</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('translation')}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>View Translation Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 7. LABS & STORIES TEASER ═════════════════════════════════════ */}
      <section className="relative z-10 py-16 bg-white border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-700 font-bold tracking-widest">
                CREZORA LABS & STORIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Research and writing, when there is something to publish
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('labs')}
                className="px-4 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Labs Status</span>
              </button>
              <button
                onClick={() => onNavigate('stories')}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Stories Status</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8FF] border border-slate-200">
              <span className="text-[9px] font-mono text-cyan-700 font-bold uppercase">Labs</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">No published experiments</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Labs lists areas of interest only. No benchmarks, results or named researchers are
                claimed until real work is published.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF8FF] border border-slate-200">
              <span className="text-[9px] font-mono text-purple-700 font-bold uppercase">Stories</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">No published essays</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                The journal stays empty until there is real, credited writing to publish. No
                placeholder authors or fictional reporting are shown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. CORPORATE FOOTER ══════════════════════════════════════════ */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
      />
    </div>
  );
};
