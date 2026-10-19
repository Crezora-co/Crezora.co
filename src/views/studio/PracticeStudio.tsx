import React, { useState, useEffect } from 'react';
import { Activity, Play, Square, Flame, CheckCircle2, Plus, Calendar, Clock, Award } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { PracticeTrackerItem } from '../../types/studio';

export const PracticeStudio: React.FC = () => {
  const [trackers, setTrackers] = useState<PracticeTrackerItem[]>(() => storageService.getPracticeTracker());
  const [activeTrackerId, setActiveTrackerId] = useState<string>(trackers[0]?.id || '');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sessionNote, setSessionNote] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Writing & Literature');
  const [newTargetMinutes, setNewTargetMinutes] = useState(240);

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const activeTracker = trackers.find(t => t.id === activeTrackerId) || trackers[0];

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleLogCurrentSession = () => {
    const minutes = Math.max(1, Math.round(elapsedSeconds / 60));
    storageService.logPracticeSession(activeTracker.id, minutes, sessionNote || 'Completed focused craft practice.');
    setTrackers(storageService.getPracticeTracker());
    setIsTimerRunning(false);
    setElapsedSeconds(0);
    setSessionNote('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
              Practice Studio
            </span>
            <span className="text-xs text-slate-500 font-mono">Cross-Talent Craft Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Deliberate Practice & Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            "What I want to improve" — track streaks, hours, and breakthrough observations.
          </p>
        </div>

        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="px-4 py-2 rounded-xl bg-crezora-amber hover:bg-amber-400 text-surface-950 font-bold text-xs transition-all shadow-md shadow-crezora-amber/10 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Craft Focus</span>
        </button>
      </div>

      {/* Main Focus Goal Banner & Timer */}
      {activeTracker && (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-surface-900 via-surface-850 to-surface-900 border border-border-base shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold text-crezora-amber px-2.5 py-0.5 rounded-full bg-crezora-amber/10 border border-crezora-amber/20">
                {activeTracker.category}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{activeTracker.streakDays} Day Streak</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {activeTracker.skillName}
            </h2>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Weekly Goal Progress:</span>
                <span className="text-white font-semibold">
                  {activeTracker.currentMinutesThisWeek} / {activeTracker.targetMinutesWeekly} mins ({Math.round((activeTracker.currentMinutesThisWeek / activeTracker.targetMinutesWeekly) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-950 border border-border-subtle overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-crezora-amber transition-all duration-300"
                  style={{ width: `${Math.min(100, (activeTracker.currentMinutesThisWeek / activeTracker.targetMinutesWeekly) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Live Practice Stopwatch */}
          <div className="p-6 rounded-2xl bg-surface-950 border border-border-subtle flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-widest">
              {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:
              {(elapsedSeconds % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex items-center gap-2 w-full">
              <button
                onClick={handleToggleTimer}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  isTimerRunning
                    ? 'bg-rose-500 text-white'
                    : 'bg-crezora-amber text-surface-950 hover:bg-amber-400'
                }`}
              >
                {isTimerRunning ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Session'}</span>
              </button>

              <button
                onClick={handleLogCurrentSession}
                disabled={elapsedSeconds < 10}
                className="px-4 py-2.5 rounded-xl bg-surface-850 hover:bg-surface-800 text-white text-xs font-medium border border-border-base disabled:opacity-30"
              >
                Log
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Trackers List & Recent Journal Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* All Goals Selection */}
        <div className="p-6 rounded-3xl bg-surface-900 border border-border-base space-y-4">
          <h3 className="text-sm font-bold font-serif text-white">Your Craft Improvement Goals</h3>
          
          <div className="space-y-3">
            {trackers.map(t => (
              <div
                key={t.id}
                onClick={() => setActiveTrackerId(t.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeTracker?.id === t.id
                    ? 'bg-surface-850 border-crezora-amber shadow-sm'
                    : 'bg-surface-850/50 border-border-subtle hover:border-border-base'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-white">{t.skillName}</h4>
                  <span className="text-[10px] font-mono text-crezora-amber font-semibold">{t.streakDays}d streak</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {t.currentMinutesThisWeek} / {t.targetMinutesWeekly} mins this week • {t.sessionsCompleted} sessions
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Journal Timeline */}
        <div className="p-6 rounded-3xl bg-surface-900 border border-border-base space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-serif text-white">Recent Session Observations</h3>
            <Award className="w-4 h-4 text-crezora-amber" />
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {activeTracker?.recentSessions.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-surface-850 border border-border-subtle text-xs space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">{s.minutes} minutes</span>
                  <span>{s.date}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-light">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
