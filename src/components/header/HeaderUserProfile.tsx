'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';

interface HeaderUserProfileProps {
  name: string;
  picture: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const PROFILE_OPTIONS = ['마이페이지', '로그아웃'];

export default function HeaderUserProfile({ name, picture }: HeaderUserProfileProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const imageUrl = picture
    ? picture.startsWith('http')
      ? picture
      : `${BASE_URL}${picture}`
    : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (value: string) => {
    setOpen(false);
    if (value === '마이페이지') {
      router.push('/mypage');
    } else if (value === '로그아웃') {
      await signOut({ callbackUrl: '/login' });
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative flex cursor-pointer items-center gap-1.5 md:gap-2'
      onClick={() => setOpen((prev) => !prev)}
    >
      {imageUrl ? (
        <div className='relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-300 md:h-8 md:w-8'>
          <Image src={imageUrl} alt={name} fill className='object-cover' />
        </div>
      ) : (
        <Icon name='profile' size={28} className='md:h-8 md:w-8' />
      )}

      <span className='text-black-200 hidden w-20 truncate text-lg font-medium md:block md:text-base'>
        {name}
      </span>

      {open && (
        <div className='absolute top-4 left-1/2 -translate-x-7 md:top-5 md:-translate-x-1.5'>
          <Dropdown
            variant='profile'
            options={PROFILE_OPTIONS}
            onSelect={handleSelect}
            open={open}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
}
