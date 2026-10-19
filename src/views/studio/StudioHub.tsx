import React, { useState } from 'react';
import { PenTool, Palette, Music, Camera, Activity } from 'lucide-react';
import { WritingStudio } from './WritingStudio';
import { ArtStudio } from './ArtStudio';
import { MusicStudio } from './MusicStudio';
import { PhotoStudio } from './PhotoStudio';
import { PracticeStudio } from './PracticeStudio';
import { WritingDraft } from '../../types/studio';
import { storageService } from '../../services/storageService';

interface StudioHubProps {
  initialStudio?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const StudioHub: React.FC<StudioHubProps> = ({
  initialStudio = 'writing',
  onNavigate,
}) => {
  const [currentStudio, setCurrentStudio] = useState<string>(initialStudio);

  const handlePublishWritingDraft = (draft: WritingDraft) => {
    storageService.addPortfolioItem({
      id: `port_${Date.now()}`,
      creatorId: storageService.getCurrentUser().id,
      creatorName: storageService.getCurrentUser().displayName,
      creatorAvatar: storageService.getCurrentUser().avatarUrl,
      creatorTalent: 'Writer',
      title: draft.title,
      slug: draft.title.toLowerCase().replace(/\s+/g, '-'),
      description: draft.synopsis || 'Published excerpt from KalaaVerse Writing Studio.',
      talentId: 'writer',
      domainId: 'writing_literature',
      mediaType: 'article',
      mediaUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
      contentText: draft.content,
      tags: draft.tags.length ? draft.tags : ['manuscript', 'original prose'],
      toolsUsed: ['KalaaVerse Writing Studio'],
      license: 'all_rights_reserved',
      allowRemix: false,
      allowDownload: true,
      featured: true,
      curatorPick: false,
      appreciationsCount: 1,
      viewsCount: 1,
      savesCount: 0,
      commentsCount: 0,
      createdAt: 'Just now',
    });

    storageService.addNotification({
      id: `notif_${Date.now()}`,
      category: 'achievement',
      title: 'Excerpt Published!',
      message: `"${draft.title}" was published to your Creator Portfolio and shared with the ecosystem.`,
      timestamp: 'Just now',
      read: false,
    });

    onNavigate('profile');
  };

  const handlePublishArtwork = (dataUrl: string, title: string) => {
    storageService.addPortfolioItem({
      id: `port_${Date.now()}`,
      creatorId: storageService.getCurrentUser().id,
      creatorName: storageService.getCurrentUser().displayName,
      creatorAvatar: storageService.getCurrentUser().avatarUrl,
      creatorTalent: 'Digital Artist',
      title: title || 'Original Digital Canvas Piece',
      slug: (title || 'artwork').toLowerCase().replace(/\s+/g, '-'),
      description: 'Original digital concept piece rendered in KalaaVerse Visual Art Studio.',
      talentId: 'digital_artist',
      domainId: 'visual_art',
      mediaType: 'image',
      mediaUrl: dataUrl,
      thumbnailUrl: dataUrl,
      tags: ['digital art', 'canvas', 'original'],
      toolsUsed: ['KalaaVerse Art Studio'],
      license: 'cc_by_nc',
      allowRemix: true,
      allowDownload: true,
      featured: true,
      curatorPick: false,
      appreciationsCount: 1,
      viewsCount: 1,
      savesCount: 0,
      commentsCount: 0,
      createdAt: 'Just now',
    });

    onNavigate('profile');
  };

  return (
    <div className="space-y-4">
      {/* Studio Navigation Tabs */}
      <div className="bg-white border-b border-purple-100 sticky top-16 z-30 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-3 overflow-x-auto">
          {[
            { id: 'writing', label: 'Writing Studio', icon: PenTool, color: 'text-amber-500' },
            { id: 'art', label: 'Visual Art Studio', icon: Palette, color: 'text-rose-500' },
            { id: 'music', label: 'Music Studio', icon: Music, color: 'text-indigo-500' },
            { id: 'photo', label: 'Photo Studio', icon: Camera, color: 'text-purple-500' },
            { id: 'practice', label: 'Practice Studio', icon: Activity, color: 'text-emerald-500' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentStudio === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentStudio(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Studio */}
      {currentStudio === 'writing' && (
        <WritingStudio onPublishToPortfolio={handlePublishWritingDraft} />
      )}

      {currentStudio === 'art' && (
        <ArtStudio onPublishToPortfolio={handlePublishArtwork} />
      )}

      {currentStudio === 'music' && (
        <MusicStudio />
      )}

      {currentStudio === 'photo' && (
        <PhotoStudio />
      )}

      {currentStudio === 'practice' && (
        <PracticeStudio />
      )}
    </div>
  );
};
