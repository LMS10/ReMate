import { cn } from '@/utils/cn';

interface StatCardProps {
  name: string;
  total: number;
}

export default function StatCard({ name, total }: StatCardProps) {
  return (
    <div
      className={cn(
        'text-black-200 flex h-11 items-center justify-between rounded-md border border-gray-300 px-3.5 py-3.25 font-medium md:h-13 md:p-3.5 lg:h-22 lg:flex-col lg:items-start lg:gap-1',
      )}
    >
      <div className={cn('text-md h-6 md:h-6.5 md:text-lg')}>{name}</div>
      <div className={cn('flex h-8 items-baseline gap-1.5')}>
        <span className={cn('text-xl font-bold md:text-2xl')}>{total}</span>
        <p className={cn('text-md md:text-lg')}>건</p>
      </div>
    </div>
  );
}
