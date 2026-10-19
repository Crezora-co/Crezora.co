export interface CreativeCommunity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domainId: string;
  coverUrl: string;
  avatarUrl: string;
  membersCount: number;
  activeDiscussionsCount: number;
  isPrivate: boolean;
  rules: string[];
  featuredTags: string[];
  moderatorIds: string[];
}

export interface DiscussionThread {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorTalent: string;
  title: string;
  content: string;
  tags: string[];
  appreciationsCount: number;
  repliesCount: number;
  hasCuratorResponse: boolean;
  createdAt: string;
}

export interface ArenaChallenge {
  id: string;
  title: string;
  themePrompt: string;
  description: string;
  domainId: string;
  deadlineIso: string;
  prizeNote: string;
  rules: string[];
  judgingCriteria: string[];
  submissionsCount: number;
  featuredSubmissions: string[];
  status: 'active' | 'judging' | 'completed';
  sponsorName?: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  entryTitle: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'audio' | 'text';
  synopsis: string;
  votesCount: number;
  rank?: number;
  submittedAt: string;
}
