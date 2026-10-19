import React, { useState } from 'react';
import { 
  FolderLock, 
  Users, 
  CheckSquare, 
  FileText, 
  MessageSquare, 
  Calendar, 
  MessageCircle, 
  CheckCircle2, 
  Activity,
  Plus,
  Send,
  Check,
  ShieldCheck,
  Download,
  Clock
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { ProjectWorkroom, WorkroomTask, TaskStatus } from '../../types/workroom';

interface WorkroomViewProps {
  onBack: () => void;
}

export const WorkroomView: React.FC<WorkroomViewProps> = ({ onBack }) => {
  const [workroom, setWorkroom] = useState<ProjectWorkroom>(() => storageService.getWorkroom());
  const [activeTab, setActiveTab] = useState<
    'overview' | 'people' | 'tasks' | 'files' | 'discussion' | 'milestones' | 'feedback' | 'deliverables' | 'activity'
  >('overview');

  const [newMessage, setNewMessage] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updated = storageService.sendWorkroomMessage(newMessage.trim());
    setWorkroom(updated);
    setNewMessage('');
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    const task: WorkroomTask = {
      id: `tsk_${Date.now()}`,
      title: newTaskTitle.trim(),
      description: '',
      status: 'in_progress',
      priority: newTaskPriority,
      assigneeName: storageService.getCurrentUser().displayName,
      dueDate: '',
      tags: [],
    };
    const updated = storageService.addWorkroomTask(task);
    setWorkroom(updated);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const handleToggleTaskStatus = (taskId: string, currentStatus: TaskStatus) => {
    const nextStatus: TaskStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
    const updated = storageService.updateWorkroomTask(taskId, { status: nextStatus });
    setWorkroom(updated);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Workroom Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono">
              {workroom.projectId ? 'Active Project Workroom' : 'No Active Project'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {workroom.leadCreatorName ? `Lead: ${workroom.leadCreatorName}` : 'No lead assigned'}
            </span>
          </div>

          <button
            onClick={onBack}
            className="text-xs text-purple-600 hover:text-purple-800 self-start sm:self-auto font-semibold flex items-center gap-1 cursor-pointer"
          >
            ← Back to Collaborations
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{workroom.title}</h1>
          <p className="text-xs sm:text-sm text-purple-700 font-semibold mt-0.5">{workroom.tagline}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-2 max-w-xl">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 font-medium">Milestone Progress:</span>
            <span className="text-emerald-600 font-bold">
              {workroom.milestones.length === 0
                ? 'No milestones defined'
                : `${workroom.progressPercent}% complete`}
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-purple-50 border border-purple-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${workroom.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dedicated Operational Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-purple-100 text-xs">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'tasks', label: `Tasks (${workroom.tasks.length})`, icon: CheckSquare },
          { id: 'people', label: `Team (${workroom.members.length})`, icon: Users },
          { id: 'files', label: `Assets (${workroom.files.length})`, icon: FolderLock },
          { id: 'discussion', label: `Chat (${workroom.messages.length})`, icon: MessageSquare },
          { id: 'milestones', label: `Milestones (${workroom.milestones.length})`, icon: Calendar },
          { id: 'feedback', label: `Feedback (${workroom.feedbacks.length})`, icon: MessageCircle },
          { id: 'deliverables', label: `Deliverables (${workroom.deliverables.length})`, icon: CheckCircle2 },
          { id: 'activity', label: `Audit Trail (${workroom.activities.length})`, icon: Activity },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all text-xs font-semibold cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 border border-purple-100/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Project Brief & Creative Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {workroom.description || 'No project brief yet. This workroom is empty until a real project is started.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Immediate Deliverable Objectives</h3>
              {workroom.goal ? (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{workroom.goal}</p>
              ) : (
                <p className="text-xs text-slate-500 leading-relaxed">
                  No objective set. Objectives appear here once a real project is active in this
                  workroom — nothing is pre-filled.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <h3 className="text-xs uppercase font-bold text-purple-700 tracking-wider font-mono">
                  About this workroom
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                This workroom stores its tasks, files, notes and milestones in your browser only.
                There is no server, so nothing is synced, shared or backed up, and no ownership,
                escrow or rights agreement is created or enforced here.
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-50 text-purple-700 font-semibold">
                  Local device only
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Tasks (Kanban) */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Task Board</h3>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Quick Add Task Input */}
          {showAddTask && (
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="What needs to be accomplished?..."
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
              />
              <select
                value={newTaskPriority}
                onChange={e => setNewTaskPriority(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Block</option>
              </select>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 cursor-pointer"
              >
                Create
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['backlog', 'in_progress', 'completed'] as TaskStatus[]).map(status => {
              const statusTasks = workroom.tasks.filter(t => t.status === status);
              const statusTitle = status === 'backlog' ? 'Backlog / To Do' : status === 'in_progress' ? 'In Progress' : 'Completed';
              return (
                <div key={status} className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900">
                      {statusTitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {statusTasks.map(task => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/80 hover:border-purple-300 transition-all space-y-2 cursor-pointer"
                        onClick={() => handleToggleTaskStatus(task.id, task.status)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-xs font-bold leading-snug ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {task.title}
                          </h4>
                          {task.status === 'completed' && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{task.description}</p>
                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                          <span>{task.assigneeName || 'Unassigned'}</span>
                          <span className={`capitalize font-semibold ${task.priority === 'urgent' ? 'text-rose-600' : 'text-purple-600'}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                    {statusTasks.length === 0 && (
                      <p className="text-center py-6 text-xs text-slate-400 font-mono">No tasks here</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Discussions & Chat */}
      {activeTab === 'discussion' && (
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Workroom Discussion</h3>
              <p className="text-xs text-slate-500">Notes and feedback saved on this device only — nothing is sent to anyone</p>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-purple-50 px-2.5 py-1 rounded-full text-purple-700 font-semibold">
              Stored on this device
            </span>
          </div>

          {/* Chat message bubbles */}
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {workroom.messages.map(msg => (
              <div key={msg.id} className="flex items-start gap-3 text-xs">
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-purple-100"
                />
                <div className="flex-1 bg-purple-50/50 border border-purple-100 rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{msg.sentAt}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {workroom.messages.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400 font-mono">No notes yet. Anything you add is stored on this device.</p>
            )}
          </div>

          {/* Chat input box */}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Type team note or feedback..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-600"
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: People / Team */}
      {activeTab === 'people' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workroom.members.map(member => (
            <div key={member.userId} className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm text-center space-y-3">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-purple-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-purple-700 font-semibold">{member.projectRole}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold capitalize">
                    {member.talent}
                  </span>
                  {member.isLead && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">
                      Team Lead
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {workroom.members.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400 font-mono text-xs">
              No team members yet. Members appear here once a real project team exists.
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Files */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workroom.files.map(f => (
            <div key={f.id} className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{f.name}</h4>
                  <span className="text-[10px] text-purple-700 font-semibold font-mono bg-purple-50 px-2 py-0.5 rounded shrink-0">
                    v{f.version}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  {(f.sizeBytes / 1048576).toFixed(1)} MB • {f.fileType.toUpperCase()}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Uploaded by: {f.uploaderName}</p>
              </div>
              <button
                disabled
                title="File storage and delivery are not available in this build."
                className="text-xs text-slate-400 font-semibold flex items-center gap-1 cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download unavailable</span>
              </button>
            </div>
          ))}
          {workroom.files.length === 0 && (
            <div className="col-span-3 text-center py-12 text-slate-400 font-mono text-xs">
              No files or assets uploaded yet.
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Milestones */}
      {activeTab === 'milestones' && (
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Project Timeline Milestones</h3>
          <div className="space-y-3">
            {workroom.milestones.map(m => (
              <div key={m.id} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{m.title}</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">{m.deliverablesExpected}</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-purple-700 font-bold flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.dueDate}</span>
                  </div>
                  <span className={`text-[10px] font-semibold capitalize ${m.completed ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {m.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
            {workroom.milestones.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400 font-mono">No milestones defined yet.</p>
            )}
          </div>
        </div>
      )}
      {activeTab === 'feedback' && (
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Review Feedback & Critique Pins</h3>
          <div className="space-y-3">
            {workroom.feedbacks.map(fb => (
              <div key={fb.id} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={fb.authorAvatar} alt={fb.authorName} className="w-6 h-6 rounded-full" />
                    <span className="font-bold text-slate-900">{fb.authorName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">• on {fb.itemRef}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${fb.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {fb.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 pl-8">{fb.comment}</p>
              </div>
            ))}
            {workroom.feedbacks.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400 font-mono">No critique pins submitted yet.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Deliverables */}
      {activeTab === 'deliverables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workroom.deliverables.map(deliv => (
            <div key={deliv.id} className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{deliv.title}</h4>
                  <p className="text-xs text-purple-700 font-semibold font-mono mt-0.5">Tag: {deliv.versionTag}</p>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold ${deliv.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {deliv.approved ? 'Approved' : 'Pending Review'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{deliv.description}</p>
              <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-purple-50 flex justify-between">
                <span>Submitted by: {deliv.submittedBy}</span>
                <span>{deliv.submittedAt}</span>
              </div>
            </div>
          ))}
          {workroom.deliverables.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-400 font-mono text-xs">
              No deliverables submitted yet.
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Audit Trail / Activity */}
      {activeTab === 'activity' && (
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Workroom Activity & Audit Trail</h3>
          <div className="space-y-3">
            {workroom.activities.map(act => (
              <div key={act.id} className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>
                    <strong className="text-slate-900">{act.actorName}</strong>{' '}
                    <span className="text-slate-500">{act.action}</span>{' '}
                    <span className="font-semibold text-purple-700 font-mono">"{act.target}"</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{act.timestamp}</span>
              </div>
            ))}
            {workroom.activities.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400 font-mono">No activity recorded yet.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
