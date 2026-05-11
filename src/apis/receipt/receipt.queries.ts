import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { receiptService } from './receipt.service';

export const receiptKeys = {
  all: ['receipts'] as const,
  upload: ['receipts', 'upload'] as const,
  detail: (receiptId: number) => ['receipts', receiptId] as const,
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
