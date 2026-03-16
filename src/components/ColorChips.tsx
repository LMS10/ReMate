'use client';

import { useState } from 'react';
import { cn } from '../utils/cn';
import OneColorChip from './OneColorChip';

export default function ColorChips() {
  const [selected, setSelected] = useState<string | null>(null);
  const colors = [
    'bg-chip-green',
    'bg-chip-purple',
    'bg-chip-orange',
    'bg-chip-blue',
    'bg-chip-pink',
  ];

  return (
    <div role='radiogroup' className={cn('flex gap-2')}>
      {colors.map((color) => (
        <OneColorChip
          key={color}
          color={color}
          selected={selected === color}
          onSelect={() => setSelected(color)}
          variant='modal'
        />
      ))}
    </div>
  );
}
