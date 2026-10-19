export interface RequiredRole {
  roleTitle: string;
  talentDomain: string;
  talentName: string;
  skillsRequired: string[];
  slotsCount: number;
  filledCount: number;
  description: string;
}

export interface CollabRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  projectTitle: string;
  tagline: string;
  description: string;
  coverImage?: string;
  requiredRoles: RequiredRole[];
  compensationType: 'paid' | 'stipend' | 'revenue_share' | 'collaborative_credit';
  budgetNote?: string;
  locationType: 'remote' | 'hybrid' | 'on_site';
  locationCity?: string;
  expectedDuration: string; // e.g., "4 weeks", "3 months"
  deadline: string;
  tags: string[];
  references: string[];
  applicantsCount: number;
  status: 'open' | 'in_progress' | 'completed';
  workroomId?: string;
  createdAt: string;
}

export interface CollabApplication {
  id: string;
  requestId: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantTalent: string;
  roleApplied: string;
  pitch: string;
  portfolioLinks: string[];
  status: 'pending' | 'shortlisted' | 'accepted' | 'declined';
  appliedAt: string;
}
