import { ApiError } from '@/utils/apiError';
import type { UploadFileRequest, UploadFileResponse } from './file.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const uploadFile = async (
  { file, type, workspaceId }: UploadFileRequest,
  accessToken: string,
): Promise<UploadFileResponse> => {
  const params = new URLSearchParams({ type });
  if (workspaceId !== undefined) {
    params.append('workspaceId', String(workspaceId));
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/api/v1/files?${params.toString()}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new ApiError('파일 업로드 실패.', res.status);
  }

  const json = (await res.json()) as { data: UploadFileResponse };
  return json.data;
};
