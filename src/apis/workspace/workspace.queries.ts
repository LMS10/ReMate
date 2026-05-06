import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { workspaceService } from './workspace.service';
import { InviteWorkspaceRequest } from './workspace.type';

export const workspaceKeys = {
  all: ['workspaces'] as const,
  my: ['workspaces', 'my'] as const,
  detail: (workspaceId: number) => ['workspaces', workspaceId] as const,
};

export const useGetMyWorkspaces = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: workspaceKeys.my,
    queryFn: () => workspaceService.getMyWorkspaces(accessToken!),
    enabled: !!accessToken,
  });
};

export const useGetWorkspace = (workspaceId: number) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: workspaceKeys.detail(workspaceId),
    queryFn: () => workspaceService.getWorkspace(workspaceId, accessToken!),
    enabled: !!accessToken && !!workspaceId,
  });
};

export const useInviteWorkspace = (workspaceId: number) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: InviteWorkspaceRequest) =>
      workspaceService.inviteWorkspace(workspaceId, body, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(workspaceId) });
    },
  });
};
