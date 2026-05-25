import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { receiptService } from './receipt.service';
import { ExportSelectedReceiptsReq, ReceiptListParams, UpdateReceiptReq } from './receipt.type';

export const receiptKeys = {
  all: ['receipts'] as const,
  upload: ['receipts', 'upload'] as const,
  detail: (receiptId: number) => ['receipts', receiptId] as const,
  stats: (workspaceId: number) => ['receipts', 'stats', workspaceId] as const,
  list: (params: ReceiptListParams) => ['receipts', 'list', params] as const,
};

interface QueryOptions {
  enabled?: boolean;
}

export const useUploadReceipt = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useMutation({
    mutationFn: ({ file, workspaceId }: { file: File; workspaceId: number }) =>
      receiptService.uploadReceipt(file, workspaceId, accessToken!),
  });
};

export const useUpdateReceipt = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({
      id,
      workspaceId,
      body,
    }: {
      id: number;
      workspaceId: number;
      body: UpdateReceiptReq;
    }) => receiptService.updateReceipt(id, workspaceId, body, session?.accessToken ?? ''),
  });
};

export const useConfirmReceipt = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, workspaceId }: { id: number; workspaceId: number }) =>
      receiptService.confirmReceipt(id, workspaceId, session?.accessToken ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
    },
  });
};

export const useDeleteReceipt = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, workspaceId }: { id: number; workspaceId: number }) =>
      receiptService.deleteReceipt(id, workspaceId, session?.accessToken ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
    },
  });
};

export const useGetReceiptDetail = (
  receiptId: number,
  workspaceId: number,
  { enabled = true }: QueryOptions = {},
) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: receiptKeys.detail(receiptId),
    queryFn: () => receiptService.getReceiptDetail(receiptId, workspaceId, accessToken!),
    enabled: !!accessToken && !!receiptId && enabled,
  });
};

export const useGetReceiptStats = (workspaceId: number) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: receiptKeys.stats(workspaceId),
    queryFn: () => receiptService.getReceiptStats(workspaceId, accessToken!),
    enabled: !!accessToken && !!workspaceId,
    staleTime: 1000 * 60,
  });
};

export const useGetReceiptList = (params: ReceiptListParams) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: receiptKeys.list(params),
    queryFn: () => receiptService.getReceiptList(params, accessToken!),
    enabled: !!accessToken && !!params.workspaceId,
    placeholderData: keepPreviousData,
  });
};

export const useExportReceipts = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useMutation({
    mutationFn: (workspaceId: number) => receiptService.exportReceipts(workspaceId, accessToken!),
  });
};

export const useUpdateStatus = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      workspaceId,
      status,
      reason,
    }: {
      id: number;
      workspaceId: number;
      status: 'APPROVED' | 'REJECTED';
      reason?: string;
    }) => receiptService.updateStatus(id, workspaceId, status, session?.accessToken ?? '', reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
    },
  });
};

export const useExportSelectedReceipts = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useMutation({
    mutationFn: (data: ExportSelectedReceiptsReq) =>
      receiptService.exportSelectedReceipts(data, accessToken!),
  });
};

export const useGetReceiptFile = (fileAssetId: number | undefined) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: ['receiptFile', fileAssetId],
    queryFn: async () => {
      const url = await receiptService.getReceiptFile(fileAssetId!, accessToken!);
      return url;
    },
    enabled: !!accessToken && !!fileAssetId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
