import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  Save, 
  Activity, 
  RotateCcw, 
  Music, 
  Clock, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { audioEngine, PIANO_KEYS } from '../../utils/audioSynth';
import { storageService } from '../../services/storageService';
import { MusicSession } from '../../types/studio';

export const MusicStudio: React.FC = () => {
  const [bpm, setBpm] = useState(112);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignature] = useState<'4/4' | '3/4' | '6/8'>('4/4');
  const [waveType, setWaveType] = useState<OscillatorType>('triangle');
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [activeDrum, setActiveDrum] = useState<string | null>(null);
  const [practiceNotes, setPracticeNotes] = useState('');
  const [scaleSelection, setScaleSelection] = useState('raga_bhairav');
  const [sessionDurationSec, setSessionDurationSec] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessions, setSessions] = useState<MusicSession[]>(() => storageService.getMusicSessions());

  // Session timer
  useEffect(() => {
    let interval: number | null = null;
    if (isSessionActive) {
      interval = window.setInterval(() => {
        setSessionDurationSec(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive]);

  // Metronome control
  const toggleMetronome = () => {
    if (isPlayingMetronome) {
      audioEngine.stopMetronome();
      setIsPlayingMetronome(false);
      setCurrentBeat(0);
    } else {
      const beats = timeSignature === '3/4' ? 3 : timeSignature === '6/8' ? 6 : 4;
      audioEngine.startMetronome(bpm, beats, (beat) => {
        setCurrentBeat(beat);
      });
      setIsPlayingMetronome(true);
      if (!isSessionActive) setIsSessionActive(true);
    }
  };

  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  const handlePlayKey = (note: string, freq: number) => {
    setActiveNote(note);
    audioEngine.playNote(freq, 0.6, waveType);
    if (!isSessionActive) setIsSessionActive(true);
    setTimeout(() => setActiveNote(null), 250);
  };

  const handlePlayDrum = (drumType: 'kick' | 'snare' | 'hihat' | 'clap' | 'tom' | 'rimshot') => {
    setActiveDrum(drumType);
    audioEngine.playDrum(drumType);
    if (!isSessionActive) setIsSessionActive(true);
    setTimeout(() => setActiveDrum(null), 180);
  };

  const handleSaveSession = () => {
    const session: MusicSession = {
      id: `sess_${Date.now()}`,
      creatorId: storageService.getCurrentUser().id,
      title: `${scaleSelection.replace('_', ' ').toUpperCase()} Practice Run`,
      instrument: 'Virtual Synthesizer & Metronome',
      bpm,
      timeSignature,
      durationSeconds: sessionDurationSec,
      scaleOrKey: scaleSelection,
      notes: practiceNotes || 'Practiced melodic phrasing and pocket timing.',
      recordedAt: 'Just now',
    };
    storageService.saveMusicSession(session);
    setSessions(storageService.getMusicSessions());
    setIsSessionActive(false);
    setSessionDurationSec(0);
    setPracticeNotes('');
    if (isPlayingMetronome) toggleMetronome();
  };

  // Keyboard shortcut listener for piano keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const keyObj = PIANO_KEYS.find(k => k.keyLabel.toLowerCase() === e.key.toLowerCase());
      if (keyObj) {
        handlePlayKey(keyObj.note, keyObj.freq);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [waveType, isSessionActive]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono">
              Music & Audio Studio
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Synthesizer & Practice Environment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Virtual Synthesizer & Metronome
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-purple-100 shadow-2xs font-mono text-xs text-purple-700 font-bold">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>
              {Math.floor(sessionDurationSec / 60)}:{(sessionDurationSec % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={handleSaveSession}
            disabled={sessionDurationSec === 0}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5 disabled:opacity-40"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Log Practice Session</span>
          </button>
        </div>
      </div>

      {/* Grid: Metronome & Drum Pads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metronome Control Panel */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider">
                Precision Metronome
              </h3>
              <span className="text-xs font-mono text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full">
                {timeSignature}
              </span>
            </div>

            {/* Visual Beat Indicators */}
            <div className="flex items-center justify-center gap-3 py-4 bg-purple-50/50 rounded-2xl border border-purple-100 mb-6">
              {[1, 2, 3, 4].map(b => (
                <div
                  key={b}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-75 ${
                    currentBeat === b
                      ? 'bg-purple-600 text-white scale-115 shadow-md shadow-purple-600/30'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {b}
                </div>
              ))}
            </div>

            {/* BPM Slider & Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tempo:</span>
                <span className="font-mono text-xl font-bold text-slate-900">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min="40"
                max="240"
                value={bpm}
                onChange={e => {
                  setBpm(Number(e.target.value));
                  if (isPlayingMetronome) {
                    audioEngine.startMetronome(Number(e.target.value), 4, setCurrentBeat);
                  }
                }}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={toggleMetronome}
            className={`w-full py-3 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
              isPlayingMetronome
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
            }`}
          >
            {isPlayingMetronome ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlayingMetronome ? 'Stop Metronome' : 'Start Metronome'}</span>
          </button>
        </div>

        {/* 8-Pad Drum Machine & Scale Reference */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider">
                Percussion Pads
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Synthesized rhythm triggers (kick, snare, hi-hat, clap)</p>
            </div>
          </div>

          {/* Drum Pads Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {[
              { id: 'kick', label: 'Kick', desc: '40Hz Sub' },
              { id: 'snare', label: 'Snare', desc: 'White Noise' },
              { id: 'hihat', label: 'Hi-Hat', desc: 'High Filter' },
              { id: 'clap', label: 'Clap', desc: 'Multistrike' },
              { id: 'tom', label: 'Tom', desc: 'Pitch Drop' },
              { id: 'rimshot', label: 'Rim', desc: 'Wood Click' },
            ].map(drum => (
              <button
                key={drum.id}
                onClick={() => handlePlayDrum(drum.id as any)}
                className={`p-3 rounded-2xl border text-center transition-all active:scale-95 flex flex-col items-center justify-center ${
                  activeDrum === drum.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105'
                    : 'bg-purple-50/40 hover:bg-purple-50 text-slate-800 border-purple-100'
                }`}
              >
                <span className="text-xs font-bold">{drum.label}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">{drum.desc}</span>
              </button>
            ))}
          </div>

          {/* Scale Reference & Chord Guide */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 block mb-1 font-semibold">Scale & Raga Reference:</span>
              <select
                value={scaleSelection}
                onChange={e => setScaleSelection(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl focus:border-purple-600 outline-none"
              >
                <option value="raga_bhairav">Raga Bhairav (C - Db - E - F - G - Ab - B)</option>
                <option value="raga_dorian">Dorian Mode (D - E - F - G - A - B - C)</option>
                <option value="pentatonic_minor">Minor Pentatonic (A - C - D - E - G)</option>
                <option value="blues_scale">Blues Scale (C - Eb - F - F# - G - Bb)</option>
              </select>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-semibold">Synth Waveform:</span>
              <div className="flex gap-1">
                {(['triangle', 'sine', 'sawtooth', 'square'] as OscillatorType[]).map(wt => (
                  <button
                    key={wt}
                    onClick={() => setWaveType(wt)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-colors ${
                      waveType === wt ? 'bg-purple-600 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2-Octave Virtual Synthesizer Keyboard */}
      <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Polyphonic Piano Synthesizer</h3>
            <p className="text-xs text-slate-500">Play with mouse or use computer keyboard keys (A, W, S, E, D, F, T, G...)</p>
          </div>
          <span className="text-xs font-mono text-purple-600 font-semibold">WebAudio 44.1kHz</span>
        </div>

        {/* Keyboard Container */}
        <div className="relative flex justify-center py-4 overflow-x-auto select-none">
          <div className="inline-flex relative bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-xl">
            {PIANO_KEYS.map(k => (
              <button
                key={k.note}
                onClick={() => handlePlayKey(k.note, k.freq)}
                className={`relative flex flex-col justify-end items-center pb-2 rounded-b-lg transition-all active:translate-y-1 ${
                  k.isBlack
                    ? 'w-7 sm:w-9 h-28 sm:h-36 -mx-3.5 sm:-mx-4.5 z-10 bg-slate-950 border border-slate-800 text-slate-400 shadow-md'
                    : 'w-10 sm:w-14 h-44 sm:h-56 bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200'
                } ${activeNote === k.note ? '!bg-purple-600 !text-white !border-purple-600 shadow-lg shadow-purple-600/40' : ''}`}
              >
                <span className="text-[10px] font-mono font-bold">{k.note}</span>
                <span className={`text-[9px] font-mono opacity-60 ${k.isBlack ? 'text-slate-400' : 'text-slate-500'}`}>
                  [{k.keyLabel}]
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Notes & Recent Session Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Practice Notes */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Session Journal & Practice Focus</h3>
          <textarea
            rows={3}
            value={practiceNotes}
            onChange={e => setPracticeNotes(e.target.value)}
            placeholder="Record what you observed during practice (e.g. hand relaxation during fast tempo, tone clarity)..."
            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 resize-none"
          />
        </div>

        {/* Recent Practice Log History */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Recent Practice Sessions</h3>
            <span className="text-xs text-purple-600 font-mono font-bold">{sessions.length} logged</span>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {sessions.map(s => (
              <div key={s.id} className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-slate-900">{s.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{s.bpm} BPM • {s.durationSeconds}s duration</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{s.recordedAt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
