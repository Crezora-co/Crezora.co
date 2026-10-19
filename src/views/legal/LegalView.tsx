import React from 'react';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { SITE, hasContactEmail } from '../../config/site';
import { CompactFooter } from '../../components/common/CompactFooter';

interface LegalViewProps {
  kind: 'privacy' | 'terms';
  onNavigate: (view: string, param?: string) => void;
}

const UPDATED = 'October 2026';

/**
 * Minimal, honest policy pages.
 *
 * They describe what this build actually does (browser-local storage, no
 * server, no payments). They are not a substitute for review by a qualified
 * Indian legal professional before a commercial launch.
 */
export const LegalView: React.FC<LegalViewProps> = ({ kind, onNavigate }) => {
  const isPrivacy = kind === 'privacy';

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
            {isPrivacy ? <ShieldCheck className="w-4 h-4 text-purple-700" /> : <FileText className="w-4 h-4 text-purple-700" />}
            <span className="text-sm font-bold">{isPrivacy ? 'Privacy Policy' : 'Terms of Use'}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {SITE.parentBrand} · {SITE.releaseLabel} · Last updated {UPDATED}
          </p>

          {isPrivacy ? (
            <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-700">
              <section>
                <h2 className="text-base font-bold text-slate-900">What this build stores</h2>
                <p className="mt-2">
                  KalaaVerse early access runs entirely in your web browser. Any profile, portfolio,
                  draft or brief you create is saved in your browser's local storage on your own device.
                  It is not uploaded to a CREZORA server in this build.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">What we do not collect</h2>
                <ul className="mt-2 space-y-1.5 list-disc pl-5">
                  <li>No passwords are collected or stored in this build.</li>
                  <li>No payment details are collected. No payments are processed.</li>
                  <li>No analytics or advertising trackers are installed.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">When data leaves your device</h2>
                <p className="mt-2">
                  Only when you choose to. If you use a contact link, your email client opens and you
                  decide what to send. If you clear your browser storage, the locally saved profile is
                  permanently removed.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">External content</h2>
                <p className="mt-2">
                  Some pages display example images and fonts loaded from third-party services
                  (for example Unsplash and Google Fonts). Those services may receive standard request
                  data such as your IP address.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">Your choices</h2>
                <p className="mt-2">
                  You can remove your locally stored data at any time by clearing site data in your
                  browser. This product aims to comply with applicable Indian data protection law; as
                  the product evolves, this page will be updated before any server-side data collection
                  is introduced.
                </p>
              </section>
            </div>
          ) : (
            <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-700">
              <section>
                <h2 className="text-base font-bold text-slate-900">Early access</h2>
                <p className="mt-2">
                  This is an early-access preview. Features are incomplete, may change, and may not work
                  as described. Nothing on the platform is a commitment to provide a specific feature or
                  outcome.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">Your content</h2>
                <p className="mt-2">
                  You are responsible for the content you create on your device. Do not upload content
                  you do not have the right to use, or content that is unlawful, abusive or infringing.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">No payments or escrow</h2>
                <p className="mt-2">
                  No payment processing, escrow, wallet or payout functionality exists in this build.
                  Any amount shown is illustrative content on an example profile only.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">Example profiles</h2>
                <p className="mt-2">
                  Sample profiles are clearly labelled and are not real people. Do not treat them as
                  available service providers.
                </p>
              </section>
              <section>
                <h2 className="text-base font-bold text-slate-900">Contact</h2>
                <p className="mt-2">
                  For any question about these terms, please contact us
                  {hasContactEmail() ? (
                    <>
                      {' '}at{' '}
                      <a href={`mailto:${SITE.contactEmail}`} className="text-purple-700 font-semibold underline">
                        {SITE.contactEmail}
                      </a>
                      .
                    </>
                  ) : (
                    <> using the contact page.</>
                  )}
                </p>
              </section>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs">
          <button
            onClick={() => onNavigate(isPrivacy ? 'terms' : 'privacy')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-purple-200 hover:text-purple-700 font-semibold transition-all"
          >
            {isPrivacy ? 'Read Terms of Use' : 'Read Privacy Policy'}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-purple-200 hover:text-purple-700 font-semibold transition-all"
          >
            Contact us
          </button>
        </div>
      </main>

      <CompactFooter onNavigate={onNavigate} />
    </div>
  );
};
