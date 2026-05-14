'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';
import Icon from './Icon';

interface AvatarProps {
  name: string;
  picture: string | null;
  member?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Avatar({ name, picture, member = false }: AvatarProps) {
  const imageUrl = picture
    ? picture.startsWith('http')
      ? picture
      : `${BASE_URL}${picture}`
    : null;

  return (
    <div className={cn('flex max-w-42.5 items-center gap-2')}>
      {imageUrl ? (
        <div
          className={cn(
            'relative shrink-0 overflow-hidden rounded-full',
            member ? 'h-8.5 w-8.5 md:h-9.5 md:w-9.5' : 'h-7.5 w-7.5',
          )}
        >
          <Image src={imageUrl} alt={name} sizes='30px' fill className='object-cover' />
        </div>
      ) : (
        <Icon
          name='profile'
          className={cn(member ? 'h-8.5 w-8.5 md:h-9.5 md:w-9.5' : 'h-7.5 w-7.5')}
        />
      )}
      <div className={cn(member ? 'text-md md:text-lg' : 'text-md')}>{name}</div>
    </div>
  );
}
