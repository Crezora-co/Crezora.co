import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Info } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';
import { validateEmail, validateName, validatePhone } from '../../services/authService';

interface ClientSignupViewProps {
  currentLanguage?: SupportedLanguage;
  onBack: () => void;
  onSubmit: (data: { fullName: string; email: string; phone: string }) => void;
  onNavigateLogin: () => void;
}

export const ClientSignupView: React.FC<ClientSignupViewProps> = ({
  currentLanguage = 'en',
  onBack,
  onSubmit,
  onNavigateLogin,
}) => {
  const t = getTranslation(currentLanguage);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameCheck = validateName(fullName);
    if (!nameCheck.ok) return setError(nameCheck.error!);
    const emailCheck = validateEmail(email);
    if (!emailCheck.ok) return setError(emailCheck.error!);
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.ok) return setError(phoneCheck.error!);

    setError('');
    onSubmit({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col justify-between p-4 sm:p-6 font-sans">

      <div className="max-w-xl mx-auto w-full pt-4 sm:pt-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center my-6">
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">

          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-teal-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Join as a Client
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse creators, review portfolios and start a brief.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              Early access: this profile is saved only in this browser. No password is required and
              your details are not sent to a server yet.
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            <div>
              <label htmlFor="client-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                id="client-name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            <div>
              <label htmlFor="client-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email *
              </label>
              <input
                id="client-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            <div>
              <label htmlFor="client-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                id="client-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md shadow-teal-600/20 cursor-pointer"
            >
              Continue
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By continuing you agree to the Terms of Use and Privacy Policy.
          </p>
        </div>

        <p className="text-xs text-slate-600 mt-6 text-center">
          Already have a local profile?{' '}
          <button
            onClick={onNavigateLogin}
            className="text-teal-600 font-bold hover:underline cursor-pointer"
          >
            Continue
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
