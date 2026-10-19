import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CircleDot,
  GraduationCap,
  Heart,
  Languages,
  Mail,
  Menu,
  Palette,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { SITE, hasContactEmail } from '../../config/site';
import { SupportedLanguage, getLanguageDirection } from '../../services/i18n';
import { getCorporateCopy } from '../../locales/corporate';
import { LanguageSelector } from '../../components/common/LanguageSelector';

interface CorporateViewProps {
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (language: SupportedLanguage) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

type ProductStatus = 'early' | 'concept' | 'preview';

const PRODUCTS: Array<{
  id: 'kalaaverse' | 'sahayak' | 'chitti' | 'bhashaverse';
  name: string;
  icon: React.ElementType;
  route: string;
  status: ProductStatus;
  iconClass: string;
  statusClass: string;
  glow: string;
}> = [
  {
    id: 'kalaaverse',
    name: 'KalaaVerse',
    icon: Palette,
    route: 'landing',
    status: 'early',
    iconClass: 'bg-purple-100 text-purple-700 border-purple-200',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    glow: 'group-hover:shadow-purple-200/60',
  },
  {
    id: 'sahayak',
    name: 'Sahayak AI',
    icon: GraduationCap,
    route: 'sahayak',
    status: 'concept',
    iconClass: 'bg-amber-100 text-amber-800 border-amber-200',
    statusClass: 'bg-amber-50 text-amber-800 border-amber-200',
    glow: 'group-hover:shadow-amber-200/60',
  },
  {
    id: 'chitti',
    name: 'Chitti AI',
    icon: Heart,
    route: 'chitti',
    status: 'concept',
    iconClass: 'bg-rose-100 text-rose-700 border-rose-200',
    statusClass: 'bg-rose-50 text-rose-700 border-rose-200',
    glow: 'group-hover:shadow-rose-200/60',
  },
  {
    id: 'bhashaverse',
    name: 'BhashaVerse',
    icon: Languages,
    route: 'translation',
    status: 'preview',
    iconClass: 'bg-teal-100 text-teal-700 border-teal-200',
    statusClass: 'bg-teal-50 text-teal-700 border-teal-200',
    glow: 'group-hover:shadow-teal-200/60',
  },
];

export const CorporateView: React.FC<CorporateViewProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  onNavigate,
  onOpenAuth,
}) => {
  const copy = getCorporateCopy(currentLanguage);
  const direction = getLanguageDirection(currentLanguage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (view: string, param?: string) => {
    setMenuOpen(false);
    onNavigate(view, param);
  };

  const statusLabel = (status: ProductStatus) =>
    status === 'early'
      ? copy.products.early
      : status === 'preview'
      ? copy.products.preview
      : copy.products.concept;

  return (
    <div
      dir={direction}
      className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#1B1425] flex flex-col font-sans selection:bg-purple-200 selection:text-purple-950"
    >
      {/* ── Navigation ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#E4DCCB]/80 bg-[#F7F3EC]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => go('corporate')}
            className="group flex items-center gap-2.5 text-start"
            aria-label="CREZORA home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CCB7] bg-white/70 text-purple-800 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="leading-none">
              <span className="block text-sm font-black tracking-[0.06em] text-slate-950">
                CREZORA<span className="text-purple-700">.CO</span>
              </span>
              <span className="mt-1 hidden text-[8px] font-mono uppercase tracking-[0.22em] text-slate-500 lg:block">
                {copy.hero.eyebrow}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 text-xs font-semibold text-slate-600 md:flex">
            <a
              href="#products"
              className="rounded-full px-3 py-2 transition-colors hover:bg-white/70 hover:text-purple-800"
            >
              {copy.nav.products}
            </a>
            <button
              onClick={() => go('about')}
              className="rounded-full px-3 py-2 transition-colors hover:bg-white/70 hover:text-purple-800"
            >
              {copy.nav.about}
            </button>
            <button
              onClick={() => go('services')}
              className="rounded-full px-3 py-2 transition-colors hover:bg-white/70 hover:text-purple-800"
            >
              {copy.nav.services}
            </button>
            <button
              onClick={() => go('contact')}
              className="rounded-full px-3 py-2 transition-colors hover:bg-white/70 hover:text-purple-800"
            >
              {copy.nav.contact}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {onLanguageChange && (
              <LanguageSelector
                currentLanguage={currentLanguage}
                onChange={onLanguageChange}
                copy={copy.language}
                closeLabel={copy.nav.close}
              />
            )}
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="hidden rounded-full px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-white/70 hover:text-purple-800 lg:inline-flex"
            >
              {copy.nav.signIn}
            </button>
            <a
              href="#products"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-purple-900 lg:inline-flex"
            >
              {copy.nav.explore}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={copy.nav.menu}
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-slate-700 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 min-h-[100svh] max-h-[100svh] overflow-y-auto bg-[#F7F3EC] shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-[#E4DCCB] px-4">
              <span className="text-sm font-black tracking-[0.06em] text-slate-950">
                CREZORA<span className="text-purple-700">.CO</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={copy.nav.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-1 p-4">
              <a
                href="#products"
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-white"
              >
                {copy.nav.products}
              </a>
              <button
                onClick={() => go('about')}
                className="block w-full rounded-2xl px-4 py-3 text-start text-base font-semibold text-slate-800 hover:bg-white"
              >
                {copy.nav.about}
              </button>
              <button
                onClick={() => go('services')}
                className="block w-full rounded-2xl px-4 py-3 text-start text-base font-semibold text-slate-800 hover:bg-white"
              >
                {copy.nav.services}
              </button>
              <button
                onClick={() => go('contact')}
                className="block w-full rounded-2xl px-4 py-3 text-start text-base font-semibold text-slate-800 hover:bg-white"
              >
                {copy.nav.contact}
              </button>
              <div className="my-3 h-px bg-[#E4DCCB]" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAuth && onOpenAuth('login');
                }}
                className="block w-full rounded-2xl px-4 py-3 text-start text-sm font-semibold text-slate-600 hover:bg-white"
              >
                {copy.nav.signIn}
              </button>
              {onLanguageChange && (
                <div className="border-t border-[#E4DCCB] px-1 pt-4">
                  <p className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                    {copy.language.title}
                  </p>
                  <LanguageSelector
                    currentLanguage={currentLanguage}
                    onChange={(language) => {
                      onLanguageChange(language);
                      setMenuOpen(false);
                    }}
                    copy={copy.language}
                    variant="inline"
                    closeLabel={copy.nav.close}
                  />
                </div>
              )}
              <a
                href="#products"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white"
              >
                {copy.nav.explore}
                <ArrowDown className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,40,217,0.16),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(217,119,6,0.13),transparent_30%),linear-gradient(180deg,#FBF8F1_0%,#F7F3EC_62%,#F2EDE2_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#1B1425_1px,transparent_1px),linear-gradient(90deg,#1B1425_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-[48%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8CCB7]/70 sm:h-[38rem] sm:w-[38rem]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-[48%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8CCB7]/45 sm:h-[27rem] sm:w-[27rem]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-[48%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/20 blur-3xl sm:h-96 sm:w-96"
          />

          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {copy.products.early}
              </span>
              <span className="hidden sm:inline">{copy.hero.note}</span>
            </div>

            <div className="mt-10 text-center sm:mt-16">
              <h1 className="mx-auto max-w-full text-[clamp(3.6rem,16vw,12.5rem)] font-black leading-[0.78] tracking-[-0.075em] text-slate-950">
                CREZORA<span className="text-purple-700">.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-relaxed text-slate-600 sm:mt-9 sm:text-lg">
                {copy.hero.tagline}
              </p>

              <div className="mx-auto mt-8 flex w-full max-w-xs flex-col items-stretch justify-center gap-2.5 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition-all hover:-translate-y-0.5 hover:bg-purple-900 sm:text-sm"
                >
                  {copy.hero.primary}
                  <ArrowDown className="h-4 w-4" />
                </a>
                <button
                  onClick={() => go('contact')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CCB7] bg-white/65 px-6 py-3.5 text-xs font-semibold text-slate-800 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white sm:text-sm"
                >
                  {copy.hero.secondary}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <p className="mx-auto mt-6 max-w-md text-[10px] leading-relaxed text-slate-500 sm:hidden">
                {copy.hero.note}
              </p>
            </div>

            <div className="mt-14 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 sm:mt-20">
              <span className="h-px w-10 bg-[#D8CCB7]" />
              <span>CREZORA.CO</span>
              <span className="h-px w-10 bg-[#D8CCB7]" />
            </div>
          </div>
        </section>

        {/* ── Products ───────────────────────────────────────────────── */}
        <section id="products" className="scroll-mt-24 border-t border-[#E4DCCB] bg-[#FBF8F1]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-800">
                {copy.products.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                {copy.products.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {copy.products.subtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2">
              {PRODUCTS.map((product) => {
                const Icon = product.icon;
                const item = copy.items[product.id];
                return (
                  <article
                    key={product.id}
                    className={`group flex flex-col rounded-[1.75rem] border border-[#E4DCCB] bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CDBFA8] hover:shadow-xl sm:p-7 ${product.glow}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${product.iconClass}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${product.statusClass}`}>
                        {statusLabel(product.status)}
                      </span>
                    </div>

                    <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                      {item.category}
                    </p>
                    <h3 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
                      {product.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                      {item.summary}
                    </p>

                    <button
                      onClick={() => go(product.route)}
                      className="mt-6 inline-flex items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition-colors group-hover:border-purple-200 group-hover:bg-purple-50 group-hover:text-purple-900"
                    >
                      {item.action}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Principles ─────────────────────────────────────────────── */}
        <section className="bg-[#171221] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300/90">
                {copy.principles.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
                {copy.principles.title}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {[
                { icon: ShieldCheck, title: copy.principles.oneTitle, body: copy.principles.oneBody },
                { icon: CircleDot, title: copy.principles.twoTitle, body: copy.principles.twoBody },
                { icon: Sparkles, title: copy.principles.threeTitle, body: copy.principles.threeBody },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-amber-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-purple-100/70">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <section className="bg-[#F7F3EC]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-[#E0D6C5] bg-[linear-gradient(135deg,#FFFDF8_0%,#F4ECDD_100%)] p-7 sm:p-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-800">
                    {copy.contact.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    {copy.contact.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {copy.contact.body}
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href={hasContactEmail() ? `mailto:${SITE.contactEmail}` : '#/contact'}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3.5 text-xs font-bold text-white transition-colors hover:bg-purple-900 sm:text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    {copy.contact.cta}
                  </a>
                  {hasContactEmail() && (
                    <a
                      href={`mailto:${SITE.contactEmail}`}
                      className="mt-3 block text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-purple-800"
                    >
                      {SITE.contactEmail}
                    </a>
                  )}
                  <p className="mt-2 max-w-xs text-[10px] leading-relaxed text-slate-400">
                    {copy.contact.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#E4DCCB] bg-[#F7F3EC]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D8CCB7] bg-white/70 text-purple-800">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-sm font-black tracking-[0.06em] text-slate-950">
                  CREZORA<span className="text-purple-700">.CO</span>
                </span>
              </div>
              <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-slate-500">
                {copy.footer.tagline}
              </p>
              <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                {copy.footer.status}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                {copy.footer.products}
              </p>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li><button onClick={() => go('landing')} className="hover:text-purple-800">KalaaVerse</button></li>
                <li><button onClick={() => go('sahayak')} className="hover:text-purple-800">Sahayak AI</button></li>
                <li><button onClick={() => go('chitti')} className="hover:text-purple-800">Chitti AI</button></li>
                <li><button onClick={() => go('translation')} className="hover:text-purple-800">BhashaVerse</button></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                {copy.footer.company}
              </p>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li><button onClick={() => go('about')} className="hover:text-purple-800">{copy.nav.about}</button></li>
                <li><button onClick={() => go('services')} className="hover:text-purple-800">{copy.nav.services}</button></li>
                <li><button onClick={() => go('contact')} className="hover:text-purple-800">{copy.footer.contact}</button></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                {copy.footer.legal}
              </p>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li><button onClick={() => go('privacy')} className="hover:text-purple-800">Privacy</button></li>
                <li><button onClick={() => go('terms')} className="hover:text-purple-800">Terms</button></li>
                {hasContactEmail() && (
                  <li>
                    <a
                      href={`mailto:${SITE.contactEmail}`}
                      className="inline-flex items-center gap-1 text-purple-800 hover:text-purple-950"
                    >
                      {SITE.contactEmail}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-[#E4DCCB] pt-5 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>{copy.footer.rights}</p>
            <p className="font-mono uppercase tracking-[0.14em]">{copy.hero.eyebrow}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
