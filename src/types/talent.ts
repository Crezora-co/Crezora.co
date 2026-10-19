export type TalentDomainId = 
  | 'writing_literature'
  | 'visual_art'
  | 'design'
  | 'photo_video_film'
  | 'music_audio'
  | 'performance'
  | 'craft_handmade'
  | 'digital_tech_innovation';

export interface TalentDomain {
  id: TalentDomainId;
  name: string;
  description: string;
  accentColor: string;
  secondaryAccent: string;
  iconName: string;
  talents: TalentItem[];
}

export interface TalentItem {
  id: string;
  domainId: TalentDomainId;
  name: string;
  shortDescription: string;
  commonSkills: string[];
  commonTools: string[];
  popularTags: string[];
}

export type ExperienceLevel = 'emerging' | 'practicing' | 'professional' | 'master';

export interface CreatorTalentProfile {
  talentId: string;
  isPrimary: boolean;
  experienceLevel: ExperienceLevel;
  yearsOfPractice: number;
  skills: string[];
  tools: string[];
  specialties: string[];
  verified: boolean;
}
