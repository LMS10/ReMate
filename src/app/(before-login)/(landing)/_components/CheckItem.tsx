import Icon from '@/components/Icon';
import type { CheckItemProps } from './types';

export default function CheckItem({ children }: CheckItemProps) {
  return (
    <li className='flex items-center gap-2.5 text-[14px] text-[#475569]'>
      <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[#DBEAFE] text-[#2563EB]'>
        <Icon name='check' />
      </span>
      {children}
    </li>
  );
}
