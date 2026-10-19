import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Globe, 
  Star, 
  Award, 
  Briefcase, 
  MessageSquare, 
  Heart, 
  Bookmark, 
  Share2, 
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../../types/user';
import { storageService } from '../../services/storageService';
import { contactMailto, hasContactEmail } from '../../config/site';

interface ProfileViewProps {
  creatorId?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  creatorId,
  onNavigate,
}) => {
  const currentUser = storageService.getCurrentUser();
  const profileUser: UserProfile = creatorId 
    ? storageService.getCreatorById(creatorId) || currentUser
    : currentUser;

  const [activeTab, setActiveTab] = useState<'portfolio' | 'story' | 'services' | 'collaborations' | 'achievements'>('portfolio');

  const portfolioItems = storageService.getPortfolioItems().filter(i => i.creatorId === profileUser.id);
  const services = storageService.getServices().filter(s => s.creatorId === profileUser.id);
  const isSelf = profileUser.id === currentUser.id;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Profile Hero Section */}
      <div className="rounded-3xl bg-white border border-purple-100 overflow-hidden shadow-sm">
        {/* Cover Banner */}
        <div className="h-44 sm:h-56 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 relative overflow-hidden">
          {profileUser.coverImageUrl && (
            <img
              src={profileUser.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            {/* Avatar & Main Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <img
                src={profileUser.avatarUrl}
                alt={profileUser.displayName}
                className="w-28 sm:w-32 h-28 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl relative z-10"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{profileUser.displayName}</h1>
                </div>
                <p className="text-xs text-purple-700 font-bold font-mono">
                  @{profileUser.username} • {profileUser.talents[0]?.talentId.replace('_', ' ')}
                </p>
                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{profileUser.location}</span>
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold capitalize">
                    {profileUser.availability.replace(/_/g, ' ')}
                  </span>
                </p>
              </div>
            </div>

            {/* Actions & Follow */}
            <div className="flex items-center justify-center sm:justify-end gap-2.5">
              {!isSelf ? (
                <>
                  {hasContactEmail() ? (
                    <a
                      href={contactMailto(
                        `KalaaVerse enquiry: ${profileUser.displayName}`,
                        `Hi,\n\nI would like to get in touch with ${profileUser.displayName} on KalaaVerse.\n\n`
                      )}
                      className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send enquiry</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>How to get in touch</span>
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('collaborate')}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Collaborate</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('studio')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-md shadow-purple-600/20"
                >
                  Edit Profile & Studio
                </button>
              )}
            </div>

          </div>

          {/* Bio statement */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed font-sans max-w-4xl">
              {profileUser.creatorStatement}
            </p>
          </div>

          {/* Multi-discipline Talents Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {profileUser.talents.map(t => (
              <div
                key={t.talentId}
                className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100 text-xs flex items-center gap-2"
              >
                <span className="font-bold text-purple-800 capitalize">{t.talentId.replace('_', ' ')}</span>
                <span className="text-[10px] text-purple-600 font-mono">({t.yearsOfPractice}y • {t.experienceLevel})</span>
              </div>
            ))}
          </div>

          {/* Social proof note (no fabricated metrics) */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
            Followers, ratings and completed-project counts are not shown because there is no real
            activity to measure yet in this Early Access build.
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-purple-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'portfolio', label: `Portfolio (${portfolioItems.length})` },
          { id: 'story', label: 'Creator Story & Roots' },
          { id: 'services', label: `Services & Commissions (${services.length})` },
          { id: 'achievements', label: `Badges & Endorsements (${profileUser.achievements.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Portfolio */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.length === 0 ? (
            <div className="col-span-3 p-12 rounded-2xl bg-white border border-purple-100 text-center">
              <p className="text-sm text-slate-500">No portfolio items published yet.</p>
            </div>
          ) : (
            portfolioItems.map(item => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative bg-slate-50">
                  <img
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/70 text-white backdrop-blur-sm">
                      {item.domainId}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-purple-700 font-semibold">{item.viewsCount} views</span>
                    <span className="flex items-center gap-1 text-rose-500">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{item.appreciationsCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Story & Roots */}
      {activeTab === 'story' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Creative Philosophy</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {profileUser.story?.creativePhilosophy || profileUser.bio}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Artistic Journey & Roots</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {profileUser.story?.journey || 'Rooted in classical traditions with a focus on contemporary cultural expression.'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <h3 className="text-xs uppercase font-bold text-purple-700 tracking-wider font-mono">
                Key Influences
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profileUser.story?.influences?.map(inf => (
                  <span key={inf} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold">
                    {inf}
                  </span>
                )) || <span className="text-xs text-slate-400">None listed</span>}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <h3 className="text-xs uppercase font-bold text-purple-700 tracking-wider font-mono">
                Languages of Expression
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profileUser.languages.map(lang => (
                  <span key={lang} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Services & Commissions */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length === 0 ? (
            <div className="col-span-2 p-12 rounded-2xl bg-white border border-purple-100 text-center">
              <p className="text-sm text-slate-500">No active commission packages listed.</p>
            </div>
          ) : (
            services.map(svc => (
              <div
                key={svc.id}
                className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-emerald-600 font-bold text-sm">
                      ₹{svc.startingPrice.toLocaleString()}
                    </span>
                    <span className="text-slate-400 font-mono">~{svc.deliveryDays} days delivery</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Commissions are arranged by email</span>
                  {hasContactEmail() ? (
                    <a
                      href={contactMailto(
                        `KalaaVerse commission: ${svc.title}`,
                        `Hi,\n\nI would like to request: ${svc.title}\n\n`
                      )}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Request commission
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      How to request
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Badges & Achievements */}
      {activeTab === 'achievements' && (
        profileUser.achievements.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-purple-100 text-center">
            <p className="text-sm text-slate-500">No badges or endorsements yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileUser.achievements.map(ach => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-start gap-4"
            >
              <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>
                <div className="text-[10px] text-purple-600 font-mono mt-2">{ach.earnedAt}</div>
              </div>
            </div>
            ))}
          </div>
        )
      )}

    </div>
  );
};
