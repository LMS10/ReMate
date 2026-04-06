'use client';

import { cn } from '../utils/cn';
import Icon from './Icon';

interface OneColorChipProps {
  color: string;
  selected?: boolean;
  onSelect?: () => void;
  variant: 'modal' | 'sidebar';
}

const colors: Record<string, string> = {
  GREEN: 'bg-chip-green',
  PURPLE: 'bg-chip-purple',
  ORANGE: 'bg-chip-orange',
  BLUE: 'bg-chip-blue',
  PINK: 'bg-chip-pink',
};

export default function OneColorChip({ color, selected, onSelect, variant }: OneColorChipProps) {
  const bgColor = colors[color];

  return (
    <button
      role='radio'
      onClick={variant === 'modal' ? onSelect : undefined}
      aria-checked={selected}
      className={cn(
        'relative rounded-full',
        bgColor,
        variant === 'modal' && 'h-7.5 w-7.5 cursor-pointer',
        variant === 'sidebar' && 'h-2 w-2 cursor-default',
      )}
    >
      {selected && variant === 'modal' && (
        <Icon name='check' size={24} className='absolute inset-0 m-auto text-white' />
      )}
    </button>
  );
}
