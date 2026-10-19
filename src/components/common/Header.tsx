import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Plus, 
  Palette, 
  Briefcase, 
  Users, 
  ChevronDown, 
  LogOut, 
  User, 
  Globe,
  BookOpen,
  Menu,
  X,
  Home,
  Compass,
  GraduationCap,
  ShoppingBag,
  MessageSquare,
  Heart,
  Languages,
  ArrowRight
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types/user';
import { storageService, AppNotification } from '../../services/storageService';
import { SupportedLanguage, getTranslation } from '../../services/i18n';
import { getCorporateCopy } from '../../locales/corporate';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  currentUser: UserProfile;
  currentView: string;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenQuickCreate: () => void;
  onOpenSearch: () => void;
  onOpenAuth: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
  onUserUpdated: (user: UserProfile) => void;
  onLogout?: () => void;
  isPublicMode?: boolean;
  isAuthenticated?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentView,
  currentLanguage = 'en',
  onLanguageChange,
  onNavigate,
  onOpenQuickCreate,
  onOpenSearch,
  onOpenAuth,
  onUserUpdated,
  onLogout,
  isPublicMode = false,
  isAuthenticated = false,
}) => {
  const t = getTranslation(currentLanguage);
  const [showRoleDropdown, setShowRoleDropdown]   = useState(false);
  const [showUserMenu, setShowUserMenu]           = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showEcosystemDropdown, setShowEcosystemDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu]       = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => storageService.getNotifications());

  const unreadCount  = notifications.filter((n) => !n.read).length;
  const corporateCopy = getCorporateCopy(currentLanguage);
  const languageCopy = corporateCopy.language;

  const handleSwitchRole = (role: UserRole) => {
    const updated = storageService.switchRole(role);
    onUserUpdated(updated);
    setShowRoleDropdown(false);
  };

  const handleMarkNotifRead = (id: string, actionUrl?: string) => {
    storageService.markNotificationRead(id);
    setNotifications(storageService.getNotifications());
    if (actionUrl) { onNavigate(actionUrl); setShowNotifDropdown(false); }
  };

  const allNavItems = [
    { id: 'home',          label: 'Home',          icon: Home },
    { id: 'discover',      label: 'Discover',       icon: Compass },
    { id: 'knowledge',     label: 'Knowledge Hub',  icon: GraduationCap },
    { id: 'studio',        label: 'Studio',         icon: Sparkles },
    { id: 'collaborate',   label: 'Collaborate',    icon: Users },
    { id: 'opportunities', label: 'Opportunities',  icon: Briefcase },
    { id: 'community',     label: 'Community',      icon: MessageSquare },
    { id: 'profile',       label: 'My Profile',     icon: User },
  ];

  return (
    <>
      {/* ═══ STICKY TOP HEADER ═══════════════════════════════════════ */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs h-14 sm:h-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 h-full flex items-center justify-between gap-2">

          {/* LEFT — Logo + desktop nav */}
          <div className="flex items-center gap-3 lg:gap-6 min-w-0">
            <div className="flex items-center gap-2 select-none shrink-0">
              <div
                onClick={() => { onNavigate(isAuthenticated ? 'home' : 'landing'); setShowMobileMenu(false); }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/30 group-hover:bg-purple-700 transition-colors">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                    KalaaVerse
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onNavigate('corporate'); setShowMobileMenu(false); }}
                    className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-400 hover:text-purple-600 font-mono tracking-wider text-left transition-colors cursor-pointer"
                    title="View CREZORA.CO corporate site"
                  >
                    CREZORA.CO ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop nav — only lg+ */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {[
                { v: 'discover',    l: t.nav.discover },
                { v: 'knowledge',   l: 'Knowledge' },
                { v: 'collaborate', l: t.nav.collaborate },
                { v: 'studio',      l: t.nav.publish },
              ].map(item => (
                <button
                  key={item.v}
                  onClick={() => onNavigate(item.v)}
                  className={`px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    currentView === item.v ? 'text-purple-600 font-semibold' : 'text-slate-600 hover:text-purple-600'
                  }`}
                >
                  {item.l}
                </button>
              ))}

              {/* Direct link to BhashaVerse */}
              <button
                onClick={() => onNavigate('translation')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'translation'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-teal-700 hover:bg-teal-50'
                }`}
                title="BhashaVerse translation studio"
              >
                <Languages className="w-3.5 h-3.5 text-teal-600" />
                <span>BhashaVerse</span>
              </button>

              {/* Ecosystem Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setShowEcosystemDropdown(!showEcosystemDropdown)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Universe</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showEcosystemDropdown && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2.5 z-50 animate-scaleUp">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 font-mono">
                      CREZORA.CO Ecosystem
                    </div>
                    
                    <button
                      onClick={() => { onNavigate('corporate'); setShowEcosystemDropdown(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-purple-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">CREZORA.CO</div>
                        <div className="text-[10px] text-slate-500">Company, services & contact</div>
                      </div>
                    </button>

                    <button
                      onClick={() => { onNavigate(isAuthenticated ? 'home' : 'landing'); setShowEcosystemDropdown(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-purple-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">KalaaVerse</div>
                        <div className="text-[10px] text-slate-500">Creative talent directory (Early Access)</div>
                      </div>
                    </button>

                    <button
                      onClick={() => { onNavigate('translation'); setShowEcosystemDropdown(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-teal-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Languages className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700">BhashaVerse</div>
                        <div className="text-[10px] text-slate-500">Translation studio (backend not configured)</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* CENTER — Search bar (md+) */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-3">
            <div
              onClick={onOpenSearch}
              className="w-full flex items-center bg-slate-100 hover:bg-slate-200/60 border border-slate-200/70 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-pointer transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
              <span className="truncate">{t.nav.searchPlaceholder}</span>
              <kbd className="hidden lg:inline-block ml-auto text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 font-mono">⌘K</kbd>
            </div>
          </div>

          {/* RIGHT — actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Mobile search icon (hidden md+) */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language picker — hidden on mobile (lives in drawer) */}
            {onLanguageChange && (
              <div className="hidden sm:block">
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onChange={onLanguageChange}
                  copy={languageCopy}
                  closeLabel={corporateCopy.nav.close}
                />
              </div>
            )}

            {/* Auth buttons / user area */}
            {isPublicMode && !isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-purple-600 px-2 py-1.5 cursor-pointer transition-colors whitespace-nowrap"
                >
                  Sign in
                </button>
                <button
                  onClick={() => onOpenAuth('join-choice')}
                  className="px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-600/25 cursor-pointer whitespace-nowrap transition-all"
                >
                  Join
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Create — desktop */}
                <button
                  onClick={onOpenQuickCreate}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create
                </button>

                {/* Notifications (sm+) */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                    className="relative p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />}
                  </button>
                  {showNotifDropdown && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-scaleUp">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                        <span className="text-[10px] text-purple-600 font-medium">{unreadCount} unread</span>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleMarkNotifRead(n.id, n.actionUrl)}
                            className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${!n.read ? 'bg-purple-50/60 hover:bg-purple-50' : 'hover:bg-slate-50'}`}
                          >
                            <div className="font-semibold text-slate-800">{n.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{n.message}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User avatar */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-purple-300 transition-all cursor-pointer"
                  >
                    <img src={currentUser.avatarUrl} alt={currentUser.displayName} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-purple-200" />
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-scaleUp">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{currentUser.displayName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
                      </div>
                      {[
                        { view: 'profile',   label: 'My Profile',     icon: User },
                        { view: 'knowledge', label: 'Knowledge Hub',  icon: GraduationCap },
                        { view: 'collaborate', label: 'My Workrooms', icon: Users },
                      ].map(item => (
                        <button key={item.view} onClick={() => { onNavigate(item.view); setShowUserMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-3.5 h-3.5" /><span>{item.label}</span>
                        </button>
                      ))}
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={() => { if (onLogout) onLogout(); else onNavigate('landing'); setShowUserMenu(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /><span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hamburger — visible on all < lg */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer ml-0.5"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE DRAWER ════════════════════════════════════════════ */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[88vw] bg-white shadow-2xl flex flex-col animate-scaleUp origin-left">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">KalaaVerse</div>
                  <div className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">CREZORA.CO</div>
                </div>
              </div>
              <button onClick={() => setShowMobileMenu(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              {isAuthenticated ? (
                allNavItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setShowMobileMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      currentView === item.id
                        ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200/60'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-purple-700'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${currentView === item.id ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                ))
              ) : (
                <>
                  <button
                    onClick={() => { onOpenAuth('join-choice'); setShowMobileMenu(false); }}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm cursor-pointer transition-colors"
                  >
                    Join KalaaVerse — Free
                  </button>

                  <button
                    onClick={() => { onOpenAuth('login'); setShowMobileMenu(false); }}
                    className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    Reopen a local profile
                  </button>
                  <div className="border-t border-slate-100 my-2" />
                  {[
                    { view: 'discover',  label: 'Explore Creators', icon: Compass },
                    { view: 'knowledge', label: 'Knowledge Hub',    icon: GraduationCap },
                    { view: 'community', label: 'Community',        icon: MessageSquare },
                  ].map(item => (
                    <button
                      key={item.view}
                      onClick={() => { onNavigate(item.view); setShowMobileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-700 cursor-pointer transition-colors"
                    >
                      <item.icon className="w-5 h-5 shrink-0 text-slate-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </>
              )}
              {/* CREZORA.CO Universe Flagship Products Section in Mobile Drawer */}
              <div className="pt-3 pb-1">
                <div className="border-t border-slate-100 mb-2" />
                <p className="text-[10px] uppercase font-bold text-slate-400 font-mono px-3 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> CREZORA Universe
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => { onNavigate('corporate'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      currentView === 'corporate'
                        ? 'bg-purple-50 text-purple-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-purple-700'
                    }`}
                  >
                    <Sparkles className="w-4.5 h-4.5 text-purple-600 shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-xs">CREZORA.CO</div>
                      <div className="text-[10px] text-slate-400">Company & contact</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('translation'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      currentView === 'translation'
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-slate-700 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    <Languages className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-xs">BhashaVerse</div>
                      <div className="text-[10px] text-slate-400">Translation studio</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Language selector inside drawer */}
            {onLanguageChange && (
              <div className="border-t border-slate-100 px-4 py-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-2.5 flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> {languageCopy.title}
                </p>
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onChange={onLanguageChange}
                  copy={languageCopy}
                  variant="inline"
                  closeLabel={corporateCopy.nav.close}
                />
              </div>
            )}

            {/* Logout at bottom */}
            {isAuthenticated && (
              <div className="border-t border-slate-100 px-4 py-3">
                <button
                  onClick={() => { if (onLogout) onLogout(); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

