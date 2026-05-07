import { WorkspaceItem } from '@/apis/workspace/workspace.type';
import SidebarSkeleton from './SidebarSkeleton';
import WorkspaceList from './WorkspaceList';

interface Props {
  state: 'all' | 'empty' | 'selected';
  workspaces: WorkspaceItem[];
  selectedWorkspaceId?: number;
  isLoading?: boolean;
}

export default function SidebarContent({
  state,
  workspaces,
  selectedWorkspaceId,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className='flex-1 overflow-y-auto p-3.25 pt-0 lg:p-6 lg:pt-0'>
        <SidebarSkeleton />
      </div>
    );
  }

  if (state === 'empty') return null;

  return (
    <div className='flex-1 overflow-y-auto p-3.25 pt-0 lg:p-6 lg:pt-0'>
      <WorkspaceList workspaces={workspaces} selectedWorkspaceId={selectedWorkspaceId} />
    </div>
  );
}
