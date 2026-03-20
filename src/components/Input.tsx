'use client';

import { forwardRef, useId, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Icon from './Icon';

type InputType = 'text' | 'email' | 'password' | 'search';

const inputVariants = cva(
  'text-black-200 w-full border outline-none focus:border-blue-200 md:text-lg',
  {
    variants: {
      variant: {
        default: 'text-md mt-2.5 mb-1.5 h-10.5 rounded-xl border-gray-300 px-5 md:h-12',
        search: 'h-6.5 rounded-md border-gray-300 px-6.5 text-[13px] leading-6 md:h-10 md:px-12',
      },
      hasError: {
        true: 'border-error focus:border-error',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasError: false,
    },
  },
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: InputType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', className, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const isSearch = type === 'search';

    const variant = isSearch ? 'search' : 'default';

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : isSearch ? 'text' : type;

    return (
      <div className='flex flex-col'>
        {label && (
          <label htmlFor={id} className='text-black-200 text-md font-medium md:text-lg'>
            {label}
          </label>
        )}

        <div className='relative'>
          {isSearch && (
            <Icon
              name='search'
              size={18}
              className='absolute top-1/2 left-1.5 -translate-y-1/2 md:left-4 md:h-6 md:w-6'
            />
          )}

          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              inputVariants({
                variant,
                hasError: Boolean(error),
              }),
              className,
            )}
            {...props}
          />

          {isPassword && (
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute top-1/2 right-4 -translate-y-1/2'
            >
              <Icon
                name={showPassword ? 'eyeOn' : 'eyeOff'}
                size={20}
                className='translate-y-px cursor-pointer text-gray-400'
              />
            </button>
          )}
        </div>

        {!isSearch && (
          <p className={cn('text-error min-h-4.5 text-[12px] leading-4.5', !error && 'invisible')}>
            {error || 'placeholder'}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
