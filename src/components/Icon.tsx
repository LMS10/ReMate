import { SVGProps } from 'react';
import { cn } from '@/utils/cn';
import { iconPaths } from './Icon.paths';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  name: keyof typeof iconPaths;
}

export default function Icon({ size = 24, name, className, ...props }: IconProps) {
  const path = iconPaths[name];

  if (!path) {
    console.warn(`${name} 아이콘이 존재하지 않습니다.`);
    return null;
  }

  const svgClassName = cn('aspect-square', className);

  return (
    <svg
      width={size}
      height={size}
      fill='currentColor'
      viewBox='0 0 24 24'
      className={svgClassName}
      {...props}
    >
      {path}
    </svg>
  );
}
