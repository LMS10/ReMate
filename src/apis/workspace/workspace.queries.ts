import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { workspaceService } from './workspace.service';
import { CreateWorkspaceRequest, InviteWorkspaceRequest } from './workspace.type';

export const workspaceKeys = {
  all: ['workspaces'] as const,
  my: ['workspaces', 'my'] as const,
  detail: (workspaceId: number) => ['workspaces', workspaceId] as const,
  invitations: ['workspaces', 'invitations'] as const,
  adminName: (workspaceId: number) => ['workspaces', workspaceId, 'admin-name'] as const,
};

export const useGetMyWorkspaces = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: workspaceKeys.my,
    queryFn: () => workspaceService.getMyWorkspaces(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
};

export const useGetInvitations = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: workspaceKeys.invitations,
    queryFn: () => workspaceService.getInvitations(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
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

export const useGetAdminName = (workspaceId: number) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: workspaceKeys.adminName(workspaceId),
    queryFn: () => workspaceService.getAdminName(workspaceId, accessToken!),
    enabled: !!accessToken && !!workspaceId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateWorkspace = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateWorkspaceRequest) =>
      workspaceService.createWorkspace(body, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.my });
    },
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

export const useAcceptInvitation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (membershipId: number) =>
      workspaceService.acceptInvitation(membershipId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.my });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.invitations });
    },
  });
};

export const useRejectInvitation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (membershipId: number) =>
      workspaceService.rejectInvitation(membershipId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.invitations });
    },
  });
};
