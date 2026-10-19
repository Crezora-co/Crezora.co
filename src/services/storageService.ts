import {
  CURRENT_USER,
  SEED_CREATORS,
  SEED_PORTFOLIO_ITEMS,
  SEED_COLLAB_REQUESTS,
  SEED_WORKROOM,
  SEED_CLIENT_BRIEFS,
  SEED_COMMUNITIES,
  SEED_ARENA_CHALLENGES,
  SEED_MARKETPLACE_PRODUCTS,
  SEED_CREATOR_SERVICES,
  SEED_WRITING_DRAFT,
  SEED_ADMIN_MODERATION,
  SEED_ADMIN_VERIFICATIONS,
} from './seedData';
import { UserProfile, UserRole } from '../types/user';
import { PortfolioItem } from '../types/portfolio';
import { CollabRequest, CollabApplication } from '../types/collaboration';
import { ProjectWorkroom, WorkroomTask, WorkroomMessage } from '../types/workroom';
import { ClientBrief, ClientProposal } from '../types/client';
import { CreativeCommunity, ArenaChallenge, ChallengeSubmission } from '../types/community';
import { MarketplaceProduct, CreatorService, WalletTransaction } from '../types/marketplace';
import { WritingDraft, CanvasProject, MusicSession, PracticeTrackerItem } from '../types/studio';
import { ModerationCase, VerificationRequest } from '../types/admin';

export interface AppNotification {
  id: string;
  category: 'collaboration' | 'opportunity' | 'message' | 'achievement' | 'community' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const EMPTY_WORKROOM: ProjectWorkroom = {
  id: 'workroom_empty',
  projectId: '',
  title: 'No active project',
  tagline: 'Projects appear here once you start collaborating.',
  description: '',
  goal: '',
  status: 'active',
  progressPercent: 0,
  leadCreatorId: '',
  leadCreatorName: '',
  members: [],
  tasks: [],
  files: [],
  messages: [],
  milestones: [],
  feedbacks: [],
  deliverables: [],
  activities: [],
};

const BLANK_WRITING_DRAFT: WritingDraft = {
  id: 'draft_local',
  creatorId: 'guest',
  title: 'Untitled draft',
  genre: '',
  content: '',
  wordCount: 0,
  readingTimeMinutes: 0,
  tags: [],
  referenceNotes: [],
  lastSavedAt: '',
  status: 'draft',
  versionHistory: [],
};

const STORAGE_KEYS = {
  SESSION: 'kv_preview_session_v1',
  CURRENT_USER: 'kv_current_user_v1',
  CREATORS: 'kv_creators_v1',
  PORTFOLIO: 'kv_portfolio_v1',
  COLLABS: 'kv_collabs_v1',
  WORKROOMS: 'kv_workrooms_v1',
  BRIEFS: 'kv_briefs_v1',
  COMMUNITIES: 'kv_communities_v1',
  ARENA: 'kv_arena_v1',
  PRODUCTS: 'kv_products_v1',
  SERVICES: 'kv_services_v1',
  WRITING_DRAFTS: 'kv_writing_drafts_v1',
  CANVAS_PROJECTS: 'kv_canvas_projects_v1',
  MUSIC_SESSIONS: 'kv_music_sessions_v1',
  PRACTICE_TRACKER: 'kv_practice_tracker_v1',
  MODERATION: 'kv_moderation_v1',
  VERIFICATIONS: 'kv_verifications_v1',
  NOTIFICATIONS: 'kv_notifications_v1',
  TRANSACTIONS: 'kv_transactions_v1',
  SAVED_ITEMS: 'kv_saved_items_v1',
  FOLLOWING: 'kv_following_v1',
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }

  // LOCAL PREVIEW SESSION
  //
  // IMPORTANT: There is no authentication backend in this build.
  // `startLocalSession` records that a *local* preview profile exists on this
  // device. It is NOT a secure login and grants no server access. Never rename
  // this to something that implies real authentication.
  hasLocalSession(): boolean {
    return this.get<boolean>(STORAGE_KEYS.SESSION, false) === true;
  }

  startLocalSession(): void {
    this.set(STORAGE_KEYS.SESSION, true);
  }

  endLocalSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch {
      /* ignore */
    }
  }

  // Current User & Profiles
  getCurrentUser(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.CURRENT_USER, CURRENT_USER);
  }

  updateCurrentUser(updates: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentUser();
    const updated = { ...current, ...updates };
    this.set(STORAGE_KEYS.CURRENT_USER, updated);

    // Keep the public creator directory in sync so a locally created profile
    // becomes discoverable on this device. The neutral guest placeholder is
    // never published.
    const creators = this.getCreators();
    const index = creators.findIndex(c => c.id === current.id);
    if (index >= 0) {
      creators[index] = updated;
      this.set(STORAGE_KEYS.CREATORS, creators);
    } else if (updated.id && updated.id !== CURRENT_USER.id && updated.username) {
      creators.unshift(updated);
      this.set(STORAGE_KEYS.CREATORS, creators);
    }
    return updated;
  }

  switchRole(role: UserRole): UserProfile {
    return this.updateCurrentUser({ currentRole: role });
  }

  getCreators(): UserProfile[] {
    return this.get<UserProfile[]>(STORAGE_KEYS.CREATORS, SEED_CREATORS);
  }

  getCreatorById(id: string): UserProfile | undefined {
    return this.getCreators().find(c => c.id === id);
  }

  // Portfolio
  getPortfolioItems(): PortfolioItem[] {
    return this.get<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, []);
  }

  addPortfolioItem(item: PortfolioItem): void {
    const items = this.getPortfolioItems();
    items.unshift(item);
    this.set(STORAGE_KEYS.PORTFOLIO, items);
  }

  toggleAppreciate(itemId: string): void {
    const items = this.getPortfolioItems();
    const item = items.find(i => i.id === itemId);
    if (item) {
      item.appreciationsCount += 1;
      this.set(STORAGE_KEYS.PORTFOLIO, items);
    }
  }

  toggleSaveItem(itemId: string): boolean {
    const saved = this.get<string[]>(STORAGE_KEYS.SAVED_ITEMS, []);
    const index = saved.indexOf(itemId);
    let isSaved = false;
    if (index >= 0) {
      saved.splice(index, 1);
    } else {
      saved.push(itemId);
      isSaved = true;
    }
    this.set(STORAGE_KEYS.SAVED_ITEMS, saved);
    return isSaved;
  }

  getSavedItemIds(): string[] {
    return this.get<string[]>(STORAGE_KEYS.SAVED_ITEMS, []);
  }

  toggleFollow(creatorId: string): boolean {
    const following = this.get<string[]>(STORAGE_KEYS.FOLLOWING, []);
    const idx = following.indexOf(creatorId);
    let isFollowing = false;
    if (idx >= 0) {
      following.splice(idx, 1);
    } else {
      following.push(creatorId);
      isFollowing = true;
    }
    this.set(STORAGE_KEYS.FOLLOWING, following);
    return isFollowing;
  }

  getFollowingIds(): string[] {
    return this.get<string[]>(STORAGE_KEYS.FOLLOWING, []);
  }

  // Collaborations
  getCollabRequests(): CollabRequest[] {
    return this.get<CollabRequest[]>(STORAGE_KEYS.COLLABS, []);
  }

  createCollabRequest(req: CollabRequest): void {
    const reqs = this.getCollabRequests();
    reqs.unshift(req);
    this.set(STORAGE_KEYS.COLLABS, reqs);
  }

  applyToCollab(application: CollabApplication): void {
    const reqs = this.getCollabRequests();
    const req = reqs.find(r => r.id === application.requestId);
    if (req) {
      req.applicantsCount += 1;
      this.set(STORAGE_KEYS.COLLABS, reqs);
    }
    this.addNotification({
      id: `notif_${Date.now()}`,
      category: 'collaboration',
      title: 'Application Submitted',
      message: `Your application for "${req?.projectTitle || 'Collaboration'}" was delivered to the lead creator.`,
      timestamp: 'Just now',
      read: false,
    });
  }

  // Workrooms
  getWorkroom(): ProjectWorkroom {
    return this.get<ProjectWorkroom>(STORAGE_KEYS.WORKROOMS, EMPTY_WORKROOM);
  }

  updateWorkroomTask(taskId: string, updates: Partial<WorkroomTask>): ProjectWorkroom {
    const room = this.getWorkroom();
    const task = room.tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
      this.set(STORAGE_KEYS.WORKROOMS, room);
    }
    return room;
  }

  addWorkroomTask(task: WorkroomTask): ProjectWorkroom {
    const room = this.getWorkroom();
    room.tasks.unshift(task);
    room.activities.unshift({
      id: `act_${Date.now()}`,
      actorName: this.getCurrentUser().displayName,
      action: 'created task',
      target: task.title,
      timestamp: 'Just now',
    });
    this.set(STORAGE_KEYS.WORKROOMS, room);
    return room;
  }

  sendWorkroomMessage(content: string): ProjectWorkroom {
    const room = this.getWorkroom();
    const currentUser = this.getCurrentUser();
    const msg: WorkroomMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      content,
      sentAt: 'Just now',
    };
    room.messages.push(msg);
    this.set(STORAGE_KEYS.WORKROOMS, room);
    return room;
  }

  // Client Briefs
  getClientBriefs(): ClientBrief[] {
    return this.get<ClientBrief[]>(STORAGE_KEYS.BRIEFS, []);
  }

  createClientBrief(brief: ClientBrief): void {
    const briefs = this.getClientBriefs();
    briefs.unshift(brief);
    this.set(STORAGE_KEYS.BRIEFS, briefs);
  }

  submitProposal(proposal: ClientProposal): void {
    const briefs = this.getClientBriefs();
    const b = briefs.find(x => x.id === proposal.briefId);
    if (b) {
      b.proposalsCount += 1;
      this.set(STORAGE_KEYS.BRIEFS, briefs);
    }
    this.addNotification({
      id: `notif_${Date.now()}`,
      category: 'opportunity',
      title: 'Proposal Delivered',
      message: `Your proposal for "${b?.title || 'Brief'}" has been sent to the client.`,
      timestamp: 'Just now',
      read: false,
    });
  }

  // Communities
  getCommunities(): CreativeCommunity[] {
    return this.get<CreativeCommunity[]>(STORAGE_KEYS.COMMUNITIES, []);
  }

  // Arena Challenges
  getChallenges(): ArenaChallenge[] {
    return this.get<ArenaChallenge[]>(STORAGE_KEYS.ARENA, []);
  }

  submitChallengeEntry(submission: ChallengeSubmission): void {
    const challenges = this.getChallenges();
    const ch = challenges.find(c => c.id === submission.challengeId);
    if (ch) {
      ch.submissionsCount += 1;
      this.set(STORAGE_KEYS.ARENA, challenges);
    }
    this.addNotification({
      id: `notif_${Date.now()}`,
      category: 'achievement',
      title: 'Arena Entry Submitted!',
      message: `Your entry "${submission.entryTitle}" has been logged in "${ch?.title}". Best of luck!`,
      timestamp: 'Just now',
      read: false,
    });
  }

  // Marketplace & Services
  // NOTE: No payment provider is integrated. These collections stay empty
  // until a real, verified transaction flow exists.
  getProducts(): MarketplaceProduct[] {
    return this.get<MarketplaceProduct[]>(STORAGE_KEYS.PRODUCTS, []);
  }

  getServices(): CreatorService[] {
    return this.get<CreatorService[]>(STORAGE_KEYS.SERVICES, []);
  }

  purchaseProduct(productId: string): boolean {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return false;
    prod.salesCount += 1;
    this.set(STORAGE_KEYS.PRODUCTS, products);

    const txs = this.getTransactions();
    txs.unshift({
      id: `tx_${Date.now()}`,
      userId: this.getCurrentUser().id,
      type: 'purchase',
      amount: prod.price,
      currency: prod.currency,
      description: `Purchased: ${prod.title}`,
      status: 'completed',
      date: 'Today',
    });
    this.set(STORAGE_KEYS.TRANSACTIONS, txs);

    this.addNotification({
      id: `notif_${Date.now()}`,
      category: 'system',
      title: 'Purchase Confirmed',
      message: `You unlocked "${prod.title}". Files are ready in your Library.`,
      timestamp: 'Just now',
      read: false,
    });
    return true;
  }

  getTransactions(): WalletTransaction[] {
    return this.get<WalletTransaction[]>(STORAGE_KEYS.TRANSACTIONS, []);
  }

  // Studios
  getWritingDraft(): WritingDraft {
    return this.get<WritingDraft>(STORAGE_KEYS.WRITING_DRAFTS, BLANK_WRITING_DRAFT);
  }

  saveWritingDraft(draft: WritingDraft): void {
    this.set(STORAGE_KEYS.WRITING_DRAFTS, draft);
  }

  getMusicSessions(): MusicSession[] {
    return this.get<MusicSession[]>(STORAGE_KEYS.MUSIC_SESSIONS, []);
  }

  saveMusicSession(session: MusicSession): void {
    const sessions = this.getMusicSessions();
    sessions.unshift(session);
    this.set(STORAGE_KEYS.MUSIC_SESSIONS, sessions);
  }

  getPracticeTracker(): PracticeTrackerItem[] {
    return this.get<PracticeTrackerItem[]>(STORAGE_KEYS.PRACTICE_TRACKER, []);
  }

  logPracticeSession(trackerId: string, minutes: number, note: string): void {
    const trackers = this.getPracticeTracker();
    const item = trackers.find(t => t.id === trackerId);
    if (item) {
      item.currentMinutesThisWeek += minutes;
      item.sessionsCompleted += 1;
      item.recentSessions.unshift({
        date: 'Today',
        minutes,
        note,
      });
      this.set(STORAGE_KEYS.PRACTICE_TRACKER, trackers);
    }
  }

  // Admin
  getModerationCases(): ModerationCase[] {
    return this.get<ModerationCase[]>(STORAGE_KEYS.MODERATION, []);
  }

  updateModerationCase(caseId: string, status: ModerationCase['status'], note: string): void {
    const cases = this.getModerationCases();
    const c = cases.find(x => x.id === caseId);
    if (c) {
      c.status = status;
      c.resolutionNote = note;
      this.set(STORAGE_KEYS.MODERATION, cases);
    }
  }

  getVerifications(): VerificationRequest[] {
    return this.get<VerificationRequest[]>(STORAGE_KEYS.VERIFICATIONS, []);
  }

  updateVerification(requestId: string, status: 'approved' | 'rejected'): void {
    const reqs = this.getVerifications();
    const r = reqs.find(x => x.id === requestId);
    if (r) {
      r.status = status;
      this.set(STORAGE_KEYS.VERIFICATIONS, reqs);
    }
  }

  // Notifications
  getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  }

  addNotification(notif: AppNotification): void {
    const notifs = this.getNotifications();
    notifs.unshift(notif);
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const n = notifs.find(x => x.id === id);
    if (n) {
      n.read = true;
      this.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  }

  // Reset demo data
  resetAll(): void {
    localStorage.clear();
  }
}

export const storageService = new StorageService();
