'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ErrorFallback from '@/components/ErrorFallback';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('[Error Page]', error);
  }, [error]);

  return (
    <ErrorFallback
      title='일시적인 오류가 발생했어요'
      description={`서비스를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.`}
      primaryAction={{
        label: '다시 시도하기',
        onClick: reset,
      }}
      secondaryAction={{
        label: '홈으로 돌아가기',
        onClick: () => router.push('/'),
      }}
    />
  );
}
