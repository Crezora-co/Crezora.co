import React, { useState } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  ArrowLeft,
  Info,
  Sparkles,
  Globe,
  Mail,
  Construction
} from 'lucide-react';
import { CompactFooter } from '../../components/common/CompactFooter';
import { SupportedLanguage } from '../../services/i18n';
import { FEATURES, SITE, contactMailto, hasContactEmail } from '../../config/site';

interface TranslationPortalViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

export interface LanguageDef {
  code: string;
  name: string;
  nativeName: string;
  script: string;
}

/** Indian languages BhashaVerse intends to support. Shown as a roadmap. */
export const INDIAN_LANGUAGES_21: LanguageDef[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Perso-Arabic' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', script: 'Perso-Arabic' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', script: 'Perso-Arabic' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर’', script: 'Devanagari' },
];

/**
 * BhashaVerse translation studio.
 *
 * Translation is NOT simulated. If a real backend endpoint is configured
 * (`VITE_TRANSLATION_ENDPOINT`), the textarea calls it and shows the real
 * result. If it is not configured — the default in this build — the engine is
 * disabled and the page explains that honestly.
 */
export const TranslationPortalView: React.FC<TranslationPortalViewProps> = ({ onNavigate }) => {
  const [sourceText, setSourceText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const engineEnabled = FEATURES.translationEngine;

  const handleTranslate = async () => {
    if (!engineEnabled) return;
    if (!sourceText.trim()) return;

    setStatus('working');
    setErrorMessage('');
    setOutput('');

    try {
      const res = await fetch(SITE.translationEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, source: sourceLang, target: targetLang }),
      });
      if (!res.ok) throw new Error(`Translation service returned ${res.status}`);
      const data = await res.json();
      const translated = typeof data?.translation === 'string' ? data.translation : '';
      if (!translated) throw new Error('Translation service returned an empty result.');
      setOutput(translated);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Translation failed.');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans">
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
              <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Languages className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-teal-700">
                BhashaVerse
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BhashaVerse · {SITE.releaseLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Translation studio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            BhashaVerse is intended to help translate creative writing between Indian languages.
            The translation engine is not live yet, so this build does not pretend to translate.
          </p>
        </section>

        {!engineEnabled ? (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <Construction className="w-5 h-5" />
              <span>Not available in this build</span>
            </div>
            <p className="text-sm text-amber-900/90 leading-relaxed">
              No translation backend is configured, so the translate button is disabled. Real machine
              translation must be powered by a real service — it cannot be approximated in the browser.
            </p>
            <p className="text-sm text-amber-900/90 leading-relaxed">
              If you can provide a translation API endpoint, the studio can be enabled by setting the{' '}
              <code className="px-1.5 py-0.5 rounded bg-white border border-amber-200 font-mono text-xs">
                VITE_TRANSLATION_ENDPOINT
              </code>{' '}
              environment variable and rebuilding.
            </p>
            <div className="pt-2">
              {hasContactEmail() ? (
                <a
                  href={contactMailto(
                    'BhashaVerse translation backend',
                    'Hello CREZORA team,\n\nI would like to discuss connecting a translation backend for BhashaVerse.\n\n'
                  )}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Offer a translation backend
                </a>
              ) : (
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
              <label className="space-y-1.5">
                <span className="text-xs font-mono text-slate-500">From</span>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm cursor-pointer"
                >
                  <option value="en">English</option>
                  {INDIAN_LANGUAGES_21.map((l) => (
                    <option key={l.code} value={l.code}>{l.name}</option>
                  ))}
                </select>
              </label>

              <button
                onClick={() => {
                  setSourceLang(targetLang);
                  setTargetLang(sourceLang);
                }}
                className="mx-auto p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer"
                title="Swap languages"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              <label className="space-y-1.5">
                <span className="text-xs font-mono text-slate-500">To</span>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm cursor-pointer"
                >
                  {INDIAN_LANGUAGES_21.map((l) => (
                    <option key={l.code} value={l.code}>{l.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={10}
                placeholder="Enter text to translate…"
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm resize-none outline-none focus:border-teal-400"
              />
              <div className="relative w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm min-h-[10rem]">
                {output || <span className="text-slate-400">Translation will appear here.</span>}
                {output && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {status === 'error' && (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-800">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleTranslate}
              disabled={status === 'working' || !sourceText.trim()}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
            >
              {status === 'working' ? 'Translating…' : 'Translate'}
            </button>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Languages on the roadmap
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            These are the languages BhashaVerse plans to support. Listing them is not a claim that
            translation works yet.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {INDIAN_LANGUAGES_21.map((l) => (
              <div
                key={l.code}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-slate-700">{l.name}</span>
                <span className="text-[11px] text-slate-400">{l.nativeName}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CompactFooter onNavigate={onNavigate} />
    </div>
  );
};
