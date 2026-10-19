import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, Info, CheckCircle2 } from 'lucide-react';
import { SITE, hasContactEmail } from '../../config/site';
import { CompactFooter } from '../../components/common/CompactFooter';

interface ContactViewProps {
  onNavigate: (view: string, param?: string) => void;
}

/**
 * Contact form.
 *
 * There is no backend to receive submissions. Rather than faking a "message
 * sent" success state, this builds a real email in the visitor's own mail
 * client via a `mailto:` link. If no contact address is configured for the
 * build, the form is disabled with a clear explanation.
 */
export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General enquiry');
  const [message, setMessage] = useState('');
  const configured = hasContactEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!configured) return;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
    const params = new URLSearchParams();
    params.set('subject', `[CREZORA] ${topic} — ${name || 'Website enquiry'}`);
    params.set('body', body);
    window.location.href = `mailto:${SITE.contactEmail}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button
            onClick={() => onNavigate('corporate')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            CREZORA
          </button>
          <span className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-slate-900">
            <Mail className="w-4 h-4 text-purple-700" />
            <span className="text-sm font-bold">Contact</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Talk to CREZORA</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
          Questions about KalaaVerse, BhashaVerse, or working with us on a product? Send a note.
        </p>

        {!configured && (
          <div className="mt-6 flex items-start gap-2.5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              This build has no contact address configured, so the form is disabled. Set
              <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-amber-200 font-mono">VITE_CONTACT_EMAIL</code>
              at deploy time to enable it.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-name" className="block text-xs font-semibold text-slate-700 mb-1.5">Your name</label>
              <input
                id="c-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-semibold text-slate-700 mb-1.5">Your email</label>
              <input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-topic" className="block text-xs font-semibold text-slate-700 mb-1.5">Topic</label>
            <select
              id="c-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-white"
            >
              <option>General enquiry</option>
              <option>KalaaVerse feedback</option>
              <option>BhashaVerse early access</option>
              <option>Work with CREZORA (services)</option>
              <option>Press or partnership</option>
            </select>
          </div>

          <div>
            <label htmlFor="c-message" className="block text-xs font-semibold text-slate-700 mb-1.5">Message</label>
            <textarea
              id="c-message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={!configured}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
          >
            <Send className="w-4 h-4" />
            Open email draft
          </button>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Submitting opens a pre-filled email in your own mail app — nothing is sent automatically, and
            no data is stored by this site.
          </p>
        </form>

        {configured && (
          <p className="mt-6 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Prefer email? Write to
            <a href={`mailto:${SITE.contactEmail}`} className="text-purple-700 font-semibold underline">
              {SITE.contactEmail}
            </a>
          </p>
        )}
      </main>

      <CompactFooter onNavigate={onNavigate} />
    </div>
  );
};
