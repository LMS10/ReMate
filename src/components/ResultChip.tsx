import { cn } from '@/utils/cn';

interface ResultChipProps {
  result: 'proper' | 'offhours' | 'entertainment' | 'split';
}

export default function ResultChip({ result }: ResultChipProps) {
  const label = {
    proper: 'AI 분석 결과 적절',
    offhours: '심야/공휴일 결제',
    entertainment: '유흥업소 의심',
    split: '분할 결제 의심',
  };

  const styles = {
    proper: 'border-status-approval-text text-status-approval-text',
    offhours: 'border-status-return-text text-status-return-text',
    entertainment: 'border-status-return-text text-status-return-text',
    split: 'border-status-return-text text-status-return-text',
  };

  return (
    <span
      className={cn(
        'text-md inline-flex h-6.5 items-center rounded-2xl border bg-inherit px-2.5 py-1',
        styles[result],
      )}
    >
      {label[result]}
    </span>
  );
}
