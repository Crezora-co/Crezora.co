import React from 'react';
import { Sparkles, User, Briefcase, ArrowRight } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface JoinChoiceViewProps {
  onSelectRole: (role: 'creator' | 'client') => void;
  onBackToHome: () => void;
  currentLanguage?: SupportedLanguage;
}

export const JoinChoiceView: React.FC<JoinChoiceViewProps> = ({
  onSelectRole,
  onBackToHome,
  currentLanguage = 'en',
}) => {
  const t = getTranslation(currentLanguage);

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col justify-between p-4 sm:p-6 font-sans">
      
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto pt-8 pb-12">
        
        {/* Top Gradient Sparkle Circle Icon (Screenshot 160850) */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mb-4">
          <Sparkles className="w-7 h-7 text-white" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.auth.joinKalaaVerse}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-3">
          {t.auth.chooseRole}
        </p>

        <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-6">
          Early access preview — profiles are stored only in this browser.
        </p>

        {/* Role Options Cards */}
        <div className="w-full space-y-4 text-left">
          
          {/* Card 1: Creator */}
          <div
            onClick={() => onSelectRole('creator')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
              <User className="w-5 h-5 text-purple-600" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {t.auth.asCreator}
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.auth.asCreatorDesc}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                  Portfolio Builder
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                  Skills & Services
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Client */}
          <div
            onClick={() => onSelectRole('client')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
              <Briefcase className="w-5 h-5 text-teal-600" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t.auth.asClient}
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.auth.asClientDesc}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                  Creator Search
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                  Project Briefs
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Back to Home Link */}
        <button
          onClick={onBackToHome}
          className="mt-8 text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors cursor-pointer"
        >
          Back to Home
        </button>

      </div>

      {/* Mandatory CREZORA.CO Bottom Matter */}
      <div className="w-full text-center py-6 border-t border-slate-200/60 mt-auto text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          This application and platform belongs to <a href="https://crezora.co" target="_blank" rel="noreferrer" className="text-purple-700 font-bold hover:underline">CREZORA.CO</a>
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          © 2026 CREZORA.CO. All Rights Reserved. • Where Imagination Meets Opportunity • Made with ❤️ in India
        </p>
      </div>

    </div>
  );
};
