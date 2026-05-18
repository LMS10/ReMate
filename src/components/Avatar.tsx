'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';

interface AvatarProps {
  name: string;
  picture: string | null;
  member?: boolean;
  className?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Avatar({ name, picture, member = false, className }: AvatarProps) {
  const imageUrl = picture
    ? picture.startsWith('http')
      ? picture
      : `${BASE_URL}${picture}`
    : null;

  const initial = name.charAt(0);

  const sizeClass = member ? 'h-8.5 w-8.5 md:h-9.5 md:w-9.5' : 'h-7.5 w-7.5';
  const textClass = member ? 'text-sm md:text-base' : 'text-xs';

  return (
    <div className={cn('flex max-w-42.5 items-center gap-2', className)}>
      {imageUrl ? (
        <div
          className={cn(
            'relative shrink-0 overflow-hidden rounded-full',
            member ? 'h-8.5 w-8.5 md:h-9.5 md:w-9.5' : 'h-7.5 w-7.5',
          )}
        >
          <Image
            src={imageUrl}
            alt={name}
            sizes={member ? '100px' : '80px'}
            fill
            className='object-cover'
          />
        </div>
      ) : (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-200',
            sizeClass,
            textClass,
          )}
        >
          {initial}
        </div>
      )}
      <div className={cn(member ? 'text-md md:text-lg' : 'text-md')}>{name}</div>
    </div>
  );
}
