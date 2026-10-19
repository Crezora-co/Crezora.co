import React from 'react';
import { ArrowLeft, ArrowRight, Heart, ShieldOff } from 'lucide-react';
import { SupportedLanguage } from '../../services/i18n';

interface ChittiAIViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

/**
 * Chitti is not built.
 *
 * The previous version of this screen used scripted replies, canned "emotional
 * analysis" and generated art to look like a working AI companion. No model,
 * voice provider or safety system is connected, so the honest thing is to say so
 * rather than simulate a conversation.
 */
export const ChittiAIView: React.FC<ChittiAIViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans flex flex-col">
      <header className="sticky top-0 z-30 bg-[#FAF8FF]/95 backdrop-blur border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('corporate')}
            className="flex items-center gap-2 text-slate-500 hover:text-purple-700 text-xs font-mono cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>CREZORA.CO</span>
          </button>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-purple-700 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>CHITTI — CONCEPT</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full rounded-3xl bg-white border border-purple-100 p-8 sm:p-10 text-center space-y-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldOff className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Chitti is not available</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Chitti is a design concept for a gentler companion interface. There is no AI model,
            voice provider or emotional-inference system connected in this build.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            We have removed the scripted chat, mood analysis and generated poetry that used to
            appear here. Nothing on this page reads your input or produces a response.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Go to KalaaVerse</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('corporate')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Back to CREZORA</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
