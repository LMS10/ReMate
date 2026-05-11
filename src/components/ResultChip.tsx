import { cn } from '@/utils/cn';

interface ResultChipProps {
  reasons: string[];
}

const reasonMap: Record<string, { label: string; style: string }> = {
  NIGHT_PAYMENT: {
    label: '심야/공휴일 결제',
    style: 'border-status-return-text text-status-return-text',
  },
  HOLIDAY_PAYMENT: {
    label: '심야/공휴일 결제',
    style: 'border-status-return-text text-status-return-text',
  },
  SUSPICIOUS_ENTERTAINMENT: {
    label: '유흥업소 의심',
    style: 'border-status-return-text text-status-return-text',
  },
  SPLIT_PAYMENT_SUSPICIOUS: {
    label: '분할 결제 의심',
    style: 'border-status-return-text text-status-return-text',
  },
};

export default function ResultChip({ reasons }: ResultChipProps) {
  if (reasons.length === 0) {
    return (
      <span
        className={cn(
          'text-md border-status-approval-text text-status-approval-text inline-flex h-6.5 items-center rounded-2xl border bg-inherit px-2.5 py-1',
        )}
      >
        AI 분석 결과 적절
      </span>
    );
  }

  return (
    <div>
      {reasons.map((reason) => {
        const chipLabel = reasonMap[reason];

        if (!chipLabel) return null;

        return (
          <span
            key={reason}
            className={cn(
              'border-status-return-text text-status-return-text text-md inline-flex h-6.5 items-center rounded-2xl border bg-inherit px-2.5 py-1',
              chipLabel.style,
            )}
          >
            {chipLabel.label}
          </span>
        );
      })}
    </div>
  );
}
