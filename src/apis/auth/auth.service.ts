import { MeResponse } from './auth.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  getMe: async (accessToken: string): Promise<MeResponse> => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error('내 정보 조회 실패');
    return res.json();
  },
};
