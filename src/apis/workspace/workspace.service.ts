import {
  WorkspaceListResponse,
  WorkspaceDetailResponse,
  InviteWorkspaceRequest,
  InviteWorkspaceResponse,
} from './workspace.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const workspaceService = {
  getMyWorkspaces: async (accessToken: string): Promise<WorkspaceListResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error('워크스페이스 목록 조회 실패');
    return res.json();
  },

  getWorkspace: async (
    workspaceId: number,
    accessToken: string,
  ): Promise<WorkspaceDetailResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/workspaces/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 404) throw new Error('워크스페이스를 찾을 수 없습니다.');
    if (!res.ok) throw new Error('워크스페이스 조회 실패');
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
};
