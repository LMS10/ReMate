import {
  ReceiptDetailResponse,
  ReceiptListParams,
  ReceiptListResponse,
  ReceiptStatsResponse,
  ReceiptUploadResponse,
} from './receipt.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const receiptService = {
  uploadReceipt: async (
    file: File,
    workspaceId: number,
    accessToken: string,
  ): Promise<ReceiptUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/api/v1/receipts/upload?workspaceId=${workspaceId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error('영수증 업로드에 실패했습니다.');
    return res.json();
  },
  getReceiptDetail: async (
    receiptId: number,
    workspaceId: number,
    accessToken: string,
  ): Promise<ReceiptDetailResponse> => {
    const res = await fetch(`${API_URL}/api/v1/receipts/${receiptId}?workspaceId=${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 404) throw new Error('영수증을 찾을 수 없습니다.');
    if (!res.ok) throw new Error('영수증 조회에 실패했습니다.');
    return res.json();
  },

  getReceiptStats: async (
    workspaceId: number,
    accessToken: string,
  ): Promise<ReceiptStatsResponse> => {
    const res = await fetch(`${API_URL}/api/v1/receipts/stats?workspaceId=${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error('통계 조회에 실패했습니다.');
    return res.json();
  },

  getReceiptList: async (
    params: ReceiptListParams,
    accessToken: string,
  ): Promise<ReceiptListResponse> => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    const res = await fetch(`${API_URL}/api/v1/receipts?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error('영수증 목록 조회에 실패했습니다.');
    return res.json();
  },

  exportReceipts: async (workspaceId: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${API_URL}/api/v1/receipts/export?workspaceId=${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 403) {
      throw new Error('다운로드 권한이 없습니다.');
    }

    if (!res.ok) {
      throw new Error('영수증 다운로드에 실패했습니다.');
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = 'receipt_export.xlsx';

    document.body.appendChild(link);

    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  },

  updateStatus: async (
    id: number,
    workspaceId: number,
    status: 'APPROVED' | 'REJECTED',
    accessToken: string,
    reason?: string,
  ) => {
    const updateParams = new URLSearchParams({ workspaceId: String(workspaceId), status });

    if (reason) {
      updateParams.append('reason', reason);
    }

    const res = await fetch(`${API_URL}/api/v1/receipts/${id}/status?${updateParams}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('상태 변경에 실패했습니다.');
    return res.json();
  },
};
