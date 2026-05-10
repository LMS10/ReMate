'use client';

import { cn } from '../utils/cn';
import OneColorChip from './OneColorChip';

const COLORS = ['GREEN', 'PURPLE', 'ORANGE', 'BLUE', 'PINK'] as const;
export type ChipColor = (typeof COLORS)[number];

interface ColorChipsProps {
  selected?: string;
  onSelect?: (color: string) => void;
}

export default function ColorChips({ selected, onSelect }: ColorChipsProps) {
  return (
    <div role='radiogroup' className={cn('flex gap-2')}>
      {COLORS.map((color) => (
        <OneColorChip
          key={color}
          color={color}
          selected={selected === color}
          onSelect={() => onSelect?.(color)}
          variant='modal'
        />
      ))}
    </div>
  );
}
