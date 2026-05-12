import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { uploadFile } from './file.service';
import type { UploadFileRequest } from './file.type';

export const useUploadFileMutation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? '';

  return useMutation({
    mutationFn: (req: UploadFileRequest) => uploadFile(req, accessToken),
  });
};
