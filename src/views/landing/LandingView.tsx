import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Palette,
  Users,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Heart,
  Briefcase,
  Music,
  Camera,
  Layers,
  Award,
  GraduationCap,
  HelpCircle,
  Share2,
  Info
} from 'lucide-react';

import { SupportedLanguage } from '../../services/i18n';
import { storageService } from '../../services/storageService';
import { SAMPLE_CREATORS, CreatorProfileData } from '../../data/mockCreators';
import { CompactFooter } from '../../components/common/CompactFooter';
import { SITE } from '../../config/site';

interface LandingViewProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onEnterApp: () => void;
  onExploreCreators: (domainFilter?: string) => void;
  onStartOnboarding: () => void;
  onOpenAuth: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
  onViewProfile?: (creatorId: string) => void;
  onOpenKnowledge?: () => void;
  onNavigate: (view: string, param?: string) => void;
}

const CREATIVE_FIELDS = [
  { id: 'all',                label: 'All fields',        icon: Sparkles, count: 64 },
  { id: 'visual_art',         label: 'Visual arts',       icon: Palette,  count: 8 },
  { id: 'performing_arts',    label: 'Performing arts',   icon: Award,    count: 8 },
  { id: 'music_sound',        label: 'Music & sound',     icon: Music,    count: 8 },
  { id: 'writing_literature', label: 'Writing',           icon: BookOpen, count: 8 },
  { id: 'photo_video_film',   label: 'Film & photo',      icon: Camera,   count: 8 },
  { id: 'digital_media',      label: 'Digital media',     icon: Layers,   count: 8 },
  { id: 'traditional_crafts', label: 'Heritage craft',    icon: Heart,    count: 8 },
  { id: 'voice_acting',       label: 'Voice & spoken',    icon: Users,    count: 8 },
];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((child) => {
            (child as HTMLElement).classList.add('visible');
          });
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref as React.RefObject<HTMLElement>;
}

/**
 * Public KalaaVerse landing page.
 *
 * Honest by design: it advertises only what exists in this Early Access build.
 * There are no invented user counts, awards, escrow, AI or verified creators.
 */
