'use client';

import { cn } from '../utils/cn';

interface StatusChipProps {
  status: string;
}

const statusMap: Record<string, { label: string; style: string; dotColor: string }> = {
  ANALYZING: {
    label: '대기',
    style: 'bg-status-wait-bg text-status-wait-text',
    dotColor: 'bg-status-wait-text',
  },
  NEED_MANUAL: {
    label: '대기',
    style: 'bg-status-wait-bg text-status-wait-text',
    dotColor: 'bg-status-wait-text',
  },
  WAITING: {
    label: '대기',
    style: 'bg-status-wait-bg text-status-wait-text',
    dotColor: 'bg-status-wait-text',
  },
  APPROVED: {
    label: '승인',
    style: 'bg-status-approval-bg text-status-approval-text',
    dotColor: 'bg-status-approval-text',
  },
  REJECTED: {
    label: '반려',
    style: 'bg-status-return-bg text-status-return-text',
    dotColor: 'bg-status-return-text',
  },
};

export default function StatusChip({ status }: StatusChipProps) {
  const chipInfo = statusMap[status];

  if (!chipInfo) return null;

  return (
    <span
      className={cn(
        'text-md flex h-6.5 w-14.25 items-center justify-center gap-1.5 rounded-2xl leading-4.5 font-medium',
        chipInfo.style,
      )}
    >
      <span className={cn('h-1 w-1 rounded-full md:h-1.5 md:w-1.5', chipInfo.dotColor)} />
      {chipInfo.label}
    </span>
  );
}
