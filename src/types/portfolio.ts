export type MediaType = 'image' | 'video' | 'audio' | 'article' | 'document' | 'interactive';

export type ContentLicense = 
  | 'all_rights_reserved'
  | 'cc_by'
  | 'cc_by_nc'
  | 'remix_allowed'
  | 'exclusive_commercial';

export interface PortfolioItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  title: string;
  slug: string;
  description: string;
  talentId: string;
  domainId: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  contentText?: string; // For articles / poetry / manuscripts
  audioDurationSeconds?: number;
  tags: string[];
  toolsUsed: string[];
  collaborators?: { creatorId: string; name: string; role: string }[];
  license: ContentLicense;
  allowRemix: boolean;
  allowDownload: boolean;
  featured: boolean;
  curatorPick: boolean;
  appreciationsCount: number;
  viewsCount: number;
  savesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface PortfolioCollection {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  coverUrl: string;
  itemIds: string[];
  isPublic: boolean;
  updatedAt: string;
}
