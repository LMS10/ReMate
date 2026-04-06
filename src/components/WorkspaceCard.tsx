'use client';

import { cn } from '@/utils/cn';
import Icon from './Icon';
import OneColorChip from './OneColorChip';

interface WorkspaceCardProps {
  name: string;
  color: string;
  role: 'ADMIN' | 'MEMBER';
}

export default function WorkspaceCard({ name, color, role }: WorkspaceCardProps) {
  return (
    <div
      className={cn(
        'flex h-14.5 cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-5 md:h-17 lg:h-17.5',
      )}
    >
      <div
        className={cn(
          'text-black-200 text-md flex items-center gap-3 font-semibold md:text-lg lg:gap-4',
        )}
      >
        <OneColorChip color={color} selected={false} variant='sidebar' />
        <div className={cn('flex items-center gap-1.5 md:gap-2 lg:gap-3')}>
          {name}
          {role === 'ADMIN' && <Icon name='crown' size={16} className='md:w-4.5 lg:w-5' />}
        </div>
      </div>
      <div>
        <Icon name='arrowRight' size={18} />
      </div>
    </div>
  );
}
