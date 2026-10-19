import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  Palette,
  Languages,
  BookOpen,
  Zap,
  User,
  Compass,
  ArrowRight,
  X
} from 'lucide-react';
import { SAMPLE_CREATORS } from '../../data/mockCreators';
import { ALL_64_DISCIPLINES } from '../../data/disciplines';
import { CREZORA_SERVICES_14 } from '../../views/services/ServicesView';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Products' | 'Services' | 'Creators' | 'Disciplines' | 'Navigation';
  icon: any;
  action: () => void;
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, param?: string) => void;
}

/**
 * Global search palette (Ctrl/Cmd+K).
 *
 * Only lists destinations that exist in this build. Sample creator profiles are
 * clearly badged as samples; nothing is presented as verified.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const allItems: CommandItem[] = [
    {
      id: 'prod-crezora',
      title: 'CREZORA.CO',
      subtitle: 'Company, services and contact',
      category: 'Products',
      icon: Sparkles,
      badge: 'Company',
      action: () => { onNavigate('corporate'); onClose(); }
    },
    {
      id: 'prod-kalaaverse',
      title: 'KalaaVerse',
      subtitle: 'Creative talent directory (Early Access)',
      category: 'Products',
      icon: Palette,
      badge: 'Creativity',
      action: () => { onNavigate('landing'); onClose(); }
    },
    {
      id: 'prod-bhashaverse',
      title: 'BhashaVerse Translation Studio',
      subtitle: 'Translation — backend not configured yet',
      category: 'Products',
      icon: Languages,
      badge: 'Language',
      action: () => { onNavigate('translation'); onClose(); }
    },

    {
      id: 'services-overview',
      title: 'CREZORA Services',
      subtitle: 'Client technology studio — browse offerings',
      category: 'Services',
      icon: Zap,
      badge: 'Studio',
      action: () => { onNavigate('services'); onClose(); }
    },
    ...CREZORA_SERVICES_14.map(svc => ({
      id: `svc-${svc.id}`,
      title: `${svc.number}. ${svc.title}`,
      subtitle: `${svc.shortDesc} • ${svc.idealFor}`,
      category: 'Services' as const,
      icon: svc.icon,
      badge: svc.category.toUpperCase(),
      action: () => { onNavigate('services', svc.id); onClose(); }
    })),

    {
      id: 'nav-discover',
      title: 'Explore the creator directory',
      subtitle: 'Browse creative disciplines and sample profiles',
      category: 'Navigation',
      icon: Compass,
      action: () => { onNavigate('discover'); onClose(); }
    },
    {
      id: 'nav-knowledge',
      title: 'Knowledge Hub',
      subtitle: 'Read and share practical craft knowledge',
      category: 'Navigation',
      icon: BookOpen,
      action: () => { onNavigate('knowledge'); onClose(); }
    },
    {
      id: 'nav-about',
      title: 'About CREZORA',
      subtitle: 'Who we are and what we are building',
      category: 'Navigation',
      icon: Sparkles,
      action: () => { onNavigate('about'); onClose(); }
    },
    {
      id: 'nav-labs',
      title: 'CREZORA Labs',
      subtitle: 'Early experiments',
      category: 'Navigation',
      icon: Zap,
      action: () => { onNavigate('labs'); onClose(); }
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      subtitle: 'Get in touch with CREZORA',
      category: 'Navigation',
      icon: Sparkles,
      action: () => { onNavigate('contact'); onClose(); }
    },

    // Sample creator profiles (clearly labelled).
    ...SAMPLE_CREATORS.map((c) => ({
      id: `creator-${c.id}`,
      title: c.fullName,
      subtitle: `${c.discipline} • ${c.location}`,
      category: 'Creators' as const,
      icon: User,
      badge: 'Sample',
      action: () => { onNavigate('discover', c.discipline); onClose(); }
    })),

    ...ALL_64_DISCIPLINES.slice(0, 16).map((d) => ({
      id: `disc-${d.id}`,
      title: d.name,
      subtitle: d.description,
      category: 'Disciplines' as const,
      icon: Palette,
      action: () => { onNavigate('discover', d.name); onClose(); }
    }))
  ];

  const filtered = query.trim() === ''
    ? allItems.slice(0, 12)
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50">
          <Search className="w-5 h-5 text-purple-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, disciplines, pages…"
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-md text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[10px] font-mono text-slate-400 border border-slate-200">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Compass className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No matching results for “{query}”</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-100 flex items-center justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-purple-50 border border-purple-200 text-slate-900'
                      : 'hover:bg-slate-50 border border-transparent text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate group-hover:text-purple-700">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate leading-tight">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-purple-500' : 'opacity-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">↵</kbd>
              Select
            </span>
          </div>
          <span>KalaaVerse search</span>
        </div>
      </div>
    </div>
  );
};
