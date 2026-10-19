import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE, hasContactEmail } from '../../config/site';

interface CompactFooterProps {
  onNavigate?: (view: string, param?: string) => void;
}

/**
 * A deliberately small footer. The previous footer repeated full corporate
 * navigation and marketing claims on every application screen; this keeps a
 * single quiet strip with the links that actually exist.
 */
export const CompactFooter: React.FC<CompactFooterProps> = ({ onNavigate }) => {
  const go = (view: string) => () => onNavigate && onNavigate(view);

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/70 text-slate-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <p className="text-center sm:text-left">
          © 2026 {SITE.parentBrand} · KalaaVerse {SITE.releaseLabel}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          <button onClick={go('corporate')} className="hover:text-purple-700 transition-colors">
            CREZORA
          </button>
          <button onClick={go('landing')} className="hover:text-purple-700 transition-colors">
            KalaaVerse
          </button>
          <button onClick={go('translation')} className="hover:text-purple-700 transition-colors">
            BhashaVerse
          </button>
          <button onClick={go('contact')} className="hover:text-purple-700 transition-colors">
            Contact
          </button>
          <button onClick={go('privacy')} className="hover:text-purple-700 transition-colors">
            Privacy
          </button>
          <button onClick={go('terms')} className="hover:text-purple-700 transition-colors">
            Terms
          </button>
          {hasContactEmail() && (
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="inline-flex items-center gap-0.5 text-purple-700 hover:text-purple-900 font-semibold"
            >
              {SITE.contactEmail}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
};
