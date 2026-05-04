import { AuthResponse, SigninRequest, SignupRequest } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function signupApi(body: SignupRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data: AuthResponse = await res.json();

  if (!res.ok || !data.success) {
    throw new ApiError(res.status, '회원가입에 실패했습니다.');
  }

  return data;
}

export async function signinApi(body: SigninRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/v1/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data: AuthResponse = await res.json();

  if (!res.ok || !data.success) {
    throw new ApiError(res.status, '이메일 혹은 비밀번호를 확인해주세요.');
  }

  return data;
}
