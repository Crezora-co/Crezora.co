import React, { useState } from 'react';
import { Sliders, Download, RotateCcw, Sparkles, Image as ImageIcon } from 'lucide-react';

export const PhotoStudio: React.FC = () => {
  const [exposure, setExposure] = useState(100);
  const [contrast, setContrast] = useState(105);
  const [saturation, setSaturation] = useState(110);
  const [sepia, setSepia] = useState(15);
  const [activePreset, setActivePreset] = useState<string>('kodak_2383');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const samplePhoto = 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80';

  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (presetKey === 'kodak_2383') {
      setExposure(105);
      setContrast(118);
      setSaturation(112);
      setSepia(18);
    } else if (presetKey === 'monochrome_noir') {
      setExposure(110);
      setContrast(135);
      setSaturation(0);
      setSepia(0);
    } else if (presetKey === 'warm_monsoon') {
      setExposure(95);
      setContrast(105);
      setSaturation(125);
      setSepia(28);
    } else if (presetKey === 'clean_digital') {
      setExposure(100);
      setContrast(100);
      setSaturation(100);
      setSepia(0);
    }
  };

  const filterStyle = {
    filter: `brightness(${exposure}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${sepia}%)`,
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono">
              Photo & Color Studio
            </span>
            <span className="text-xs text-slate-500 font-mono">Non-Destructive Grading</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Editorial Image Grading
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              showBeforeAfter ? 'bg-crezora-amber text-surface-950 font-bold' : 'bg-surface-850 text-slate-300 border border-border-base'
            }`}
          >
            {showBeforeAfter ? 'Viewing Split' : 'Compare Before / After'}
          </button>
        </div>
      </div>

      {/* Main View: Image Display + Adjustment Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 cols: Photo Viewport */}
        <div className="lg:col-span-3 rounded-3xl bg-surface-950 border border-border-base overflow-hidden relative shadow-2xl flex items-center justify-center p-4">
          {showBeforeAfter ? (
            <div className="grid grid-cols-2 w-full h-[450px] gap-2">
              <div className="relative overflow-hidden rounded-2xl border border-border-subtle">
                <img src={samplePhoto} alt="Original" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-surface-950/80 text-[10px] font-mono text-white">
                  Original RAW
                </span>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-border-subtle">
                <img src={samplePhoto} alt="Graded" style={filterStyle} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-crezora-amber text-[10px] font-mono text-surface-950 font-bold">
                  Graded Preset
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
              <img
                src={samplePhoto}
                alt="Color Grading Sample"
                style={filterStyle}
                className="w-full h-full object-cover transition-all duration-150"
              />
              <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-surface-950/80 backdrop-blur-sm text-xs font-mono text-crezora-amber border border-border-subtle">
                Preset: {activePreset.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Right 1 col: Presets & Controls */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Editorial Film Presets */}
          <div className="p-5 rounded-2xl bg-surface-900 border border-border-base space-y-3">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Editorial Presets
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'kodak_2383', name: 'Kodak 2383 Print Film', desc: 'Warm shadows, lush greens' },
                { id: 'monochrome_noir', name: 'Monochrome Noir 3200', desc: 'Deep black contrast' },
                { id: 'warm_monsoon', name: 'Warm Monsoon Dawn', desc: 'Golden amber tones' },
                { id: 'clean_digital', name: 'Clean Neutral', desc: 'Zero color coloration' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activePreset === p.id
                      ? 'bg-crezora-amber/15 border-crezora-amber text-white font-medium'
                      : 'bg-surface-850 border-border-subtle hover:bg-surface-800 text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold block">{p.name}</span>
                  <span className="text-[10px] text-slate-400">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Curve & Sliders */}
          <div className="p-5 rounded-2xl bg-surface-900 border border-border-base space-y-4 text-xs">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Adjustment Parameters
            </h3>

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Exposure:</span>
                <span className="font-mono text-white">{exposure}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="160"
                value={exposure}
                onChange={e => setExposure(Number(e.target.value))}
                className="w-full accent-crezora-amber"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Contrast:</span>
                <span className="font-mono text-white">{contrast}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="160"
                value={contrast}
                onChange={e => setContrast(Number(e.target.value))}
                className="w-full accent-crezora-amber"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Saturation:</span>
                <span className="font-mono text-white">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={saturation}
                onChange={e => setSaturation(Number(e.target.value))}
                className="w-full accent-crezora-amber"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Warmth / Sepia:</span>
                <span className="font-mono text-white">{sepia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={sepia}
                onChange={e => setSepia(Number(e.target.value))}
                className="w-full accent-crezora-amber"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
