export type ReceiptStatus = 'ANALYZING' | 'NEED_MANUAL' | 'WAITING' | 'APPROVED' | 'REJECTED';

export interface ReceiptTag {
  id: number;
  name: string;
}

export interface ReceiptItem {
  id: number;
  receiptId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface ReceiptUploadResponse {
  success: boolean;
  data: {
    id: number;
    status: ReceiptStatus;
    systemErrorCode: string | null;
    storeName: string;
    tradeAt: string;
    totalAmount: number;
    nightTime: boolean;
    rejectionReason: string | null;
    approvedAt: string | null;
    tax: number;
    confidence: number;
    fileAssetId: number;
    tags: ReceiptTag[];
    createdAt: string;
    duplicate: boolean;
    inappropriateReasons: string[];
    discountAmount: number;
    aiReason: string;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export interface ReceiptDetailResponse {
  success: boolean;
  data: {
    id: number;
    storeName: string;
    totalAmount: number;
    tax: number;
    tradeAt: string;
    approvedAt: string | null;
    status: ReceiptStatus;
    rejectionReason: string | null;
    userName: string;
    userId: number;
    filePath: string;
    tags: ReceiptTag[];
    items: ReceiptItem[];
    nightTime: boolean;
    inappropriateReasons: string[];
    discountAmount: number;
    aiReason: string;
    category: string;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}
