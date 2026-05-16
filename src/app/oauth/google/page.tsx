'use client';

import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { socialLoginApi } from '@/lib/auth-api';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const savedState = sessionStorage.getItem('oauth_state');

    if (!code || !state || state !== savedState) {
      router.replace('/login');
      return;
    }

    sessionStorage.removeItem('oauth_state');

    (async () => {
      try {
        const res = await socialLoginApi('google', {
          state,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
          token: code,
        });

        const { accessToken, user } = res.data;

        const result = await signIn('social', {
          accessToken,
          userId: String(user.id),
          email: user.email,
          name: user.nickname,
          picture: user.image ?? '',
          redirect: false,
        });

        if (result?.error) {
          router.replace('/login');
          return;
        }

        router.replace('/workspace');
      } catch {
        router.replace('/login');
      }
    })();
  }, [searchParams, router]);

  return (
    <div className='flex min-h-dvh items-center justify-center bg-gray-100'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <div className='relative'>
          <div className='relative z-10 flex aspect-square w-20 items-center justify-center rounded-full bg-white shadow-md'>
            <Icon name='google' className='h-10 w-10' />
          </div>
          <span className='absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-blue-100 opacity-75' />
        </div>
        <p className='text-center text-gray-400'>Google 로그인 중</p>
      </div>
    </div>
  );
}
