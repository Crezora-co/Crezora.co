import {
  LANGUAGE_OPTIONS,
  LanguageCode,
  getLanguageOption,
  isRtlLanguage,
  isSupportedLanguage,
} from '../locales/languages';

/** Interface language code. The full registry lives in `src/locales/languages.ts`. */
export type SupportedLanguage = LanguageCode;

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

/**
 * The product screens currently ship reviewed dictionaries for six languages.
 * Other registered languages intentionally fall back to English until their
 * page-level translations exist; the selector marks that honestly.
 */
export const SUPPORTED_LANGUAGES: LanguageInfo[] = LANGUAGE_OPTIONS.map((language) => ({
  code: language.code,
  name: language.englishName,
  nativeName: language.nativeName,
}));

export const LANGUAGE_STORAGE_KEY = 'kv_interface_language_v1';

/** English is the default for first-time visitors. */
export function getStoredLanguage(): SupportedLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isSupportedLanguage(stored)) return stored;
  } catch {
    /* storage can be unavailable in private modes */
  }
  return 'en';
}

export function persistLanguage(language: SupportedLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    /* preference simply will not survive the session */
  }
}

export function getLanguageDirection(language: SupportedLanguage): 'ltr' | 'rtl' {
  return isRtlLanguage(language) ? 'rtl' : 'ltr';
}

export function getLanguageLabel(language: SupportedLanguage): LanguageInfo {
  const option = getLanguageOption(language);
  return { code: option.code, name: option.englishName, nativeName: option.nativeName };
}

export interface Translations {
  nav: {
    discover: string;
    collaborate: string;
    publish: string;
    community: string;
    knowledge: string;
    studio: string;
    opportunities: string;
    marketplace: string;
    profile: string;
    login: string;
    join: string;
    searchPlaceholder: string;
    logout: string;
    myProfile: string;
    myWorkrooms: string;
    adminCenter: string;
  };
  sidebar: {
    home: string;
    discover: string;
    knowledge: string;
    studio: string;
    collaborate: string;
    opportunities: string;
    community: string;
    marketplace: string;
    profile: string;
    workspace: string;
    library: string;
    analytics: string;
    admin: string;
    collapse: string;
  };
  hero: {
    welcome: string;
    brand: string;
    subtitle: string;
    getStarted: string;
    exploreTalent: string;
    alreadyAccount: string;
    motto: string;
    availableIn: string;
  };
  features: {
    multilingualTitle: string;
    multilingualDesc: string;
    secureTitle: string;
    secureDesc: string;
    communityTitle: string;
    communityDesc: string;
    aiTitle: string;
    aiDesc: string;
  };
  benefits: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    forCreatorsTitle: string;
    forCreatorsSubtitle: string;
    creatorPoints: string[];
    forClientsTitle: string;
    forClientsSubtitle: string;
    clientPoints: string[];
  };
  fields: {
    heading: string;
    subheading: string;
    all: string;
    visualArts: string;
    performingArts: string;
    musicSound: string;
    writing: string;
    filmPhoto: string;
    digitalMedia: string;
    heritageCrafts: string;
    voiceDubbing: string;
  };
  knowledge: {
    title: string;
    subtitle: string;
    learnTab: string;
    askTab: string;
    shareTab: string;
    searchPlaceholder: string;
    shareKnowledgeBtn: string;
    askQuestionBtn: string;
    noGuidesFound: string;
    noGuidesDesc: string;
    contributeFirst: string;
    publishGuide: string;
    guideTitle: string;
    creativeField: string;
    targetLevel: string;
    practicalBreakdown: string;
    topicTags: string;
    submitQuery: string;
  };
  discover: {
    title: string;
    subtitle: string;
    allFields: string;
    filterByField: string;
    searchPlaceholder: string;
    location: string;
    maxBudget: string;
    clearFilters: string;
    noCreatorsFound: string;
    noCreatorsDesc: string;
    claimSpot: string;
    viewProfile: string;
    collaborate: string;
    verifiedFounding: string;
  };
  home: {
    creativePulse: string;
    whatCreating: string;
    createNewWork: string;
    continueWriting: string;
    discoverCreators: string;
    findOpportunities: string;
    practicingAs: string;
    reputationIndex: string;
    activeWorkrooms: string;
    clientBriefs: string;
    arenaTitle: string;
  };
  auth: {
    joinKalaaVerse: string;
    chooseRole: string;
    asCreator: string;
    asCreatorDesc: string;
    asClient: string;
    asClientDesc: string;
    fullName: string;
    stageName: string;
    email: string;
    phone: string;
    password: string;
    photoProof: string;
    photoProofHelp: string;
    aiBioTitle: string;
    generateAIBio: string;
    continueBtn: string;
    loginBtn: string;
    alreadyAccount: string;
    dontHaveAccount: string;
    welcomeBack: string;
    loginSubtitle: string;
  };
  stories: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    readStory: string;
  };
  footer: {
    flagship: string;
    motto: string;
    rights: string;
    tagline: string;
    explore: string;
    joinCommunity: string;
    privacy: string;
    terms: string;
    support: string;
    panIndia: string;
    panIndiaDesc: string;
  };
}

