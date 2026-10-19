import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  CheckCircle2,
  X,
  ArrowRight
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { ClientBrief } from '../../types/client';

/**
 * Opportunities view.
 *
 * There is no marketplace, no client accounts and no payments in this build.
 * Briefs created here are stored on this device only and are never delivered
 * to anyone. Proposal delivery is not implemented, so it is presented as an
 * honest unavailable state rather than a fake "sent" action.
 */
export const OpportunitiesView: React.FC = () => {
  const [briefs, setBriefs] = useState<ClientBrief[]>(() => storageService.getClientBriefs());
  const [selectedBrief, setSelectedBrief] = useState<ClientBrief | null>(null);
  const [showProposalInfo, setShowProposalInfo] = useState(false);
  const [showCreateBriefModal, setShowCreateBriefModal] = useState(false);

  // Create Brief form state
  const [briefTitle, setBriefTitle] = useState('');
  const [briefDesc, setBriefDesc] = useState('');
  const [briefCategory, setBriefCategory] = useState('visual_art');
  const [budgetMin, setBudgetMin] = useState(50000);
  const [budgetMax, setBudgetMax] = useState(80000);

  const handleOpenProposal = (brief: ClientBrief) => {
    setSelectedBrief(brief);
    setShowProposalInfo(true);
  };

  const handleCreateBrief = () => {
    const currentUser = storageService.getCurrentUser();
    const newBrief: ClientBrief = {
      id: `brief_${Date.now()}`,
      clientId: currentUser.id,
      clientName: currentUser.displayName || 'You',
      clientCompany: 'Local draft',
      clientAvatar: currentUser.avatarUrl,
      title: briefTitle.trim() || 'Untitled brief',
      projectDescription: briefDesc.trim() || 'No description added yet.',
      domainCategory: briefCategory,
      requiredTalents: [],
      requiredSkills: [],
      budgetMin,
      budgetMax,
      currency: 'INR (₹)',
      timeline: 'Not set',
      deadlineDate: '',
      locationType: 'remote',
      deliverablesList: [],
      referenceLinks: [],
      proposalsCount: 0,
      status: 'draft',
      createdAt: 'Just now',
    };
    storageService.createClientBrief(newBrief);
    setBriefs(storageService.getClientBriefs());
    setShowCreateBriefModal(false);
    setBriefTitle('');
    setBriefDesc('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-700 font-mono font-bold">
            Opportunities
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Client Briefs & Commissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A place to draft the commissions you want to run. Public briefs, paid contracts and
            proposal delivery are not available in this build.
          </p>
        </div>

        <button
          onClick={() => setShowCreateBriefModal(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Local Brief Draft</span>
        </button>
      </div>

      {/* Honesty note */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        Briefs below are saved in this browser only. Nobody else can see them, no proposals are
        delivered, and no payments are processed — there is no marketplace backend yet.
      </div>

      {/* Briefs Listing */}
      {briefs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-purple-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No briefs yet</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Nothing has been posted. Public briefs from real clients will appear here once a
            marketplace exists; for now you can only draft a brief for yourself.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {briefs.map(brief => (
            <div
              key={brief.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 transition-all space-y-6 shadow-sm hover:shadow-md"
            >
              {/* Client Top info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {brief.clientAvatar ? (
                    <img
                      src={brief.clientAvatar}
                      alt={brief.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-200" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{brief.clientCompany || brief.clientName}</h4>
                    <p className="text-xs text-slate-500 font-mono">Drafted by {brief.clientName} • {brief.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-slate-700 font-mono bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                    ₹{brief.budgetMin.toLocaleString()} – ₹{brief.budgetMax.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    Local draft
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{brief.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {brief.projectDescription}
                </p>
              </div>

              {/* Meta */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="capitalize">{brief.domainCategory.replace(/_/g, ' ')}</span>
                  <span>•</span>
                  <span className="capitalize">{brief.locationType.replace('_', ' ')}</span>
                </div>

                <button
                  onClick={() => handleOpenProposal(brief)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>About proposals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROPOSAL INFO MODAL */}
      {showProposalInfo && selectedBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp">
            <button
              onClick={() => setShowProposalInfo(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase font-bold tracking-widest text-purple-700 font-mono mb-1">
              Proposals unavailable
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {selectedBrief.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Proposal delivery is not implemented in this build. There is no client account, no
              message delivery and no payment or contract system, so a proposal written here could
              not reach anyone. This brief exists only on this device.
            </p>

            <button
              onClick={() => setShowProposalInfo(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CREATE BRIEF MODAL */}
      {showCreateBriefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateBriefModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase font-bold tracking-widest text-purple-700 font-mono mb-1">
              New Local Brief Draft
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Create a Local Brief
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              This is saved in your browser only. It is not published and no one is invited.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Concept art for a short film"
                  value={briefTitle}
                  onChange={e => setBriefTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Scope & Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what you need, style references, deliverables, and timeline..."
                  value={briefDesc}
                  onChange={e => setBriefDesc(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Min Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budgetMin}
                    onChange={e => setBudgetMin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Max Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budgetMax}
                    onChange={e => setBudgetMax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                A budget range here is just a note to yourself; no payment is ever processed.
              </p>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setShowCreateBriefModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBrief}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm"
                >
                  Save Draft Locally
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
