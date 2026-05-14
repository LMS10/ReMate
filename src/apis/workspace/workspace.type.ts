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

export interface CreateWorkspaceRequest {
  name: string;
  color: string;
}

export interface CreateWorkspaceResponse {
  success: boolean;
  data: number;
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface InvitationItem {
  color: string;
  membershipId: number;
  role: WorkspaceRole;
  workspaceId: number;
  workspaceName: string;
}

export interface InvitationListResponse {
  success: boolean;
  totalCount: number;
  nextCursor: number | null;
  data: InvitationItem[];
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface AcceptRejectInvitationResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface AdminNameResponse {
  success: boolean;
  data: {
    adminName: string;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export type WorkspaceMemberStatus = 'ACCEPTED' | 'PENDING';

export interface WorkspaceMember {
  userId: number;
  name: string;
  email: string;
  picture: string | null;
  role: 'ADMIN' | 'MEMBER';
}

export interface WorkspaceMembersResponse {
  success: boolean;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  data: WorkspaceMember[];
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface UpdateWorkspaceSettingsRequest {
  name: string;
  color: string;
}

export interface UpdateWorkspaceSettingsResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface DeleteWorkspaceMemberResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface DeleteWorkspaceResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: string;
    traceId: string;
  };
}
