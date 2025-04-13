export interface User {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueOn?: string;
}

export interface Comment {
  id: string;
  author: User;
  createdAt: string;
  body: string;
  isMinimized?: boolean;
  isBot?: boolean;
  isEdited?: boolean;
  reactions?: {
    totalCount: number;
    viewerHasReacted: boolean;
    types: {
      type: string;
      count: number;
    }[];
  };
}

export interface TimelineEvent {
  id: string;
  type: 'comment' | 'commit' | 'review' | 'merge' | 'label' | 'assign' | 'deploy' | 'rename';
  actor?: User;
  createdAt: string;
  content?: any;
}

export interface Review {
  id: string;
  author: User;
  state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED' | 'DISMISSED' | 'PENDING';
  submittedAt: string;
  body?: string;
  reactions?: {
    totalCount: number;
    viewerHasReacted: boolean;
    types: {
      type: string;
      count: number;
    }[];
  };
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  state: 'OPEN' | 'CLOSED' | 'MERGED';
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
  closedAt?: string;
  author: User;
  baseRepository: {
    name: string;
    owner: {
      login: string;
    };
  };
  baseRefName: string;
  headRepository: {
    name: string;
    owner: {
      login: string;
    };
  };
  headRefName: string;
  labels: Label[];
  milestone?: Milestone;
  assignees: User[];
  reviewers: User[];
  comments: Comment[];
  timelineEvents: TimelineEvent[];
  reviews: Review[];
  additions: number;
  deletions: number;
  changedFiles: number;
}