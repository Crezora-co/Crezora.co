import React from 'react';
import { Home, Compass, GraduationCap, Plus, Users, User } from 'lucide-react';

import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenQuickCreate: () => void;
  currentLanguage?: SupportedLanguage;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigate,
  onOpenQuickCreate,
  currentLanguage = 'en',
}) => {
  const t = getTranslation(currentLanguage);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-purple-100 px-2 py-1 flex items-center justify-around shadow-xl">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
          currentView === 'home' ? 'text-purple-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="w-4.5 h-4.5" />
        <span className="text-[9px] font-medium">{t.sidebar.home}</span>
      </button>

      <button
        onClick={() => onNavigate('discover')}
        className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
          currentView === 'discover' ? 'text-purple-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Compass className="w-4.5 h-4.5" />
        <span className="text-[9px] font-medium">{t.sidebar.discover}</span>
      </button>


      {/* Center Create Button */}
      <button
        onClick={onOpenQuickCreate}
        className="flex items-center justify-center -mt-4 w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
        title="Start something new"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
      </button>

      <button
        onClick={() => onNavigate('knowledge')}
        className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
          currentView === 'knowledge' ? 'text-purple-600 font-bold' : 'text-slate-500'
        }`}
      >
        <GraduationCap className="w-4.5 h-4.5" />
        <span className="text-[9px] font-medium">{t.sidebar.knowledge}</span>
      </button>

      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
          currentView === 'profile' ? 'text-purple-600 font-bold' : 'text-slate-500'
        }`}
      >
        <User className="w-4.5 h-4.5" />
        <span className="text-[9px] font-medium">{t.sidebar.profile}</span>
      </button>
    </nav>
  );
};


