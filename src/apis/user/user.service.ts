import { ApiError } from '@/utils/apiError';
import type {
  UpdateNameRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UserProfile,
} from './user.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const updateName = async (
  body: UpdateNameRequest,
  accessToken: string,
): Promise<UserProfile> => {
  const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError('이름 변경 실패.', res.status);

  const json = (await res.json()) as { data: UserProfile };
  return json.data;
};

export const updateProfileImage = async (
  body: UpdateProfileImageRequest,
  accessToken: string,
): Promise<UserProfile> => {
  const res = await fetch(`${BASE_URL}/api/v1/users/me/profile-image`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError('프로필 이미지 변경 실패.', res.status);

  const json = (await res.json()) as { data: UserProfile };
  return json.data;
};

export const updatePassword = async (
  body: UpdatePasswordRequest,
  accessToken: string,
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/v1/users/me/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError('비밀번호 변경 실패.', res.status);
};
