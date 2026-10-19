export type ProductType = 'digital_asset' | 'preset_template' | 'audio_stem' | 'brush_pack' | 'manuscript_guide';
export type ServiceType = 'commission' | 'consultation' | 'workshop' | 'editing_service' | 'music_production';

export interface MarketplaceProduct {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  title: string;
  description: string;
  productType: ProductType;
  price: number;
  currency: string;
  coverImageUrl: string;
  previewFiles: string[];
  fileFormat: string;
  fileSizeBytes: number;
  salesCount: number;
  ratingAverage: number;
  reviewsCount: number;
  tags: string[];
  createdAt: string;
}

export interface CreatorService {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTalent: string;
  title: string;
  tagline: string;
  description: string;
  serviceType: ServiceType;
  startingPrice: number;
  currency: string;
  deliveryDays: number;
  revisionsIncluded: number;
  deliverablesSummary: string[];
  ordersCompleted: number;
  ratingAverage: number;
  tags: string[];
  isActive: boolean;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'earnings' | 'payout' | 'purchase' | 'platform_fee';
  amount: number;
  currency: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}
