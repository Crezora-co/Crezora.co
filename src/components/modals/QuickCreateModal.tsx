import React from 'react';
import { 
  X, 
  PenTool, 
  Palette, 
  Music, 
  Camera, 
  Activity, 
  Users, 
  Briefcase,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, subview?: string) => void;
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const creationOptions = [
    {
      id: 'writing',
      title: 'Writing Studio',
      description: 'Distraction-free markdown editor with autosave and chapter outline.',
      icon: PenTool,
      accent: 'from-amber-500/15 to-orange-500/5',
      iconColor: 'text-amber-600',
      badge: 'Prose & Script',
      action: () => { onNavigate('studio', 'writing'); onClose(); },
    },
    {
      id: 'art',
      title: 'Visual Art Studio',
      description: 'Canvas with pen, brush, highlighter and eraser, adjustable brush size and opacity, plus PNG export.',
      icon: Palette,
      accent: 'from-rose-500/15 to-pink-500/5',
      iconColor: 'text-rose-600',
      badge: 'Drawing Canvas',
      action: () => { onNavigate('studio', 'art'); onClose(); },
    },
    {
      id: 'music',
      title: 'Music & Audio Studio',
      description: 'Precision metronome, interactive virtual keyboard synth, and 8-pad drum sequencer.',
      icon: Music,
      accent: 'from-indigo-500/15 to-purple-500/5',
      iconColor: 'text-indigo-600',
      badge: 'Audio Synth',
      action: () => { onNavigate('studio', 'music'); onClose(); },
    },
    {
      id: 'photo',
      title: 'Photo Studio',
      description: 'Exposure, contrast and saturation controls, film-style presets, and before/after comparison.',
      icon: Camera,
      accent: 'from-purple-500/15 to-indigo-500/5',
      iconColor: 'text-purple-600',
      badge: 'Film Grading',
      action: () => { onNavigate('studio', 'photo'); onClose(); },
    },
    {
      id: 'practice',
      title: 'Practice Studio',
      description: 'Define your craft focus ("What I want to improve"), set weekly minutes, track streaks.',
      icon: Activity,
      accent: 'from-emerald-500/15 to-teal-500/5',
      iconColor: 'text-emerald-600',
      badge: 'Cross-Talent',
      action: () => { onNavigate('studio', 'practice'); onClose(); },
    },
    {
      id: 'collab',
      title: 'Post Collaboration Call',
      description: 'Assemble a cross-discipline team for a film, illustrated book, album, or game.',
      icon: Users,
      accent: 'from-purple-500/15 to-pink-500/5',
      iconColor: 'text-purple-600',
      badge: 'Find Co-Creators',
      action: () => { onNavigate('collaborate', 'create'); onClose(); },
    },
    {
      id: 'brief',
      title: 'Draft a Client Brief',
      description: 'Write a commission scope and budget range. Drafts stay on this device and are not published.',
      icon: Briefcase,
      accent: 'from-teal-500/15 to-cyan-500/5',
      iconColor: 'text-teal-600',
      badge: 'Local Draft',
      action: () => { onNavigate('opportunities', 'create_brief'); onClose(); },
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white border border-purple-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create New Work
              </h2>
              <p className="text-xs text-slate-500">
                Select a specialized studio or initiate an ecosystem collaboration.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {creationOptions.map(opt => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                onClick={opt.action}
                className="group relative p-5 rounded-2xl border border-purple-100/80 hover:border-purple-300 bg-purple-50/30 hover:bg-purple-50/70 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-white shadow-2xs ${opt.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white text-purple-700 font-semibold border border-purple-100">
                      {opt.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-100/60 flex items-center justify-between text-xs text-purple-700 font-semibold">
                  <span>Open Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
