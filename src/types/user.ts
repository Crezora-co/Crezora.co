import { CreatorTalentProfile } from './talent';

export type UserRole = 'creator' | 'explorer' | 'client' | 'collaborator' | 'mentor';

export type AvailabilityStatus = 
  | 'available_for_work'
  | 'open_to_collaboration'
  | 'available_for_mentorship'
  | 'not_currently_available';

export interface CreatorStory {
  about: string;
  journey: string;
  influences: string[];
  creativePhilosophy: string;
  highlightMilestone: string;
}

export interface CreatorReputation {
  score: number; // 0 - 100
  qualitySignal: number; // 0 - 100
  reliability: number; // 0 - 100
  craftExcellence?: number;
  completedCollaborations: number;
  responseRatePercent: number;
  communityContributions: number;
  endorsementsCount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'milestone' | 'contest' | 'curation' | 'community' | 'skill';
  earnedAt: string;
  icon: string;
}

export interface CreatorRates {
  hourlyRateINR?: number;
  projectStartingINR?: number;
  consultationRateINR?: number;
}

export interface CreatorStats {
  profileViews?: number;
  appreciationsReceived?: number;
  collaborationsCompleted?: number;
  totalEarningsINR?: number;
  ratingAverage?: number;
  reviewCount?: number;
  repeatClientPercent?: number;
  creationsCount?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  coverImageUrl?: string;
  location: string;
  languages: string[];
  bio: string;
  creatorStatement: string; // e.g. "I turn ordinary ideas into visual stories."
  roles: UserRole[];
  currentRole: UserRole;
  availability: AvailabilityStatus;
  verified: boolean;
  verifiedBadgeTitle?: string;
  talents: CreatorTalentProfile[];
  story: CreatorStory;
  reputation: CreatorReputation;
  achievements: AchievementBadge[];
  rates?: CreatorRates;
  stats?: CreatorStats;
  followersCount: number;
  followingCount: number;
  creationsCount: number;
  collaborationsCount: number;
  website?: string;
  socialLinks?: Record<string, string>;
  joinedDate: string;
  aiAssistanceConsent: boolean;
  aiTrainingConsent: boolean;
}
