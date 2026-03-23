import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import Icon from './Icon';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
  variant?: 'default' | 'profile';
  name?: string;
  profileImg?: string;
}

export default function Dropdown({
  options,
  onSelect,
  placeholder,
  value,
  variant = 'default',
  name,
  profileImg,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const optionList = () => (
    <ul
      className={cn(
        'dropdownScrollbar text-black-200 absolute mt-0.75 w-full min-w-18 truncate rounded-md border border-gray-300 px-1 py-1 md:min-w-25',
        options.length > 4 ? 'max-h-32 overflow-y-auto md:max-h-48' : 'h-auto',
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <li
            key={opt}
            onClick={() => {
              onSelect(opt);
              setOpen(false);
            }}
            className={cn(
              'flex h-8 w-full cursor-pointer items-center justify-center truncate rounded-md px-4 py-2 text-sm leading-6.5 md:h-12 md:text-lg',
              isSelected ? 'bg-blue-100 text-blue-200' : 'hover:bg-blue-100 hover:text-blue-200',
            )}
          >
            {opt}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={cn('relative inline-block')}>
      {variant === 'profile' ? (
        <div
          className={cn('flex cursor-pointer items-center justify-between gap-1.5 leading-6.5')}
          onClick={() => setOpen(!open)}
        >
          {profileImg ? (
            <Image
              src={profileImg}
              alt='profile'
              width={28}
              height={28}
              className={cn('md:h-6 md:w-6 lg:h-8 lg:w-8')}
            />
          ) : (
            <Icon name='profile' size={28} className={cn('md:h-6 md:w-6 lg:h-8 lg:w-8')} />
          )}
          <span className={cn('text-black-200 hidden font-medium md:block md:text-lg')}>
            {name}
          </span>
        </div>
      ) : (
        <div
          className={cn(
            'flex h-6.5 max-w-25 min-w-18 cursor-pointer items-center gap-1.5 truncate rounded-md border border-gray-300 px-2 text-sm leading-6.5 text-gray-400 md:h-10 md:gap-0 md:px-4 md:text-lg',
          )}
          onClick={() => setOpen(!open)}
        >
          <span>{value || placeholder}</span>
          <Icon name='arrowDown' size={16} className={cn('text-black-200 md:h-6.5 md:w-6.5')} />
        </div>
      )}
      {open && optionList()}
    </div>
  );
}
