import React, { useState } from 'react';
import { FileText, Music, ArrowRight } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface LibraryViewProps {
  onNavigate: (view: string, param?: string) => void;
}

/**
 * The personal library is a light, local-only view of everything this device
 * has stored: the writing draft, saved music sessions and bookmarked work.
 * There is no cloud vault, no storage quota and no download service.
 */
export const LibraryView: React.FC<LibraryViewProps> = ({ onNavigate }) => {
  const [activeFolder, setActiveFolder] = useState<'all' | 'drafts' | 'artworks' | 'music' | 'saved'>('all');
  const writingDraft = storageService.getWritingDraft();
  const musicSessions = storageService.getMusicSessions();
  const works = storageService.getPortfolioItems();
  const savedIds = storageService.getSavedItemIds();
  const savedWorks = works.filter(w => savedIds.includes(w.id));

  const hasAnyContent =
    Boolean(writingDraft.content) || musicSessions.length > 0 || savedWorks.length > 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
            Personal Library
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 mt-1">
            My Creative Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your in-progress drafts, recorded music sessions and saved bookmarks. Everything here is
            stored in this browser only.
          </p>
        </div>

        <div className="text-right text-xs font-mono text-slate-500">
          <span>Stored locally on this device</span>
        </div>
      </div>

      {/* Folder Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'drafts', label: 'Writing Drafts' },
          { id: 'artworks', label: 'Artworks & Stems' },
          { id: 'music', label: 'Music Sessions' },
          { id: 'saved', label: 'Saved Bookmarks' },
        ].map(folder => (
          <button
            key={folder.id}
            onClick={() => setActiveFolder(folder.id as any)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeFolder === folder.id
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-white text-slate-600 hover:text-purple-700 border border-purple-100'
            }`}
          >
            {folder.label}
          </button>
        ))}
      </div>

      {/* Honest empty state when nothing has been created yet */}
      {!hasAnyContent && (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-2">
          <FileText className="w-6 h-6 text-purple-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">Nothing here yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Work you create in the studios will be collected here. Open a studio to begin.
          </p>
        </div>
      )}

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Writing Draft */}
        {(activeFolder === 'all' || activeFolder === 'drafts') && Boolean(writingDraft.content) && (
          <div
            onClick={() => onNavigate('studio', 'writing')}
            className="p-6 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="font-mono text-[10px] text-slate-500">Draft</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-purple-700 transition-colors">
                {writingDraft.title || 'Untitled draft'}
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {writingDraft.content.replace(/#+/g, '').slice(0, 150)}...
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{writingDraft.wordCount || 0} words</span>
              <span className="text-purple-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open in Studio <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Music Practice Sessions */}
        {(activeFolder === 'all' || activeFolder === 'music') && musicSessions.map(sess => (
          <div
            key={sess.id}
            onClick={() => onNavigate('studio', 'music')}
            className="p-6 rounded-3xl bg-white border border-purple-100 hover:border-cyan-300 transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="p-2 rounded-xl bg-cyan-50 text-cyan-700">
                  <Music className="w-5 h-5" />
                </span>
                <span className="font-mono text-[10px] text-slate-500">{sess.bpm} BPM</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-cyan-700 transition-colors">
                {sess.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {sess.notes}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{sess.instrument}</span>
              <span className="text-cyan-700 flex items-center gap-1">
                Play in Studio <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}

        {/* Saved Items */}
        {(activeFolder === 'all' || activeFolder === 'saved') && savedWorks.map(sw => (
          <div
            key={sw.id}
            onClick={() => onNavigate('discover')}
            className="rounded-3xl bg-white border border-purple-100 hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between cursor-pointer group shadow-sm"
          >
            <div className="aspect-video bg-purple-50 overflow-hidden relative">
              {sw.thumbnailUrl ? (
                <img src={sw.thumbnailUrl} alt={sw.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-purple-300">
                  <FileText className="w-6 h-6" />
                </div>
              )}
              <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded bg-white/90 text-purple-700 font-mono uppercase border border-purple-100">
                Bookmark
              </span>
            </div>
            <div className="p-5">
              <h4 className="text-sm font-bold text-slate-900 font-sans group-hover:text-purple-700 transition-colors line-clamp-1">{sw.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sw.description}</p>
            </div>
          </div>
        ))}

        {/* Folder-specific empty states */}
        {((activeFolder === 'music' && musicSessions.length === 0) ||
          (activeFolder === 'saved' && savedWorks.length === 0) ||
          (activeFolder === 'drafts' && !writingDraft.content)) && (
          <div className="md:col-span-3 p-10 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-2">
            <Music className="w-5 h-5 text-purple-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Nothing in this folder yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Items appear here as you create them. There is nothing imported or synced in this build.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
