import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, User, Palette, Briefcase, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { searchTalents } from '../../config/talents';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeFacet, setActiveFacet] = useState<'all' | 'creators' | 'work' | 'talents' | 'collabs' | 'briefs'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const creators = useMemo(() => storageService.getCreators(), []);
  const works = useMemo(() => storageService.getPortfolioItems(), []);
  const collabs = useMemo(() => storageService.getCollabRequests(), []);
  const briefs = useMemo(() => storageService.getClientBriefs(), []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Return curated quick suggestions
      return {
        creators: creators.slice(0, 3),
        works: works.slice(0, 3),
        talents: searchTalents('').slice(0, 4),
        collabs: collabs.slice(0, 2),
      };
    }

    return {
      creators: creators.filter(c => 
        c.fullName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.talents.some(t => t.talentId.toLowerCase().includes(q))
      ),
      works: works.filter(w => 
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some(tag => tag.toLowerCase().includes(q))
      ),
      talents: searchTalents(q),
      collabs: collabs.filter(c => 
        c.projectTitle.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      ),
    };
  }, [query, creators, works, collabs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-purple-100 flex items-center gap-3 bg-purple-50/40">
          <Search className="w-5 h-5 text-purple-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stories, artists, choreographers, writers, briefs..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] bg-white text-slate-400 px-2 py-0.5 rounded border border-purple-100 font-mono">
            ESC
          </kbd>
        </div>

        {/* Facet Pills */}
        <div className="px-4 py-2 bg-purple-50/20 border-b border-purple-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'creators', label: `Creators (${results.creators.length})` },
            { id: 'work', label: `Works (${results.works.length})` },
            { id: 'talents', label: `Talents (${results.talents.length})` },
            { id: 'collabs', label: `Collabs (${results.collabs.length})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFacet(f.id as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeFacet === f.id
                  ? 'bg-purple-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh]">
          {/* Creators section */}
          {(activeFacet === 'all' || activeFacet === 'creators') && results.creators.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Creators & Talent
              </span>
              <div className="space-y-1">
                {results.creators.map(c => (
                  <div
                    key={c.id}
                    onClick={() => { onNavigate('profile', c.id); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-purple-50 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatarUrl} alt={c.fullName} className="w-8 h-8 rounded-full object-cover border border-purple-100" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {c.fullName}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {c.talents[0]?.talentId.replace('_', ' ')} • {c.location}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Works section */}
          {(activeFacet === 'all' || activeFacet === 'work') && results.works.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Creations & Portfolio
              </span>
              <div className="space-y-1">
                {results.works.map(w => (
                  <div
                    key={w.id}
                    onClick={() => { onNavigate('discover'); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-purple-50 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {w.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">By {w.creatorName} • {w.domainId}</p>
                    </div>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      View Work
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collabs section */}
          {(activeFacet === 'all' || activeFacet === 'collabs') && results.collabs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Open Collaborations
              </span>
              <div className="space-y-1">
                {results.collabs.map(collab => (
                  <div
                    key={collab.id}
                    onClick={() => { onNavigate('collaborate'); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-purple-50 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {collab.projectTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500">Lead: {collab.creatorName} • {collab.compensationType}</p>
                    </div>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      Open Call
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
