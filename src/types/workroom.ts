export interface WorkroomMember {
  userId: string;
  name: string;
  avatarUrl: string;
  talent: string;
  projectRole: string;
  isLead: boolean;
  joinedAt: string;
}

export type TaskStatus = 'backlog' | 'in_progress' | 'in_review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface WorkroomTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate: string;
  tags: string[];
}

export interface WorkroomFile {
  id: string;
  name: string;
  sizeBytes: number;
  uploadedBy: string;
  uploaderName: string;
  fileType: 'image' | 'video' | 'audio' | 'pdf' | 'document' | 'archive';
  fileUrl: string;
  version: string;
  uploadedAt: string;
}

export interface WorkroomMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  sentAt: string;
  attachments?: string[];
  isSystemEvent?: boolean;
}

export interface WorkroomMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  deliverablesExpected: string;
}

export interface WorkroomFeedback {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  itemRef: string; // e.g. "Scene 3 Draft", "Poster Colorway B"
  comment: string;
  status: 'open' | 'addressed';
  createdAt: string;
}

export interface WorkroomDeliverable {
  id: string;
  title: string;
  submittedBy: string;
  fileUrl: string;
  description: string;
  versionTag: string;
  approved: boolean;
  approvedBy?: string;
  submittedAt: string;
}

export interface WorkroomActivity {
  id: string;
  actorName: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface ProjectWorkroom {
  id: string;
  projectId: string;
  title: string;
  tagline: string;
  description: string;
  goal: string;
  status: 'active' | 'review' | 'wrapped';
  progressPercent: number;
  leadCreatorId: string;
  leadCreatorName: string;
  members: WorkroomMember[];
  tasks: WorkroomTask[];
  files: WorkroomFile[];
  messages: WorkroomMessage[];
  milestones: WorkroomMilestone[];
  feedbacks: WorkroomFeedback[];
  deliverables: WorkroomDeliverable[];
  activities: WorkroomActivity[];
}
