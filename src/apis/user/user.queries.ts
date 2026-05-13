import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { updateName, updatePassword, updateProfileImage } from './user.service';
import type {
  UpdateNameRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
} from './user.type';

export const useUpdateNameMutation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? '';

  return useMutation({
    mutationFn: (req: UpdateNameRequest) => updateName(req, accessToken),
  });
};

export const useUpdateProfileImageMutation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? '';

  return useMutation({
    mutationFn: (req: UpdateProfileImageRequest) => updateProfileImage(req, accessToken),
  });
};

export const useUpdatePasswordMutation = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? '';

  return useMutation({
    mutationFn: (req: UpdatePasswordRequest) => updatePassword(req, accessToken),
  });
};
