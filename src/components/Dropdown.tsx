import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import { truncateText } from '@/utils/truncateText';
import Icon from './Icon';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
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

  const optionList = () => (
    <ul
      className={cn(
        'dropdownScrollbar text-black-200 absolute mt-0.75 box-border truncate rounded-md border border-gray-300 bg-white px-0.75 md:mt-1 md:px-1',
        options.length > 4 ? 'max-h-36.25 overflow-y-auto md:max-h-45.5' : 'h-auto',
        variant === 'profile' ? 'left-1/2 w-23.5 -translate-x-1/2 md:w-27.5' : 'left-0 w-full',
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <li
            key={opt}
            onClick={() => {
              onSelect(opt);
              setOpen!(false);
            }}
            className={cn(
              'mt-0.75 box-border flex cursor-pointer items-center justify-center truncate rounded-md text-sm leading-6.5 last:mb-0.75 md:mt-1 md:text-lg md:last:mb-1',
              isSelected ? 'bg-blue-100 text-blue-200' : 'hover:bg-blue-100 hover:text-blue-200',
              variant === 'profile' ? 'h-10.5 md:h-12' : 'h-8 md:h-10',
            )}
          >
            <span title={opt} className={cn(variant === 'profile' ? '' : 'md:truncate')}>
              {variant === 'profile' ? opt : truncateText(opt, isMd ? 5 : 4)}
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={cn('relative inline-block')}>
      {variant === 'profile' ? null : variant === 'status' ? (
        <div
          className={cn(
            'flex h-8 cursor-pointer items-center justify-between gap-3.25 rounded-md border border-gray-300 px-2 text-sm leading-6.5 text-gray-400 md:h-10 md:gap-3.5 md:px-4 md:text-lg',
            classname,
          )}
          onClick={() => setOpen!(!open)}
        >
          <span className={cn('w-5.75 truncate md:w-7')}>
            {truncateText(value || placeholder || '', isMd ? 5 : 4)}
          </span>
          <Icon
            name='arrowDown'
            size={16}
            className={cn('text-black-200 shrink-0 md:h-6.5 md:w-6.5')}
          />
        </div>
      ) : (
        <div
          className={cn(
            'flex h-8 cursor-pointer items-center justify-between gap-1.5 rounded-md border border-gray-300 px-2 text-sm leading-6.5 text-gray-400 md:h-10 md:gap-0 md:px-4 md:text-lg',
            classname,
          )}
          onClick={() => setOpen!(!open)}
        >
          <span className={cn('w-8.5 truncate md:w-10.5')}>
            {truncateText(value || placeholder || '', isMd ? 5 : 4)}
          </span>
          <Icon
            name='arrowDown'
            size={16}
            className={cn('text-black-200 shrink-0 md:h-6.5 md:w-6.5')}
          />
        </div>
      )}
      {open && optionList()}
    </div>
  );
}
