export type WorkspaceRole = 'ADMIN' | 'MEMBER';

export interface Workspace {
  workspaceId: number;
  workspaceName: string;
  color: string;
  role: WorkspaceRole;
  membershipId: number;
}
