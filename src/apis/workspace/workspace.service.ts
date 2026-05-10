import {
  WorkspaceListResponse,
  WorkspaceDetailResponse,
  InviteWorkspaceRequest,
  InviteWorkspaceResponse,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  InvitationListResponse,
  AcceptRejectInvitationResponse,
  AdminNameResponse,
} from './workspace.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const workspaceService = {
  getMyWorkspaces: async (accessToken: string): Promise<WorkspaceListResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/my`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('워크스페이스 목록 조회 실패');
    return res.json();
  },

  getWorkspace: async (
    workspaceId: number,
    accessToken: string,
  ): Promise<WorkspaceDetailResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/${workspaceId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 404) throw new Error('워크스페이스를 찾을 수 없습니다.');
    if (!res.ok) throw new Error('워크스페이스 조회 실패');
    return res.json();
  },

  createWorkspace: async (
    body: CreateWorkspaceRequest,
    accessToken: string,
  ): Promise<CreateWorkspaceResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('워크스페이스 생성 실패');
    return res.json();
  },

  inviteWorkspace: async (
    workspaceId: number,
    body: InviteWorkspaceRequest,
    accessToken: string,
  ): Promise<InviteWorkspaceResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/${workspaceId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 404) throw new Error('워크스페이스를 찾을 수 없습니다.');
    if (res.status === 409) throw new Error('이미 참여 중인 워크스페이스입니다.');
    if (!res.ok) throw new Error('초대에 실패했습니다. 이메일을 확인해 주세요.');
    return res.json();
  },

  getInvitations: async (accessToken: string): Promise<InvitationListResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/invitations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('초대 목록 조회 실패');
    return res.json();
  },

  acceptInvitation: async (
    membershipId: number,
    accessToken: string,
  ): Promise<AcceptRejectInvitationResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/invitations/${membershipId}/accept`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('초대 수락 실패');
    return res.json();
  },

  rejectInvitation: async (
    membershipId: number,
    accessToken: string,
  ): Promise<AcceptRejectInvitationResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/invitations/${membershipId}/reject`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('초대 거절 실패');
    return res.json();
  },

  getAdminName: async (workspaceId: number, accessToken: string): Promise<AdminNameResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/${workspaceId}/admin-name`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('어드민 이름 조회 실패');
    return res.json();
  },
};
