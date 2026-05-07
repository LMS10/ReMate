export type WorkspaceRole = 'ADMIN' | 'MEMBER';

export interface WorkspaceItem {
  color: string;
  membershipId: number;
  role: WorkspaceRole;
  workspaceId: number;
  workspaceName: string;
}

export interface WorkspaceListResponse {
  success: boolean;
  totalCount: number;
  nextCursor: number | null;
  data: WorkspaceItem[];
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface WorkspaceDetailResponse {
  success: boolean;
  data: {
    workspaceId: number;
    workspaceName: string;
    color: string;
    role: WorkspaceRole;
    membershipId: number;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface InviteWorkspaceRequest {
  email: string;
}

export interface InviteWorkspaceResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: string;
    traceId: string;
  };
}
