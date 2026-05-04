export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  accessToken: string;
  email: string;
  name: string;
  workspaceCount: number;
  lastWorkspaceId: number | null;
  userId: number;
}

export interface AuthResponse {
  success: boolean;
  data: AuthUser;
  meta: {
    timestamp: string;
    traceId: string;
  };
}
