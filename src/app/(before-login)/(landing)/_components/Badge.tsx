import type { BadgeProps } from './types';

const STYLES: Record<BadgeProps['variant'], string> = {
  green: 'bg-[#DCFCE7] text-[#15803D]',
  yellow: 'bg-[#FEF9C3] text-[#A16207]',
  red: 'bg-[#FEE2E2] text-[#B91C1C]',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium md:font-semibold ${STYLES[variant]}`}
    >
      <span className='h-0.75 w-0.75 rounded-full bg-current' />
      {children}
    </span>
  );
}
