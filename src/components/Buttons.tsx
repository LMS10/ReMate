import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Spinner from './Spinner';

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap
  transition-all duration-75
  cursor-pointer
  focus:outline-none
  focus:ring-2
  focus:ring-blue-300
  focus:ring-offset-1
  disabled:bg-gray-400
  disabled:text-white
  disabled:cursor-not-allowed
  disabled:pointer-events-none

  `,
  {
    variants: {
      group: {
        main: '',
        sub: '',
      },

      variant: {
        primary: '',
        secondary: '',
        blue: '',
        white: '',
      },

      size: {
        xl: '',
        lg: '',
        md: '',
        sm: '',
        xs: '',
      },
    },

    compoundVariants: [
      // MAIN SIZE
      {
        group: 'main',
        size: 'xl',
        className: 'h-12.5 text-lg font-semibold rounded-xl',
      },
      {
        group: 'main',
        size: 'lg',
        className: 'h-11.5 text-md font-semibold rounded-xl',
      },
      {
        group: 'main',
        size: 'md',
        className: 'h-8.5 text-md font-semibold rounded-lg',
      },
      {
        group: 'main',
        size: 'sm',
        className: 'h-8 text-sm font-semibold rounded-lg',
      },
      {
        group: 'main',
        size: 'xs',
        className: 'h-5 text-[10px] font-medium rounded-sm',
      },

      // MAIN VARIANT
      {
        group: 'main',
        variant: 'primary',
        className: 'bg-blue-200 text-white active:scale-[0.99]',
      },
      {
        group: 'main',
        variant: 'secondary',
        className: 'bg-blue-100 text-blue-200 active:scale-[0.99]',
      },

      // SUB SIZE
      {
        group: 'sub',
        size: 'lg',
        className: 'h-10 text-lg font-semibold rounded-md',
      },
      {
        group: 'sub',
        size: 'md',
        className: 'h-8 text-md font-medium rounded-md',
      },
      {
        group: 'sub',
        size: 'sm',
        className: 'h-6.5 text-xs font-medium rounded-md',
      },

      // SUB VARIANT
      {
        group: 'sub',
        variant: 'blue',
        className: 'bg-blue-200 text-white active:scale-[0.99]',
      },
      {
        group: 'sub',
        variant: 'white',
        className: 'bg-white border border-gray-300 text-blue-200 active:scale-[0.99]',
      },
    ],

    defaultVariants: {
      group: 'main',
      variant: 'primary',
      size: 'lg',
    },
  },
);

type MainButtonProps = {
  group?: 'main';
  variant?: 'primary' | 'secondary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};

type SubButtonProps = {
  group: 'sub';
  variant?: 'blue' | 'white';
  size?: 'lg' | 'md' | 'sm';
};

type ButtonVariantProps = MainButtonProps | SubButtonProps;

type ButtonProps = ButtonVariantProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    loading?: boolean;
  };

const spinnerSizeMap = {
  xl: 20,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

export default function Button({
  className,
  group = 'main',
  variant,
  size = 'lg',
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(buttonVariants({ group, variant, size }), className)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner size={spinnerSizeMap[size]} /> : children}
    </button>
  );
}
