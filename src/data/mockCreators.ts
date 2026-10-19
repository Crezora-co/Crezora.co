/**
 * Sample creator profiles.
 *
 * These are ILLUSTRATIVE placeholders, not real people. They exist only so a
 * first-time visitor can understand what a KalaaVerse profile looks like before
 * real creators join. They are deliberately:
 *   - named as samples (never plausible real identities),
 *   - free of invented awards, credentials, reviews and client endorsements,
 *   - free of fabricated ratings and completed-project counts.
 *
 * Real profiles are read from local storage (see `storageService.getCreators`).
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  mediaType: 'image' | 'video' | 'audio' | 'text';
  previewUrl: string;
}

export interface CreatorService {
  id: string;
  title: string;
  deliveryTime: string;
  startingPrice: string;
  description: string;
  deliverables: string[];
}

export interface CreatorProfileData {
  id: string;
  fullName: string;
  handle: string;
  avatar: string;
  bannerGradient: string;
  discipline: string;
  domain: string;
  location: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  statement: string;
  verified: boolean;
  availableForWork: boolean;
  remoteFriendly: boolean;
  reputation: {
    craftRating: number;
    reliabilityRating: number;
    completedProjects: number;
    responseRate: string;
    badges: string[];
  };
  tools: string[];
  portfolio: PortfolioItem[];
  services: CreatorService[];
  reviews: Array<{
    author: string;
    role: string;
    comment: string;
    rating: number;
    date: string;
  }>;
  /** Marks illustrative, non-real profiles. Always surfaced in the UI. */
  isSample?: boolean;
}

const SAMPLE_BIO_SUFFIX =
  'This is a sample profile created by CREZORA to illustrate the KalaaVerse profile format. It is not a real person.';

export const SAMPLE_CREATORS: CreatorProfileData[] = [
  {
    id: 'sample_illustrator',
    fullName: 'Sample Illustrator',
    handle: 'sample_illustrator',
    avatar: '',
    bannerGradient: 'from-purple-200 via-indigo-100 to-slate-100',
    discipline: 'Illustration',
    domain: 'visual-art',
    location: 'India',
    experienceYears: 0,
    languages: ['English'],
    bio: `An example profile showing how an illustrator might present their craft, skills and portfolio. ${SAMPLE_BIO_SUFFIX}`,
    statement: 'Example creative statement — a short line about the kind of work you make.',
    verified: false,
    availableForWork: false,
    remoteFriendly: true,
    reputation: {
      craftRating: 0,
      reliabilityRating: 0,
      completedProjects: 0,
      responseRate: '—',
      badges: [],
    },
    tools: ['Example tool', 'Example tool'],
    portfolio: [
      {
        id: 'sample_work_1',
        title: 'Sample portfolio piece',
        category: 'Illustration',
        year: '',
        description: 'Replace this with your own work once you create a profile.',
        mediaType: 'image',
        previewUrl: '',
      },
    ],
    services: [],
    reviews: [],
    isSample: true,
  },
  {
    id: 'sample_writer',
    fullName: 'Sample Writer',
    handle: 'sample_writer',
    avatar: '',
    bannerGradient: 'from-amber-100 via-orange-100 to-slate-100',
    discipline: 'Writing',
    domain: 'literature-writing',
    location: 'India',
    experienceYears: 0,
    languages: ['English'],
    bio: `An example profile showing how a writer might present their craft, languages and services. ${SAMPLE_BIO_SUFFIX}`,
    statement: 'Example creative statement — what you write and who you write for.',
    verified: false,
    availableForWork: false,
    remoteFriendly: true,
    reputation: {
      craftRating: 0,
      reliabilityRating: 0,
      completedProjects: 0,
      responseRate: '—',
      badges: [],
    },
    tools: ['Example tool'],
    portfolio: [],
    services: [],
    reviews: [],
    isSample: true,
  },
  {
    id: 'sample_music',
    fullName: 'Sample Music Producer',
    handle: 'sample_music',
    avatar: '',
    bannerGradient: 'from-teal-100 via-cyan-100 to-slate-100',
    discipline: 'Music Production',
    domain: 'music-sound',
    location: 'India',
    experienceYears: 0,
    languages: ['English'],
    bio: `An example profile showing how a music producer might present their craft and collaboration preferences. ${SAMPLE_BIO_SUFFIX}`,
    statement: 'Example creative statement — the sound you are known for.',
    verified: false,
    availableForWork: false,
    remoteFriendly: true,
    reputation: {
      craftRating: 0,
      reliabilityRating: 0,
      completedProjects: 0,
      responseRate: '—',
      badges: [],
    },
    tools: ['Example tool'],
    portfolio: [],
    services: [],
    reviews: [],
    isSample: true,
  },
];

/** Backwards-compatible alias used by older imports. */
export const MOCK_CREATORS_30 = SAMPLE_CREATORS;
