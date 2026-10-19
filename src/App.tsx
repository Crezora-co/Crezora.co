import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './components/common/Header';
import { CompactFooter } from './components/common/CompactFooter';
import { Sidebar } from './components/navigation/Sidebar';
import { MobileNav } from './components/navigation/MobileNav';
import { SearchModal } from './components/modals/SearchModal';
import { QuickCreateModal } from './components/modals/QuickCreateModal';

// Dedicated Auth Views
import { JoinChoiceView } from './views/auth/JoinChoiceView';
import { CreatorSignupView } from './views/auth/CreatorSignupView';
import { ClientSignupView } from './views/auth/ClientSignupView';
import { LoginView } from './views/auth/LoginView';
import { OnboardingView } from './views/onboarding/OnboardingView';

// Core Application Views
import { LandingView } from './views/landing/LandingView';
import { HomeView } from './views/home/HomeView';
import { DiscoverView } from './views/discover/DiscoverView';
import { StudioHub } from './views/studio/StudioHub';
import { CollabHubView } from './views/collaboration/CollabHubView';
import { WorkroomView } from './views/workroom/WorkroomView';
import { OpportunitiesView } from './views/opportunities/OpportunitiesView';
import { CommunityView } from './views/community/CommunityView';
import { MarketplaceView } from './views/marketplace/MarketplaceView';
import { ProfileView } from './views/profile/ProfileView';
import { LibraryView } from './views/library/LibraryView';
import { AnalyticsView } from './views/analytics/AnalyticsView';
import { AdminView } from './views/admin/AdminView';
import { KnowledgeHubView } from './views/knowledge/KnowledgeHubView';
import { CrezoraPortalView } from './views/crezora/CrezoraPortalView';
import { CorporateView } from './views/crezora/CorporateView';
import { ChittiAIView } from './views/chitti/ChittiAIView';
import { TranslationPortalView } from './views/translation/TranslationPortalView';
import { AboutView } from './views/crezora/AboutView';
import { LabsView } from './views/crezora/LabsView';
import { StoriesView } from './views/crezora/StoriesView';
import { ServicesView } from './views/services/ServicesView';
import { LegalView } from './views/legal/LegalView';
import { ContactView } from './views/contact/ContactView';
import { SahayakAIView } from './views/sahayak/SahayakAIView';
import { CommandPalette } from './components/common/CommandPalette';

import { storageService } from './services/storageService';
import { createLocalProfile, signOutLocal } from './services/authService';
import { UserProfile } from './types/user';
import {
  SupportedLanguage,
  getLanguageDirection,
  getStoredLanguage,
  persistLanguage,
} from './services/i18n';

// ─────────────────────────────────────────────────────────────────────────
// Lightweight hash routing
//
// The app is a static single-page bundle. Hash routing keeps deep links and
// refreshes working on any static host without extra server rewrite rules.
// ─────────────────────────────────────────────────────────────────────────

const VIEW_TO_PATH: Record<string, string> = {
  corporate: '',
  landing: 'kalaaverse',
  discover: 'discover',
  knowledge: 'knowledge',
  studio: 'studio',
  collaborate: 'collaborate',
  workroom: 'workroom',
  opportunities: 'opportunities',
  community: 'community',
  marketplace: 'marketplace',
  profile: 'profile',
  library: 'library',
  analytics: 'analytics',
  admin: 'admin',
  translation: 'translate',
  sahayak: 'sahayak',
  services: 'services',
  about: 'about',
  labs: 'labs',
  stories: 'stories',
  contact: 'contact',
  privacy: 'privacy',
  terms: 'terms',
  chitti: 'chitti',
  'join-choice': 'join',
  'creator-signup': 'creator-signup',
  'client-signup': 'client-signup',
  login: 'sign-in',
  onboarding: 'onboarding',
  home: 'home',
};

const PATH_TO_VIEW: Record<string, string> = Object.entries(VIEW_TO_PATH).reduce(
  (acc, [view, path]) => {
    acc[path] = view;
    return acc;
  },
  {} as Record<string, string>
);

/** Views that require a local preview profile. */
const AUTH_REQUIRED = new Set([
  'home',
  'studio',
  'collaborate',
  'workroom',
  'opportunities',
  'community',
  'marketplace',
  'library',
  'analytics',
  'admin',
]);

/** Views that only make sense when signed out. */
const AUTH_ONLY = new Set(['join-choice', 'creator-signup', 'client-signup', 'login', 'onboarding']);

function toHash(view: string, param?: string): string {
  const path = VIEW_TO_PATH[view] ?? '';
  const base = `#/${path}`;
  return param ? `${base}/${encodeURIComponent(param)}` : base;
}

