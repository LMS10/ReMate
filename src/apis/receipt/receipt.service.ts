import { ReceiptDetailResponse, ReceiptUploadResponse } from './receipt.type';

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
};
