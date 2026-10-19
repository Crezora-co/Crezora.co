import React from 'react';
import { ShoppingBag, Info, Mail, Construction } from 'lucide-react';
import { contactMailto, hasContactEmail, FEATURES } from '../../config/site';

interface MarketplaceViewProps {
  onNavigate?: (view: string, param?: string) => void;
}

/**
 * Marketplace placeholder.
 *
 * A real marketplace needs a payment provider, escrow and fulfilment — none of
 * which exist in this build. Rather than simulate purchases, a wallet balance
 * or payouts, this page states plainly that the module is not enabled.
 */
export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-8">
      <div className="pb-6 border-b border-purple-100">
        <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
          Coming later
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Marketplace & payments</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Buying, selling and payouts are not part of this Early Access build.
        </p>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 font-bold">
          <Construction className="w-5 h-5" />
          <span>Not available in this build</span>
        </div>
        <p className="text-sm text-amber-900/90 leading-relaxed">
          KalaaVerse does not process payments, hold funds in escrow, or operate a wallet. Building
          those features requires a payment provider, identity checks and legal agreements, none of
          which are in place.
        </p>
        <div className="flex items-start gap-2 text-xs text-amber-900/80">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>To keep trust, we show an honest placeholder instead of a simulated checkout.</span>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-bold text-slate-900">What works today instead</h2>
        </div>
        <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc pl-5">
          <li>Build a profile that describes your craft, languages and tools.</li>
          <li>Browse the creator directory and reach out to people directly.</li>
          <li>Share and read practical knowledge in the Knowledge Hub.</li>
        </ul>
        {hasContactEmail() ? (
          <a
            href={contactMailto(
              'KalaaVerse marketplace & payments',
              'Hello CREZORA team,\n\nI would like to discuss commissioning work / marketplace payments.\n\n'
            )}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            Discuss a commission
          </a>
        ) : (
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            How to get in touch
          </button>
        )}
      </div>

      {FEATURES.marketplace && (
        <p className="text-xs text-slate-400">
          Marketplace flag is on but no implementation is wired up.
        </p>
      )}
    </div>
  );
};