function fromHash(hash: string): { view: string; param?: string } {
  const clean = hash.replace(/^#\/?/, '');
  if (!clean) return { view: 'corporate' };
  const [segment, ...rest] = clean.split('/');
  const view = PATH_TO_VIEW[segment] ?? 'corporate';
  const param = rest.length ? decodeURIComponent(rest.join('/')) : undefined;
  return { view, param };
}

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => storageService.getCurrentUser());
  const [currentView, setCurrentView] = useState<string>(() => fromHash(window.location.hash).view);
  const [viewParam, setViewParam] = useState<string | undefined>(
    () => fromHash(window.location.hash).param
  );
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => getStoredLanguage());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => storageService.hasLocalSession() && storageService.getCurrentUser().id !== 'guest'
  );
  const [authError, setAuthError] = useState('');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keep the document language/direction and the visitor's preference in sync.
  // Only the corporate surface is fully translated for RTL today; English-fallback
  // product and legal pages must stay left-to-right.
  useEffect(() => {
    const corporateIsRtl =
      currentView === 'corporate' && getLanguageDirection(currentLanguage) === 'rtl';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = corporateIsRtl ? 'rtl' : 'ltr';
    persistLanguage(currentLanguage);
  }, [currentLanguage, currentView]);

  const handleLanguageChange = useCallback((language: SupportedLanguage) => {
    setCurrentLanguage(language);
  }, []);

  // Keep the browser tab honest about which surface is open.
  useEffect(() => {
    const titles: Record<string, string> = {
      corporate: 'CREZORA.CO — Technology for human expression',
      landing: 'KalaaVerse — Early Access | CREZORA.CO',
      sahayak: 'Sahayak AI — Concept | CREZORA.CO',
      chitti: 'Chitti AI — Concept | CREZORA.CO',
      translation: 'BhashaVerse — Preview | CREZORA.CO',
      about: 'About CREZORA.CO',
      services: 'CREZORA Studio',
      contact: 'Contact CREZORA.CO',
      privacy: 'Privacy — CREZORA.CO',
      terms: 'Terms — CREZORA.CO',
    };
    document.title = titles[currentView] ?? 'CREZORA.CO';
  }, [currentView]);

  // One-time migration: remove legacy fabricated demo profiles left in
  // localStorage by earlier builds so they cannot be mistaken for real users.
  useEffect(() => {
    try {
      const legacyPrefixes = [
        'usr_teja_',
        'usr_aarav_',
        'usr_mira_',
        'usr_aditya_',
        'usr_niharika_',
        'usr_rasool_',
        'usr_rahul_',
      ];
      const storedUser = localStorage.getItem('kv_current_user_v1');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed.id === 'string' && legacyPrefixes.some((p) => parsed.id.startsWith(p))) {
          localStorage.removeItem('kv_current_user_v1');
          localStorage.removeItem('kv_preview_session_v1');
        }
      }
      const storedCreators = localStorage.getItem('kv_creators_v1');
      if (storedCreators) {
        const parsed = JSON.parse(storedCreators);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (c: any) => c && typeof c.id === 'string' && !legacyPrefixes.some((p) => c.id.startsWith(p))
          );
          if (cleaned.length !== parsed.length) {
            localStorage.setItem('kv_creators_v1', JSON.stringify(cleaned));
          }
        }
      }
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const [pendingCreatorData, setPendingCreatorData] = useState<
    { fullName: string; email: string; phone: string } | undefined
  >(undefined);

  const navigate = useCallback((view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    const hash = toHash(view, param);
    if (window.location.hash !== hash) {
      // Setting the hash triggers the hashchange listener which re-applies the
      // same state; that is harmless and keeps back/forward working.
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keep state in sync with the address bar (back/forward, direct links, refresh).
  useEffect(() => {
    const apply = () => {
      const { view, param } = fromHash(window.location.hash);
      setCurrentView(view);
      setViewParam(param);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  // Route guards based on local preview session state.
  useEffect(() => {
    if (!isAuthenticated && AUTH_REQUIRED.has(currentView)) {
      navigate('landing');
    } else if (isAuthenticated && AUTH_ONLY.has(currentView)) {
      navigate('home');
    }
  }, [currentView, isAuthenticated, navigate]);

  const handleLogout = () => {
    signOutLocal();
    setIsAuthenticated(false);
    setCurrentUser(storageService.getCurrentUser());
    navigate('corporate');
  };

  const handleCreatorSignup = (creatorData: { fullName: string; email: string; phone: string }) => {
    createLocalProfile({ ...creatorData, role: 'creator' });
    setCurrentUser(storageService.getCurrentUser());
    setPendingCreatorData(creatorData);
    navigate('onboarding');
  };

  const handleClientSignup = (clientData: { fullName: string; email: string; phone: string }) => {
    const updated = createLocalProfile({ ...clientData, role: 'client' });
    setCurrentUser(updated);
    setIsAuthenticated(true);
    navigate('discover');
  };

  const handleLoginSuccess = (email: string) => {
    const stored = storageService.getCurrentUser();
    const matches =
      stored.id !== 'guest' &&
      stored.email.trim().toLowerCase() === email.trim().toLowerCase();

    if (!matches) {
      setAuthError('No local profile found with that email on this device. Create one to continue.');
      return;
    }
    setAuthError('');
    storageService.startLocalSession();
    setCurrentUser(stored);
    setIsAuthenticated(true);
    navigate('home');
  };

  // ── Dedicated full-page auth & onboarding views ──────────────────────
  if (currentView === 'join-choice') {
    return (
      <JoinChoiceView
        currentLanguage={currentLanguage}
        onSelectRole={(role) => navigate(role === 'creator' ? 'creator-signup' : 'client-signup')}
        onBackToHome={() => navigate('corporate')}
      />
    );
  }

  if (currentView === 'creator-signup') {
    return (
      <CreatorSignupView
        currentLanguage={currentLanguage}
        onBack={() => navigate('join-choice')}
        onSubmit={handleCreatorSignup}
        onNavigateLogin={() => navigate('login')}
      />
    );
  }

  if (currentView === 'client-signup') {
    return (
      <ClientSignupView
        currentLanguage={currentLanguage}
        onBack={() => navigate('join-choice')}
        onSubmit={handleClientSignup}
        onNavigateLogin={() => navigate('login')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <LoginView
        currentLanguage={currentLanguage}
        onBack={() => navigate('corporate')}
        onSubmit={handleLoginSuccess}
        onNavigateSignup={() => navigate('join-choice')}
        externalError={authError}
      />
    );
  }

  if (currentView === 'onboarding') {
    return (
      <OnboardingView
        initialData={pendingCreatorData}
        currentLanguage={currentLanguage}
        onComplete={(updatedUser) => {
          setCurrentUser(updatedUser);
          setIsAuthenticated(true);
          navigate('home');
        }}
        onCancel={() => navigate('corporate')}
      />
    );
  }

  // ── Public corporate website ─────────────────────────────────────────
  if (currentView === 'corporate') {
    return (
      <CorporateView
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onNavigate={navigate}
        onOpenAuth={(authView) => navigate(authView)}
      />
    );
  }

  if (currentView === 'contact') {
    return <ContactView onNavigate={navigate} />;
  }

  if (currentView === 'privacy' || currentView === 'terms') {
    return <LegalView kind={currentView} onNavigate={navigate} />;
  }

  // ── CREZORA services ─────────────────────────────────────────────────
  if (currentView === 'services') {
    return (
      <div className="min-h-screen bg-[#FAF8FF]">
        <ServicesView
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          onOpenAuth={(authView) => navigate(authView)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={navigate}
        />
      </div>
    );
  }

  // ── Legacy manifesto / labs / stories (kept, linked from About) ──────
  if (currentView === 'crezora' || currentView === 'about' || currentView === 'labs' || currentView === 'stories') {
    const Portal = currentView === 'stories' ? StoriesView : currentView === 'labs' ? LabsView : currentView === 'about' ? AboutView : CrezoraPortalView;
    return (
      <div className="min-h-screen bg-[#FAF8FF]">
        <Portal
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          onOpenAuth={(authView) => navigate(authView)}
        />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={navigate}
        />
      </div>
    );
  }

  // ── CHITTI AI (unlinked early experiment) ────────────────────────────
  if (currentView === 'chitti') {
    return (
      <div className="min-h-screen bg-[#FAF8FF]">
        <ChittiAIView
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          onOpenAuth={(authView) => navigate(authView)}
        />
      </div>
    );
  }

  // ── Sahayak AI (honest concept page) ─────────────────────────────────
  if (currentView === 'sahayak') {
    return (
      <div className="min-h-screen bg-[#F7F3EC]">
        <SahayakAIView currentLanguage={currentLanguage} onNavigate={navigate} />
      </div>
    );
  }

  // ── BhashaVerse ──────────────────────────────────────────────────────
  if (currentView === 'translation') {
    return (
      <div className="min-h-screen bg-[#FAF8FF]">
        <TranslationPortalView
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          onOpenAuth={(authView) => navigate(authView)}
        />
      </div>
    );
  }

  // ── Public KalaaVerse talent discovery ───────────────────────────────
  if (currentView === 'discover') {
    return (
      <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans flex flex-col">
        <DiscoverView
          initialTalentFilter={viewParam}
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          onOpenAuth={(authView) => navigate(authView)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          isAuthenticated={isAuthenticated}
        />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={navigate}
        />
      </div>
    );
  }

  // ── Public KalaaVerse landing page ───────────────────────────────────
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans">
        <Header
          currentUser={currentUser}
          currentView={currentView}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onNavigate={navigate}
          onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={(authView) => navigate(authView)}
          onUserUpdated={setCurrentUser}
          onLogout={handleLogout}
          isPublicMode={true}
          isAuthenticated={isAuthenticated}
        />

        <main className="flex-1">
          <LandingView
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onEnterApp={() => navigate(isAuthenticated ? 'home' : 'join-choice')}
            onExploreCreators={(domain) => navigate('discover', domain)}
            onStartOnboarding={() => navigate('join-choice')}
            onOpenAuth={(authView) => navigate(authView)}
            onViewProfile={(creatorId) => navigate('profile', creatorId)}
            onOpenKnowledge={() => navigate('knowledge')}
            onNavigate={navigate}
          />
        </main>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={navigate}
        />
      </div>
    );
  }

  // ── Public Knowledge Hub ─────────────────────────────────────────────
  if (currentView === 'knowledge' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8FF] text-slate-800 font-sans flex flex-col">
        <Header
          currentUser={currentUser}
          currentView={currentView}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onNavigate={navigate}
          onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={(authView) => navigate(authView)}
          onUserUpdated={setCurrentUser}
          onLogout={handleLogout}
          isPublicMode={true}
          isAuthenticated={isAuthenticated}
        />
        <main className="flex-1">
          <KnowledgeHubView
            currentLanguage={currentLanguage}
            onNavigate={navigate}
            onOpenAuth={(authView) => navigate(authView)}
          />
        </main>
        <CompactFooter onNavigate={navigate} />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={navigate} />
      </div>
    );
  }

  // ── Authenticated application shell ──────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col selection:bg-purple-600/20 selection:text-purple-900 font-sans">

      <Header
        currentUser={currentUser}
        currentView={currentView}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onNavigate={navigate}
        onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(authView) => navigate(authView)}
        onUserUpdated={setCurrentUser}
        onLogout={handleLogout}
        isPublicMode={false}
        isAuthenticated={isAuthenticated}
      />

      <div className="flex-1 flex w-full items-start">
        <Sidebar
          currentView={currentView}
          currentLanguage={currentLanguage}
          onNavigate={navigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 pb-20 md:pb-10 overflow-x-hidden min-w-0 min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1">
            {currentView === 'home' && (
              <HomeView
                currentUser={currentUser}
                currentLanguage={currentLanguage}
                onNavigate={navigate}
                onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
              />
            )}

            {currentView === 'knowledge' && (
              <KnowledgeHubView
                currentLanguage={currentLanguage}
                onNavigate={navigate}
                onOpenAuth={(authView) => navigate(authView)}
              />
            )}

            {currentView === 'studio' && (
              <StudioHub initialStudio={viewParam || 'writing'} onNavigate={navigate} />
            )}

            {currentView === 'collaborate' && (
              <CollabHubView
                onOpenWorkroom={(roomId) => navigate('workroom', roomId)}
                onNavigateProfile={(creatorId) => navigate('profile', creatorId)}
              />
            )}

            {currentView === 'workroom' && <WorkroomView onBack={() => navigate('collaborate')} />}

            {currentView === 'opportunities' && <OpportunitiesView />}

            {currentView === 'community' && (
              <CommunityView
                initialTab={viewParam || 'guilds'}
                onNavigateProfile={(creatorId) => navigate('profile', creatorId)}
              />
            )}

            {currentView === 'marketplace' && <MarketplaceView />}

            {currentView === 'profile' && <ProfileView creatorId={viewParam} onNavigate={navigate} />}

            {currentView === 'library' && <LibraryView onNavigate={navigate} />}

            {currentView === 'analytics' && <AnalyticsView />}

            {currentView === 'admin' && <AdminView />}
          </div>

          <CompactFooter onNavigate={navigate} />
        </main>
      </div>

      <MobileNav
        currentView={currentView}
        currentLanguage={currentLanguage}
        onNavigate={navigate}
        onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={navigate} />

      <QuickCreateModal
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        onNavigate={navigate}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
};
