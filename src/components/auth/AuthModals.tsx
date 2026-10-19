import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Briefcase, 
  Sparkles, 
  Zap, 
  Layout, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  Building2
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export type AuthModalType = 'none' | 'join-choice' | 'creator-signup' | 'client-signup' | 'login';

interface AuthModalsProps {
  modalType: AuthModalType;
  onClose: () => void;
  onOpenModal: (type: AuthModalType) => void;
  onCreatorSignupSuccess: (creatorData: { fullName: string; email: string; phone: string }) => void;
  onClientSignupSuccess: (clientData: { fullName: string; company: string; email: string }) => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  modalType,
  onClose,
  onOpenModal,
  onCreatorSignupSuccess,
  onClientSignupSuccess,
  onLoginSuccess,
}) => {
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (modalType === 'none') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* 1. JOIN KALAAVERSE CHOICE MODAL (Screenshots 160850 & 161241) */}
      {modalType === 'join-choice' && (
        <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-purple-100 relative animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
              Join KalaaVerse
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Where creativity meets opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Option 1: I am a Creator */}
            <div
              onClick={() => onOpenModal('creator-signup')}
              className="p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-600 bg-purple-50/40 hover:bg-purple-50/80 transition-all cursor-pointer group text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 mb-4 group-hover:scale-105 transition-transform">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                  I am a Creator
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Showcase your portfolio and collaborate with peers on shared projects.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-100">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-medium">
                  Profile Setup
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-medium">
                  Portfolio Builder
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-medium">
                  Collaboration Calls
                </span>
              </div>
            </div>

            {/* Option 2: I am a Client */}
            <div
              onClick={() => onOpenModal('client-signup')}
              className="p-6 rounded-2xl border-2 border-teal-200 hover:border-teal-600 bg-teal-50/40 hover:bg-teal-50/80 transition-all cursor-pointer group text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 mb-4 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                  I am a Client
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Browse creative talent and draft project briefs on this device.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-teal-100">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-medium">
                  Talent Discovery
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-medium">
                  Discipline Filters
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-medium">
                  Local Session
                </span>
              </div>
            </div>
          </div>

          {/* Three Feature Callouts */}
          <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-100 mb-6">
            <div className="flex flex-col items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-slate-800">Creator-first</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Built around craft</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-slate-800">Local-first</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Works in your browser</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Layout className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-semibold text-slate-800">Beautiful Design</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Crafted for creators</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mb-4">
            This build has no account server. Your profile and session stay on this device only.
          </p>

          <div className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              onClick={() => onOpenModal('login')}
              className="font-bold text-purple-600 hover:text-purple-700 underline"
            >
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* 2. JOIN AS A CREATOR (Screenshots 160911 & 160928) */}
      {modalType === 'creator-signup' && (
        <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-500/20 mb-3">
              <Palette className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-sans">
              Join as a Creator
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Set up the creator profile you'll use across the studios
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onCreatorSignupSuccess({
                fullName: fullName,
                email: email,
                phone: phone
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 mt-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => onOpenModal('login')}
              className="font-bold text-purple-600 hover:text-purple-700 underline"
            >
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* 3. JOIN AS A CLIENT (Screenshot 161048) */}
      {modalType === 'client-signup' && (
        <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100 relative animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-500/20 mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-sans">
              Join as a Client
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Set up a client profile on this device
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClientSignupSuccess({
                fullName: fullName,
                company: company,
                email: email
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Organization
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Dharma Productions / Indie Studio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="vikram@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 mt-2"
            >
              <span>Create Client Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => onOpenModal('login')}
              className="font-bold text-teal-600 hover:text-teal-700 underline"
            >
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* 4. WELCOME BACK LOGIN (Screenshot 161105) */}
      {modalType === 'login' && (
        <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-500/20 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-sans">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to continue your creative journey
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLoginSuccess(email);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-slate-400" title="Password reset is not available in this build.">
                  Password reset unavailable
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              No account server exists in this build. Signing in creates a session on this device
              only; your email is not sent anywhere and the password is neither checked nor stored.
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => onOpenModal('join-choice')}
              className="font-bold text-purple-600 hover:text-purple-700 underline"
            >
              Join KalaaVerse
            </button>

          </div>
        </div>
      )}
    </div>
  );
};
