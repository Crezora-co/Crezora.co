import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface LoginViewProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
  onNavigateSignup: () => void;
  currentLanguage?: SupportedLanguage;
  externalError?: string;
}

/**
 * Local preview sign-in.
 *
 * There is no authentication backend. This screen restores a profile that was
 * created earlier in THIS browser. It is not a password-protected account.
 */
export const LoginView: React.FC<LoginViewProps> = ({
  onBack,
  onSubmit,
  onNavigateSignup,
  currentLanguage = 'en',
  externalError = '',
}) => {
  const t = getTranslation(currentLanguage);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const shownError = error || externalError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter the email address you used to create your profile.');
      return;
    }
    setError('');
    onSubmit(email.trim());
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col justify-between p-4 sm:p-6 font-sans">

      <div className="max-w-xl mx-auto w-full pt-4 sm:pt-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center my-6">
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t.auth.welcomeBack}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Restore the profile you created on this device.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              Early access runs entirely in your browser. There is no server account or password yet —
              your profile is stored only on this device.
            </span>
          </div>

          {shownError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
              {shownError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              Continue
            </button>
          </form>

        </div>

        <p className="text-xs text-slate-600 mt-6 text-center">
          No profile on this device yet?{' '}
          <button
            onClick={onNavigateSignup}
            className="text-purple-600 font-bold hover:underline cursor-pointer"
          >
            Create one
          </button>
        </p>

      </div>

      <div className="w-full text-center py-6 border-t border-slate-200/60 mt-auto text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          This application and platform belongs to{' '}
          <a href="https://crezora.co" target="_blank" rel="noreferrer" className="text-purple-700 font-bold hover:underline">
            CREZORA.CO
          </a>
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          © 2026 CREZORA.CO · Where Imagination Meets Opportunity · Made in India
        </p>
      </div>

    </div>
  );
};
