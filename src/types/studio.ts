export interface WritingDraft {
  id: string;
  creatorId: string;
  title: string;
  subtitle?: string;
  genre: string;
  content: string; // Markdown formatted
  synopsis?: string;
  wordCount: number;
  readingTimeMinutes: number;
  chapterNumber?: number;
  tags: string[];
  referenceNotes: { id: string; title: string; body: string }[];
  lastSavedAt: string;
  status: 'draft' | 'in_review' | 'ready_to_publish' | 'published';
  versionHistory: { id: string; timestamp: string; note: string; wordCount: number }[];
}

export interface CanvasLayer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
}

export interface CanvasProject {
  id: string;
  creatorId: string;
  title: string;
  width: number;
  height: number;
  layers: CanvasLayer[];
  previewDataUrl?: string;
  updatedAt: string;
  tags: string[];
  palette: string[];
  references: { id: string; imageUrl: string; caption: string }[];
}

export interface MusicSession {
  id: string;
  creatorId: string;
  title: string;
  instrument: string;
  bpm: number;
  timeSignature: string;
  durationSeconds: number;
  scaleOrKey?: string;
  audioBlobUrl?: string;
  notes: string;
  recordedAt: string;
}

export interface PracticeTrackerItem {
  id: string;
  creatorId: string;
  skillName: string;
  category: string;
  targetMinutesWeekly: number;
  currentMinutesThisWeek: number;
  streakDays: number;
  sessionsCompleted: number;
  recentSessions: { date: string; minutes: number; note: string }[];
}
