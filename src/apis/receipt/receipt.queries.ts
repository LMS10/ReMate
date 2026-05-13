import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { receiptService } from './receipt.service';
import { ReceiptListParams } from './receipt.type';

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
