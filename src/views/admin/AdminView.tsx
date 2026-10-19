import React from 'react';
import { ShieldOff } from 'lucide-react';
import { FEATURES } from '../../config/site';

/**
 * The admin console is not part of this build.
 *
 * There is no backend, no reviewer accounts and no verification process, so a
 * working moderation UI here would only simulate authority. The route is kept
 * so old links fail honestly instead of 404-ing into a blank screen.
 */
export const AdminView: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-4 shadow-2xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <ShieldOff className="w-6 h-6" />
        </div>
        <h1 className="text-lg font-bold text-slate-900">Admin console is not available</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          {FEATURES.adminConsole
            ? 'No admin console is connected to this deployment.'
            : 'This early-access build has no backend, reviewer accounts or verification workflow. Moderation and verification cannot be performed here.'}
        </p>
        <p className="text-[11px] text-slate-400">
          Nothing on this screen approves badges, verifies identities or changes account status.
        </p>
      </div>
    </div>
  );
};
