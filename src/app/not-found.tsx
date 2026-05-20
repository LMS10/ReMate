'use client';

import { useRouter } from 'next/navigation';
import ErrorFallback from '@/components/ErrorFallback';

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorFallback
      statusCode={404}
      title='페이지를 찾을 수 없어요'
      description={`요청하신 페이지가 존재하지 않아요.`}
      primaryAction={{
        label: '홈으로 돌아가기',
        onClick: () => router.push('/'),
      }}
      secondaryAction={{
        label: '이전 페이지',
        onClick: () => router.back(),
      }}
    />
  );
}
