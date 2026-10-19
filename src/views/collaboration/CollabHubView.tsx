import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { CollabRequest, CollabApplication } from '../../types/collaboration';

interface CollabHubViewProps {
  onOpenWorkroom: (workroomId: string) => void;
  onNavigateProfile: (creatorId: string) => void;
}

export const CollabHubView: React.FC<CollabHubViewProps> = ({
  onOpenWorkroom,
  onNavigateProfile,
}) => {
  const [collabs, setCollabs] = useState<CollabRequest[]>(() => storageService.getCollabRequests());
  const [selectedCollab, setSelectedCollab] = useState<CollabRequest | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Application form state
  const [roleApplied, setRoleApplied] = useState('');
  const [pitch, setPitch] = useState('');

  // Create call form state
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newComp, setNewComp] = useState<'paid' | 'revenue_share' | 'collaborative_credit'>('paid');

  const handleOpenApply = (collab: CollabRequest) => {
    setSelectedCollab(collab);
    setRoleApplied(collab.requiredRoles[0]?.roleTitle || 'Collaborator');
    setShowApplyModal(true);
  };

  const handleSendApplication = () => {
    if (!selectedCollab) return;
    const currentUser = storageService.getCurrentUser();
    const app: CollabApplication = {
      id: `app_${Date.now()}`,
      requestId: selectedCollab.id,
      applicantId: currentUser.id,
      applicantName: currentUser.displayName,
      applicantAvatar: currentUser.avatarUrl,
      applicantTalent: currentUser.talents[0]?.talentId || 'Creator',
      roleApplied,
      pitch: pitch || 'Excited to bring my craft and collaborate on this vision.',
      portfolioLinks: [currentUser.website || 'https://kalaaverse.com/@' + currentUser.username],
      status: 'pending',
      appliedAt: 'Just now',
    };
    storageService.applyToCollab(app);
    setShowApplyModal(false);
    setPitch('');
    setCollabs(storageService.getCollabRequests());
  };

  const handleCreateCollab = () => {
    const currentUser = storageService.getCurrentUser();
    const newReq: CollabRequest = {
      id: `collab_${Date.now()}`,
      creatorId: currentUser.id,
      creatorName: currentUser.displayName,
      creatorAvatar: currentUser.avatarUrl,
      creatorTalent: currentUser.talents[0]?.talentId || 'Creator',
      projectTitle: newTitle || 'Untitled Creative Collaboration',
      tagline: newTagline || 'Looking for passionate creators to build together.',
      description: newDesc || 'Project overview and scope.',
      requiredRoles: [
        {
          roleTitle: newRoleTitle || 'Co-Creator',
          talentDomain: 'visual_art',
          talentName: 'Artist / Designer',
          skillsRequired: ['Creative Vision'],
          slotsCount: 1,
          filledCount: 0,
          description: 'Collaborate on initial concept and production.',
        },
      ],
      compensationType: newComp,
      budgetNote: newComp === 'paid' ? 'Competitive project grant' : 'Co-ownership and revenue split',
      locationType: 'remote',
      expectedDuration: '4 weeks',
      deadline: '2026-04-30',
      tags: ['collaborative project'],
      references: [],
      applicantsCount: 0,
      status: 'open',
      createdAt: 'Just now',
    };
    storageService.createCollabRequest(newReq);
    setCollabs(storageService.getCollabRequests());
    setShowCreateModal(false);
    setNewTitle('');
    setNewTagline('');
    setNewDesc('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
            Ecosystem Co-Creation
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Collaboration Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Find creative partners, assemble multidisciplinary teams, and enter dedicated Project Workrooms.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Collaboration Call</span>
        </button>
      </div>

      {/* Collaborations Grid */}
      <div className="space-y-6">
        {collabs.map(collab => (
          <div
            key={collab.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 transition-all space-y-6 shadow-sm hover:shadow-md"
          >
            {/* Top Creator Info & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div 
                onClick={() => onNavigateProfile(collab.creatorId)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <img
                  src={collab.creatorAvatar}
                  alt={collab.creatorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-100 group-hover:border-purple-600 transition-colors"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {collab.creatorName}
                  </h4>
                  <p className="text-xs text-purple-700 font-mono font-semibold">{collab.creatorTalent}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold uppercase ${
                  collab.compensationType === 'paid'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  {collab.compensationType.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {collab.applicantsCount} applicants
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{collab.projectTitle}</h2>
              <p className="text-xs sm:text-sm text-purple-700 font-semibold mt-1">{collab.tagline}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                {collab.description}
              </p>
            </div>

            {/* Required Roles Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                Roles Required for Team:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {collab.requiredRoles.map((role, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{role.roleTitle}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-purple-700 font-semibold border border-purple-200">
                        {role.filledCount}/{role.slotsCount} filled
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{role.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {role.skillsRequired.map(skill => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="capitalize">{collab.locationType}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{collab.expectedDuration}</span>
                </span>
                <span className="text-slate-400">Due: {collab.deadline}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenWorkroom('room_indie_short_01')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Preview Workroom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenApply(collab)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply for Role</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Apply to Collab */}
      {showApplyModal && selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase font-bold tracking-widest text-purple-700 font-mono mb-1">
              Apply to Collaborate
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {selectedCollab.projectTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Pitch your craft and portfolio directly to {selectedCollab.creatorName}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role
                </label>
                <select
                  value={roleApplied}
                  onChange={e => setRoleApplied(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:border-purple-600 outline-none"
                >
                  {selectedCollab.requiredRoles.map((r, i) => (
                    <option key={i} value={r.roleTitle}>
                      {r.roleTitle} ({r.skillsRequired.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Pitch & Creative Alignment
                </label>
                <textarea
                  rows={4}
                  value={pitch}
                  onChange={e => setPitch(e.target.value)}
                  placeholder="Explain why this project excites you and how your specific background adds value..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs text-slate-800 leading-relaxed outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendApplication}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Collab Call */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase font-bold tracking-widest text-purple-700 font-mono mb-1">
              New Collaboration
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Post Collaboration Call
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Recruit co-creators and launch a shared Project Workroom.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neo-Carnatic Electronic EP"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline / Core Hook
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blending veena ragas with ambient analog synthesis"
                  value={newTagline}
                  onChange={e => setNewTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Scope & Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your vision, timeline, and what you aim to release together..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role You are Seeking
                </label>
                <input
                  type="text"
                  placeholder="e.g. Veena Soloist / Sound Designer"
                  value={newRoleTitle}
                  onChange={e => setNewRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Compensation Model
                </label>
                <select
                  value={newComp}
                  onChange={e => setNewComp(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-purple-600"
                >
                  <option value="paid">Paid Project Grant / Milestone Pay</option>
                  <option value="revenue_share">Co-ownership & 50/50 Revenue Split</option>
                  <option value="collaborative_credit">Equal Creative Credit & Showcase</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCollab}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20"
                >
                  Publish Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