export const TRANSLATIONS: Partial<Record<SupportedLanguage, Translations>> = {
  en: {
    nav: {
      discover: 'Discover',
      collaborate: 'Collaborate',
      publish: 'Publish',
      community: 'Community',
      knowledge: 'Knowledge Hub',
      studio: 'Studio',
      opportunities: 'Opportunities',
      marketplace: 'Marketplace',
      profile: 'My Profile',
      login: 'Login',
      join: 'Join KalaaVerse',
      searchPlaceholder: 'Search stories, artists, creators...',
      logout: 'Log Out',
      myProfile: 'My Profile',
      myWorkrooms: 'My Workrooms',
      adminCenter: 'Admin Center',
    },
    sidebar: {
      home: 'Home',
      discover: 'Discover',
      knowledge: 'Knowledge Hub',
      studio: 'Studio',
      collaborate: 'Collaborate',
      opportunities: 'Opportunities',
      community: 'Community',
      marketplace: 'Marketplace',
      profile: 'Profile',
      workspace: 'Workspace',
      library: 'My Library',
      analytics: 'Analytics',
      admin: 'Admin & Safety',
      collapse: 'Collapse',
    },
    hero: {
      welcome: 'Welcome to',
      brand: 'KalaaVerse',
      subtitle: "India's premier platform connecting creative talent with endless opportunities. Showcase your art, find your perfect collaborator, and build your creative future.",
      getStarted: 'Get Started',
      exploreTalent: 'Explore Talent',
      alreadyAccount: 'Already have an account?',
      motto: 'Do what you love. Still learn and earn.',
      availableIn: 'Available in',
    },
    features: {
      multilingualTitle: 'Multilingual Support',
      multilingualDesc: 'Create, collaborate, and express in your authentic regional language without barriers.',
      secureTitle: 'Safe & Secure',
      secureDesc: 'Verified creative profiles, smart escrow milestone protection, and secure transactions.',
      communityTitle: 'Community First',
      communityDesc: "Built by Indian creators, for India's artistic community. Learn, mentor, and co-create.",
      aiTitle: 'AI-Powered Tools',
      aiDesc: 'Instant bio generation, structured creative briefs, and smart client talent matchmaking.',
    },
    benefits: {
      badge: 'Platform Value & Impact',
      heading: 'Why Creative Minds Choose',
      headingHighlight: 'KalaaVerse',
      subheading: 'A purpose-built creative operating system tailored specifically for Indian artists and forward-thinking clients.',
      forCreatorsTitle: 'For Creative Artists',
      forCreatorsSubtitle: 'Empowering you to do what you love, still learn and earn.',
      creatorPoints: [
        'Keep 100% intellectual ownership of your original scripts, stems, and artworks.',
        'Zero language barriers: Showcase and communicate in Hindi, Telugu, Tamil, and English.',
        'Milestone-locked escrow payments guarantee you get paid on time for every delivery.',
        'Integrated creative studios (Writing, Canvas Art, Audio Synthesizer) with AI assistants.',
      ],
      forClientsTitle: 'For Clients & Brands',
      forClientsSubtitle: 'Commission authentic regional talent with absolute peace of mind.',
      clientPoints: [
        'Access vetted creators across 64 specialized creative disciplines throughout India.',
        'Standardized milestone briefs protect budgets with funds released upon approval.',
        'Multi-disciplinary collaboration: Hire teams spanning writers, artists, and sound designers.',
        'Transparent quality metrics and verified portfolio works, without bot followers.',
      ],
    },
    fields: {
      heading: 'Explore Creators by Creative Field',
      subheading: 'From ancient temple crafts to futuristic digital media, discover specialized Indian creators.',
      all: 'All Fields',
      visualArts: 'Visual Arts',
      performingArts: 'Performing Arts',
      musicSound: 'Music & Sound',
      writing: 'Writing & Literature',
      filmPhoto: 'Photography & Film',
      digitalMedia: 'Digital & Media',
      heritageCrafts: 'Heritage & Craft',
      voiceDubbing: 'Voice & Spoken Word',
    },
    knowledge: {
      title: 'Knowledge Hub & Craft Exchange',
      subtitle: 'Every creative discipline has craft secrets. Learn from masters, ask technical questions, and share insights across Indian creative fields.',
      learnTab: 'Learn & Master',
      askTab: 'Q&A Community',
      shareTab: 'Share Knowledge',
      searchPlaceholder: 'Search guides & technical queries...',
      shareKnowledgeBtn: 'Share Knowledge',
      askQuestionBtn: 'Ask a Question',
      noGuidesFound: 'No guides found for this filter',
      noGuidesDesc: 'Be the first creator to share knowledge in this field! Help your peers master their craft.',
      contributeFirst: 'Contribute First Guide',
      publishGuide: 'Publish Your Technique or Resource',
      guideTitle: 'Guide Title',
      creativeField: 'Creative Field',
      targetLevel: 'Target Skill Level',
      practicalBreakdown: 'Knowledge & Practical Breakdown',
      topicTags: 'Topic Tags (comma-separated)',
      submitQuery: 'Submit Query',
    },
    discover: {
      title: 'Discover Creative Talent',
      subtitle: 'Browse authentic Indian creators across visual art, writing, music, film, and performing arts.',
      allFields: 'All Fields',
      filterByField: 'Filter by Field',
      searchPlaceholder: 'Search creators by skill, city, craft...',
      location: 'Location / City',
      maxBudget: 'Max Budget (₹)',
      clearFilters: 'Clear Filters',
      noCreatorsFound: 'No creators registered yet in this filter',
      noCreatorsDesc: 'Be the first verified Indian creator to claim this discipline on KalaaVerse!',
      claimSpot: 'Claim Founding Creator Spot',
      viewProfile: 'View Profile',
      collaborate: 'Collaborate',
      verifiedFounding: 'Verified Founding Creator',
    },
    home: {
      creativePulse: 'Creative Pulse',
      whatCreating: 'What are we creating today?',
      createNewWork: 'Create New Work',
      continueWriting: 'Continue Writing',
      discoverCreators: 'Discover Creators',
      findOpportunities: 'Find Opportunities',
      practicingAs: 'Practicing as',
      reputationIndex: 'Reputation Index',
      activeWorkrooms: 'Active Workrooms',
      clientBriefs: 'Client Briefs',
      arenaTitle: 'KalaaVerse Creative Arena',
    },
    auth: {
      joinKalaaVerse: 'Join KalaaVerse',
      chooseRole: 'Choose how you want to use the platform',
      asCreator: 'Creator & Artist',
      asCreatorDesc: 'Showcase your portfolio, collaborate with peers, and get commissioned by clients.',
      asClient: 'Client & Commissioner',
      asClientDesc: 'Hire Indian creative talent for projects, films, branding, and commissions.',
      fullName: 'Full Legal Name',
      stageName: 'Stage / Artist Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Create Password',
      photoProof: 'Profile Photo & Photo Proof',
      photoProofHelp: 'Upload a clear profile photo or photo ID proof of your craft.',
      aiBioTitle: 'AI Bio Generator',
      generateAIBio: 'Generate with KalaaVerse AI',
      continueBtn: 'Continue Setup',
      loginBtn: 'Log In',
      alreadyAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      welcomeBack: 'Welcome Back',
      loginSubtitle: 'Log in to your KalaaVerse account',
    },
    stories: {
      heading: 'Discover Amazing',
      headingHighlight: 'Stories',
      subheading: 'Explore a world of creativity where writers and artists collaborate to create extraordinary content.',
      readStory: 'Read Story',
    },
    footer: {
      flagship: 'A Flagship Creative Operating System by CREZORA.CO',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. All Rights Reserved.',
      tagline: 'Where Imagination Meets Opportunity',
      explore: 'Explore Talent',
      joinCommunity: 'Join the Community',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      support: 'Creator Support',
      panIndia: 'Pan-India Multilingual',
      panIndiaDesc: 'KalaaVerse actively supports regional creators across India in their mother tongue.',
    },
  },

  hi: {
    nav: {
      discover: 'खोजें',
      collaborate: 'सहयोग करें',
      publish: 'प्रकाशित करें',
      community: 'समुदाय',
      knowledge: 'ज्ञान केंद्र (Knowledge Hub)',
      studio: 'स्टूडियो',
      opportunities: 'अवसर',
      marketplace: 'बाज़ार',
      profile: 'मेरी प्रोफ़ाइल',
      login: 'लॉग इन',
      join: 'KalaaVerse से जुड़ें',
      searchPlaceholder: 'कहानियां, कलाकार, रचनाकार खोजें...',
      logout: 'लॉग आउट',
      myProfile: 'मेरी प्रोफ़ाइल',
      myWorkrooms: 'मेरे कार्यकक्ष',
      adminCenter: 'प्रशासन केंद्र',
    },
    sidebar: {
      home: 'होम',
      discover: 'खोजें',
      knowledge: 'ज्ञान केंद्र',
      studio: 'स्टूडियो',
      collaborate: 'सहयोग',
      opportunities: 'अवसर',
      community: 'समुदाय',
      marketplace: 'बाज़ार',
      profile: 'प्रोफ़ाइल',
      workspace: 'कार्यक्षेत्र',
      library: 'मेरी लाइब्रेरी',
      analytics: 'एनालिटिक्स',
      admin: 'सुरक्षा व प्रशासन',
      collapse: 'सिकोड़ें',
    },
    hero: {
      welcome: 'स्वागत है',
      brand: 'KalaaVerse',
      subtitle: 'भारतीय रचनात्मक प्रतिभा को वैश्विक अवसरों से जोड़ने वाला प्रमुख मंच। अपनी कला प्रदर्शित करें, सही सहयोगी खोजें और अपना रचनात्मक भविष्य बनाएं।',
      getStarted: 'शुरुआत करें',
      exploreTalent: 'कलाकार खोजें',
      alreadyAccount: 'क्या आपके पास खाता है?',
      motto: 'जो पसंद है वह करें, सीखते रहें और कमाते रहें।',
      availableIn: 'उपलब्ध भाषाएं',
    },
    features: {
      multilingualTitle: 'बहुभाषी मंच',
      multilingualDesc: 'बिना किसी भाषाई बाधा के अपनी मातृभाषा में बनाएं, सहयोग करें और अपनी कला साझा करें।',
      secureTitle: 'सुरक्षित और विश्वसनीय',
      secureDesc: 'सत्यापित कलाकार प्रोफाइल, माइलस्टोन एस्क्रो सुरक्षा और सुरक्षित भुगतान।',
      communityTitle: 'समुदाय सर्वोपरि',
      communityDesc: 'भारतीय कलाकारों द्वारा, भारतीय कला जगत के लिए निर्मित। सीखें और साथ मिलकर बनाएं।',
      aiTitle: 'एआई-संचालित उपकरण',
      aiDesc: 'तुरंत बायो जनरेशन, संक्षिप्त विवरण निर्माण और स्मार्ट क्लाइंट मैचमेकिंग।',
    },
    benefits: {
      badge: 'मंच का महत्व और लाभ',
      heading: 'कलाकार और ब्रांड क्यों चुनते हैं',
      headingHighlight: 'KalaaVerse',
      subheading: 'भारतीय कलाकारों और दूरदर्शी ग्राहकों के लिए विशेष रूप से तैयार किया गया एक संपूर्ण रचनात्मक मंच।',
      forCreatorsTitle: 'कलाकारों और रचनाकारों के लिए',
      forCreatorsSubtitle: 'जो पसंद है वह करें, सीखते रहें और कमाते रहें।',
      creatorPoints: [
        'अपनी कला, संगीत और कहानियों पर 100% बौद्धिक स्वामित्व अपने पास रखें।',
        'भाषा की कोई बाधा नहीं: हिंदी, तेलुगु, तमिल और अंग्रेजी में काम करें।',
        'माइलस्टोन एस्क्रो प्रणाली से समय पर सुरक्षित भुगतान की गारंटी।',
        'लेखन, चित्रकला और संगीत के लिए अंतर्निहित रचनात्मक स्टूडियो और एआई सहायता।',
      ],
      forClientsTitle: 'ग्राहकों और कंपनियों के लिए',
      forClientsSubtitle: 'पूरे भारत से प्रामाणिक क्षेत्रीय प्रतिभा को सुरक्षित रूप से अनुबंधित करें।',
      clientPoints: [
        'भारत भर में 64 विशेष रचनात्मक विषयों के सत्यापित कलाकारों तक सीधी पहुंच।',
        'माइलस्टोन आधारित बजट सुरक्षा: काम स्वीकृत होने पर ही भुगतान जारी होता है।',
        'बहु-विषयक सहयोग: लेखक, चित्रकार और संगीतकार की संयुक्त टीम बनाएं।',
        'बिना फर्जी फॉलोअर्स के वास्तविक गुणवत्ता और सत्यापित पोर्टफोलियो कार्य।',
      ],
    },
    fields: {
      heading: 'रचनात्मक क्षेत्र के अनुसार प्रतिभा खोजें',
      subheading: 'प्राचीन शिल्पकला से लेकर आधुनिक डिजिटल मीडिया तक, विशिष्ट भारतीय कलाकारों को खोजें।',
      all: 'सभी क्षेत्र',
      visualArts: 'दृश्य कला (Visual Arts)',
      performingArts: 'प्रदर्शन कला (Performing Arts)',
      musicSound: 'संगीत और ध्वनि',
      writing: 'लेखन और साहित्य',
      filmPhoto: 'छायांकन और फिल्म',
      digitalMedia: 'डिजिटल और 3D मीडिया',
      heritageCrafts: 'पारंपरिक शिल्प कला',
      voiceDubbing: 'आवाज और डबिंग',
    },
    knowledge: {
      title: 'ज्ञान केंद्र और शिल्प विनिमय',
      subtitle: 'हर कला विधा के कुछ तकनीकी रहस्य होते हैं। विशेषज्ञों से सीखें, सवाल पूछें और अपनी कला साझा करें।',
      learnTab: 'सीखें व मास्टर करें',
      askTab: 'प्रश्नोत्तरी समुदाय (Q&A)',
      shareTab: 'ज्ञान साझा करें',
      searchPlaceholder: 'गाइड और तकनीकी प्रश्न खोजें...',
      shareKnowledgeBtn: 'ज्ञान साझा करें',
      askQuestionBtn: 'प्रश्न पूछें',
      noGuidesFound: 'इस फ़िल्टर में कोई गाइड नहीं मिली',
      noGuidesDesc: 'इस क्षेत्र में ज्ञान साझा करने वाले पहले कलाकार बनें! साथी कलाकारों की मदद करें।',
      contributeFirst: 'पहला गाइड प्रकाशित करें',
      publishGuide: 'अपनी तकनीक या संसाधन प्रकाशित करें',
      guideTitle: 'गाइड का शीर्षक',
      creativeField: 'रचनात्मक क्षेत्र',
      targetLevel: 'कौशल स्तर',
      practicalBreakdown: 'व्यावहारिक विवरण और विधि',
      topicTags: 'विषय टैग (कॉमा द्वारा अलग)',
      submitQuery: 'प्रश्न भेजें',
    },
    discover: {
      title: 'रचनात्मक प्रतिभा खोजें',
      subtitle: 'दृश्य कला, लेखन, संगीत, फिल्म और अभिनय के क्षेत्र में प्रामाणिक भारतीय कलाकारों को खोजें।',
      allFields: 'सभी विधाएं',
      filterByField: 'विधा के अनुसार चुनें',
      searchPlaceholder: 'कौशल, शहर या कला द्वारा खोजें...',
      location: 'स्थान / शहर',
      maxBudget: 'अधिकतम बजट (₹)',
      clearFilters: 'फ़िल्टर हटाएं',
      noCreatorsFound: 'इस फ़िल्टर में अभी कोई कलाकार पंजीकृत नहीं है',
      noCreatorsDesc: 'KalaaVerse पर इस विधा के पहले सत्यापित संस्थापक कलाकार बनें!',
      claimSpot: 'संस्थापक कलाकार स्थान प्राप्त करें',
      viewProfile: 'प्रोफ़ाइल देखें',
      collaborate: 'सहयोग करें',
      verifiedFounding: 'सत्यापित संस्थापक कलाकार',
    },
    home: {
      creativePulse: 'रचनात्मक गतिविधि',
      whatCreating: 'आज हम क्या नया रच रहे हैं?',
      createNewWork: 'नया कार्य शुरू करें',
      continueWriting: 'लेखन जारी रखें',
      discoverCreators: 'कलाकार खोजें',
      findOpportunities: 'अवसर खोजें',
      practicingAs: 'कार्यरत विधा',
      reputationIndex: 'प्रतिष्ठा सूचकांक',
      activeWorkrooms: 'सक्रिय कार्यकक्ष',
      clientBriefs: 'क्लाइंट परियोजनाएं',
      arenaTitle: 'KalaaVerse रचनात्मक अखाड़ा (Arena)',
    },
    auth: {
      joinKalaaVerse: 'KalaaVerse से जुड़ें',
      chooseRole: 'मंच पर अपनी भूमिका चुनें',
      asCreator: 'कलाकार व रचनाकार',
      asCreatorDesc: 'अपना पोर्टफोलियो प्रदर्शित करें, साथियों के साथ सहयोग करें और क्लाइंट कार्य प्राप्त करें।',
      asClient: 'क्लाइंट व संगठन',
      asClientDesc: 'परियोजनाओं, फिल्मों, ब्रांडिंग और कमीशन के लिए भारतीय रचनात्मक प्रतिभा को नियुक्त करें।',
      fullName: 'पूरा कानूनी नाम',
      stageName: 'कलाकार / मंच का नाम',
      email: 'ईमेल पता',
      phone: 'फ़ोन नंबर',
      password: 'पासवर्ड बनाएं',
      photoProof: 'प्रोफ़ाइल फ़ोटो और फ़ोटो प्रमाण',
      photoProofHelp: 'अपनी कला या पहचान का स्पष्ट फ़ोटो प्रमाण अपलोड करें।',
      aiBioTitle: 'एआई बायो जनरेटर',
      generateAIBio: 'KalaaVerse AI से बायो बनाएं',
      continueBtn: 'आगे बढ़ें',
      loginBtn: 'लॉग इन करें',
      alreadyAccount: 'क्या आपके पास पहले से खाता है?',
      dontHaveAccount: 'खाता नहीं है?',
      welcomeBack: 'पुनः स्वागत है',
      loginSubtitle: 'अपने KalaaVerse खाते में लॉग इन करें',
    },
    stories: {
      heading: 'अद्भुत कहानियों की',
      headingHighlight: 'खोज करें',
      subheading: 'रचनात्मकता की एक ऐसी दुनिया जहां लेखक और कलाकार मिलकर असाधारण रचनाएं गढ़ते हैं।',
      readStory: 'कहानी पढ़ें',
    },
    footer: {
      flagship: 'CREZORA.CO द्वारा प्रस्तुत प्रमुख रचनात्मक ऑपरेटिंग सिस्टम',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. सर्वाधिकार सुरक्षित।',
      tagline: 'जहां कल्पना को अवसर मिलता है',
      explore: 'प्रतिभा खोजें',
      joinCommunity: 'समुदाय से जुड़ें',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      support: 'कलाकार सहायता',
      panIndia: 'अखिल भारतीय बहुभाषी मंच',
      panIndiaDesc: 'KalaaVerse भारत भर के क्षेत्रीय कलाकारों को उनकी मातृभाषा में समर्थन देता है।',
    },
  },

  te: {
    nav: {
      discover: 'కనుగొనండి',
      collaborate: 'కలిసి పనిచేయండి',
      publish: 'ప్రచురించండి',
      community: 'కమ్యూనిటీ',
      knowledge: 'నాలెడ్జ్ హబ్',
      studio: 'స్టూడియో',
      opportunities: 'అవకాశాలు',
      marketplace: 'మార్కెట్‌ప్లేస్',
      profile: 'నా ప్రొఫైల్',
      login: 'లాగిన్',
      join: 'KalaaVerse లో చేరండి',
      searchPlaceholder: 'కథలు, కళాకారులు, రచయితలను వెతకండి...',
      logout: 'లాగ్ అవుట్',
      myProfile: 'నా ప్రొఫైల్',
      myWorkrooms: 'నా వర్క్‌రూమ్‌లు',
      adminCenter: 'అడ్మిన్ సెంటర్',
    },
    sidebar: {
      home: 'హోమ్',
      discover: 'కనుగొనండి',
      knowledge: 'నాలెడ్జ్ హబ్',
      studio: 'స్టూడియో',
      collaborate: 'కలిసి పనిచేయండి',
      opportunities: 'అవకాశాలు',
      community: 'కమ్యూనిటీ',
      marketplace: 'మార్కెట్‌ప్లేస్',
      profile: 'ప్రొఫైల్',
      workspace: 'వర్క్‌స్పేస్',
      library: 'నా లైబ్రరీ',
      analytics: 'విశ్లేషణలు',
      admin: 'రక్షణ & అడ్మిన్',
      collapse: 'కుదించు',
    },
    hero: {
      welcome: 'స్వాగతం',
      brand: 'KalaaVerse',
      subtitle: 'భారతీయ సృజనాత్మక ప్రతిభను అపరిమిత అవకాశాలతో అనుసంధానించే అగ్రశ్రేణి వేదిక. మీ కళను ప్రదర్శించండి, సరైన సహకారులను కనుగొనండి మరియు మీ సృజనాత్మక భవిష్యత్తును నిర్మించుకోండి.',
      getStarted: 'ప్రారంభించండి',
      exploreTalent: 'కళాకారులను చూడండి',
      alreadyAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      motto: 'మీకు ఇష్టమైన పని చేయండి. నేర్చుకుంటూ సంపాదించండి.',
      availableIn: 'లభ్యమయ్యే భాషలు',
    },
    features: {
      multilingualTitle: 'బహుభాషా మద్దతు',
      multilingualDesc: 'ఎటువంటి భాషా అవరోధాలు లేకుండా మీ స్వంత భాషలో సృష్టించండి, సహకరించండి మరియు వ్యక్తీకరించండి.',
      secureTitle: 'సురక్షితమైన & నమ్మకమైనది',
      secureDesc: 'ధృవీకరించబడిన ప్రొఫైల్స్, మైల్‌స్టోన్ ఎస్క్రో భద్రత మరియు సురక్షిత చెల్లింపులు.',
      communityTitle: 'కమ్యూనిటీ ప్రాధాన్యత',
      communityDesc: 'భారతీయ కళాకారులచే, భారతీయ కళారంగం కోసం రూపొందించబడింది. నేర్చుకోండి మరియు కలిసి సృష్టించండి.',
      aiTitle: 'ఏఐ ఆధారిత సాధనాలు',
      aiDesc: 'తక్షణ బయో జనరేషన్, స్మార్ట్ క్లయింట్ మ్యాచింగ్ మరియు నిర్మాణ సాధనాలు.',
    },
    benefits: {
      badge: 'ప్లాట్‌ఫారమ్ విలువ & ప్రభావం',
      heading: 'సృజనాత్మక ప్రతిభావంతులు ఎందుకు ఎంచుకుంటారు',
      headingHighlight: 'KalaaVerse',
      subheading: 'భారతీయ కళాకారులు మరియు ఆధునిక క్లయింట్ల కోసం ప్రత్యేకంగా రూపొందించబడిన సృజనాత్మక ఆపరేటింగ్ సిస్టమ్.',
      forCreatorsTitle: 'సృజనాత్మక కళాకారుల కోసం',
      forCreatorsSubtitle: 'మీరు ఇష్టపడే పనిని చేస్తూ, నేర్చుకుంటూ సంపాదించే శక్తిని పొందండి.',
      creatorPoints: [
        'మీ స్వంత కథలు, సంగీతం మరియు కళాఖండాలపై 100% మేధోపరమైన యాజమాన్యాన్ని కలిగి ఉండండి.',
        'భాషా అడ్డంకులు లేవు: తెలుగు, హిందీ, తమిళం మరియు ఆంగ్లంలో ప్రదర్శించండి మరియు మాట్లాడండి.',
        'మైల్‌స్టోన్ ఎస్క్రో చెల్లింపుల ద్వారా మీ శ్రమకు సమయానికి భద్రమైన ప్రతిఫలం లభిస్తుంది.',
        'రచన, చిత్రలేఖనం మరియు సంగీతం కోసం ఏఐ సహాయంతో కూడిన సమగ్ర స్టూడియోలు.',
      ],
      forClientsTitle: 'క్లయింట్లు & బ్రాండ్ల కోసం',
      forClientsSubtitle: 'పూర్తి నమ్మకంతో భారతదేశంలోని ప్రామాణిక ప్రాంతీయ ప్రతిభను నియమించుకోండి.',
      clientPoints: [
        'భారతదేశం అంతటా 64 ప్రత్యేక విభాగాలలో ధృవీకరించబడిన కళాకారులను పొందండి.',
        'పని ఆమోదించబడిన తర్వాతే నిధులు విడుదలయ్యే ప్రామాణిక బడ్జెట్ రక్షణ.',
        'బహుముఖ సహకారం: రచయితలు, కళాకారులు మరియు సౌండ్ డిజైనర్లతో కూడిన బృందాలను నియమించుకోండి.',
        'బోట్ ఫాలోవర్లు లేని నిజమైన నాణ్యత మరియు ధృవీకరించబడిన పోర్ట్‌ఫోలియో పనులు.',
      ],
    },
    fields: {
      heading: 'సృజనాత్మక రంగాల వారీగా కళాకారులను అన్వేషించండి',
      subheading: 'పురాతన దేవాలయ కళల నుండి భవిష్యత్ డిజిటల్ మీడియా వరకు, ప్రత్యేక భారతీయ కళాకారులను కనుగొనండి.',
      all: 'అన్ని రంగాలు',
      visualArts: 'దృశ్య కళలు (Visual Arts)',
      performingArts: 'ప్రదర్శన కళలు (Performing Arts)',
      musicSound: 'సంగీతం & ధ్వని',
      writing: 'రచన & సాహిత్యం',
      filmPhoto: 'ఛాయాగ్రహణం & చలనచిత్రం',
      digitalMedia: 'డిజిటల్ & మీడియా',
      heritageCrafts: 'సాంప్రదాయ హస్తకళలు',
      voiceDubbing: 'వాయిస్ ఓవర్ & డబ్బింగ్',
    },
    knowledge: {
      title: 'నాలెడ్జ్ హబ్ & కళా పరిజ్ఞానం',
      subtitle: 'ప్రతి కళా విభాగానికి రహస్య పద్ధతులుంటాయి. నిపుణుల నుండి నేర్చుకోండి, సాంకేతిక సందేహాలు అడగండి, మీ అనుభవాన్ని పంచుకోండి.',
      learnTab: 'నేర్చుకోండి & నైపుణ్యం పొందండి',
      askTab: 'ప్రశ్నోత్తరాల కమ్యూనిటీ',
      shareTab: 'జ్ఞానాన్ని పంచుకోండి',
      searchPlaceholder: 'గైడ్లు మరియు ప్రశ్నలను వెతకండి...',
      shareKnowledgeBtn: 'జ్ఞానాన్ని పంచుకోండి',
      askQuestionBtn: 'ప్రశ్న అడగండి',
      noGuidesFound: 'ఈ ఫిల్టర్‌లో గైడ్‌లు లేవు',
      noGuidesDesc: 'ఈ రంగంలో మొదటి గైడ్ అందించే కళాకారుడిగా మారండి! తోటి కళాకారులకు సహాయపడండి.',
      contributeFirst: 'మొదటి గైడ్ ప్రచురించండి',
      publishGuide: 'మీ పద్ధతి లేదా వనరులను ప్రచురించండి',
      guideTitle: 'గైడ్ శీర్షిక',
      creativeField: 'సృజనాత్మక రంగం',
      targetLevel: 'నైపుణ్య స్థాయి',
      practicalBreakdown: 'వివరణ & ఆచరణాత్మక విధానం',
      topicTags: 'టాపిక్ ట్యాగ్‌లు (కామాలతో వేరు చేయండి)',
      submitQuery: 'ప్రశ్నను పంపండి',
    },
    discover: {
      title: 'సృజనాత్మక ప్రతిభను కనుగొనండి',
      subtitle: 'దృశ్య కళ, రచన, సంగీతం, సినిమా మరియు ప్రదర్శన కళలలో ప్రామాణిక భారతీయ కళాకారులను చూడండి.',
      allFields: 'అన్ని విభాగాలు',
      filterByField: 'రంగం వారీగా ఫిల్టర్ చేయండి',
      searchPlaceholder: 'నైపుణ్యం, నగరం లేదా కళ ద్వారా వెతకండి...',
      location: 'ప్రాంతం / నగరం',
      maxBudget: 'గరిష్ట బడ్జెట్ (₹)',
      clearFilters: 'ఫిల్టర్లను తొలగించు',
      noCreatorsFound: 'ఈ విభాగంలో ఇంకా ఎవరూ నమోదు కాలేదు',
      noCreatorsDesc: 'KalaaVerse లో ఈ రంగంలో మొదటి ధృవీకరించబడిన వ్యవస్థాపక కళాకారుడిగా చేరండి!',
      claimSpot: 'వ్యవస్థాపక కళాకారుడిగా నమోదు అవ్వండి',
      viewProfile: 'ప్రొఫైల్ చూడండి',
      collaborate: 'కలిసి పనిచేయండి',
      verifiedFounding: 'ధృవీకరించబడిన వ్యవస్థాపక కళాకారుడు',
    },
    home: {
      creativePulse: 'సృజనాత్మక ప్రవాహం',
      whatCreating: 'ఈరోజు మనం ఏమి సృష్టిస్తున్నాం?',
      createNewWork: 'కొత్త పనిని ప్రారంభించండి',
      continueWriting: 'రచనను కొనసాగించండి',
      discoverCreators: 'కళాకారులను కనుగొనండి',
      findOpportunities: 'అవకాశాలను అన్వేషించండి',
      practicingAs: 'సాధన చేస్తున్న రంగం',
      reputationIndex: 'కీర్తి సూచిక',
      activeWorkrooms: 'చురుకైన వర్క్‌రూమ్‌లు',
      clientBriefs: 'క్లయింట్ ప్రాజెక్ట్‌లు',
      arenaTitle: 'KalaaVerse క్రియేటివ్ అరేనా',
    },
    auth: {
      joinKalaaVerse: 'KalaaVerse లో చేరండి',
      chooseRole: 'మీరు వేదికను ఎలా ఉపయోగించాలనుకుంటున్నారో ఎంచుకోండి',
      asCreator: 'కళాకారుడు & రచయిత',
      asCreatorDesc: 'మీ పోర్ట్‌ఫోలియోను ప్రదర్శించండి, తోటివారితో కలిసి పనిచేయండి మరియు ప్రాజెక్టులను పొందండి.',
      asClient: 'క్లయింట్ & సంస్థ',
      asClientDesc: 'ప్రాజెక్ట్‌లు, సినిమాలు, బ్రాండింగ్ కోసం భారతీయ సృజనాత్మక ప్రతిభను నియమించుకోండి.',
      fullName: 'పూర్తి చట్టబద్ధమైన పేరు',
      stageName: 'రంగస్థల / కళాకారుడి పేరు',
      email: 'ఈమెయిల్ చిరునామా',
      phone: 'ఫోన్ నంబర్',
      password: 'పాస్‌వర్డ్ సృష్టించండి',
      photoProof: 'ప్రొఫైల్ ఫోటో & గుర్తింపు రుజువు',
      photoProofHelp: 'మీ కళ లేదా ప్రొఫైల్ యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.',
      aiBioTitle: 'ఏఐ బయో జనరేటర్',
      generateAIBio: 'KalaaVerse AI తో బయో రూపొందించండి',
      continueBtn: 'కొనసాగించండి',
      loginBtn: 'లాగిన్ చేయండి',
      alreadyAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      dontHaveAccount: 'ఖాతా లేదా?',
      welcomeBack: 'తిరిగి స్వాగతం',
      loginSubtitle: 'మీ KalaaVerse ఖాతాలోకి లాగిన్ అవ్వండి',
    },
    stories: {
      heading: 'అద్భుతమైన కథలను',
      headingHighlight: 'కనుగొనండి',
      subheading: 'రచయితలు మరియు కళాకారులు కలిసి అసాధారణమైన విషయాలను సృష్టించే సృజనాత్మక ప్రపంచాన్ని అన్వేషించండి.',
      readStory: 'కథ చదవండి',
    },
    footer: {
      flagship: 'CREZORA.CO అందించిన ప్రధాన సృజనాత్మక ఆపరేటింగ్ సిస్టమ్',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
      tagline: 'ఎక్కడ ఊహ అవకాశంగా మారుతుందో అక్కడ',
      explore: 'ప్రతిభను చూడండి',
      joinCommunity: 'కమ్యూనిటీలో చేరండి',
      privacy: 'గోప్యతా విధానం',
      terms: 'సేవా నిబంధనలు',
      support: 'కళాకారుల మద్దతు',
      panIndia: 'అఖిల భారత బహుభాషా వేదిక',
      panIndiaDesc: 'KalaaVerse భారతదేశం అంతటా ప్రాంతీయ కళాకారులకు వారి మాతృభాషలో సహకరిస్తుంది.',
    },
  },

  ta: {
    nav: {
      discover: 'கண்டறியவும்',
      collaborate: 'ஒன்றிணைந்து செயல்பட',
      publish: 'வெளியிடவும்',
      community: 'சமூகம்',
      knowledge: 'அறிவு மையம் (Knowledge Hub)',
      studio: 'ஸ்டுடியோ',
      opportunities: 'வாய்ப்புகள்',
      marketplace: 'சந்தை',
      profile: 'என் சுயவிவரம்',
      login: 'உள்நுழைய',
      join: 'KalaaVerse-ல் இணையுங்கள்',
      searchPlaceholder: 'கதைகள், கலைஞர்கள், படைப்பாளிகளைத் தேடுங்கள்...',
      logout: 'வெளியேறு',
      myProfile: 'என் சுயவிவரம்',
      myWorkrooms: 'என் பணி அறைகள்',
      adminCenter: 'நிர்வாக மையம்',
    },
    sidebar: {
      home: 'முகப்பு',
      discover: 'கண்டறியவும்',
      knowledge: 'அறிவு மையம்',
      studio: 'ஸ்டுடியோ',
      collaborate: 'இணைந்து செயல்பட',
      opportunities: 'வாய்ப்புகள்',
      community: 'சமூகம்',
      marketplace: 'சந்தை',
      profile: 'சுயவிவரம்',
      workspace: 'பணியிடம்',
      library: 'என் நூலகம்',
      analytics: 'பகுப்பாய்வு',
      admin: 'பாதுகாப்பு & நிர்வாகம்',
      collapse: 'சுருக்கு',
    },
    hero: {
      welcome: 'வரவேற்கிறோம்',
      brand: 'KalaaVerse',
      subtitle: 'இந்தியப் படைப்பாற்றல் திறமைகளை எல்லையற்ற வாய்ப்புகளுடன் இணைக்கும் முன்னணி தளம். உங்கள் கலையைக் காட்சிப்படுத்துங்கள், சரியான கூட்டாளர்களைக் கண்டறியுங்கள்.',
      getStarted: 'தொடங்குங்கள்',
      exploreTalent: 'கலைஞர்களைக் கண்டறியுங்கள்',
      alreadyAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      motto: 'நீங்கள் விரும்புவதைச் செய்யுங்கள். கற்றுக்கொண்டு சம்பாதியுங்கள்.',
      availableIn: 'கிடைக்கும் மொழிகள்',
    },
    features: {
      multilingualTitle: 'பன்மொழி ஆதரவு',
      multilingualDesc: 'எந்த மொழித் தடையுமின்றி உங்கள் தாய்மொழியில் உருவாக்கவும், பகிரவும் முடியும்.',
      secureTitle: 'பாதுகாப்பானது & நம்பகமானது',
      secureDesc: 'சரிபார்க்கப்பட்ட கலைஞர்களின் சுயவிவரங்கள் மற்றும் பாதுகாப்பான எஸ்க்ரோ பரிவர்த்தனைகள்.',
      communityTitle: 'சமூகம் முதன்மையானது',
      communityDesc: 'இந்தியக் கலைஞர்களால், இந்தியக் கலைச் சமூகத்திற்காக உருவாக்கப்பட்டது.',
      aiTitle: 'செயற்கை நுண்ணறிவு (AI) கருவிகள்',
      aiDesc: 'உடனடி பயோ உருவாக்கம் மற்றும் சிறந்த திறமை பொருத்துதல்.',
    },
    benefits: {
      badge: 'தளத்தின் மதிப்பு மற்றும் தாக்கம்',
      heading: 'படைப்பாளிகள் ஏன் தேர்வு செய்கிறார்கள்',
      headingHighlight: 'KalaaVerse',
      subheading: 'இந்தியக் கலைஞர்களுக்காக பிரத்யேகமாக உருவாக்கப்பட்ட கலை இயங்குதளம்.',
      forCreatorsTitle: 'படைப்பாளிகளுக்காக',
      forCreatorsSubtitle: 'விரும்புவதைச் செய்து, கற்றுக்கொண்டு சம்பாதியுங்கள்.',
      creatorPoints: [
        'உங்கள் படைப்புகள் மீது 100% அறிவுசார் உரிமை உங்களிடமே இருக்கும்.',
        'மொழித் தடைகள் இல்லை: தமிழ், தெலுங்கு, இந்தி, ஆங்கிலத்தில் இயங்குங்கள்.',
        'மைல்ஸ்டோன் எஸ்க்ரோ மூலம் சரியான நேரத்தில் பாதுகாப்பான கட்டணம் உறுதி.',
        'எழுத்து, ஓவியம் மற்றும் இசைக்கான ஒருங்கிணைந்த AI ஸ்டுடியோக்கள்.',
      ],
      forClientsTitle: 'வாடிக்கையாளர்கள் & பிராண்டுகளுக்காக',
      forClientsSubtitle: 'இந்தியாவின் உண்மையான திறமைகளை முழு நம்பிக்கையுடன் பணியமர்த்துங்கள்.',
      clientPoints: [
        '64 கலைத் துறைகளில் சரிபார்க்கப்பட்ட கலைஞர்களை அணுகுங்கள்.',
        'வேலை திருப்திகரமாக முடிந்த பிறகே பணம் விடுவிக்கப்படும் நிதிப் பாதுகாப்பு.',
        'எழுத்தாளர்கள், கலைஞர்கள், இசை அமைப்பாளர்கள் கொண்ட கூட்டுக்குழு.',
        'போலி பின்தொடர்பவர்கள் இல்லாத உண்மையான போர்ட்ஃபோலியோ.',
      ],
    },
    fields: {
      heading: 'துறை வாரியாகக் கலைஞர்களைத் தேடுங்கள்',
      subheading: 'பழங்காலக் கலைகள் முதல் நவீன டிஜிட்டல் ஊடகம் வரை அனைத்தையும் கண்டறியுங்கள்.',
      all: 'அனைத்து துறைகள்',
      visualArts: 'காட்சிக் கலைகள் (Visual Arts)',
      performingArts: 'நிகழ்த்துக் கலைகள் (Performing Arts)',
      musicSound: 'இசை & ஒலி',
      writing: 'எழுத்து & இலக்கியம்',
      filmPhoto: 'புகைப்படம் & திரைப்படம்',
      digitalMedia: 'டிஜிட்டல் & மீடியா',
      heritageCrafts: 'பாரம்பரிய கைவினை',
      voiceDubbing: 'குரல் & டப்பிங்',
    },
    knowledge: {
      title: 'அறிவு மையம் & கலைப் பரிமாற்றம்',
      subtitle: 'ஒவ்வொரு கலைக்கும் தொழில் நுட்பங்கள் உண்டு. நிபுணர்களிடமிருந்து கற்றுக்கொண்டு உங்கள் அறிவைப் பகிருங்கள்.',
      learnTab: 'கற்றுத் தேருங்கள்',
      askTab: 'கேள்வி-பதில் சமூகம்',
      shareTab: 'அறிவைப் பகிருங்கள்',
      searchPlaceholder: 'வழிகாட்டிகள் மற்றும் கேள்விகளைத் தேடுங்கள்...',
      shareKnowledgeBtn: 'அறிவைப் பகிருங்கள்',
      askQuestionBtn: 'கேள்வி கேளுங்கள்',
      noGuidesFound: 'வழிகாட்டிகள் ஏதுமில்லை',
      noGuidesDesc: 'இத்துறையில் முதல் வழிகாட்டியைப் பகிரும் கலைஞராக இருங்கள்!',
      contributeFirst: 'முதல் வழிகாட்டியை வெளியிடவும்',
      publishGuide: 'உங்கள் தொழில் நுட்பத்தைப் பகிருங்கள்',
      guideTitle: 'வழிகாட்டி தலைப்பு',
      creativeField: 'கலைத் துறை',
      targetLevel: 'திறன் நிலை',
      practicalBreakdown: 'செய்முறை விளக்கம்',
      topicTags: 'குறிச்சொற்கள் (Tags)',
      submitQuery: 'கேள்வியை அனுப்பவும்',
    },
    discover: {
      title: 'படைப்பாற்றல் திறமைகளைக் கண்டறியவும்',
      subtitle: 'ஓவியம், எழுத்து, இசை, சினிமா துறைகளில் இந்தியக் கலைஞர்களைக் கண்டறியுங்கள்.',
      allFields: 'அனைத்து துறைகள்',
      filterByField: 'துறை வாரியாக வடிகட்டவும்',
      searchPlaceholder: 'திறன், ஊர் மூலம் தேடுங்கள்...',
      location: 'ஊர் / நகரம்',
      maxBudget: 'அதிகபட்ச பட்ஜெட் (₹)',
      clearFilters: 'வடிகட்டிகளை நீக்கு',
      noCreatorsFound: 'இப்பிரிவில் கலைஞர்கள் இன்னும் பதிவு செய்யவில்லை',
      noCreatorsDesc: 'KalaaVerse தளத்தில் முதல் சரிபார்க்கப்பட்ட கலைஞராக இணையுங்கள்!',
      claimSpot: 'துவக்கக் கலைஞர் இடத்தை உறுதிசெய்க',
      viewProfile: 'சுயவிவரம் பார்க்க',
      collaborate: 'இணையுங்கள்',
      verifiedFounding: 'சரிபார்க்கப்பட்ட துவக்கக் கலைஞர்',
    },
    home: {
      creativePulse: 'படைப்பாற்றல் துடிப்பு',
      whatCreating: 'இன்று நாம் என்ன படைக்கப் போகிறோம்?',
      createNewWork: 'புதிய படைப்பைத் தொடங்குக',
      continueWriting: 'எழுதுவதைத் தொடர்க',
      discoverCreators: 'கலைஞர்களைக் காண்க',
      findOpportunities: 'வாய்ப்புகளைத் தேடுக',
      practicingAs: 'செயல்படும் கலை',
      reputationIndex: 'நற்பெயர் குறியீடு',
      activeWorkrooms: 'செயலில் உள்ள பணி அறைகள்',
      clientBriefs: 'வாடிக்கையாளர் திட்டங்கள்',
      arenaTitle: 'KalaaVerse கலை அரங்கம்',
    },
    auth: {
      joinKalaaVerse: 'KalaaVerse-ல் இணையுங்கள்',
      chooseRole: 'உங்கள் பங்கைத் தேர்வு செய்யுங்கள்',
      asCreator: 'கலைஞர் & படைப்பாளி',
      asCreatorDesc: 'உங்கள் போர்ட்ஃபோலியோவைக் காட்டி வாய்ப்புகளைப் பெறுங்கள்.',
      asClient: 'வாடிக்கையாளர் & நிறுவனம்',
      asClientDesc: 'திட்டங்கள், திரைப்படங்கள், பிராண்டிங்கிற்காக இந்தியப் படைப்பு திறமையாளர்களைப் பணியமர்த்துங்கள்.',
      fullName: 'முழுப் பெயர்',
      stageName: 'மேடை / கலைஞர் பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      password: 'கடவுச்சொல்லை உருவாக்கவும்',
      photoProof: 'சுயவிவரப் படம் & அடையாளச் சான்று',
      photoProofHelp: 'உங்கள் கலை அல்லது அடையாளத்தின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்.',
      aiBioTitle: 'AI சுயவிவரத் தயாரிப்பான் (Bio Generator)',
      generateAIBio: 'KalaaVerse AI மூலம் பயோ உருவாக்கு',
      continueBtn: 'தொடரவும்',
      loginBtn: 'உள்நுழையவும்',
      alreadyAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      dontHaveAccount: 'கணக்கு இல்லையா?',
      welcomeBack: 'மீண்டும் நல்வரவு',
      loginSubtitle: 'உங்கள் KalaaVerse கணக்கில் உள்நுழையவும்',
    },
    stories: {
      heading: 'அற்புதமான கதைகளைக்',
      headingHighlight: 'கண்டறியவும்',
      subheading: 'எழுத்தாளர்களும் கலைஞர்களும் இணைந்து உருவாக்கும் மாயாஜாலக் கதைகளை வாசியுங்கள்.',
      readStory: 'கதை வாசிக்க',
    },
    footer: {
      flagship: 'CREZORA.CO-வின் முதன்மை கலை இயங்குதளம்',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      tagline: 'எங்கு கற்பனை வாய்ப்பாக மாறுகிறதோ அங்கே',
      explore: 'திறமைகளைக் காண்க',
      joinCommunity: 'சமூகத்தில் இணையுங்கள்',
      privacy: 'தனியுரிமைக் கொள்கை',
      terms: 'சேவை விதிமுறைகள்',
      support: 'கலைஞர் ஆதரவு',
      panIndia: 'அகில இந்திய பன்மொழி இயங்குதளம்',
      panIndiaDesc: 'KalaaVerse இந்தியக் கலைஞர்களை அவர்களின் தாய்மொழியில் ஆதரிக்கிறது.',
    },
  },

  kn: {
    nav: {
      discover: 'ಅನ್ವೇಷಿಸಿ',
      collaborate: 'ಸಹಯೋಗಿಸಿ',
      publish: 'ಪ್ರಕಟಿಸಿ',
      community: 'ಸಮುದಾಯ',
      knowledge: 'ಜ್ಞಾನ ಕೇಂದ್ರ (Knowledge Hub)',
      studio: 'ಸ್ಟುಡಿಯೋ',
      opportunities: 'ಅವಕಾಶಗಳು',
      marketplace: 'ಮಾರುಕಟ್ಟೆ',
      profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      login: 'ಲಾಗಿನ್',
      join: 'KalaaVerse ಸೇರಿ',
      searchPlaceholder: 'ಕಥೆಗಳು, ಕಲಾವಿದರು, ಸೃಷ್ಟಿಕರ್ತರನ್ನು ಹುಡುಕಿ...',
      logout: 'ಲಾಗ್ ಔಟ್',
      myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      myWorkrooms: 'ನನ್ನ ಕಾರ್ಯಕ್ಷೇತ್ರಗಳು',
      adminCenter: 'ನಿರ್ವಾಹಕ ಕೇಂದ್ರ',
    },
    sidebar: {
      home: 'ಮುಖಪುಟ',
      discover: 'ಅನ್ವೇಷಿಸಿ',
      knowledge: 'ಜ್ಞಾನ ಕೇಂದ್ರ',
      studio: 'ಸ್ಟುಡಿಯೋ',
      collaborate: 'ಸಹಯೋಗಿಸಿ',
      opportunities: 'ಅವಕಾಶಗಳು',
      community: 'ಸಮುದಾಯ',
      marketplace: 'ಮಾರುಕಟ್ಟೆ',
      profile: 'ಪ್ರೊಫೈಲ್',
      workspace: 'ಕಾರ್ಯಕ್ಷೇತ್ರ',
      library: 'ನನ್ನ ಲೈಬ್ರರಿ',
      analytics: 'ವಿಶ್ಲೇಷಣೆ',
      admin: 'ಸುರಕ್ಷತೆ & ಆಡಳಿತ',
      collapse: 'ಕುಗ್ಗಿಸಿ',
    },
    hero: {
      welcome: 'ಸುಸ್ವಾಗತ',
      brand: 'KalaaVerse',
      subtitle: 'ಭಾರತೀಯ ಸೃಜನಶೀಲ ಪ್ರತಿಭೆಗಳನ್ನು ಅಪಾರ ಅವಕಾಶಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ಪ್ರಮುಖ ವೇದಿಕೆ. ನಿಮ್ಮ ಕಲೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿ, ಸೂಕ್ತ ಸಹಯೋಗಿಗಳನ್ನು ಹುಡುಕಿ.',
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
      exploreTalent: 'ಕಲಾವಿದರನ್ನು ನೋಡಿ',
      alreadyAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
      motto: 'ನಿಮ್ಮಿಷ್ಟದ ಕೆಲಸ ಮಾಡಿ. ಕಲಿಯುತ್ತಾ ಗಳಿಸಿ.',
      availableIn: 'ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳು',
    },
    features: {
      multilingualTitle: 'ಬಹುಭಾಷಾ ಬೆಂಬಲ',
      multilingualDesc: 'ಯಾವುದೇ ಭಾಷಾ ಅಡೆತಡೆಗಳಿಲ್ಲದೆ ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ರಚಿಸಿ ಮತ್ತು ಸಹಯೋಗಿಸಿ.',
      secureTitle: 'ಸುರಕ್ಷಿತ & ವಿಶ್ವಾಸಾರ್ಹ',
      secureDesc: 'ದೃಢೀಕರಿಸಿದ ಕಲಾವಿದರ ಪ್ರೊಫೈಲ್‌ಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಮೈಲ್‌ಸ್ಟೋನ್ ಪಾವತಿಗಳು.',
      communityTitle: 'ಸಮುದಾಯ ಮೊದಲು',
      communityDesc: 'ಭಾರತೀಯ ಕಲಾವಿದರಿಂದ, ಭಾರತೀಯ ಕಲಾ ಸಮುದಾಯಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      aiTitle: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಸಾಧನಗಳು',
      aiDesc: 'ತಕ್ಷಣದ ಬಯೋ ರಚನೆ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕ್ಲೈಂಟ್ ಹೊಂದಾಣಿಕೆ.',
    },
    benefits: {
      badge: 'ವೇದಿಕೆಯ ಮೌಲ್ಯ & ಪ್ರಭಾವ',
      heading: 'ಕಲಾವಿದರು ಏಕೆ ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ',
      headingHighlight: 'KalaaVerse',
      subheading: 'ಭಾರತೀಯ ಕಲಾವಿದರು ಮತ್ತು ಕ್ಲೈಂಟ್‌ಗಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾದ ಕಲಾತ್ಮಕ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್.',
      forCreatorsTitle: 'ಕಲಾವಿದರಿಗಾಗಿ',
      forCreatorsSubtitle: 'ಇಷ್ಟವಾದ ಕೆಲಸ ಮಾಡುತ್ತಾ, ಕಲಿಯುತ್ತಾ ಗಳಿಸಿ.',
      creatorPoints: [
        'ನಿಮ್ಮ ಮೂಲ ಕೃತಿಗಳ ಮೇಲೆ 100% ಬೌದ್ಧಿಕ ಮಾಲೀಕತ್ವವನ್ನು ಹೊಂದಿರಿ.',
        'ಭಾಷಾ ಮಿತಿಗಳಿಲ್ಲ: ಕನ್ನಡ, ತೆಲುಗು, ಹಿಂದಿ, ತಮಿಳು ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ.',
        'ಮೈಲ್‌ಸ್ಟೋನ್ ಎಸ್ಕ್ರೋ ಮೂಲಕ ಸಮಯಕ್ಕೆ ಸುರಕ್ಷಿತ ಪಾವತಿ ಖಾತರಿ.',
        'ಬರವಣಿಗೆ, ಚಿತ್ರಕಲೆ ಮತ್ತು ಸಂಗೀತಕ್ಕಾಗಿ ಸಂಯೋಜಿತ AI ಸ್ಟುಡಿಯೋಗಳು.',
      ],
      forClientsTitle: 'ಕ್ಲೈಂಟ್‌ಗಳಿಗಾಗಿ',
      forClientsSubtitle: 'ಸಂಪೂರ್ಣ ವಿಶ್ವಾಸದಿಂದ ಭಾರತೀಯ ಪ್ರತಿಭೆಗಳನ್ನು ನೇಮಿಸಿಕೊಳ್ಳಿ.',
      clientPoints: [
        '64 ಕಲಾ ವಿಭಾಗಗಳಲ್ಲಿ ದೃಢೀಕೃತ ಕಲಾವಿದರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        'ಕೆಲಸ ಅನುಮೋದನೆಯಾದ ನಂತರವೇ ಹಣ ಬಿಡುಗಡೆಯಾಗುವ ಸುರಕ್ಷಿತ ಬಜೆಟ್.',
        'ಲೇಖಕರು, ಕಲಾವಿದರು ಮತ್ತು ಧ್ವನಿ ವಿನ್ಯಾಸಕರ ತಂಡಗಳನ್ನು ನೇಮಿಸಿ.',
        'ನಕಲಿ ಫಾಲೋವರ್ಸ್ ಇಲ್ಲದ ನೈಜ ಪೋರ್ಟ್‌ಫೋಲಿಯೋಗಳು.',
      ],
    },
    fields: {
      heading: 'ಕ್ಷೇತ್ರವಾರು ಕಲಾವಿದರನ್ನು ಹುಡುಕಿ',
      subheading: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆಗಳಿಂದ ಹಿಡಿದು ಆಧುನಿಕ ಡಿಜಿಟಲ್ ಮಾಧ್ಯಮದವರೆಗೆ ಎಲ್ಲವನ್ನೂ ಅನ್ವೇಷಿಸಿ.',
      all: 'ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು',
      visualArts: 'ದೃಶ್ಯ ಕಲೆಗಳು (Visual Arts)',
      performingArts: 'ಪ್ರದರ್ಶನ ಕಲೆಗಳು (Performing Arts)',
      musicSound: 'ಸಂಗೀತ & ಧ್ವನಿ',
      writing: 'ಬರವಣಿಗೆ & ಸಾಹಿತ್ಯ',
      filmPhoto: 'ಛಾಯಾಗ್ರಹಣ & ಚಲನಚಿತ್ರ',
      digitalMedia: 'ಡಿಜಿಟಲ್ & ಮೀಡಿಯಾ',
      heritageCrafts: 'ಪಾರಂಪರಿಕ ಕರಕುಶಲ',
      voiceDubbing: 'ಧ್ವನಿ & ಡಬ್ಬಿಂಗ್',
    },
    knowledge: {
      title: 'ಜ್ಞಾನ ಕೇಂದ್ರ & ಕಲಾ ಕೌಶಲ ವಿನಿಮಯ',
      subtitle: 'ಪ್ರತಿಯೊಂದು ಕಲೆಗೂ ರಹಸ್ಯ ಸೂತ್ರಗಳಿವೆ. ಪರಿಣಿತರಿಂದ ಕಲಿಯಿರಿ, ಪ್ರಶ್ನಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೌಶಲ ಹಂಚಿಕೊಳ್ಳಿ.',
      learnTab: 'ಕಲಿಯಿರಿ & ಪ್ರವೀಣರಾಗಿ',
      askTab: 'ಪ್ರಶ್ನೋತ್ತರ ಸಮುದಾಯ',
      shareTab: 'ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳಿ',
      searchPlaceholder: 'ಮಾರ್ಗದರ್ಶಿಗಳು & ಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಿ...',
      shareKnowledgeBtn: 'ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳಿ',
      askQuestionBtn: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
      noGuidesFound: 'ಯಾವುದೇ ಮಾರ್ಗದರ್ಶಿ ಕಂಡುಬಂದಿಲ್ಲ',
      noGuidesDesc: 'ಈ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮೊದಲ ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳುವ ಕಲಾವಿದರಾಗಿ!',
      contributeFirst: 'ಮೊದಲ ಮಾರ್ಗದರ್ಶಿ ಪ್ರಕಟಿಸಿ',
      publishGuide: 'ನಿಮ್ಮ ಕೌಶಲವನ್ನು ಪ್ರಕಟಿಸಿ',
      guideTitle: 'ಮಾರ್ಗದರ್ಶಿ ಶೀರ್ಷಿಕೆ',
      creativeField: 'ಸೃಜನಶೀಲ ಕ್ಷೇತ್ರ',
      targetLevel: 'ಕೌಶಲ್ಯ ಮಟ್ಟ',
      practicalBreakdown: 'ವಿವರಣೆ & ಪ್ರಾಯೋಗಿಕ ಮಾಹಿತಿ',
      topicTags: 'ಟ್ಯಾಗ್‌ಗಳು',
      submitQuery: 'ಪ್ರಶ್ನೆ ಸಲ್ಲಿಸಿ',
    },
    discover: {
      title: 'ಸೃಜನಶೀಲ ಪ್ರತಿಭೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      subtitle: 'ದೃಶ್ಯ ಕಲೆ, ಬರವಣಿಗೆ, ಸಂಗೀತ, ಚಲನಚಿತ್ರಗಳಲ್ಲಿ ಭಾರತೀಯ ಪ್ರತಿಭೆಗಳನ್ನು ನೋಡಿ.',
      allFields: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
      filterByField: 'ಕ್ಷೇತ್ರವಾರು ಫಿಲ್ಟರ್ ಮಾಡಿ',
      searchPlaceholder: 'ಕೌಶಲ, ನಗರ ಅಥವಾ ಕಲೆಯ ಮೂಲಕ ಹುಡುಕಿ...',
      location: 'ಸ್ಥಳ / ನಗರ',
      maxBudget: 'ಗರಿಷ್ಠ ಬಜೆಟ್ (₹)',
      clearFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ',
      noCreatorsFound: 'ಈ ವಿಭಾಗದಲ್ಲಿ ಕಲಾವಿದರು ಇನ್ನೂ ನೋಂದಾಯಿಸಿಲ್ಲ',
      noCreatorsDesc: 'KalaaVerse ನಲ್ಲಿ ಈ ಕ್ಷೇತ್ರದ ಮೊದಲ ದೃಢೀಕೃತ ಸಂಸ್ಥಾಪಕ ಕಲಾವಿದರಾಗಿ!',
      claimSpot: 'ಸಂಸ್ಥಾಪಕ ಕಲಾವಿದರ ಸ್ಥಾನ ಪಡೆಯಿರಿ',
      viewProfile: 'ಪ್ರೊಫೈಲ್ ನೋಡಿ',
      collaborate: 'ಸಹಯೋಗಿಸಿ',
      verifiedFounding: 'ದೃಢೀಕೃತ ಸಂಸ್ಥಾಪಕ ಕಲಾವಿದ',
    },
    home: {
      creativePulse: 'ಸೃಜನಶೀಲ ಚಟುವಟಿಕೆ',
      whatCreating: 'ಇಂದು ನಾವು ಏನನ್ನು ಸೃಷ್ಟಿಸುತ್ತಿದ್ದೇವೆ?',
      createNewWork: 'ಹೊಸ ಕೆಲಸ ಆರಂಭಿಸಿ',
      continueWriting: 'ಬರವಣಿಗೆ ಮುಂದುವರಿಸಿ',
      discoverCreators: 'ಕಲಾವಿದರನ್ನು ಹುಡುಕಿ',
      findOpportunities: 'ಅವಕಾಶಗಳನ್ನು ನೋಡಿ',
      practicingAs: 'ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಕಲೆ',
      reputationIndex: 'ಖ್ಯಾತಿ ಸೂಚ್ಯಂಕ',
      activeWorkrooms: 'ಸಕ್ರಿಯ ವರ್ಕ್‌ರೂಮ್‌ಗಳು',
      clientBriefs: 'ಕ್ಲೈಂಟ್ ಯೋಜನೆಗಳು',
      arenaTitle: 'KalaaVerse ಕಲಾ ಅಖಾಡ',
    },
    auth: {
      joinKalaaVerse: 'KalaaVerse ಸೇರಿ',
      chooseRole: 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      asCreator: 'ಕಲಾವಿದ & ಸೃಷ್ಟಿಕರ್ತ',
      asCreatorDesc: 'ನಿಮ್ಮ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ಪ್ರದರ್ಶಿಸಿ, ಜೊತೆಯಾಗಿ ಕೆಲಸ ಮಾಡಿ ಮತ್ತು ಅವಕಾಶ ಪಡೆಯಿರಿ.',
      asClient: 'ಕ್ಲೈಂಟ್ & ಸಂಸ್ಥೆ',
      asClientDesc: 'ಯೋಜನೆಗಳು, ಚಲನಚಿತ್ರಗಳು, ಬ್ರಾಂಡಿಂಗ್‌ಗಾಗಿ ಭಾರತೀಯ ಸೃಜನಶೀಲ ಪ್ರತಿಭೆಯನ್ನು ನೇಮಿಸಿಕೊಳ್ಳಿ.',
      fullName: 'ಪೂರ್ಣ ಕಾನೂನುಬದ್ಧ ಹೆಸರು',
      stageName: 'ಕಲಾವಿದರ / ರಂಗದ ಹೆಸರು',
      email: 'ಇಮೇಲ್ ವಿಳಾಸ',
      phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
      password: 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
      photoProof: 'ಪ್ರೊಫೈಲ್ ಫೋಟೋ & ಗುರುತಿನ ಪುರಾವೆ',
      photoProofHelp: 'ನಿಮ್ಮ ಕಲೆ ಅಥವಾ ಗುರುತಿನ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
      aiBioTitle: 'AI ಬಯೋ ಜನರೇಟರ್',
      generateAIBio: 'KalaaVerse AI ನಿಂದ ಬಯೋ ರಚಿಸಿ',
      continueBtn: 'ಮುಂದುವರಿಯಿರಿ',
      loginBtn: 'ಲಾಗಿನ್ ಮಾಡಿ',
      alreadyAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
      dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
      welcomeBack: 'ಮರಳಿ ಸುಸ್ವಾಗತ',
      loginSubtitle: 'ನಿಮ್ಮ KalaaVerse ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    },
    stories: {
      heading: 'ಅದ್ಭುತ ಕಥೆಗಳನ್ನು',
      headingHighlight: 'ಅನ್ವೇಷಿಸಿ',
      subheading: 'ಲೇಖಕರು ಮತ್ತು ಕಲಾವಿದರು ಜೊತೆಯಾಗಿ ಅಸಾಧಾರಣ ಕೃತಿಗಳನ್ನು ರಚಿಸುವ ಪ್ರಪಂಚವನ್ನು ನೋಡಿ.',
      readStory: 'ಕಥೆ ಓದಿ',
    },
    footer: {
      flagship: 'CREZORA.CO ಪ್ರಸ್ತುತಪಡಿಸಿದ ಸೃಜನಶೀಲ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
      tagline: 'ಕಲ್ಪನೆಯು ಅವಕಾಶವಾಗಿ ಬದಲಾಗುವ ಸ್ಥಳ',
      explore: 'ಪ್ರತಿಭೆಗಳನ್ನು ನೋಡಿ',
      joinCommunity: 'ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ',
      privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
      terms: 'ಸೇವಾ ನಿಯಮಗಳು',
      support: 'ಕಲಾವಿದರ ಬೆಂಬಲ',
      panIndia: 'ಅಖಿಲ ಭಾರತ ಬಹುಭಾಷಾ ವೇದಿಕೆ',
      panIndiaDesc: 'KalaaVerse ಭಾರತದ ಪ್ರಾದೇಶಿಕ ಕಲಾವಿದರನ್ನು ಅವರ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಬೆಂಬಲಿಸುತ್ತದೆ.',
    },
  },

  bn: {
    nav: {
      discover: 'আবিষ্কার করুন',
      collaborate: 'একত্রে কাজ করুন',
      publish: 'প্রকাশ করুন',
      community: 'কমিউনিটি',
      knowledge: 'জ্ঞান কেন্দ্র (Knowledge Hub)',
      studio: 'স্টুডিও',
      opportunities: 'সুযোগ',
      marketplace: 'মার্কেটপ্লেস',
      profile: 'আমার প্রোফাইল',
      login: 'লগইন',
      join: 'KalaaVerse-এ যোগ দিন',
      searchPlaceholder: 'গল্প, শিল্পী, নির্মাতাদের খুঁজুন...',
      logout: 'লগ আউট',
      myProfile: 'আমার প্রোফাইল',
      myWorkrooms: 'আমার ওয়ার্করুম',
      adminCenter: 'অ্যাডমিন সেন্টার',
    },
    sidebar: {
      home: 'হোম',
      discover: 'আবিষ্কার করুন',
      knowledge: 'জ্ঞান কেন্দ্র',
      studio: 'স্টুডিও',
      collaborate: 'সহযোগিতা',
      opportunities: 'সুযোগ',
      community: 'কমিউনিটি',
      marketplace: 'মার্কেটপ্লেস',
      profile: 'প্রোফাইল',
      workspace: 'ওয়ার্কস্পেস',
      library: 'আমার লাইব্রেরি',
      analytics: 'বিশ্লেষণ',
      admin: 'নিরাপত্তা ও প্রশাসন',
      collapse: 'সংকুচিত করুন',
    },
    hero: {
      welcome: 'স্বাগতম',
      brand: 'KalaaVerse',
      subtitle: 'ভারতীয় সৃজনশীল প্রতিভাকে সীমাহীন সুযোগের সাথে সংযুক্ত করার প্রধান প্ল্যাটফর্ম। আপনার শিল্প প্রদর্শন করুন, সঠিক সহযোগী খুঁজুন।',
      getStarted: 'শুরু করুন',
      exploreTalent: 'শিল্পী খুঁজুন',
      alreadyAccount: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
      motto: 'যা ভালোবাসেন তা করুন। শিখতে শিখতে উপার্জন করুন।',
      availableIn: 'উপলব্ধ ভাষাসমূহ',
    },
    features: {
      multilingualTitle: 'বহুভাষিক সহায়তা',
      multilingualDesc: 'কোনো ভাষার বাধা ছাড়াই নিজের মাতৃভাষায় তৈরি করুন এবং সহযোগিতা করুন।',
      secureTitle: 'নিরাপদ ও বিশ্বস্ত',
      secureDesc: 'যাচাইকৃত প্রোফাইল এবং নিরাপদ মাইলস্টোন এসক্রো পেমেন্ট।',
      communityTitle: 'কমিউনিটি প্রথম',
      communityDesc: 'ভারতীয় শিল্পীদের দ্বারা, ভারতীয় শিল্প সমাজের জন্য তৈরি।',
      aiTitle: 'এআই-চালিত টুলস',
      aiDesc: 'তাত্ক্ষণিক বায়ো তৈরি এবং স্মার্ট ক্লায়েন্ট ম্যাচমেকিং।',
    },
    benefits: {
      badge: 'প্ল্যাটফর্মের প্রভাব ও মূল্য',
      heading: 'শিল্পীরা কেন বেছে নেন',
      headingHighlight: 'KalaaVerse',
      subheading: 'ভারতীয় শিল্পী এবং আধুনিক ক্লায়েন্টদের জন্য বিশেষভাবে তৈরি সৃজনশীল অপারেটিং সিস্টেম।',
      forCreatorsTitle: 'সৃজনশীল শিল্পীদের জন্য',
      forCreatorsSubtitle: 'যা ভালোবাসেন তা করুন, শিখুন এবং উপার্জন করুন।',
      creatorPoints: [
        'আপনার মৌলিক কাজের ওপর ১০০% মেধা স্বত্ব আপনার কাছেই থাকবে।',
        'কোনো ভাষা বাধা নেই: বাংলা, হিন্দি, তেলুগু, তামিল এবং ইংরেজিতে যোগাযোগ করুন।',
        'মাইলস্টোন এসক্রো সুরক্ষার মাধ্যমে সময়মতো নিরাপদ পারিশ্রমিক।',
        'লেখা, ছবি আঁকা এবং সংগীতের জন্য এআই-চালিত ইন্টিগ্রেটেড স্টুডিও।',
      ],
      forClientsTitle: 'ক্লায়েন্ট ও ব্র্যান্ডের জন্য',
      forClientsSubtitle: 'সম্পূর্ণ আত্মবিশ্বাসের সাথে আঞ্চলিক ভারতীয় প্রতিভাকে নিয়োগ করুন।',
      clientPoints: [
        '৬৪টি বিশেষ শিল্প বিভাগে যাচাইকৃত শিল্পীদের সরাসরি সন্ধান পান।',
        'কাজ অনুমোদিত হলেই অর্থ ছাড় হয়, ফলে বাজেট সম্পূর্ণ নিরাপদ।',
        'লেখক, শিল্পী ಮತ್ತು সাউন্ড ডিজাইনারদের নিয়ে বহুমুখী টিম তৈরি করুন।',
        'ভুয়া ফলোয়ারহীন খাঁটি মানের যাচাইকৃত পোর্টফোলিও।',
      ],
    },
    fields: {
      heading: 'শিল্প বিভাগ অনুযায়ী শিল্পী খুঁজুন',
      subheading: 'প্রাচীন ঐতিহ্যবাহী শিল্প থেকে আধুনিক ডিজিটাল মিডিয়া—সব আবিষ্কার করুন।',
      all: 'সমস্ত ক্ষেত্র',
      visualArts: 'দৃশ্য শিল্প (Visual Arts)',
      performingArts: 'মঞ্চ ও অভিনয় শিল্প (Performing Arts)',
      musicSound: 'সংগীত ও শব্দ',
      writing: 'লেখা ও সাহিত্য',
      filmPhoto: 'ফটোগ্রাফি ও চলচ্চিত্র',
      digitalMedia: 'ডিজিটাল ও মিডিয়া',
      heritageCrafts: 'ঐতিহ্যবাহী হস্তশিল্প',
      voiceDubbing: 'কণ্ঠ ও ডাবিং',
    },
    knowledge: {
      title: 'জ্ঞান কেন্দ্র ও শিল্প দক্ষতা বিনিময়',
      subtitle: 'প্রতিটি শিল্পের কিছু নিজস্ব কৌশল থাকে। বিশেষজ্ঞদের কাছ থেকে শিখুন, প্রশ্ন করুন এবং আপনার অভিজ্ঞতা শেয়ার করুন।',
      learnTab: 'শিখুন ও দক্ষ হন',
      askTab: 'প্রশ্নোত্তর কমিউনিটি',
      shareTab: 'জ্ঞান শেয়ার করুন',
      searchPlaceholder: 'গাইড এবং প্রশ্ন খুঁজুন...',
      shareKnowledgeBtn: 'জ্ঞান শেয়ার করুন',
      askQuestionBtn: 'প্রশ্ন করুন',
      noGuidesFound: 'কোনো গাইড পাওয়া যায়নি',
      noGuidesDesc: 'এই বিভাগে প্রথম জ্ঞান শেয়ারকারী শিল্পী হোন!',
      contributeFirst: 'প্রথম গাইড প্রকাশ করুন',
      publishGuide: 'আপনার কৌশল বা উপাদান প্রকাশ করুন',
      guideTitle: 'গাইডের শিরোনাম',
      creativeField: 'সৃজনশীল বিভাগ',
      targetLevel: 'দক্ষতার স্তর',
      practicalBreakdown: 'পদ্ধতি ও বিশদ বিবরণ',
      topicTags: 'ট্যাগ (কমা দিয়ে আলাদা করুন)',
      submitQuery: 'প্রশ্ন জমা দিন',
    },
    discover: {
      title: 'সৃজনশীল প্রতিভা আবিষ্কার করুন',
      subtitle: 'দৃশ্যশিল্প, সাহিত্য, সংগীত, চলচ্চিত্র ও অভিনয়ে খাঁটি ভারতীয় শিল্পীদের খুঁজুন।',
      allFields: 'সমস্ত বিভাগ',
      filterByField: 'বিভাগ অনুযায়ী ফিল্টার করুন',
      searchPlaceholder: 'দক্ষতা, শহর বা শিল্প দ্বারা খুঁজুন...',
      location: 'স্থান / শহর',
      maxBudget: 'সর্বোচ্চ বাজেট (₹)',
      clearFilters: 'ফিল্টার সরান',
      noCreatorsFound: 'এই বিভাগে এখনো কোনো শিল্পী নিবন্ধিত হননি',
      noCreatorsDesc: 'KalaaVerse-এ এই বিভাগের প্রথম যাচাইকৃত প্রতিষ্ঠাতা শিল্পী হোন!',
      claimSpot: 'প্রতিষ্ঠাতা শিল্পীর স্থান গ্রহণ করুন',
      viewProfile: 'প্রোফাইল দেখুন',
      collaborate: 'সহযোগিতা করুন',
      verifiedFounding: 'যাচাইকৃত প্রতিষ্ঠাতা শিল্পী',
    },
    home: {
      creativePulse: 'সৃজনশীল ছন্দ',
      whatCreating: 'আজ আমরা নতুন কী সৃষ্টি করছি?',
      createNewWork: 'নতুন কাজ শুরু করুন',
      continueWriting: 'লেখা চালিয়ে যান',
      discoverCreators: 'শিল্পী খুঁজুন',
      findOpportunities: 'সুযোগ খুঁজুন',
      practicingAs: 'সক্রিয় শিল্প বিভাগ',
      reputationIndex: 'খ্যাতি সূচক',
      activeWorkrooms: 'সক্রিয় ওয়ার্করুম',
      clientBriefs: 'ক্লায়েন্ট প্রজেক্ট',
      arenaTitle: 'KalaaVerse সৃজনশীল আখড়া',
    },
    auth: {
      joinKalaaVerse: 'KalaaVerse-এ যোগ দিন',
      chooseRole: 'আপনার ভূমিকা বেছে নিন',
      asCreator: 'শিল্পী ও স্রষ্টা',
      asCreatorDesc: 'আপনার পোর্টফোলিও প্রদর্শন করুন, অন্যদের সাথে কাজ করুন এবং প্রজেক্ট পান।',
      asClient: 'ক্লায়েন্ট ও প্রতিষ্ঠান',
      asClientDesc: 'প্রকল্প, চলচ্চিত্র ও ব্র্যান্ডিংয়ের জন্য ভারতীয় সৃজনশীল প্রতিভা নিয়োগ করুন।',
      fullName: 'পূর্ণ আইনি নাম',
      stageName: 'মঞ্চ / শিল্পী নাম',
      email: 'ইমেল ঠিকানা',
      phone: 'ফোন নম্বর',
      password: 'পাসওয়ার্ড তৈরি করুন',
      photoProof: 'প্রোফাইল ফটো ও ফটো প্রমাণ',
      photoProofHelp: 'আপনার শিল্প বা পরিচয়ের একটি স্পষ্ট ফটো প্রমাণ আপলোড করুন।',
      aiBioTitle: 'এআই বায়ো নির্মাতা',
      generateAIBio: 'KalaaVerse AI দিয়ে বায়ো তৈরি করুন',
      continueBtn: 'এগিয়ে যান',
      loginBtn: 'লগইন করুন',
      alreadyAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      dontHaveAccount: 'অ্যাকাউন্ট নেই?',
      welcomeBack: 'স্বাগতম',
      loginSubtitle: 'আপনার KalaaVerse অ্যাকাউন্টে লগইন করুন',
    },
    stories: {
      heading: 'অসাধারণ গল্প',
      headingHighlight: 'আবিষ্কার করুন',
      subheading: 'লেখক ও শিল্পীরা যেখানে একত্রে অসাধারণ সৃষ্টি করেন সেই সৃজনশীল জগত দেখুন।',
      readStory: 'গল্প পড়ুন',
    },
    footer: {
      flagship: 'CREZORA.CO উপস্থাপিত প্রধান সৃজনশীল অপারেটিং সিস্টেম',
      motto: '“Do what you love. Still learn and earn.”',
      rights: '© 2026 CREZORA.CO. সর্বস্বত্ব সংরক্ষিত।',
      tagline: 'যেখানে কল্পনা সুযোগে রূপান্তরিত হয়',
      explore: 'শিল্পী খুঁজুন',
      joinCommunity: 'কমিউনিটিতে যোগ দিন',
      privacy: 'গোপনীয়তা নীতি',
      terms: 'ব্যবহারের শর্তাবলী',
      support: 'শিল্পী সহায়তা',
      panIndia: 'সর্বভারতীয় বহুভাষিক প্ল্যাটফর্ম',
      panIndiaDesc: 'KalaaVerse ভারতীয় আঞ্চলিক শিল্পীদের তাদের নিজস্ব মাতৃভাষায় সমর্থন করে।',
    },
  },
};

export const getTranslation = (lang: SupportedLanguage = 'en'): Translations => {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en!;
};

/** True when this language has a product-screen dictionary in this build. */
export const hasProductTranslation = (lang: SupportedLanguage): boolean =>
  Boolean(TRANSLATIONS[lang]);
