import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import { truncateText } from '@/utils/truncateText';
import Icon from './Icon';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string | null;
  variant?: 'default' | 'profile' | 'status';
  open?: boolean;
  setOpen?: (open: boolean) => void;
  classname?: string;
}

export default function Dropdown({
  options,
  onSelect,
  placeholder,
  value,
  variant = 'default',
  open: outerOpen,
  setOpen: setOuterOpen,
  classname,
}: DropdownProps) {
  const [innerOpen, setInnerOpen] = useState(false);

  const open = variant === 'default' || variant === 'status' ? innerOpen : outerOpen;

  const setOpen = variant === 'default' || variant === 'status' ? setInnerOpen : setOuterOpen;

  const isMd = useMediaQuery('(min-width: 768px)');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  const displayText = value == null ? (placeholder ?? '') : truncateText(value, isMd ? 5 : 4);

  const optionList = () => (
    <div
      className={cn(
        'absolute top-full left-0 z-9999 mt-1 rounded-md border border-gray-300 bg-white',
        variant === 'profile' ? 'left-1/2 w-23.5 -translate-x-1/2 md:w-27.5' : 'w-full',
      )}
      style={{ overflow: 'clip' }}
    >
      <ul
        className={cn(
          'scrollbar-hide text-black-200 px-0.75 py-0.75 md:px-1 md:py-1',
          options.length > 4 ? 'max-h-36.25 overflow-y-auto md:max-h-45.5' : '',
        )}
      >
        {options.map((opt) => {
          const isSelected = value === opt;

          return (
            <li
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen?.(false);
              }}
              className={cn(
                'mb-0.75 flex cursor-pointer items-center justify-center truncate rounded-md text-sm leading-6.5 last:mb-0 md:mb-1 md:text-lg md:last:mb-0',
                isSelected ? 'bg-blue-100 text-blue-200' : 'hover:bg-blue-100 hover:text-blue-200',
                variant === 'profile' ? 'h-10.5 md:h-12' : 'h-6.5 md:h-10',
              )}
            >
              <span title={opt} className={cn(variant === 'profile' ? '' : 'md:truncate')}>
                {variant === 'profile' ? opt : truncateText(opt, isMd ? 5 : 4)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'relative overflow-visible',
        variant === 'default' && 'flex-1 md:flex-none',
        variant === 'status' && 'flex-1 md:flex-none',
      )}
    >
      {variant === 'profile' ? null : (
        <div
          className={cn(
            'flex h-6.5 w-full cursor-pointer items-center justify-between gap-1.5 rounded-md border border-gray-300 px-2 text-sm leading-6.5 md:h-10 md:gap-2 md:px-3 md:text-lg',
            value == null ? 'text-gray-400' : 'text-black-200',
            classname,
          )}
          onClick={() => setOpen?.(!open)}
        >
          <span className='min-w-0 flex-1 truncate'>{displayText}</span>

          <Icon name='arrowDown' size={16} className='text-black-200 shrink-0 md:h-5 md:w-5' />
        </div>
      )}

      {open && optionList()}
    </div>
  );
}
