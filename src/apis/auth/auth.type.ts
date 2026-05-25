export interface MeResponse {
  success: boolean;
  data: {
    id: number;
    email: string;
    name: string;
    picture: string | null;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}
