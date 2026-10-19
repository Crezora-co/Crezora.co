import React, { useState } from 'react';
import {
  Flame,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { CreativeCommunity } from '../../types/community';

interface CommunityViewProps {
  initialTab?: string;
  onNavigateProfile: (creatorId: string) => void;
}

/**
 * Community view.
 *
 * Guilds are genuinely empty in this build: there is no messaging backend and
 * no way to join anything. The judged "Creative Arena" is not implemented at
 * all, so it is presented honestly rather than as a working contest.
 */
export const CommunityView: React.FC<CommunityViewProps> = ({
  onNavigateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'guilds' | 'arena'>('guilds');
  const [communities] = useState<CreativeCommunity[]>(() => storageService.getCommunities());

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
            Community
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Guilds & Craft Circles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured spaces for craft critique and peer feedback. These open in a later release.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-purple-50 p-1 rounded-xl border border-purple-100 text-xs">
          <button
            onClick={() => setActiveTab('guilds')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'guilds' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            Creative Guilds ({communities.length})
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'arena' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Creative Arena</span>
          </button>
        </div>
      </div>

      {/* GUILDS TAB */}
      {activeTab === 'guilds' && (
        <>
          {communities.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">No guilds yet</h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Guilds need shared, server-side discussion threads, which do not exist in this build.
                Nothing is listed here because nothing has been created.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communities.map(guild => (
                <div
                  key={guild.id}
                  className="p-6 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md group"
                >
                  <div>
                    <div className="relative h-36 rounded-2xl overflow-hidden mb-4 border border-purple-100 bg-purple-50">
                      {guild.coverUrl && (
                        <img src={guild.coverUrl} alt={guild.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {guild.name}
                    </h3>
                    <p className="text-xs text-purple-700 font-semibold mt-0.5">{guild.tagline}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                      {guild.description}
                    </p>

                    {/* Guild Principles */}
                    {guild.rules.length > 0 && (
                      <div className="mt-4 p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs space-y-1">
                        <span className="text-[10px] uppercase font-bold text-purple-700 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                          <span>Guild Principles:</span>
                        </span>
                        {guild.rules.map((r, i) => (
                          <p key={i} className="text-[11px] text-slate-600">• {r}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Local preview only</span>
                    <button
                      disabled
                      title="Guild discussions are not available in this build."
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed"
                    >
                      Discussions coming later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ARENA TAB */}
      {activeTab === 'arena' && (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Creative Arena is not available in this build</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            A judged creative challenge needs real submissions storage, impartial judging and prize
            fulfilment. None of that exists yet, so no challenges, prizes or entries are shown.
          </p>
        </div>
      )}

    </div>
  );
};
