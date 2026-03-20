import { Workspace } from '@/types/workspace';

export interface GetMyWorkspaces {
  success: boolean;
  totalCount: number;
  nextCursor: number;
  data: Workspace[];
}

export const mockWorkspaces: GetMyWorkspaces = {
  success: true,
  totalCount: 5,
  nextCursor: 0,
  data: [
    {
      workspaceId: 1,
      workspaceName: '경영관리팀',
      color: 'bg-chip-green',
      role: 'ADMIN',
      membershipId: 101,
    },
    {
      workspaceId: 2,
      workspaceName: '맛집투어',
      color: 'bg-chip-purple',
      role: 'ADMIN',
      membershipId: 102,
    },
    {
      workspaceId: 3,
      workspaceName: '야구직관모임',
      color: 'bg-chip-orange',
      role: 'MEMBER',
      membershipId: 103,
    },
    {
      workspaceId: 4,
      workspaceName: '학생회',
      color: 'bg-chip-blue',
      role: 'MEMBER',
      membershipId: 104,
    },
    {
      workspaceId: 5,
      workspaceName: '조기축구',
      color: 'bg-chip-pink',
      role: 'MEMBER',
      membershipId: 105,
    },
  ],
};
