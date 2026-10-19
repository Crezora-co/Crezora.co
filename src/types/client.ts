export interface ClientBrief {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany?: string;
  clientAvatar: string;
  title: string;
  projectDescription: string;
  domainCategory: string;
  requiredTalents: string[];
  requiredSkills: string[];
  budgetMin: number;
  budgetMax: number;
  currency: string;
  timeline: string;
  deadlineDate: string;
  locationType: 'remote' | 'on_site' | 'hybrid';
  deliverablesList: string[];
  referenceLinks: string[];
  proposalsCount: number;
  status: 'draft' | 'open' | 'reviewing' | 'hired' | 'closed';
  createdAt: string;
}

export interface ClientProposal {
  id: string;
  briefId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  coverLetter: string;
  proposedBudget: number;
  proposedTimeline: string;
  milestones: { title: string; amount: number; days: number }[];
  portfolioSamples: string[];
  status: 'submitted' | 'shortlisted' | 'accepted' | 'declined';
  submittedAt: string;
}
