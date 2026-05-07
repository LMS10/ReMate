import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { authService } from './auth.service';

export const authKeys = {
  me: ['auth', 'me'] as const,
};

export const useGetMe = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => authService.getMe(accessToken!),
    enabled: !!accessToken,
  });
};
