import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  MapPin, 
  Briefcase, 
  Layers, 
  RefreshCw, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  X,
  Camera,
  Upload,
  ShieldCheck,
  FileText,
  Palette,
  Globe,
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import { TALENT_DOMAINS, getAllTalents } from '../../config/talents';
import { UserProfile } from '../../types/user';
import { storageService } from '../../services/storageService';
import { SupportedLanguage, getTranslation } from '../../services/i18n';
import confetti from 'canvas-confetti';

interface OnboardingViewProps {
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
  };
  currentLanguage?: SupportedLanguage;
  onComplete: (user: UserProfile) => void;
  onCancel: () => void;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialData,
  currentLanguage = 'en',
  onComplete,
  onCancel,
}) => {
  const t = getTranslation(currentLanguage);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Real User Identity & Photo
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [stageName, setStageName] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState(currentLanguage === 'hi' ? 'Hindi' : currentLanguage === 'te' ? 'Telugu' : currentLanguage === 'ta' ? 'Tamil' : currentLanguage === 'kn' ? 'Kannada' : currentLanguage === 'bn' ? 'Bengali' : 'English');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>(DEFAULT_AVATARS[0]);

  // Step 2: Craft & Discipline
  const [selectedDomain, setSelectedDomain] = useState<string>('visual_arts');
  const [selectedTalents, setSelectedTalents] = useState<string[]>(['concept_artist']);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  // Step 3: Bio & Rates
  const [bio, setBio] = useState('');
  const [bioTone, setBioTone] = useState<'cinematic' | 'professional' | 'cultural'>('cinematic');
  const [hourlyRate, setHourlyRate] = useState('');
  const [projectRate, setProjectRate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const allTalents = getAllTalents();

  // Photo Avatar Upload Handler
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Plain-text bio template. There is no AI model and no network call here:
  // this simply fills a sentence template with the details already entered.
  const handleInsertBioTemplate = () => {
    const domainObj = TALENT_DOMAINS.find(d => d.id === selectedDomain);
    const domainTitle = domainObj ? domainObj.name : 'Creative Arts';
    const artistDisplayName = stageName.trim() || fullName.trim() || 'Indian Creative';
    const locString = location.trim() || 'India';
    const skillsList = skills.slice(0, 4).join(', ') || 'your chosen craft';

    const experiencePhrase =
      experienceYears && experienceYears !== '0' ? `${experienceYears}+ years of practice` : '';

    let generated = '';
    if (bioTone === 'cinematic') {
      generated = `${artistDisplayName} is a ${domainTitle} creator based in ${locString}, working with ${skillsList}.${experiencePhrase ? ` With ${experiencePhrase}, they` : ' They'} bring stories from imagination into visual and acoustic reality.`;
    } else if (bioTone === 'professional') {
      generated = `${domainTitle} specialist working in ${skillsList}. Based in ${locString}, working in ${primaryLanguage} and English.${experiencePhrase ? ` ${experiencePhrase} so far.` : ''}`;
    } else {
      generated = `Rooted in the cultural traditions of ${locString}, ${artistDisplayName} blends heritage with modern ${domainTitle} techniques. Practicing in ${primaryLanguage}.`;
    }

    setBio(generated);
  };

  const handleToggleTalent = (talentId: string) => {
    if (selectedTalents.includes(talentId)) {
      if (selectedTalents.length > 1) {
        setSelectedTalents(selectedTalents.filter(t => t !== talentId));
      }
    } else {
      setSelectedTalents([...selectedTalents, talentId]);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleStep1Next = () => {
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter your city and state.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleStep2Next = () => {
    setErrorMsg('');
    if (!bio) {
      handleInsertBioTemplate();
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#EA580C', '#EC4899', '#10B981'],
    });

    const newCreatorId = `usr_${Date.now()}`;
    const artistDisplay = stageName.trim() || fullName.trim();
    const finalBio = bio.trim() || `${artistDisplay} is a dedicated ${selectedDomain} creator based in ${location}.`;
    const years = parseInt(experienceYears) || 0;
    const experienceLevel =
      years >= 8 ? 'master' : years >= 5 ? 'professional' : years >= 2 ? 'practicing' : 'emerging';
    const hourly = parseInt(hourlyRate) || 0;
    const project = parseInt(projectRate) || 0;

    const updatedUser: UserProfile = {
      id: newCreatorId,
      username: (stageName || fullName).toLowerCase().replace(/[^a-z0-9]/g, '') || `creator_${Date.now()}`,
      fullName: fullName.trim(),
      displayName: artistDisplay,
      email: initialData?.email || '',
      avatarUrl: avatarPreview,
      coverImageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80',
      location: location.trim(),
      languages: [primaryLanguage, 'English'],
      bio: finalBio,
      creatorStatement: `${primaryLanguage} · ${skills[0] || 'Creative practice'}`,
      roles: ['creator', 'collaborator'],
      currentRole: 'creator',
      availability: 'available_for_work',
      verified: false,
      talents: selectedTalents.map((tId, idx) => ({
        talentId: tId,
        isPrimary: idx === 0,
        experienceLevel,
        yearsOfPractice: years,
        skills,
        tools: [],
        specialties: skills.length > 0 ? [skills[0]] : [],
        verified: false,
      })),
      story: {
        about: finalBio,
        journey: years > 0
          ? `Practicing ${selectedDomain} in ${location.trim()} with ${years}+ years of discipline.`
          : `Based in ${location.trim()}, currently practicing ${selectedDomain}.`,
        influences: [],
        creativePhilosophy: '',
        highlightMilestone: '',
      },
      rates: {
        hourlyRateINR: hourly,
        projectStartingINR: project,
        consultationRateINR: Math.round(hourly * 0.75),
      },
      stats: {
        profileViews: 0,
        appreciationsReceived: 0,
        collaborationsCompleted: 0,
        totalEarningsINR: 0,
        ratingAverage: 0,
        reviewCount: 0,
        repeatClientPercent: 0,
      },
      reputation: {
        score: 0,
        qualitySignal: 0,
        craftExcellence: 0,
        reliability: 0,
        completedCollaborations: 0,
        responseRatePercent: 0,
        communityContributions: 0,
        endorsementsCount: 0,
      },
      achievements: [],
      followersCount: 0,
      followingCount: 0,
      creationsCount: 0,
      collaborationsCount: 0,
      website: portfolioLink,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      aiAssistanceConsent: false,
      aiTrainingConsent: false,
    };

    // Save to storage
    storageService.updateCurrentUser(updatedUser);
    const allCreators = storageService.getCreators();
    const existingIndex = allCreators.findIndex(c => c.id === updatedUser.id);
    if (existingIndex >= 0) {
      allCreators[existingIndex] = updatedUser;
    } else {
      allCreators.unshift(updatedUser);
    }
    localStorage.setItem('kv_creators_v1', JSON.stringify(allCreators));

    setTimeout(() => {
      onComplete(updatedUser);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col justify-between p-3 sm:p-6 lg:p-8 font-sans">
      
      {/* Top Header */}
      <div className="max-w-3xl w-full mx-auto flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-sm">KalaaVerse</span>
            <span className="text-[9px] uppercase font-bold text-slate-400 font-mono block">Creator Profile Setup</span>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Wizard Box */}
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10 my-4 flex-1 flex flex-col">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          {[
            { num: 1, title: 'Identity & Photo' },
            { num: 2, title: 'Discipline & Skills' },
            { num: 3, title: 'Bio & Rates' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : step > s.num
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === s.num ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
            {errorMsg}
          </div>
        )}

        {/* ══════════════ STEP 1: IDENTITY & PHOTO PROOF ══════════════ */}
        {step === 1 && (
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Your Profile Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                These details are stored on this device and used to build your creator profile. There is no identity verification in this build.
              </p>
            </div>

            {/* Photo Avatar & Photo Proof Upload Area */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/70 via-slate-50 to-indigo-50/70 border border-purple-100 space-y-4">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-purple-600" />
                <span>Profile Photo</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Avatar Preview */}
                <div className="relative group shrink-0">
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-300 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold"
                  >
                    <Upload className="w-4 h-4 mb-0.5" />
                    <span>Change</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload a Profile Photo</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Your photo is used as your profile avatar and never leaves this device. No identity verification is performed in this build.
                  </p>
                </div>
              </div>

              {/* Curated creative portraits selector */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                  Or pick a stock portrait:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {DEFAULT_AVATARS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Avatar ${i}`}
                      onClick={() => setAvatarPreview(url)}
                      className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        avatarPreview === url ? 'border-purple-600 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Stage / Artist Name (Public Handle)</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sings / Sen Visuals"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">City & State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad, Telangana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Primary Indian Language</label>
                <select
                  value={primaryLanguage}
                  onChange={(e) => setPrimaryLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Malayalam">മലയാളം (Malayalam)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                  <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Years of Artistic Practice</label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600"
                >
                  <option value="">Not specified</option>
                  <option value="0">Less than a year</option>
                  <option value="1">1 Year (Emerging Creator)</option>
                  <option value="2">2 Years (Developing Voice)</option>
                  <option value="3">3 Years (Experienced Practitioner)</option>
                  <option value="5">5+ Years (Professional Artist)</option>
                  <option value="8">8+ Years (Master Artisan / Senior Creator)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleStep1Next}
                className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>Continue to Craft & Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2: CRAFT & DISCIPLINES ══════════════ */}
        {step === 2 && (
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Creative Discipline & Talents
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Select your creative field and specializations to describe your practice. Your profile
                stays on this device and is not publicly listed in this build.
              </p>
            </div>

            {/* Domains Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TALENT_DOMAINS.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedDomain(d.id);
                    setSelectedTalents([d.talents[0]?.id || 'concept_artist']);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedDomain === d.id
                      ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-2xs'
                      : 'border-slate-200 hover:border-purple-200 text-slate-700 bg-white'
                  }`}
                >
                  <div className="text-xs">{d.name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{d.talents.length} disciplines</div>
                </button>
              ))}
            </div>

            {/* Sub-Talents */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Specific Specializations</label>
              <div className="flex flex-wrap gap-1.5">
                {(TALENT_DOMAINS.find(d => d.id === selectedDomain)?.talents || []).map(t => {
                  const isSelected = selectedTalents.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleToggleTalent(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Key Craft Skills & Software</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200"
                  >
                    <span>{s}</span>
                    <X className="w-3 h-3 cursor-pointer hover:text-purple-900" onClick={() => handleRemoveSkill(s)} />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom skill (e.g. Logic Pro, Storyboarding, Kathak)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Portfolio or Social Link (Optional)</label>
              <input
                type="url"
                placeholder="https://instagram.com/yourhandle or behance.net/you"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleStep2Next}
                className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>Continue to Bio & Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3: BIO & RATES ══════════════ */}
        {step === 3 && (
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Your Bio & Project Rates
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Start from a plain text template and edit it in your own words. This is a writing template, not an AI model.
              </p>
            </div>

            {/* Bio template helper */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50 border border-purple-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Bio Template Helper</span>
                </div>

                {/* Tone picker */}
                <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white border border-slate-200 text-[10px]">
                  {[
                    { id: 'cinematic', label: '🌟 Cinematic' },
                    { id: 'professional', label: '💼 Professional' },
                    { id: 'cultural', label: '🪷 Cultural' },
                  ].map(tone => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => { setBioTone(tone.id as any); }}
                      className={`px-2 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        bioTone === tone.id ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 hover:text-purple-600'
                      }`}
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Click below to insert a starting template, then rewrite it in your own words..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 leading-relaxed font-sans"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleInsertBioTemplate}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-200" />
                  <span>Insert Bio Template</span>
                </button>
              </div>
            </div>

            {/* Rates Setting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Estimated Hourly Rate (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Starting Project Commission (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={projectRate}
                    onChange={(e) => setProjectRate(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-purple-600 font-mono"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Rates are optional notes for your local profile. No payments, contracts or invoices are
              processed in this build.
            </p>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 cursor-pointer transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Create My Profile</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Mandatory CREZORA.CO Bottom Attribution */}
      <div className="max-w-3xl w-full mx-auto text-center py-4 border-t border-slate-200/60 mt-auto text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          This application and platform belongs to <a href="https://crezora.co" target="_blank" rel="noreferrer" className="text-purple-700 font-bold hover:underline">CREZORA.CO</a>
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          © 2026 CREZORA.CO. All Rights Reserved. • Where Imagination Meets Opportunity • Made with ❤️ in India
        </p>
      </div>

    </div>
  );
};
