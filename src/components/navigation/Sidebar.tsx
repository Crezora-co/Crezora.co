import React from 'react';
import {
  Home,
  Compass,
  GraduationCap,
  Sparkles,
  Users,
  Briefcase,
  MessageSquare,
  FolderLock,
  ChevronLeft,
  ChevronRight,
  User,
  Languages,
  Building2,
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentLanguage?: SupportedLanguage;
}

/**
 * Application sidebar.
 *
 * It is intentionally pinned below the 4rem header and scrolls independently so
 * it never shifts the layout as views change. Only features that actually work
 * in this Early Access build are listed — admin, marketplace and analytics were
 * removed because the underlying capabilities do not exist yet.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  currentLanguage = 'en',
}) => {
  const t = getTranslation(currentLanguage);

  const primaryNavItems = [
    { id: 'home', label: t.sidebar.home, icon: Home },
    { id: 'discover', label: t.sidebar.discover, icon: Compass },
    { id: 'knowledge', label: t.sidebar.knowledge, icon: GraduationCap },
    { id: 'studio', label: t.sidebar.studio, icon: Sparkles },
    { id: 'collaborate', label: t.sidebar.collaborate, icon: Users },
    { id: 'opportunities', label: t.sidebar.opportunities, icon: Briefcase },
    { id: 'community', label: t.sidebar.community, icon: MessageSquare },
    { id: 'profile', label: t.sidebar.profile, icon: User },
  ];

  const secondaryNavItems = [
    { id: 'library', label: t.sidebar.library, icon: FolderLock },
  ];

  const ecosystemNavItems = [
    { id: 'corporate', label: 'CREZORA.CO', icon: Building2, tone: 'purple' as const },
    { id: 'translation', label: 'BhashaVerse', icon: Languages, tone: 'teal' as const },
  ];

  const toneClasses: Record<string, string> = {
    purple: 'text-purple-600',
    teal: 'text-teal-600',
  };

  return (
    <aside
      className={`hidden md:flex flex-col self-start sticky top-16 h-[calc(100vh-4rem)] bg-white border-r border-purple-100 transition-all duration-200 select-none z-30 shadow-2xs ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-600'
                }`}
              />
              {!collapsed && <span className="text-left">{item.label}</span>}
            </button>
          );
        })}

        <div className="pt-3 pb-2">
          <div className="border-t border-purple-100" />
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
              {t.sidebar.workspace}
            </p>
          )}
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200/80'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-600'
                  }`}
                />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="pt-3 pb-2">
          <div className="border-t border-purple-100" />
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> CREZORA
            </p>
          )}
          {ecosystemNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-purple-100/70 text-purple-800 font-bold border border-purple-300/80'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${toneClasses[item.tone]}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-2 border-t border-purple-100">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-slate-400 hover:text-purple-700 hover:bg-slate-50 transition-colors text-xs"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium">{t.sidebar.collapse}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
