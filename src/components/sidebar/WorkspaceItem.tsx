import Link from 'next/link';
import type { WorkspaceItem } from '@/apis/workspace/workspace.type';
import OneColorChip from '@/components/OneColorChip';
import { cn } from '@/utils/cn';
import Icon from '../Icon';

interface Props {
  workspace: WorkspaceItem;
  isSelected?: boolean;
}

export default function WorkspaceItem({ workspace, isSelected }: Props) {
  return (
    <li>
      <Link
        href={`/workspace/${workspace.workspaceId}`}
        className={cn(
          'flex items-center justify-center rounded-sm p-4 md:justify-start md:p-2 md:px-3 lg:p-2.5',
          'cursor-pointer hover:bg-blue-100',
          isSelected && 'bg-blue-100',
        )}
      >
        <OneColorChip color={workspace.color} selected={false} variant='sidebar' />

        <span
          className='lg:text-2lg hidden flex-1 truncate text-lg font-medium text-gray-500 group-hover:block md:ml-4 md:block'
          title={workspace.workspaceName}
        >
          {workspace.workspaceName}
        </span>

        {workspace.role === 'ADMIN' && (
          <span className='hidden group-hover:block md:block'>
            <Icon name='crown' className='md:w-5 lg:w-6' />
          </span>
        )}
      </Link>
    </li>
  );
}
