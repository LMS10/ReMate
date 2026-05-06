export interface MeResponse {
  success: boolean;
  data: {
    email: string;
    name: string;
    picture: string | null;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}
