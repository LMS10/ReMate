'use client';

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
      className={`flex h-[22px] w-[46px] items-center justify-center gap-[6px] rounded-[16px] text-xs leading-[18px] font-medium ${styles[status]} md:text-md md:h-[26px] md:w-[57px]`}
    >
      <span className={`h-[4px] w-[4px] rounded-full md:h-[6px] md:w-[6px] ${dotColors[status]}`} />
      {label}
    </span>
  );
}
