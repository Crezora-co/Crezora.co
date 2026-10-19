import React from 'react';
import { BarChart3, Info } from 'lucide-react';
import { SITE } from '../../config/site';

/**
 * Analytics is intentionally empty in this build.
 *
 * There is no server, no tracking and no measurement pipeline, so any numbers
 * shown here would be invented. Rather than fabricate reach, influence or
 * reputation metrics, this view states plainly that nothing is measured yet.
 */
export const AnalyticsView: React.FC = () => {
  const plannedSignals = [
    'Profile views (once public profiles are served from a real backend)',
    'Appreciations and saves from real accounts',
    'Collaboration requests received',
    'Commission enquiries and responses',
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-purple-100">
        <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
          Creator Insights
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 mt-1">
          Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          There is nothing to measure yet.
        </p>
      </div>

      {/* Honest empty state */}
      <div className="p-10 sm:p-14 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Analytics will arrive when there is real activity to measure
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          {SITE.productName} is in {SITE.releaseLabel.toLowerCase()} with no backend and no tracking.
          This build does not measure reach, engagement, earnings or reputation, so this view stays
          empty rather than showing estimates.
        </p>
      </div>

      {/* What will be measured later */}
      <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-slate-900">Planned, once there is a real backend</h3>
        </div>
        <ul className="space-y-2 text-xs text-slate-600">
          {plannedSignals.map(signal => (
            <li key={signal} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-100">
          No date is promised for these. They require infrastructure that does not exist yet.
        </p>
      </div>
    </div>
  );
};
