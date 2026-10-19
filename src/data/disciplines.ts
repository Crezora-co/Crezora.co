export interface Discipline {
  id: string;
  name: string;
  domain: string;
  description: string;
  icon: string;
  popularInIndia: boolean;
}

export interface CreativeDomain {
  id: string;
  name: string;
  description: string;
  color: string;
  disciplines: Discipline[];
}

export const CREATIVE_DOMAINS_64: CreativeDomain[] = [
  {
    id: 'visual-art',
    name: 'Visual Art & Illustration',
    description: 'Fine arts, digital painting, traditional Indian folk arts, and contemporary illustration',
    color: '#8B5CF6',
    disciplines: [
      { id: 'madhubani', name: 'Madhubani & Mithila Painting', domain: 'visual-art', description: 'Traditional geometric Indian folk art of Bihar', icon: 'Palette', popularInIndia: true },
      { id: 'pattachitra', name: 'Pattachitra Scroll Painting', domain: 'visual-art', description: 'Cloth-based narrative scroll paintings of Odisha & Bengal', icon: 'Scroll', popularInIndia: true },
      { id: 'kalamkari', name: 'Kalamkari Hand-block & Pen Art', domain: 'visual-art', description: 'Ancient natural-dyed cotton textiles art of Andhra Pradesh', icon: 'PenTool', popularInIndia: true },
      { id: 'warli', name: 'Warli Tribal Painting', domain: 'visual-art', description: 'Monochrome ritualistic tribal paintings of Maharashtra', icon: 'CircleDot', popularInIndia: true },
      { id: 'miniature-painting', name: 'Mughal & Rajput Miniature', domain: 'visual-art', description: 'Intricate royal court miniature paintings', icon: 'Frame', popularInIndia: true },
      { id: 'tanjore', name: 'Thanjavur Gold Leaf Painting', domain: 'visual-art', description: 'Classical South Indian relief painting with semi-precious stones', icon: 'Sparkles', popularInIndia: true },
      { id: 'digital-illustration', name: 'Digital & Vector Illustration', domain: 'visual-art', description: 'Editorial, commercial, and editorial digital graphics', icon: 'Laptop', popularInIndia: true },
      { id: 'concept-art', name: 'Game & Film Concept Art', domain: 'visual-art', description: 'World-building, creature design, and cinematic keyframes', icon: 'Layers', popularInIndia: false }
    ]
  },
  {
    id: 'music-sound',
    name: 'Music, Sound & Vocal Arts',
    description: 'Classical Hindustani, Carnatic, regional folk, playback, and modern electronic production',
    color: '#EC4899',
    disciplines: [
      { id: 'carnatic-vocal', name: 'Carnatic Classical Vocal', domain: 'music-sound', description: 'Kriti, alapana, and raga improvisations of South India', icon: 'Mic', popularInIndia: true },
      { id: 'hindustani-classical', name: 'Hindustani Khayal & Dhrupad', domain: 'music-sound', description: 'North Indian classical vocal traditions with intricate taans', icon: 'Mic2', popularInIndia: true },
      { id: 'playback-singing', name: 'Film Playback & Session Singing', domain: 'music-sound', description: 'Versatile vocalists for cinematic and OTT scoring', icon: 'Music', popularInIndia: true },
      { id: 'sitar-sarod', name: 'Sitar, Sarod & Indian Plucked Strings', domain: 'music-sound', description: 'Mastery over meend, gamak, and classical ragas', icon: 'Radio', popularInIndia: true },
      { id: 'tabla-mridangam', name: 'Tabla, Mridangam & Rhythmics', domain: 'music-sound', description: 'Taal, bols, konnakol, and multi-rhythmic percussions', icon: 'Disc', popularInIndia: true },
      { id: 'bansuri-flute', name: 'Bansuri & Bamboo Flute', domain: 'music-sound', description: 'Blowing life into classical, devotional, and ambient score', icon: 'Wind', popularInIndia: true },
      { id: 'music-production', name: 'OTT & Film Music Production', domain: 'music-sound', description: 'Orchestral composition, hybrid synth-folk arrangements', icon: 'Sliders', popularInIndia: true },
      { id: 'sound-design', name: 'Foley & Cinematic Sound Design', domain: 'music-sound', description: 'Immersive audio spatialization, atmosphere, and foley', icon: 'Volume2', popularInIndia: false }
    ]
  },
  {
    id: 'film-photo',
    name: 'Cinema, Video & Photography',
    description: 'Directing, cinematography, editing, documentary, and regional storytelling',
    color: '#3B82F6',
    disciplines: [
      { id: 'cinematography', name: 'Feature & Indie Cinematography', domain: 'film-photo', description: 'Visual lighting, anamorphic lenses, and camera operation', icon: 'Camera', popularInIndia: true },
      { id: 'film-editing', name: 'Film & Web-Series Editing', domain: 'film-photo', description: 'Narrative pacing, rhythm, montage, and dialogue assembly', icon: 'Film', popularInIndia: true },
      { id: 'color-grading', name: 'DI & Cinematic Color Grading', domain: 'film-photo', description: 'Color science, mood enhancement, and ACES pipelines', icon: 'Sun', popularInIndia: false },
      { id: 'documentary-filmmaking', name: 'Cultural Documentary Filmmaking', domain: 'film-photo', description: 'Field research, verite capture, and human condition cinema', icon: 'Video', popularInIndia: true },
      { id: 'portrait-photo', name: 'Editorial & Portrait Photography', domain: 'film-photo', description: 'Authentic lighting, magazine covers, and expressive portraits', icon: 'Aperture', popularInIndia: true },
      { id: 'heritage-street-photo', name: 'Heritage & Street Photography', domain: 'film-photo', description: 'Capturing India’s living streets, festivals, and architecture', icon: 'Compass', popularInIndia: true },
      { id: 'vfx-compositing', name: 'VFX & CGI Compositing', domain: 'film-photo', description: 'Green-screen cleanup, environment extensions, and visual magic', icon: 'Sparkle', popularInIndia: false },
      { id: 'drone-aerial', name: 'Aerial & Drone Cinematography', domain: 'film-photo', description: 'Spectacular landscape, architecture, and action aerial shots', icon: 'Navigation', popularInIndia: true }
    ]
  },
  {
    id: 'literature-writing',
    name: 'Literature, Script & Dialogue',
    description: 'Screenwriting, multilingual poetry, dialogue, lyrical compositions, and translations',
    color: '#10B981',
    disciplines: [
      { id: 'screenwriting', name: 'Feature Film Screenwriting', domain: 'literature-writing', description: 'Three-act structure, high-concept worldbuilding, character arcs', icon: 'FileText', popularInIndia: true },
      { id: 'vernacular-dialogue', name: 'Vernacular & Dialect Dialogue', domain: 'literature-writing', description: 'Authentic street dialect, rural idioms, and regional punchlines', icon: 'MessageSquare', popularInIndia: true },
      { id: 'lyric-writing', name: 'Song & Ghazal Lyric Writing', domain: 'literature-writing', description: 'Chhand, meter, emotive metaphors, and hook creation', icon: 'Feather', popularInIndia: true },
      { id: 'playwriting', name: 'Stage & Experimental Playwriting', domain: 'literature-writing', description: 'Dramatic conflict, spatial staging, and ensemble texts', icon: 'BookOpen', popularInIndia: true },
      { id: 'literary-fiction', name: 'Regional & English Novel Writing', domain: 'literature-writing', description: 'Contemporary fiction exploring modern and historical Indian life', icon: 'Book', popularInIndia: true },
      { id: 'creative-nonfiction', name: 'Biographies & Investigative Essays', domain: 'literature-writing', description: 'Rigorous journalistic prose and evocative memoir writing', icon: 'Bookmark', popularInIndia: false },
      { id: 'ad-copywriting', name: 'Campaign Copywriting & Brand Voice', domain: 'literature-writing', description: 'Memorable brand slogans, film concepts, and print copy', icon: 'Zap', popularInIndia: true },
      { id: 'subtitling-localization', name: 'Multilingual Subtitling & Localization', domain: 'literature-writing', description: 'Pacing-safe, culturally nuanced film and series subtitles', icon: 'Globe', popularInIndia: true }
    ]
  },
  {
    id: 'performing-arts',
    name: 'Performing Arts & Movement',
    description: 'Classical Indian dance, theatre acting, mime, puppetry, and contemporary choreography',
    color: '#F59E0B',
    disciplines: [
      { id: 'bharatanatyam', name: 'Bharatanatyam Classical Dance', domain: 'performing-arts', description: 'Nritta, abhinaya, and natya storytelling traditions of Tamil Nadu', icon: 'Activity', popularInIndia: true },
      { id: 'kathak', name: 'Kathak Classical Dance', domain: 'performing-arts', description: 'Spins, footwork, and expressive storytelling from Lucknow & Jaipur', icon: 'Flame', popularInIndia: true },
      { id: 'yakshagana-theatre', name: 'Yakshagana & Folk Theatre', domain: 'performing-arts', description: 'Vibrant coastal Karnataka theatrical dance-drama with elaborate headdresses', icon: 'Mask', popularInIndia: true },
      { id: 'theatre-acting', name: 'Method & Physical Stage Acting', domain: 'performing-arts', description: 'Voice projection, emotional recall, and ensemble presence', icon: 'Smile', popularInIndia: true },
      { id: 'kalaripayattu', name: 'Kalaripayattu & Movement Design', domain: 'performing-arts', description: 'Ancient martial art of Kerala adapted for film action choreography', icon: 'Shield', popularInIndia: true },
      { id: 'contemporary-dance', name: 'Indo-Contemporary Choreography', domain: 'performing-arts', description: 'Fusing classical Indian grammar with modern floorwork and release', icon: 'Compass', popularInIndia: true },
      { id: 'kathakali', name: 'Kathakali Gesture & Mudra Drama', domain: 'performing-arts', description: 'Elaborate facial makeup and mudra-based epic reenactments', icon: 'Eye', popularInIndia: true },
      { id: 'puppetry-shadow', name: 'Tholu Bommalata & Shadow Puppetry', domain: 'performing-arts', description: 'Leather shadow puppet storytelling of Andhra and Karnataka', icon: 'Moon', popularInIndia: true }
    ]
  },
  {
    id: 'heritage-crafts',
    name: 'Heritage Crafts & Living Traditions',
    description: 'Textiles, handloom weaving, metal crafts, pottery, terracotta, and stone carving',
    color: '#D97706',
    disciplines: [
      { id: 'handloom-weaving', name: 'Banarasi & Kanjeevaram Handloom', domain: 'heritage-crafts', description: 'Jacquard looms, pure zari silk, and ancestral motifs', icon: 'Grid', popularInIndia: true },
      { id: 'dhokra-metal', name: 'Dhokra Lost-Wax Bell Metal Craft', domain: 'heritage-crafts', description: '4,000-year-old tribal non-ferrous metal casting of Bastar and Bengal', icon: 'Hammer', popularInIndia: true },
      { id: 'blue-pottery', name: 'Jaipur Blue Pottery & Ceramics', domain: 'heritage-crafts', description: 'Glazed quartz and fuller’s earth decorative craft', icon: 'Coffee', popularInIndia: true },
      { id: 'chikankari', name: 'Lucknowi Chikankari Embroidery', domain: 'heritage-crafts', description: 'Delicate, shadow-work white embroidery on fine muslins', icon: 'Heart', popularInIndia: true },
      { id: 'bidriware', name: 'Bidriware Silver Inlay Craft', domain: 'heritage-crafts', description: 'Centuries-old black metal alloy with pure silver wire inlay from Karnataka', icon: 'Star', popularInIndia: true },
      { id: 'wood-carving', name: 'Saharanpur & Kashmiri Wood Carving', domain: 'heritage-crafts', description: 'Perforated jaali work in Sheesham, Teak, and Walnut woods', icon: 'Box', popularInIndia: true },
      { id: 'terracotta-craft', name: 'Bankura Terracotta & Clay Sculpting', domain: 'heritage-crafts', description: 'Fired earth sculptures, monumental horses, and architectural tiles', icon: 'Home', popularInIndia: true },
      { id: 'stone-sculpture', name: 'Mahabalipuram Granite & Sandstone', domain: 'heritage-crafts', description: 'Sculptural stone architecture and classical temple iconography', icon: 'Mountain', popularInIndia: true }
    ]
  },
  {
    id: 'digital-tech-art',
    name: 'Digital Media, 3D & Creative Tech',
    description: 'Generative algorithms, 3D modeling, interactive installations, and XR experiences',
    color: '#06B6D4',
    disciplines: [
      { id: '3d-sculpting', name: '3D Character & Prop Sculpting', domain: 'digital-tech-art', description: 'High-poly organic sculpting, textures, and rigging for unreal engine', icon: 'Box', popularInIndia: false },
      { id: 'generative-coding', name: 'Creative Coding & Algorithmic Art', domain: 'digital-tech-art', description: 'Shader programming, p5.js, and interactive sensory installations', icon: 'Code', popularInIndia: false },
      { id: 'motion-graphics', name: 'Cinematic Motion Graphics & Titles', domain: 'digital-tech-art', description: 'Kinetic typography, brand showreels, and broadcast packages', icon: 'PlayCircle', popularInIndia: true },
      { id: 'virtual-production', name: 'LED Stage Virtual Production', domain: 'digital-tech-art', description: 'Real-time camera tracking and parallax photoreal 3D backdrops', icon: 'Tv', popularInIndia: false },
      { id: 'brand-identity', name: 'Vernacular Typography & Identity Design', domain: 'digital-tech-art', description: 'Indic script typefaces, visual brand languages, and logotypes', icon: 'Type', popularInIndia: true },
      { id: 'ui-ux-design', name: 'Human-Centered Digital Product Design', domain: 'digital-tech-art', description: 'Wireframes, design systems, and inclusive vernacular interfaces', icon: 'Layout', popularInIndia: true },
      { id: 'game-design', name: 'Indie Game Narrative & Level Design', domain: 'digital-tech-art', description: 'Mechanics, storytelling rooted in Indian folklore, and game worlds', icon: 'Gamepad2', popularInIndia: true },
      { id: 'spatial-xr', name: 'AR/VR Cultural Heritage Archival', domain: 'digital-tech-art', description: 'Photogrammetry and immersive walkthroughs of endangered monuments', icon: 'Glasses', popularInIndia: false }
    ]
  },
  {
    id: 'voice-dubbing',
    name: 'Voice, Dubbing & Audio Drama',
    description: 'Pan-India multilingual dubbing, voice acting, audiobooks, and character performance',
    color: '#14B8A6',
    disciplines: [
      { id: 'voice-acting-films', name: 'Theatrical Voice Dubbing & Match', domain: 'voice-dubbing', description: 'Pan-India dubbing for high-budget cinema across North & South industries', icon: 'Mic', popularInIndia: true },
      { id: 'audiobook-narration', name: 'Audiobook & Longform Narration', domain: 'voice-dubbing', description: 'Deep, engaging cadence for bestsellers and historic biographies', icon: 'Headphones', popularInIndia: true },
      { id: 'character-voice', name: 'Animation & Gaming Character Voices', domain: 'voice-dubbing', description: 'Distinct vocal pitch, accent flexibility, and playful character voices', icon: 'Sparkles', popularInIndia: true },
      { id: 'commercial-vo', name: 'Television & Digital Commercial VO', domain: 'voice-dubbing', description: 'Crisp, punchy, persuasive brand tonality for multilingual campaigns', icon: 'Radio', popularInIndia: true },
      { id: 'audio-drama-podcasting', name: 'Fictional Audio Drama & Podcast Production', domain: 'voice-dubbing', description: 'Binaural episodic storytelling with immersive soundscapes', icon: 'Cast', popularInIndia: true },
      { id: 'documentary-narration', name: 'Wildlife & Cultural Doc Narration', domain: 'voice-dubbing', description: 'Gravitas, authoritative tone, and measured emotional presence', icon: 'Award', popularInIndia: true },
      { id: 'vernacular-commentary', name: 'Sports & Live Vernacular Commentary', domain: 'voice-dubbing', description: 'Electrifying, high-energy live regional commentary in regional tongues', icon: 'Flame', popularInIndia: true },
      { id: 'singing-dubbing', name: 'Multilingual Song Dubbing & Lip Sync', domain: 'voice-dubbing', description: 'Musical pitch replication matching original screen performances', icon: 'Music2', popularInIndia: true }
    ]
  }
];

// Helper to flatten all 64 disciplines
export const ALL_64_DISCIPLINES = CREATIVE_DOMAINS_64.flatMap(d => d.disciplines);
