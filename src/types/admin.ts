export interface ModerationCase {
  id: string;
  targetType: 'portfolio_item' | 'community_post' | 'user_account' | 'brief';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reportedAt: string;
  reasonCategory: 'copyright_claim' | 'inappropriate_content' | 'spam_impersonation' | 'abuse';
  details: string;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  assignedModerator?: string;
  resolutionNote?: string;
}

export interface VerificationRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  talentName: string;
  submittedAt: string;
  portfolioItemsSubmitted: number;
  externalLinks: string[];
  statement: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PlatformMetric {
  key: string;
  label: string;
  value: string | number;
  deltaText: string;
  isPositive: boolean;
}
