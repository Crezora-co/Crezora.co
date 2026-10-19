import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronDown,
  Palette,
  Heart,
  Languages,
  Check,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';

export interface EcosystemProductItem {
  id: 'crezora' | 'kalaaverse' | 'chitti' | 'translation';
  name: string;
  tagline: string;
  category: string;
  icon: any;
  accentHex: string;
  badge: string;
  shortcut: string;
}

export const ECOSYSTEM_PRODUCTS: EcosystemProductItem[] = [
  {
    id: 'crezora',
    name: 'CREZORA.CO',
    tagline: 'Corporate Ecosystem & Human-Centered Technology',
    category: 'Ecosystem Core',
    icon: Sparkles,
    accentHex: '#8B5CF6',
    badge: 'CORE',
    shortcut: '1'
  },
  {
    id: 'kalaaverse',
    name: 'KalaaVerse',
    tagline: 'Creative workspace & 64-discipline directory — Early Access',
    category: 'Creativity',
    icon: Palette,
    accentHex: '#EC4899',
    badge: 'EARLY ACCESS',
    shortcut: '2'
  },
  {
    id: 'chitti',
    name: 'Chitti',
    tagline: 'Companion interface concept — no AI connected in this build',
    category: 'Intelligence',
    icon: Heart,
    accentHex: '#38BDF8',
    badge: 'CONCEPT',
    shortcut: '3'
  },
  {
    id: 'translation',
    name: 'BhashaVerse',
    tagline: 'Translation interface — disabled unless an endpoint is configured',
    category: 'Language',
    icon: Languages,
    accentHex: '#14B8A6',
    badge: 'PREVIEW',
    shortcut: '4'
  }
];

interface GlobalEcosystemSwitcherProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  className?: string;
  variant?: 'header' | 'floating' | 'inline';
}

export const GlobalEcosystemSwitcher: React.FC<GlobalEcosystemSwitcherProps> = ({
  currentView,
  onNavigate,
  className = '',
  variant = 'header'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Determine which ecosystem product is active
  const getActiveProduct = (): EcosystemProductItem => {
    if (currentView === 'chitti') return ECOSYSTEM_PRODUCTS[2];
    if (currentView === 'translation') return ECOSYSTEM_PRODUCTS[3];
    if (
      currentView === 'crezora' ||
      currentView === 'about' ||
      currentView === 'labs' ||
      currentView === 'stories'
    ) {
      return ECOSYSTEM_PRODUCTS[0];
    }
    // Default to KalaaVerse
    return ECOSYSTEM_PRODUCTS[1];
  };

  const activeProduct = getActiveProduct();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % ECOSYSTEM_PRODUCTS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + ECOSYSTEM_PRODUCTS.length) % ECOSYSTEM_PRODUCTS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = ECOSYSTEM_PRODUCTS[focusedIndex];
        handleSelectProduct(selected.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex]);

  const handleSelectProduct = (id: 'crezora' | 'kalaaverse' | 'chitti' | 'translation') => {
    setIsOpen(false);
    if (id === 'crezora') {
      onNavigate('crezora');
    } else if (id === 'kalaaverse') {
      onNavigate('home');
    } else if (id === 'chitti') {
      onNavigate('chitti');
    } else if (id === 'translation') {
      onNavigate('translation');
    }
  };

  const ActiveIcon = activeProduct.icon;

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${className}`}>
      {/* Switcher Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Switch CREZORA ecosystem world (Click to toggle)"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer select-none group ${
          isOpen
            ? 'bg-purple-50 border-purple-300 shadow-sm text-slate-900'
            : 'bg-white hover:bg-purple-50 border-slate-200 hover:border-purple-300 text-slate-700 shadow-xs'
        }`}
      >
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-xs"
          style={{ backgroundColor: activeProduct.accentHex }}
        >
          <ActiveIcon className="w-3 h-3 stroke-[2.5]" />
        </div>

        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
              {activeProduct.name}
            </span>
            <span
              className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-bold tracking-wider"
              style={{
                backgroundColor: `${activeProduct.accentHex}25`,
                color: activeProduct.accentHex
              }}
            >
              {activeProduct.badge}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ml-0.5 ${
            isOpen ? 'rotate-180 text-purple-600' : 'group-hover:text-slate-700'
          }`}
        />
      </button>

      {/* Switcher Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-label="CREZORA Ecosystem Worlds"
          className="absolute left-0 mt-2.5 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-scaleUp origin-top-left overflow-hidden"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-slate-500">
                CREZORA.CO ECOSYSTEM
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Use ↑ / ↓ keys</span>
          </div>

          {/* Product Items List */}
          <div className="py-1.5 space-y-1">
            {ECOSYSTEM_PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon;
              const isSelected = activeProduct.id === prod.id;
              const isFocused = focusedIndex === idx;

              return (
                <button
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.id)}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-purple-50 border border-purple-200 shadow-xs'
                      : isFocused
                      ? 'bg-slate-50 border border-slate-100'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {/* Product Icon */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 transition-transform group-hover:scale-105 shadow-md"
                    style={{ backgroundColor: prod.accentHex }}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {prod.name}
                        </span>
                        <span
                          className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold"
                          style={{
                            backgroundColor: `${prod.accentHex}20`,
                            color: prod.accentHex
                          }}
                        >
                          {prod.badge}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-purple-600 font-mono">
                          <Check className="w-3 h-3 text-purple-600" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 leading-snug group-hover:text-slate-600">
                      {prod.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom quick links */}
          <div className="border-t border-slate-100 pt-2 px-2 pb-1 flex items-center justify-between text-[11px] text-slate-500">
            <button
              onClick={() => { setIsOpen(false); onNavigate('about'); }}
              className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Manifesto</span>
            </button>
            <button
              onClick={() => { setIsOpen(false); onNavigate('labs'); }}
              className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-cyan-600" />
              <span>Crezora Labs</span>
            </button>
            <button
              onClick={() => { setIsOpen(false); onNavigate('stories'); }}
              className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Stories</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
