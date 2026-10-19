import React from 'react';
import { Sparkles, Heart, ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface FooterProps {
  currentLanguage?: SupportedLanguage;
  onNavigate?: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth,
}) => {
  const t = getTranslation(currentLanguage);

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-700 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          
          {/* Col 1: CREZORA.CO Parent & Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">KalaaVerse</span>
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold uppercase font-mono">India</span>
              </div>

            </div>

            {/* Prominent CREZORA.CO Attribution */}
            <div className="pt-1">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider font-mono">
                CREZORA.CO
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t.footer.flagship}
              </p>
              <p className="text-xs text-slate-600 font-serif italic mt-1.5">
                {t.footer.motto}
              </p>
            </div>
          </div>

          {/* Col 2: Creative Fields */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Creative Fields
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover', 'visual_art')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Visual Arts & Illustration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover', 'performing_arts')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Performing Arts & Dance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover', 'music_sound')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Music Composition & Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover', 'writing_literature')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Literature & Screenwriting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover', 'photo_video_film')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Cinematography & Film
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('discover')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  {t.footer.explore}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('collaborate')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Collaboration Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('community')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  {t.footer.joinCommunity}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('join-choice')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left font-semibold text-purple-700"
                >
                  Join as Founding Creator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('client-signup')}
                  className="hover:text-purple-600 transition-colors cursor-pointer text-left"
                >
                  Commission Indian Talent
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Languages & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>Pan-India Multilingual</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              KalaaVerse actively supports regional creators across India in their mother tongue.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['English', 'हिंदी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ', 'বাংলা'].map((lang) => (
                <span
                  key={lang}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Early Access build — no payments or escrow yet</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Mandatory CREZORA.CO Matter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="font-semibold text-slate-800 flex items-center justify-center sm:justify-start gap-2">
              <span>This application and platform belongs to</span>
              <a
                href="https://crezora.co"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-0.5"
              >
                <span>CREZORA.CO</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              {t.footer.rights} • {t.footer.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <button
              onClick={() => onNavigate && onNavigate('privacy')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate && onNavigate('terms')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>in India</span>
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
