import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Palette,
  X,
  Share2,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Globe,
  Mail,
  Info
} from 'lucide-react';
import { CompactFooter } from '../../components/common/CompactFooter';
import { CREATIVE_DOMAINS_64, ALL_64_DISCIPLINES } from '../../data/disciplines';
import { SAMPLE_CREATORS, CreatorProfileData } from '../../data/mockCreators';
import { storageService } from '../../services/storageService';
import { SupportedLanguage } from '../../services/i18n';
import { contactMailto, hasContactEmail } from '../../config/site';

interface DiscoverViewProps {
  initialTalentFilter?: string;
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
  onOpenCommandPalette?: () => void;
  isAuthenticated?: boolean;
}

/**
 * Public talent directory.
 *
 * At Early Access there are almost no real profiles yet. Rather than invent
 * them, this view shows a small number of clearly-labelled sample profiles plus
 * any profiles a visitor actually created on this device.
 */
export const DiscoverView: React.FC<DiscoverViewProps> = ({
  initialTalentFilter,
  onNavigate,
  onOpenAuth,
  onOpenCommandPalette,
  isAuthenticated = false
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialTalentFilter || '');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(false);
  const [showSamples, setShowSamples] = useState<boolean>(true);
  const [linkCopied, setLinkCopied] = useState(false);

  // Saved creators (local device only).
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kv_saved_creators');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveCreator = (id: string) => {
    setSavedCreatorIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('kv_saved_creators', JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  const [selectedCreator, setSelectedCreator] = useState<CreatorProfileData | null>(null);
  const [profileTab, setProfileTab] = useState<'portfolio' | 'services' | 'craft'>('portfolio');

  // Sample profiles + real profiles created on this device.
  const allCreators = useMemo<CreatorProfileData[]>(() => {
    const list: CreatorProfileData[] = [];

    try {
      const registered = storageService.getCreators() || [];
      registered.forEach((u) => {
        if (u.id === 'guest') return;
        if (list.some((item) => item.id === u.id)) return;
        list.push({
          id: u.id,
          fullName: u.fullName || u.displayName || 'Unnamed creator',
          handle: u.username || (u.displayName || 'creator').toLowerCase().replace(/\s+/g, '_'),
          avatar: u.avatarUrl || '',
          bannerGradient: 'from-purple-200 via-indigo-100 to-slate-100',
          discipline: u.talents?.[0]?.talentId || 'Creative practice',
          domain: 'visual-art',
          location: u.location || 'India',
          experienceYears: u.talents?.[0]?.yearsOfPractice || 0,
          languages: u.languages?.length ? u.languages : ['English'],
          bio: u.bio || u.creatorStatement || 'A creator profile created on this device.',
          statement: u.creatorStatement || '',
          verified: false,
          availableForWork: u.availability === 'available_for_work',
          remoteFriendly: true,
          reputation: {
            craftRating: 0,
            reliabilityRating: 0,
            completedProjects: 0,
            responseRate: '—',
            badges: []
          },
          tools: [],
          portfolio: [],
          services: [],
          reviews: []
        });
      });
    } catch {
      /* storage unavailable */
    }

    if (showSamples) list.push(...SAMPLE_CREATORS);
    return list;
  }, [showSamples]);

  const filteredCreators = useMemo(() => {
    return allCreators.filter((c) => {
      if (selectedDomain !== 'all' && c.domain !== selectedDomain) return false;

      if (
        selectedDiscipline !== 'all' &&
        !c.discipline.toLowerCase().includes(selectedDiscipline.toLowerCase())
      ) {
        return false;
      }

      if (
        locationFilter.trim() !== '' &&
        !c.location.toLowerCase().includes(locationFilter.toLowerCase())
      ) {
        return false;
      }

      if (remoteOnly && !c.remoteFriendly) return false;
      if (availabilityOnly && !c.availableForWork) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const haystack = [c.fullName, c.handle, c.discipline, c.bio, c.statement, ...c.tools, ...c.languages]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [allCreators, selectedDomain, selectedDiscipline, locationFilter, remoteOnly, availabilityOnly, searchQuery]);

  const handleShare = async (c: CreatorProfileData) => {
    const link = `${window.location.origin}${window.location.pathname}#/profile/${encodeURIComponent(c.id)}`;
    try {
      await navigator.clipboard?.writeText(link);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const resetFilters = () => {
    setSelectedDomain('all');
    setSelectedDiscipline('all');
    setSearchQuery('');
    setLocationFilter('');
    setRemoteOnly(false);
    setAvailabilityOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('corporate')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>CREZORA</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <Palette className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-purple-700">
                Talent Directory
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-mono border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-purple-600" />
                <span>Search (Ctrl+K)</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('knowledge')}
              className="px-3.5 py-1.5 rounded-xl border border-purple-300 hover:bg-purple-50 text-purple-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Knowledge Hub
            </button>

            <button
              onClick={() => onOpenAuth?.(isAuthenticated ? 'login' : 'join-choice')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {isAuthenticated ? 'Open Studio' : 'Get started'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 space-y-4 text-left w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Early Access · India’s creative talent directory</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
          FIND PEOPLE WHO CAN <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            BRING IDEAS TO LIFE.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-light max-w-2xl leading-relaxed">
          A directory of creative disciplines — from illustration and writing to music, film and
          heritage craft. During Early Access the directory shows clearly-labelled sample profiles
          until real creators join.
        </p>
      </section>

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-[#FAF8FF]/95 backdrop-blur-xl border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-purple-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, skill, discipline, language…"
                className="w-full bg-white border border-slate-200 focus:border-purple-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-56">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="City or state…"
                className="w-full bg-white border border-slate-200 focus:border-purple-400 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition-colors"
              />
            </div>

            <div className="w-full sm:w-64">
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-purple-400 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none transition-colors cursor-pointer"
              >
                <option value="all">All disciplines</option>
                {ALL_64_DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => {
                  setSelectedDomain('all');
                  setSelectedDiscipline('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
                  selectedDomain === 'all'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-900'
                }`}
              >
                All domains
              </button>
              {CREATIVE_DOMAINS_64.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => {
                    setSelectedDomain(dom.id);
                    setSelectedDiscipline('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
                    selectedDomain === dom.id
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {dom.name.split('&')[0].trim()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-0"
                />
                <span>Remote friendly</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-0"
                />
                <span>Available now</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <span>
            Showing <strong className="text-slate-900">{filteredCreators.length}</strong>{' '}
            {filteredCreators.length === 1 ? 'profile' : 'profiles'}
          </span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showSamples}
                onChange={(e) => setShowSamples(e.target.checked)}
                className="rounded border-slate-300 text-purple-600 focus:ring-0"
              />
              <span>Include sample profiles</span>
            </label>
            {(selectedDomain !== 'all' || selectedDiscipline !== 'all' || searchQuery || locationFilter) && (
              <button onClick={resetFilters} className="text-purple-600 hover:text-purple-700 underline cursor-pointer">
                Reset filters
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Profiles marked <strong>Sample</strong> are illustrative examples created by CREZORA, not real
            people. Real creator profiles appear here only after someone creates one on this device.
          </span>
        </div>

        {filteredCreators.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
            <Palette className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No profiles match these filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your search, or turn sample profiles back on to see the example formats.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCreators.map((creator) => {
              const isSaved = savedCreatorIds.includes(creator.id);

              return (
                <article
                  key={creator.id}
                  onClick={() => {
                    setSelectedCreator(creator);
                    setProfileTab('portfolio');
                  }}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className={`h-24 w-full bg-gradient-to-r ${creator.bannerGradient} relative p-3 flex items-start justify-between`}>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md text-[10px] uppercase font-mono font-bold text-purple-700 border border-white">
                        {creator.discipline.split('&')[0].trim()}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveCreator(creator.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                          isSaved ? 'bg-purple-600 text-white' : 'bg-white/70 text-slate-500 hover:text-slate-900'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save profile'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="px-6 -mt-8 relative space-y-3">
                      <div className="flex items-end justify-between">
                        {creator.avatar ? (
                          <img
                            src={creator.avatar}
                            alt={creator.fullName}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 border-2 border-white shadow-md flex items-center justify-center font-bold text-lg">
                            {creator.fullName.charAt(0)}
                          </div>
                        )}

                        {creator.isSample ? (
                          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Sample
                          </span>
                        ) : creator.availableForWork ? (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Available
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {creator.fullName}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">@{creator.handle}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                          {creator.location}
                        </span>
                        {creator.experienceYears > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-mono">{creator.experienceYears}y exp</span>
                          </>
                        )}
                      </div>

                      {creator.statement && (
                        <p className="text-xs text-slate-600 font-light italic leading-relaxed line-clamp-2 border-l-2 border-purple-300 pl-3">
                          “{creator.statement}”
                        </p>
                      )}

                      {creator.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {creator.tools.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {creator.languages.slice(0, 3).join(' · ')}
                    </span>
                    <span className="text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Profile Modal ──────────────────────────────────────────────── */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-purple-700 font-bold">Creator profile</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500">{selectedCreator.discipline}</span>
              </div>

              <div className="flex items-center gap-2">
                {linkCopied && <span className="text-[11px] font-mono text-emerald-600">Link copied</span>}
                <button
                  onClick={() => handleShare(selectedCreator)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
                  title="Copy profile link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 border border-purple-100">
                <div className="flex items-center gap-5">
                  {selectedCreator.avatar ? (
                    <img
                      src={selectedCreator.avatar}
                      alt={selectedCreator.fullName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-200 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-purple-100 text-purple-600 border-2 border-purple-200 flex items-center justify-center font-bold text-2xl">
                      {selectedCreator.fullName.charAt(0)}
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {selectedCreator.fullName}
                      </h2>
                      {selectedCreator.isSample && (
                        <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Sample
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-slate-500">
                      @{selectedCreator.handle} • {selectedCreator.location}
                    </p>
                    <p className="text-xs text-purple-700 font-semibold">{selectedCreator.discipline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {hasContactEmail() ? (
                    <a
                      href={contactMailto(
                        `KalaaVerse enquiry: ${selectedCreator.fullName}`,
                        `Hi,\n\nI would like to get in touch with ${selectedCreator.fullName} about a project.\n\n`
                      )}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer text-center inline-flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send enquiry
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer text-center inline-flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      How to get in touch
                    </button>
                  )}
                  <button
                    onClick={() => toggleSaveCreator(selectedCreator.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      savedCreatorIds.includes(selectedCreator.id)
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                    title="Save profile"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto text-xs font-mono">
                {[
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'services', label: 'Services' },
                  { id: 'craft', label: 'Craft & identity' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setProfileTab(tab.id as typeof profileTab)}
                    className={`px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                      profileTab === tab.id
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {profileTab === 'portfolio' && (
                <div className="space-y-6">
                  <h4 className="text-base font-bold text-slate-900">Portfolio</h4>
                  {selectedCreator.portfolio.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      No portfolio items yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedCreator.portfolio.map((item) => (
                        <div key={item.id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden space-y-3 p-4">
                          <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                            {item.previewUrl ? (
                              <img src={item.previewUrl} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <Palette className="w-8 h-8 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{item.title}</span>
                              {item.year && <span className="text-[10px] font-mono text-purple-600">{item.year}</span>}
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === 'services' && (
                <div className="space-y-6">
                  <h4 className="text-base font-bold text-slate-900">Services</h4>
                  {selectedCreator.services.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      No services listed yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedCreator.services.map((srv) => (
                        <div key={srv.id} className="p-6 rounded-2xl bg-white border border-purple-100 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h5 className="text-base font-bold text-slate-900">{srv.title}</h5>
                            {srv.startingPrice && (
                              <span className="text-sm font-bold text-purple-700 font-mono">{srv.startingPrice}</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">{srv.description}</p>
                          {(srv.deliveryTime || srv.deliverables.length > 0) && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                              {srv.deliveryTime && <span className="font-mono text-purple-600">Turnaround: {srv.deliveryTime}</span>}
                              {srv.deliverables.length > 0 && (
                                <span className="font-mono">Deliverables: {srv.deliverables.join(', ')}</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === 'craft' && (
                <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-light">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 font-mono text-xs uppercase text-purple-700">About</h5>
                    <p>{selectedCreator.bio}</p>
                  </div>

                  {selectedCreator.statement && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <h5 className="font-bold text-slate-900 font-mono text-xs uppercase text-purple-700">
                        Creative statement
                      </h5>
                      <p className="italic">“{selectedCreator.statement}”</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {selectedCreator.tools.length > 0 && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-xs font-mono text-slate-500 block mb-1">Tools:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCreator.tools.map((tool, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-mono text-slate-500 block mb-1">Languages:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCreator.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CompactFooter onNavigate={onNavigate} />
    </div>
  );
};
