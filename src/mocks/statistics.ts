export interface GetWorkSpaceStatistics {
  success: boolean;
  data: {
    pendingCount: number;
    totalCount: number;
    rejectedCount: number;
    totalAmount: number;
    approvedCount: number;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

export const mockStatistics: GetWorkSpaceStatistics = {
  success: true,
  data: {
    pendingCount: 5,
    totalCount: 20,
    rejectedCount: 3,
    totalAmount: 150000,
    approvedCount: 12,
  },
  meta: {
    timestamp: '2024-06-09T12:34:56Z',
    traceId: 'abc123def456',
  },
};
