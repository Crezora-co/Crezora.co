import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  PenTool,
  Users,
  Briefcase,
  Bookmark,
  Heart,
} from 'lucide-react';
import { UserProfile } from '../../types/user';
import { storageService } from '../../services/storageService';
import { SITE } from '../../config/site';

import { SupportedLanguage } from '../../services/i18n';

interface HomeViewProps {
  currentUser: UserProfile;
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenQuickCreate: () => void;
}

/**
 * The signed-in dashboard.
 *
 * Everything shown here is either read from this device's local storage or an
 * honest empty state. There is no telemetry, reputation score or activity feed
 * in this build, so none is displayed.
 */
export const HomeView: React.FC<HomeViewProps> = ({
  currentUser,
  onNavigate,
  onOpenQuickCreate,
}) => {
  const [, forceRender] = useState(0);
  const works = storageService.getPortfolioItems();
  const briefs = storageService.getClientBriefs();
  const writingDraft = storageService.getWritingDraft();
  const followingIds = storageService.getFollowingIds();

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const greetingName = (currentUser.displayName || 'there').trim();
  const primaryTalentsDisplay = currentUser.talents
    .map(t => t.talentId.replace('_', ' '))
    .join(' + ');

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">

      {/* Personalised greeting & intent actions */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 border border-purple-100 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-[11px] font-mono text-purple-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="uppercase tracking-widest">KalaaVerse · {SITE.releaseLabel}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-slate-900 leading-tight">
            {timeGreeting}, <span className="text-purple-700">{greetingName}</span>
            <br />
            <span className="text-slate-500 font-light text-2xl sm:text-3xl">
              What are we creating today?
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-light flex flex-wrap items-center gap-2">
            <span>Practicing as:</span>
            <span className="font-semibold text-purple-700 capitalize">{primaryTalentsDisplay || 'Creator'}</span>
          </p>

          {/* Primary Action Shortcuts */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onOpenQuickCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Create New Work</span>
            </button>

            <button
              onClick={() => onNavigate('studio', 'writing')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-purple-200 text-xs font-semibold transition-all"
            >
              <PenTool className="w-3.5 h-3.5 text-purple-600" />
              <span>Continue Writing</span>
            </button>

            <button
              onClick={() => onNavigate('discover')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-purple-200 text-xs font-semibold transition-all"
            >
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span>Discover Creators</span>
            </button>

            <button
              onClick={() => onNavigate('collaborate')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-purple-200 text-xs font-semibold transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
              <span>View Collaborations</span>
            </button>
          </div>
        </div>
      </section>

      {/* Continue Creating Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Continue Creating</h2>
            <p className="text-xs text-slate-500">Resume your in-progress drafts and open your studios</p>
          </div>
          <button
            onClick={() => onNavigate('library')}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
          >
            <span>My Library</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Writing Draft Card */}
          <div
            onClick={() => onNavigate('studio', 'writing')}
            className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-medium text-[10px]">
                  Writing Studio Draft
                </span>
                <span className="text-[11px] text-slate-400">Saved on this device</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                {writingDraft.title || 'Untitled draft'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {writingDraft.content
                  ? `${writingDraft.content.replace(/#+/g, '').slice(0, 110)}...`
                  : 'Nothing written yet. Open the Writing Studio to start your first draft.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{writingDraft.wordCount || 0} words</span>
              <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Resume <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Workrooms Card */}
          <div
            onClick={() => onNavigate('collaborate')}
            className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 font-medium text-[10px]">
                  Shared Project Workrooms
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                No active workroom yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                A workroom opens once you start or join a collaboration. It holds shared tasks, files,
                milestones and team discussion for one project.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Nothing in progress</span>
              <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Open Collaborations <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Music Practice Card */}
          <div
            onClick={() => onNavigate('studio', 'music')}
            className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-[10px]">
                  Music & Audio Studio
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                Virtual Keyboard, Metronome & Drums
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                A polyphonic WebAudio synthesizer, a scale library and an 8-pad drum machine — all running
                locally in your browser.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Runs offline in your browser</span>
              <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Practice <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Your Creative World & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Cols: Your Creative World Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Your Creative World</h2>
              <p className="text-xs text-slate-500">Work published on this device and by creators you follow</p>
            </div>
            <button
              onClick={() => onNavigate('discover')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800"
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {works.length === 0 && (
              <div className="p-10 rounded-2xl bg-white border border-dashed border-purple-200 text-center space-y-2">
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">Nothing here yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Work you publish from the studios will appear here. Discovery currently lists only
                  profiles stored on this device — there is no public network in this build.
                </p>
                <button
                  onClick={() => onNavigate('discover')}
                  className="mt-1 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                >
                  Open Discovery
                </button>
              </div>
            )}

            {works.slice(0, 3).map(work => (
              <div
                key={work.id}
                className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all"
              >
                {/* Creator Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    onClick={() => onNavigate('profile', work.creatorId)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    {work.creatorAvatar ? (
                      <img
                        src={work.creatorAvatar}
                        alt={work.creatorName}
                        className="w-10 h-10 rounded-full object-cover border border-purple-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {work.creatorName}
                      </h4>
                      <p className="text-[11px] text-slate-500">{work.creatorTalent} • {work.createdAt}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => { storageService.toggleFollow(work.creatorId); forceRender(n => n + 1); }}
                    className={`text-xs px-3 py-1 rounded-lg transition-all font-semibold ${
                      followingIds.includes(work.creatorId)
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    {followingIds.includes(work.creatorId) ? 'Following' : '+ Follow'}
                  </button>
                </div>

                {/* Work Title & Description */}
                <h3 className="text-base font-bold text-slate-900 mb-2 font-serif">{work.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {work.description}
                </p>

                {/* Media Presentation */}
                {work.contentText ? (
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 mb-4 text-xs text-slate-700 font-serif italic border-l-4 border-l-purple-600 whitespace-pre-line leading-relaxed">
                    {work.contentText.slice(0, 220)}...
                  </div>
                ) : work.mediaUrl ? (
                  <div className="rounded-xl overflow-hidden mb-4 border border-slate-100 max-h-80 bg-slate-50">
                    <img
                      src={work.mediaUrl}
                      alt={work.title}
                      className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : null}

                {/* Tags & Action Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {work.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-slate-400">
                    <button
                      onClick={() => { storageService.toggleAppreciate(work.id); forceRender(n => n + 1); }}
                      title="Appreciate this work"
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{work.appreciationsCount}</span>
                    </button>
                    <button
                      onClick={() => { storageService.toggleSaveItem(work.id); forceRender(n => n + 1); }}
                      title="Save to library"
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Open Briefs & Community */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Opportunities</h2>
            <button
              onClick={() => onNavigate('opportunities')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800"
            >
              All Briefs
            </button>
          </div>

          <div className="space-y-4">
            {briefs.length === 0 && (
              <div className="p-6 rounded-2xl bg-white border border-dashed border-purple-200 text-center space-y-2">
                <Briefcase className="w-5 h-5 text-purple-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">No briefs yet</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Client briefs you create on this device will appear here. Public briefs and paid
                  commissions are not available in this build.
                </p>
              </div>
            )}

            {briefs.slice(0, 2).map(brief => (
              <div
                key={brief.id}
                onClick={() => onNavigate('opportunities')}
                className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-semibold text-purple-700">{brief.clientCompany}</span>
                  <span className="text-slate-500 font-bold font-mono">
                    ₹{brief.budgetMin.toLocaleString()}–₹{brief.budgetMax.toLocaleString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                  {brief.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {brief.projectDescription}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Saved locally on this device</span>
                  <span className="text-purple-600 font-medium">View Brief →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Community Card */}
          <div
            onClick={() => onNavigate('community', 'guilds')}
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-200/80 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-purple-700 mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>KalaaVerse Community</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">
              Guilds & Creative Arena
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              Craft guilds and judged challenges open in a later release. Until then, this space stays
              intentionally empty.
            </p>
            <div className="mt-3 pt-2 border-t border-purple-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-amber-600">Not available in this build</span>
              <span className="text-purple-700 font-semibold">View Community →</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
