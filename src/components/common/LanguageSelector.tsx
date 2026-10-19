import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Globe, Search, X } from 'lucide-react';
import {
  LANGUAGE_OPTIONS,
  LanguageCode,
  LanguageOption,
  getLanguageOption,
} from '../../locales/languages';
import { CorporateCopy } from '../../locales/corporate';

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onChange: (language: LanguageCode) => void;
  copy: CorporateCopy['language'];
  /** `header` shows a compact trigger; `inline` shows the list directly. */
  variant?: 'header' | 'inline';
  className?: string;
  closeLabel?: string;
}

/**
 * A real, searchable language menu.
 *
 * Only languages with a maintained landing-page translation are selectable.
 * Registered-but-untranslated languages are visible and disabled with an honest
 * "translation in progress" label instead of pretending to work.
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onChange,
  copy,
  variant = 'header',
  className = '',
  closeLabel = 'Close language menu',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const active = getLanguageOption(currentLanguage);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGE_OPTIONS;
    return LANGUAGE_OPTIONS.filter(
      (language) =>
        language.englishName.toLowerCase().includes(q) ||
        language.nativeName.toLowerCase().includes(q) ||
        language.code.toLowerCase().includes(q)
    );
  }, [query]);

  const available = filtered.filter((language) => language.coverage === 'core');
  const planned = filtered.filter((language) => language.coverage === 'planned');

  const select = (language: LanguageOption) => {
    if (language.coverage !== 'core') return;
    onChange(language.code);
    setOpen(false);
    setQuery('');
  };

  const list = (items: LanguageOption[]) => (
    <div className="space-y-0.5">
      {items.map((language) => {
        const selected = language.code === currentLanguage;
        const plannedLanguage = language.coverage === 'planned';
        return (
          <button
            key={language.code}
            type="button"
            role="option"
            aria-selected={selected}
            aria-disabled={plannedLanguage}
            disabled={plannedLanguage}
            onClick={() => select(language)}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-start transition-colors ${
              selected
                ? 'bg-purple-50 text-purple-800'
                : plannedLanguage
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="min-w-0">
              <span className={`block text-sm ${selected ? 'font-bold' : 'font-medium'} truncate`}>
                {language.nativeName}
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                {language.englishName}
                {plannedLanguage ? ` · ${copy.soon}` : ''}
              </span>
            </span>
            {selected && <Check className="w-4 h-4 shrink-0 text-purple-700" />}
          </button>
        );
      })}
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className={className}>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
            className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div className="mt-2 max-h-64 overflow-y-auto">
          <p className="px-1 py-1 text-[10px] uppercase tracking-wider font-mono text-slate-400">
            {copy.available}
          </p>
          {list(available)}
          {planned.length > 0 && (
            <>
              <p className="px-1 pt-2 pb-1 text-[10px] uppercase tracking-wider font-mono text-slate-400">
                {copy.planned}
              </p>
              {list(planned)}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${copy.title}: ${active.englishName}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/80 px-3 text-[11px] font-semibold text-slate-700 backdrop-blur transition-colors hover:border-purple-300 hover:text-purple-800"
      >
        <Globe className="h-3.5 w-3.5 text-purple-700" />
        <span className="font-mono tracking-wide">{active.code.toUpperCase()}</span>
        <span className="hidden sm:inline text-slate-400">{active.nativeName}</span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={copy.title}
          className="fixed inset-x-3 top-[4.75rem] z-[70] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem]"
        >
          <div className="flex items-center justify-between gap-3 pb-2">
            <div>
              <p className="text-xs font-bold text-slate-900">{copy.title}</p>
              <p className="text-[10px] text-slate-400">{copy.note}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.search}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pe-3 ps-9 text-xs outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div className="mt-2 max-h-[min(60vh,22rem)] overflow-y-auto pe-1">
            {available.length > 0 && (
              <>
                <p className="px-1 py-1 text-[10px] uppercase tracking-wider font-mono text-slate-400">
                  {copy.available}
                </p>
                {list(available)}
              </>
            )}
            {planned.length > 0 && (
              <>
                <p className="px-1 pt-2 pb-1 text-[10px] uppercase tracking-wider font-mono text-slate-400">
                  {copy.planned}
                </p>
                {list(planned)}
              </>
            )}
            {filtered.length === 0 && (
              <p className="px-2 py-6 text-center text-xs text-slate-400">{copy.search}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
