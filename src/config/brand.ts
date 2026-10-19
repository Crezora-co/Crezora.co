export interface CrezoraProduct {
  id: 'kalaaverse' | 'chitti' | 'translation';
  name: string;
  tagline: string;
  category: string;
  description: string;
  iconName: string;
  badge: string;
  accentGradient: string;
  accentColor: string;
  active: boolean;
  features: string[];
}

export const CREZORA_FLAGSHIP_PROJECTS: CrezoraProduct[] = [
  {
    id: 'kalaaverse',
    name: 'KalaaVerse',
    tagline: 'Where Imagination Meets Opportunity',
    category: 'Creative Workspace & Talent Ecosystem (Early Access)',
    description: 'An early-access creative workspace for Indian artists, writers, musicians, filmmakers and performers. It currently runs entirely in the browser: no accounts server, payments, marketplace or verification. Profiles shown in the product are clearly labelled samples.',
    iconName: 'Sparkles',
    badge: 'Early Access',
    accentGradient: 'from-purple-600 to-indigo-600',
    accentColor: '#7C3AED',
    active: true,
    features: [
      'Writing, art, music and photo studios that run locally',
      'Creator directory with clearly labelled sample profiles',
      'Collaborative workroom screens (local data only)',
      'Editorial knowledge drafts, marked as unreviewed',
      'No payments, escrow, verification or AI in this build'
    ]
  },
  {
    id: 'chitti',
    name: 'Chitti',
    tagline: 'A concept for a calmer companion interface',
    category: 'Companion Interface Concept',
    description: 'An unshipped concept for a calmer, voice-first companion interface. No AI provider is connected in this build, so Chitti is not offered as a working product and does not respond to real users.',
    iconName: 'HeartHandshake',
    badge: 'Concept — not built',
    accentGradient: 'from-rose-500 via-pink-600 to-amber-500',
    accentColor: '#E11D48',
    active: false,
    features: [
      'Concept only — no working AI',
      'No voice processing or emotional inference',
      'No data collection',
      'Not linked in the early-access product'
    ]
  },
  {
    id: 'translation',
    name: 'BhashaVerse',
    tagline: 'Translation, only when an endpoint is configured',
    category: 'Translation Interface (Engine Not Connected)',
    description: 'A translation interface that stays disabled unless the deployment operator configures a real translation endpoint. This build does not bundle a translation model and does not show sample translations as if they were real output.',
    iconName: 'Languages',
    badge: 'Preview',
    accentGradient: 'from-teal-500 via-cyan-600 to-blue-600',
    accentColor: '#0D9488',
    active: false,
    features: [
      'Disabled by default in this build',
      'No bundled machine-translation model',
      'No simulated translations',
      'Turns on only with VITE_TRANSLATION_ENDPOINT'
    ]
  }
];

export const BRAND_CONFIG = {
  parent: {
    name: 'CREZORA',
    fullName: 'CREZORA.CO',
    tagline: 'Empowering Human Imagination, Empathetic Intelligence & Cultural Computing',
    vision: 'Building sovereign human-first technology that elevates Indian creativity, vernacular expression, and emotional well-being.',
    relationshipBadge: 'A Flagship Venture of CREZORA.CO',
    ecosystemProducts: CREZORA_FLAGSHIP_PROJECTS,
  },
  product: {
    name: 'KalaaVerse',
    tagline: 'Where Imagination Meets Opportunity',
    motto: 'Do what you love. Still learn and earn.',
    philosophy: [
      'Create',
      'Showcase',
      'Connect',
      'Collaborate',
      'Learn',
      'Earn',
      'Grow',
    ],
    manifesto: `Millions of talented people create extraordinary work every day in silence. Not for lack of brilliance, but for lack of visibility, professional tools, trusted collaborators, and direct economic bridges. KalaaVerse is not another social feed. It is a creative operating system and talent ecosystem engineered to turn human imagination into lasting opportunity.`,
  },
  intents: [
    {
      id: 'create',
      label: 'CREATE',
      description: 'Make something new, write, paint, compose, practice and refine.',
      icon: 'Sparkles',
    },
    {
      id: 'explore',
      label: 'EXPLORE',
      description: 'Discover creators, immerse in authentic work, communities and inspiration.',
      icon: 'Compass',
    },
    {
      id: 'opportunity',
      label: 'OPPORTUNITY',
      description: 'Collaborate, hire, take briefs, mentor, earn and scale.',
      icon: 'Briefcase',
    },
  ],
};
