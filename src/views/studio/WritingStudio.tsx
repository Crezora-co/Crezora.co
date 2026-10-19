import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  History, 
  FileText, 
  Check, 
  Send,
  Sliders,
  RotateCcw,
  Tag
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { WritingDraft } from '../../types/studio';

interface WritingStudioProps {
  onPublishToPortfolio: (draft: WritingDraft) => void;
}

export const WritingStudio: React.FC<WritingStudioProps> = ({
  onPublishToPortfolio,
}) => {
  const [draft, setDraft] = useState<WritingDraft>(() => storageService.getWritingDraft());
  const [zenMode, setZenMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedText, setLastSavedText] = useState('Saved just now');
  const [activeSidePanel, setActiveSidePanel] = useState<'assistant' | 'references' | 'history' | null>('assistant');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Recalculate word count and reading time on change
  const handleContentChange = (newContent: string) => {
    const words = newContent.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    
    setDraft(prev => ({
      ...prev,
      content: newContent,
      wordCount: words,
      readingTimeMinutes: readingTime,
    }));
  };

  // Autosave periodically
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      storageService.saveWritingDraft(draft);
      setTimeout(() => {
        setIsSaving(false);
        setLastSavedText('Saved just now');
      }, 400);
    }, 1500);

    return () => clearTimeout(timer);
  }, [draft]);

  // Static craft prompts. There is no AI model in this build, so nothing is
  // generated from the manuscript and no text is rewritten on the user's behalf.
  const handleAskAssistant = () => {
    setAiSuggestions([
      'Sensory anchoring: ground the scene in one tactile local detail — hot stone, brass tumblers, a ceiling fan.',
      'Subtextual friction: let characters discuss an everyday transaction while avoiding the real subject.',
      'Pacing counterpoint: follow an introspective beat with a sudden external interruption.',
    ]);
  };

  const insertMarkdown = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('manuscript-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = prefix + selected + suffix;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    handleContentChange(newText);
  };

  return (
    <div className={`transition-all ${zenMode ? 'fixed inset-0 z-50 bg-[#FAF8FF] p-6' : 'p-4 sm:p-8 max-w-7xl mx-auto'}`}>
      
      {/* Top Studio Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-purple-100 bg-white/90 backdrop-blur-sm sticky top-16 z-20 px-4 py-2 rounded-2xl shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono">
              Writing Studio
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {isSaving ? 'Saving...' : lastSavedText}
            </span>
          </div>
          <input
            type="text"
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            className="text-xl sm:text-2xl font-bold font-serif text-slate-900 bg-transparent border-none focus:outline-none mt-1 w-full"
            placeholder="Untitled Manuscript"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Zen Mode Toggle */}
          <button
            onClick={() => setZenMode(!zenMode)}
            className="p-2 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
            title={zenMode ? 'Exit Zen Mode' : 'Distraction-Free Zen Mode'}
          >
            {zenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Drawer Toggles */}
          <button
            onClick={() => setActiveSidePanel(activeSidePanel === 'assistant' ? null : 'assistant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSidePanel === 'assistant'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:text-purple-700 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Writing Prompts</span>
          </button>

          <button
            onClick={() => setActiveSidePanel(activeSidePanel === 'references' ? null : 'references')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSidePanel === 'references'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:text-purple-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reference Notes</span>
          </button>

          {/* Publish Excerpt CTA */}
          <button
            onClick={() => onPublishToPortfolio(draft)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Excerpt</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Editor Area */}
        <div className={`${activeSidePanel ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-4`}>
          
          {/* Markdown Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white border border-purple-100 text-xs text-slate-600 shadow-2xs">
            <button onClick={() => insertMarkdown('## ')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700 font-mono">H2</button>
            <button onClick={() => insertMarkdown('### ')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700 font-mono">H3</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => insertMarkdown('**', '**')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700 font-bold">B</button>
            <button onClick={() => insertMarkdown('*', '*')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700 italic font-serif">I</button>
            <button onClick={() => insertMarkdown('> ')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700">Quote</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => insertMarkdown('\n\n---\n\n')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700">Scene Break</button>
            <button onClick={() => insertMarkdown('\n[DIALOGUE: ')} className="px-2.5 py-1 rounded hover:bg-purple-50 hover:text-purple-700 font-mono">Dialogue</button>

            {/* Metrics display */}
            <div className="ml-auto flex items-center gap-3 text-[11px] font-mono text-slate-400 pr-2">
              <span>{draft.wordCount} words</span>
              <span>•</span>
              <span>{draft.readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Paper Textarea */}
          <div className="rounded-3xl bg-white border border-purple-100 p-6 sm:p-12 shadow-sm min-h-[600px] flex flex-col">
            <textarea
              id="manuscript-editor"
              value={draft.content}
              onChange={e => handleContentChange(e.target.value)}
              placeholder="Begin your story here. Ideas usually arrive before schedules do..."
              className="w-full flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-serif text-base sm:text-lg leading-relaxed resize-none selection:bg-purple-100 selection:text-purple-900"
            />
          </div>
        </div>

        {/* Side Panel Drawer */}
        {activeSidePanel && (
          <div className="lg:col-span-1 space-y-4">
            
            {/* STATIC WRITING PROMPTS DRAWER */}
            {activeSidePanel === 'assistant' && (
              <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900">
                      Writing Prompts
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">
                    Offline
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-slate-500">
                    A fixed set of craft prompts. This is not an AI model: it does not read your manuscript and cannot rewrite it.
                  </p>
                  
                  <button
                    onClick={handleAskAssistant}
                    className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Show Craft Prompts</span>
                  </button>
                </div>

                {/* Suggestions Feed */}
                {aiSuggestions.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Prompt Cards:
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {aiSuggestions.map((s, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-purple-50 text-xs text-purple-900 border border-purple-100">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REFERENCES DRAWER */}
            {activeSidePanel === 'references' && (
              <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900">
                    Plot & Character Drawer
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold">Genre</label>
                    <div className="font-semibold text-slate-800 capitalize">{draft.genre.replace('_', ' ')}</div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-bold">Key Motifs</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {draft.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-bold">Synopsis Note</label>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {draft.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
