'use client';

import { cn } from '../utils/cn';

interface StatusChipProps {
  status: 'approval' | 'wait' | 'return';
  label: string;
}

export default function StatusChip({ status, label }: StatusChipProps) {
  const styles = {
    approval: 'bg-status-approval-bg text-status-approval-text',
    wait: 'bg-status-wait-bg text-status-wait-text',
    return: 'bg-status-return-bg text-status-return-text',
  };

  const dotColors = {
    approval: 'bg-status-approval-text',
    wait: 'bg-status-wait-text',
    return: 'bg-status-return-text',
  };

  return (
    <span
      className={cn(
        'md:text-md flex h-5.5 w-11.5 items-center justify-center gap-1.5 rounded-2xl text-xs leading-4.5 font-medium md:h-6.5 md:w-14.25',
        styles[status],
      )}
    >
      <span className={cn('h-1 w-1 rounded-full md:h-1.5 md:w-1.5', dotColors[status])} />
      {label}
    </span>
  );
}
