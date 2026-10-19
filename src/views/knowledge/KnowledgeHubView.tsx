import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Share2,
  ThumbsUp,
  Bookmark,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Palette,
  Music,
  Camera,
  Layers,
  Heart,
  Award,
  Users,
  User,
  Plus,
  Send,
  Eye,
  Clock,
  Star,
  Search,
  Video,
  Mic,
  PenTool,
  Compass,
  ArrowRight,
  Filter,
  Check,
  X,
  Flame
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../../services/i18n';

interface KnowledgeHubViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
}

interface KnowledgeArticle {
  id: string;
  fieldId: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  readTime: string;
  upvotes: number;
  bookmarks: number;
  tags: string[];
  level: 'Beginner' | 'Intermediate' | 'Masterclass';
}

interface QuestionItem {
  id: string;
  fieldId: string;
  question: string;
  details: string;
  asker: {
    name: string;
    avatar: string;
  };
  answersCount: number;
  upvotes: number;
  isSolved: boolean;
  timestamp: string;
  answers?: {
    id: string;
    author: string;
    role: string;
    avatar: string;
    text: string;
    upvotes: number;
  }[];
}

const KNOWLEDGE_FIELDS = [
  { id: 'all', label: 'All Fields', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'visual_art', label: 'Visual Art', icon: Palette, color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { id: 'writing', label: 'Writing & Script', icon: PenTool, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'music_sound', label: 'Music & Audio', icon: Music, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { id: 'photo_film', label: 'Photo & Film', icon: Camera, color: 'text-sky-600 bg-sky-50 border-sky-200' },
  { id: 'video_editing', label: 'Editing & VFX', icon: Video, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'digital_media', label: 'Digital 3D & UI', icon: Layers, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { id: 'traditional_crafts', label: 'Heritage Crafts', icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'voice_acting', label: 'Voice & Dubbing', icon: Mic, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
];

const INITIAL_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art_1',
    fieldId: 'writing',
    title: 'Pacing Regional Indian Narratives: Mixing Hyper-Local Dialect with Global Structure',
    excerpt: 'How to write grounded Indian characters and linguistic nuances without alienating pan-Indian or international readers.',
    content: `When drafting Indian fiction, our richness lies in the texture of our languages, idioms, and cultural subtext. However, emerging writers often stumble into two traps: over-explaining indigenous concepts with footnotes, or diluting dialogue to generic American/British English tropes.

Key Pillars to Follow:
1. Contextual Infusion: Let the emotional reaction in the room translate the idiom rather than an explanatory parenthesis. If an elder says "Thalaiva" or "Beta ji", let the posture of the listener communicate the respect.
2. Sensory Anchor: Ground the scene in distinctive sensory details—the scent of fresh petrichor on red earth, the clinking of brass tumblers in a small tea shop, the humid hum of an overhead Usha fan.
3. Universal Conflict, Local Stakes: The family dinner dispute over property or creative aspirations is universally felt, but the specifics of familial hierarchy make it distinctly yours.

Exercise: Take a scene where two characters argue. Rewrite it stripping out generic polite phrases and anchor it in vernacular body language.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '6 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Screenplay', 'Storytelling', 'Dialogue'],
    level: 'Intermediate'
  },
  {
    id: 'art_2',
    fieldId: 'visual_art',
    title: 'Atmospheric Lighting & Color Temperatures for Indian Mythological Concept Art',
    excerpt: 'Balancing intense warm golden-hour dusk light with mystical indigo shadows to give artwork cinematic resonance.',
    content: `Indian art traditions—from miniature Rajasthani paintings to Tanjore gold work—have celebrated illumination for centuries. Translating this to modern concept art requires strong control over lighting keys.

Mastering Dual-Color Grading:
- Key Light: Warm Brass (#F59E0B) representing temple fires, evening diya glow, or divine radiance.
- Ambient/Rim Light: Deep Lapis Indigo (#1E1B4B) representing cosmic dusk or dense temple courtyards.
- Avoid Muddy Transitions: Do not blend directly from gold to indigo across the midtones; use rich burnt-sienna and vermilion as the buffer color band.

Brushwork & Edges:
Keep religious artifacts and jewelry pin-sharp using hard specular highlights, while keeping the background architecture atmospheric and painterly.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '8 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Concept Art', 'Color Theory', 'Lighting'],
    level: 'Masterclass'
  },
  {
    id: 'art_3',
    fieldId: 'music_sound',
    title: 'Acoustic Treatment on a Budget for Home Studios in Indian City Apartments',
    excerpt: 'Taming low-frequency rumble from city traffic, ceiling fans, and concrete walls without spending lakhs.',
    content: `Most Indian urban flats are built from reinforced concrete and ceramic tile flooring—a nightmare for reverberation and flutter echo. Here is how to record studio-quality audio from home:

1. The "Heavy Mattress & Quilt" Bass Trap Strategy:
Position thick cotton mattresses diagonally in room corners. They absorb significantly more low frequencies than cheap 2-inch polyurethane foam.

2. Mic Isolation Hack:
Place your vocal or instrument microphone facing into an open closet packed with hanging winter jackets and blankets. Stand with your back to the open room.

3. Low-Frequency Fan Rumble Elimination:
Never try to "fix it later with noise reduction plugins". Always record with ceiling fans off for short bursts of 15 minutes, or build an insulated mic tunnel using dual-layer moving blankets.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '5 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Home Studio', 'Acoustics', 'Audio Mixing'],
    level: 'Beginner'
  },
  {
    id: 'art_4',
    fieldId: 'photo_film',
    title: 'Cinematography with Single-Source Lighting for Indie Short Films',
    excerpt: 'Creating high-contrast moody scenes using one practical light source and white foam core bounce boards.',
    content: `Independent film sets in India often lack giant generator vans or extensive lighting crews. One high-powered directional LED light (like a 300W cob) plus reflective bounces can light an entire dramatic sequence.

The Golden Rule of Falloff:
Keep your single light far enough away that actors can move two paces without visibly jumping multiple stops of exposure. Use a grid or barndoors to prevent light spill onto bare white walls.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '7 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Cinematography', 'Indie Film', 'Lighting'],
    level: 'Intermediate'
  },
  {
    id: 'art_5',
    fieldId: 'video_editing',
    title: 'Rhythmic Pacing in Visual Editing: Matching Beats to Emotional Tension',
    excerpt: 'Why editing on the exact snare or kick beat feels robotic, and how cutting on character micro-reactions elevates tension.',
    content: `A common editing mistake is cutting strictly to musical beats. While effective for fast promos or sizzle reels, narrative scenes lose intimacy when edited by the audio grid.

Cut on the "Turn":
Edit when a character shifts gaze, swallows, or draws breath. Let the music settle under the sound design so the audience feels the psychology of the scene first, rhythm second.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '6 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Editing', 'Pacing', 'Post-Production'],
    level: 'Intermediate'
  },
  {
    id: 'art_6',
    fieldId: 'voice_acting',
    title: 'Voice Modulation and Breath Control for Regional Character Dubbing',
    excerpt: 'Techniques for voice actors performing high-octane dialogue without vocal strain or plosive distortion.',
    content: `Indian dubbing often requires transitioning from intimate dramatic whispers to booming battlefield shouts. Vocal longevity depends on diaphragm grounding and resonance placement.

Daily 10-Minute Warmup:
- Straw phonation in water to balance vocal fold pressure.
- Tongue trills through full vocal range.
- Resonance shifting: Speak the same phrase in chest voice, throat voice, and nasal mask.`,
    author: {
      name: 'KalaaVerse Editorial',
      role: 'Unreviewed draft',
      avatar: '',
      verified: false
    },
    readTime: '4 min read',
    upvotes: 0,
    bookmarks: 0,
    tags: ['Voice Acting', 'Dubbing', 'Breathwork'],
    level: 'Beginner'
  }
];

/**
 * No seeded questions. The old list invented askers, answers and vote counts;
 * the Q&A board starts empty until real people post.
 */
const INITIAL_QUESTIONS: QuestionItem[] = [];

export const KnowledgeHubView: React.FC<KnowledgeHubViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth
}) => {
  const t = getTranslation(currentLanguage);
  const [selectedField, setSelectedField] = useState('all');
  const [activeTab, setActiveTab] = useState<'learn' | 'ask' | 'share'>('learn');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Articles state
  const [articles, setArticles] = useState<KnowledgeArticle[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [upvotedArticleIds, setUpvotedArticleIds] = useState<Record<string, boolean>>({});

  // Questions state
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDetails, setNewQuestionDetails] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);

  // Answer state
  const [answerDraft, setAnswerDraft] = useState<Record<string, string>>({});

  // Share form state
  const [shareTitle, setShareTitle] = useState('');
  const [shareField, setShareField] = useState('visual_art');
  const [shareLevel, setShareLevel] = useState<'Beginner' | 'Intermediate' | 'Masterclass'>('Intermediate');
  const [shareContent, setShareContent] = useState('');
  const [shareTags, setShareTags] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Toggle bookmark
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle article upvote
  const toggleArticleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotedArticleIds(prev => {
      const isUpvoted = !!prev[id];
      setArticles(list => list.map(a => a.id === id ? { ...a, upvotes: a.upvotes + (isUpvoted ? -1 : 1) } : a));
      return { ...prev, [id]: !isUpvoted };
    });
  };

  // Filtered lists
  const filteredArticles = articles.filter(a => {
    const matchesField = selectedField === 'all' || a.fieldId === selectedField;
    const matchesSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesField && matchesSearch;
  });

  const filteredQuestions = questions.filter(q => {
    const matchesField = selectedField === 'all' || q.fieldId === selectedField;
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesSearch;
  });

  // Handle post new question
  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: QuestionItem = {
      id: `q_${Date.now()}`,
      fieldId: selectedField === 'all' ? 'writing' : selectedField,
      question: newQuestionText.trim(),
      details: newQuestionDetails.trim(),
      asker: {
        name: 'You (local draft)',
        avatar: ''
      },
      answersCount: 0,
      upvotes: 1,
      isSolved: false,
      timestamp: 'Just now',
      answers: []
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    setNewQuestionDetails('');
    setShowAskModal(false);
  };

  // Handle submit answer
  const handleSubmitAnswer = (questionId: string) => {
    const draft = answerDraft[questionId];
    if (!draft || !draft.trim()) return;

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const currentAnswers = q.answers || [];
        return {
          ...q,
          answersCount: q.answersCount + 1,
          answers: [
            ...currentAnswers,
            {
              id: `ans_${Date.now()}`,
              author: 'You (local draft)',
              role: 'Saved on this device',
              avatar: '',
              text: draft.trim(),
              upvotes: 0
            }
          ]
        };
      }
      return q;
    }));

    setAnswerDraft(prev => ({ ...prev, [questionId]: '' }));
  };

  // Handle share article submission
  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareTitle.trim() || !shareContent.trim()) return;

    const newArticle: KnowledgeArticle = {
      id: `art_${Date.now()}`,
      fieldId: shareField,
      title: shareTitle.trim(),
      excerpt: shareContent.slice(0, 140) + '...',
      content: shareContent.trim(),
      author: {
        name: 'You (local draft)',
        role: 'Saved on this device',
        avatar: '',
        verified: false
      },
      readTime: `${Math.max(2, Math.ceil(shareContent.split(' ').length / 150))} min read`,
      upvotes: 1,
      bookmarks: 0,
      tags: shareTags.split(',').map(t => t.trim()).filter(Boolean),
      level: shareLevel
    };

    setArticles([newArticle, ...articles]);
    setShareSuccess(true);
    setShareTitle('');
    setShareContent('');
    setShareTags('');
    setTimeout(() => {
      setShareSuccess(false);
      setActiveTab('learn');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col font-sans selection:bg-purple-600/20 selection:text-purple-900">
      
      {/* ═══ 1. HERO HEADER ════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 pt-8 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 border-b border-purple-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-xs font-semibold text-purple-700">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Creator Knowledge Sanctuary</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Knowledge Hub &amp; Craft Exchange
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Notes on craft, written as unreviewed drafts. Ask a question and it stays on this device — there is no public Q&amp;A server in this build yet.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('share')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.knowledge.shareTab}</span>
            </button>
            <button
              onClick={() => setShowAskModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>{t.knowledge.askTab}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. HORIZONTAL SCROLLABLE FIELD TABS ═══════════════════════ */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-2xs py-2.5 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {KNOWLEDGE_FIELDS.map(f => {
            const Icon = f.icon;
            const isSelected = selectedField === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedField(f.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/25'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border border-slate-200/80 hover:border-purple-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ 3. MAIN CONTENT CONTAINER ════════════════════════════════ */}
      <div className="max-w-6xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        
        {/* Navigation Mode Pill Tabs + Search Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200 self-start">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'learn'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.knowledge.learnTab}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {filteredArticles.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('ask')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ask'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.knowledge.askTab}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {filteredQuestions.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'share'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.knowledge.shareTab}</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.knowledge.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* ═══ TAB 1: LEARN & MASTER ═══════════════════════════════════ */}
        {activeTab === 'learn' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
              These guides are <strong>unreviewed editorial drafts</strong>, not work by named practitioners.
              They are illustrative notes only — verify technical advice before relying on it.
            </div>
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl border border-purple-100 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No guides found for this filter</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Be the first creator to share knowledge in this field! Help your peers master their craft.
                </p>
                <button
                  onClick={() => setActiveTab('share')}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 cursor-pointer transition-all"
                >
                  Contribute First Guide
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map(article => {
                  const isBookmarked = !!bookmarkedIds[article.id];
                  const isUpvoted = !!upvotedArticleIds[article.id];

                  return (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        {/* Tags and Level */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 font-mono">
                              {article.level}
                            </span>
                            {article.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0 font-mono">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Author + Actions Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {article.author.avatar ? (
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-7 h-7 rounded-full object-cover border border-purple-200 shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0">
                              <BookOpen className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                              {article.author.name}
                              {article.author.verified && <CheckCircle2 className="w-3 h-3 text-purple-600 fill-purple-100" />}
                            </span>
                            <span className="text-[10px] text-slate-400 leading-none">{article.author.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => toggleArticleUpvote(article.id, e)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              isUpvoted
                                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                : 'bg-slate-50 hover:bg-purple-50 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${isUpvoted ? 'text-purple-600 fill-purple-600' : ''}`} />
                            <span>{article.upvotes}</span>
                          </button>

                          <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                              isBookmarked
                                ? 'bg-amber-50 border-amber-300 text-amber-600'
                                : 'bg-slate-50 hover:bg-purple-50 border-slate-200 text-slate-400'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB 2: ASK & SOLVE Q&A ══════════════════════════════════ */}
        {activeTab === 'ask' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border border-purple-100 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Have a specific technical or artistic hurdle?</h3>
                <p className="text-[11px] sm:text-xs text-slate-600">Get solutions directly from experienced peers in your exact creative field.</p>
              </div>
              <button
                onClick={() => setShowAskModal(true)}
                className="shrink-0 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
              >
                + Ask Question
              </button>
            </div>

            <div className="space-y-3">
              {filteredQuestions.length === 0 && (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-purple-200 text-center space-y-2">
                  <HelpCircle className="w-6 h-6 text-purple-400 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900">No questions yet</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    The board starts empty — there are no seeded questions or invented answers. Questions you post stay in this tab on this device.
                  </p>
                </div>
              )}
              {filteredQuestions.map(q => {
                const isExpanded = expandedQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {q.isSolved ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Solved
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                              Open Query
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">{q.timestamp}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {q.details}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                        <span className="text-sm font-bold">{q.upvotes}</span>
                        <span className="text-[9px] uppercase text-slate-400 font-mono">Votes</span>
                      </div>
                    </div>

                    {/* Footer bar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {q.asker.avatar ? (
                          <img src={q.asker.avatar} alt={q.asker.name} className="w-5 h-5 rounded-full object-cover" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                        <span className="text-xs text-slate-600">Asked by <span className="font-semibold text-slate-800">{q.asker.name}</span></span>
                      </div>

                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{q.answersCount} {q.answersCount === 1 ? 'Answer' : 'Answers'}</span>
                      </button>
                    </div>

                    {/* Answers Dropdown */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-purple-50 space-y-3">
                        {q.answers && q.answers.length > 0 ? (
                          <div className="space-y-2">
                            {q.answers.map(ans => (
                              <div key={ans.id} className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {ans.avatar ? (
                                      <img src={ans.avatar} alt={ans.author} className="w-5 h-5 rounded-full object-cover" />
                                    ) : (
                                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                                        <User className="w-3 h-3" />
                                      </div>
                                    )}
                                    <span className="text-xs font-bold text-slate-800">{ans.author}</span>
                                    <span className="text-[10px] text-purple-600 font-mono">{ans.role}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3 text-purple-600" /> {ans.upvotes}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed font-sans">{ans.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic py-1">No community answers yet. Be the first to reply!</p>
                        )}

                        {/* Answer Input */}
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            value={answerDraft[q.id] || ''}
                            onChange={(e) => setAnswerDraft({ ...answerDraft, [q.id]: e.target.value })}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitAnswer(q.id); }}
                            placeholder="Write your answer or pro tip..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-purple-500"
                          />
                          <button
                            onClick={() => handleSubmitAnswer(q.id)}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ TAB 3: SHARE KNOWLEDGE ══════════════════════════════════ */}
        {activeTab === 'share' && (
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700 font-mono">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Early-Access Draft</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Publish Your Technique or Resource
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Help shape a future creative knowledge base. This is an early-access draft: your guide is saved on this device for this tab only and is not published to a server.
                </p>
              </div>

              {shareSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-scaleUp">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block">Draft saved in this tab only</span>
                    Nothing was published: this build has no server, editorial review or public knowledge base. The draft disappears when you reload.
                  </div>
                </div>
              )}

              <form onSubmit={handleShareSubmit} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Guide Title</label>
                  <input
                    type="text"
                    required
                    value={shareTitle}
                    onChange={(e) => setShareTitle(e.target.value)}
                    placeholder="e.g. Mixing Regional Ragas with Trap 808s in Logic Pro"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  />
                </div>

                {/* Field & Level Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Creative Field</label>
                    <select
                      value={shareField}
                      onChange={(e) => setShareField(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-purple-600"
                    >
                      {KNOWLEDGE_FIELDS.filter(f => f.id !== 'all').map(f => (
                        <option key={f.id} value={f.id}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Target Skill Level</label>
                    <select
                      value={shareLevel}
                      onChange={(e) => setShareLevel(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="Beginner">Beginner (Foundational)</option>
                      <option value="Intermediate">Intermediate (Practical Application)</option>
                      <option value="Masterclass">Masterclass (Industry Advanced)</option>
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Knowledge & Practical Breakdown</label>
                  <textarea
                    required
                    rows={6}
                    value={shareContent}
                    onChange={(e) => setShareContent(e.target.value)}
                    placeholder="Provide actionable advice, step-by-step methodology, recommended gear/software, and common pitfalls to avoid..."
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 font-sans leading-relaxed"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Topic Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={shareTags}
                    onChange={(e) => setShareTags(e.target.value)}
                    placeholder="Audio, LogicPro, Ragas, Mixing"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                {/* Submit */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('learn')}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm shadow-purple-600/25 cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Guide</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>

      {/* ═══ ARTICLE READING DETAIL MODAL ══════════════════════════════ */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-purple-100 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono uppercase">
                    {selectedArticle.level}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-2 pt-1">
                  <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs font-bold text-slate-800">{selectedArticle.author.name}</span>
                  <span className="text-xs text-slate-400">· {selectedArticle.author.role}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-line">
              {selectedArticle.content}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleArticleUpvote(selectedArticle.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold text-purple-700 hover:bg-purple-50 cursor-pointer transition-all"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedArticle.upvotes} Helpful</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setActiveTab('ask');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Ask Author a Follow-up
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ═══ ASK QUESTION MODAL ════════════════════════════════════════ */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-purple-100 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Post a Creator Query</h3>
              </div>
              <button
                onClick={() => setShowAskModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostQuestion} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Question Title</label>
                <input
                  type="text"
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Best export settings for Tamil YouTube audio dubs?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Specific Context / Technical Specs</label>
                <textarea
                  rows={4}
                  value={newQuestionDetails}
                  onChange={(e) => setNewQuestionDetails(e.target.value)}
                  placeholder="Describe your current software, hardware, or creative challenge in detail..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-purple-600 font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm shadow-purple-600/25 cursor-pointer"
                >
                  Submit Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
