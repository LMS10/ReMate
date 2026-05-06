'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon';

export default function SidebarHeader() {
  return (
    <div>
      <div className='flex flex-col items-center gap-10 py-5 md:hidden'>
        <Link href='/workspace'>
          <Image src='/logo_sm.svg' alt='Re:Mate logo' width={20} height={26} priority />
        </Link>

        <Icon name='addBox' size={20} className='cursor-pointer text-gray-500' />
      </div>

      <div className='hidden flex-col gap-14 px-3.25 pt-5 pb-4 md:flex lg:px-6'>
        <div className='self-start'>
          <Link href='/workspace'>
            <Image src='/logo_lg.svg' alt='Re:Mate logo' width={117.35} height={26} priority />
          </Link>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold text-gray-500'>Workspaces</span>

          <Icon name='addBox' size={20} className='cursor-pointer text-gray-500' />
        </div>
      </div>
    </div>
  );
}