export const LandingView: React.FC<LandingViewProps> = ({
  onEnterApp,
  onExploreCreators,
  onStartOnboarding,
  onOpenAuth,
  onViewProfile,
  onOpenKnowledge,
  onNavigate,
}) => {
  const fieldsRef     = useReveal(0.12);
  const knowledgeRef  = useReveal(0.12);
  const creatorsRef   = useReveal(0.12);

  const realCreators = (() => {
    try {
      return (storageService.getCreators() || []).filter((c) => c.id !== 'guest');
    } catch {
      return [];
    }
  })();

  const featured: CreatorProfileData[] = [
    ...realCreators.map<CreatorProfileData>((u) => ({
      id: u.id,
      fullName: u.fullName || u.displayName || 'Unnamed creator',
      handle: u.username || (u.displayName || 'creator').toLowerCase().replace(/\s+/g, '_'),
      avatar: u.avatarUrl || '',
      bannerGradient: 'from-purple-200 via-indigo-100 to-slate-100',
      discipline: u.talents?.[0]?.talentId || 'Creative practice',
      domain: 'visual-art',
      location: u.location || 'India',
      experienceYears: 0,
      languages: u.languages?.length ? u.languages : ['English'],
      bio: u.bio || u.creatorStatement || 'A creator profile created on this device.',
      statement: u.creatorStatement || '',
      verified: false,
      availableForWork: u.availability === 'available_for_work',
      remoteFriendly: true,
      reputation: { craftRating: 0, reliabilityRating: 0, completedProjects: 0, responseRate: '—', badges: [] },
      tools: [],
      portfolio: [],
      services: [],
      reviews: [],
    })),
    ...SAMPLE_CREATORS,
  ].slice(0, 4);

  return (
    <div className="bg-[#FAF8FF] text-slate-800 flex flex-col selection:bg-purple-500/20 selection:text-purple-900 font-sans">
      {/* ══ 1. HERO ═════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5ff] via-[#f5f0ff] to-[#FAF8FF] px-3 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <div className="absolute top-1/4 left-1/3 w-60 sm:w-[420px] h-60 sm:h-[420px] bg-gradient-to-br from-purple-300/30 via-pink-300/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-tl from-amber-300/20 via-pink-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-purple-100 text-[11px] sm:text-xs text-purple-700 mb-6 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] text-slate-500">
              {SITE.releaseLabel} · available in
            </span>
            <span className="font-medium">English</span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">हिंदी</span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">తెలుగు</span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">தமிழ்</span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">ಕನ್ನಡ</span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">বাংলা</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
            A home for India’s <span className="text-purple-600">creative talent</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
            KalaaVerse is being built as a place for artists, writers, musicians, performers and
            heritage craft makers to present their work and find collaborators. This is an
            early-access build — please tell us what it should become.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-100 text-[11px] text-slate-600 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Do what you love. Still learn and earn.</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
            <button
              onClick={() => onOpenAuth('join-choice')}
              className="px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create a profile</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => onExploreCreators()}
              className="px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Explore the directory</span>
            </button>
          </div>

          {/* Honest facts — no invented user counts. */}
          <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-xs sm:max-w-md mx-auto text-center">
            {[
              { label: 'Creative domains', value: '8' },
              { label: 'Disciplines', value: '64' },
              { label: 'Status', value: SITE.releaseLabel },
            ].map((stat) => (
              <div key={stat.label} className="p-1">
                <div className="text-base sm:text-xl font-extrabold text-slate-900">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full text-left">
            {[
              { icon: Palette,      title: 'Present your work', desc: 'Create a profile and describe your craft, languages and tools.' },
              { icon: Users,        title: 'Find collaborators', desc: 'Browse creative disciplines and reach out to people directly.' },
              { icon: BookOpen,     title: 'Share knowledge',    desc: 'Read and contribute practical guides within the Knowledge Hub.' },
              { icon: ShieldCheck,  title: 'Honest by design',   desc: 'No fake reviews, ratings, escrow or AI claims in this build.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-purple-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 sm:mb-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 sm:mb-1 leading-snug">{title}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. BENEFITS ═════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-semibold text-purple-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span>What you can do today</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for <span className="text-purple-600">creators and clients</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            The features below are implemented in this build. Anything that is not yet finished is
            clearly marked as coming soon — we do not pretend unfinished work is live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="reveal reveal-left p-8 rounded-3xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">For creators</h3>
                  <p className="text-xs text-purple-600 font-semibold">Showcase what you make</p>
                </div>
              </div>
              <ul className="space-y-3 pt-2">
                {[
                  'Build a local profile describing your craft, languages and tools.',
                  'Keep full ownership of your original work — nothing is uploaded to a server.',
                  'Explore a directory organised across 64 creative disciplines.',
                  'Read and contribute practical knowledge in the Knowledge Hub.',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => onOpenAuth('creator-signup')}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create a creator profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="reveal reveal-right p-8 rounded-3xl bg-white border border-teal-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">For clients</h3>
                  <p className="text-xs text-teal-600 font-semibold">Find the right people</p>
                </div>
              </div>
              <ul className="space-y-3 pt-2">
                {[
                  'Browse creators by discipline, location and language.',
                  'Save profiles and share links as you shortlist.',
                  'Contact us through the published channel to discuss a brief.',
                  'No payment, escrow or wallet exists in this build — by design.',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => onExploreCreators()}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore creators</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. CREATIVE FIELDS ══════════════════════════════════════════ */}
      <section ref={fieldsRef} className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore by creative field
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From heritage craft to digital media — browse the disciplines KalaaVerse organises.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 reveal">
            {CREATIVE_FIELDS.map((field) => {
              const Icon = field.icon;
              return (
                <button
                  key={field.id}
                  onClick={() => onExploreCreators(field.id === 'all' ? undefined : field.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer bg-slate-50 hover:bg-purple-50 text-slate-700 border border-slate-200 hover:border-purple-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{field.label}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-500">{field.count}</span>
                </button>
              );
            })}
          </div>

          <div className="reveal p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-violet-50 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                Open call · {SITE.releaseLabel}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Are you an artist, writer, musician or performer in India?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Registration is open. Create a profile, describe your craft and be one of the first
                creators listed in the KalaaVerse directory.
              </p>
            </div>
            <button
              onClick={() => onOpenAuth('creator-signup')}
              className="shrink-0 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm shadow-purple-600/25 cursor-pointer transition-all"
            >
              Create your profile →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 4. KNOWLEDGE HUB ════════════════════════════════════════════ */}
      <section ref={knowledgeRef} className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 border border-purple-100 p-6 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 mb-8 sm:mb-10 reveal">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-700 font-mono uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Knowledge Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Learn, ask and share your craft
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A peer-to-peer space for practical craft knowledge. Read guides written by other
              creators, ask questions, and publish what you know.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Learn practical techniques</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Field-specific guides and honest tips from working creators.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Ask real questions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Stuck on a technique, tool or licensing question? Ask your peers.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Share what you know</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Publish your own insights and help the community grow.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              The Knowledge Hub is being seeded with the first contributions.
            </div>
            <button
              onClick={() => (onOpenKnowledge ? onOpenKnowledge() : onEnterApp())}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold text-xs shadow-md shadow-orange-500/20 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>Enter Knowledge Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ 5. FEATURED CREATORS ════════════════════════════════════════ */}
      <section ref={creatorsRef} className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10 reveal">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-100 mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>KalaaVerse directory</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Featured <span className="text-purple-600">profiles</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Example profiles so you can see the format. Profiles marked “Sample” are illustrative,
            not real people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((creator) => (
            <div
              key={creator.id}
              className="reveal p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {creator.avatar ? (
                    <img
                      src={creator.avatar}
                      alt={creator.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-purple-100 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      {creator.fullName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{creator.fullName}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                      {creator.discipline}
                    </span>
                  </div>
                </div>
                {creator.isSample && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                    <Info className="w-3 h-3 text-amber-600" />
                    <span className="text-[10px] font-bold text-amber-700">Sample</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {creator.bio || 'A KalaaVerse creator profile.'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => (onViewProfile ? onViewProfile(creator.id) : onExploreCreators())}
                  className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View profile
                </button>
                <button
                  onClick={() => onOpenAuth('join-choice')}
                  className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Get started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <button
            onClick={() => onExploreCreators()}
            className="px-8 py-3 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 hover:border-purple-200 text-slate-700 hover:text-purple-700 text-sm font-semibold transition-all cursor-pointer"
          >
            Explore all profiles →
          </button>
        </div>
      </section>

      {/* ══ 6. EARLY ACCESS CTA ═════════════════════════════════════════ */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Help shape KalaaVerse
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            This is an early-access release with a deliberately small, honest feature set. Create a
            profile, explore the directory, and tell us what to build next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm shadow-purple-600/25 transition-all cursor-pointer"
            >
              Get started
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Contact CREZORA
            </button>
          </div>
        </div>
      </section>

      <CompactFooter onNavigate={onNavigate} />
    </div>
  );
};
