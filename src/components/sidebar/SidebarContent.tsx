import { Workspace } from '@/types/workspace';
import WorkspaceList from './WorkspaceList';

interface Props {
  state: 'all' | 'empty' | 'selected';
  workspaces: Workspace[];
  selectedWorkspaceId?: number;
}

export default function SidebarContent({ state, workspaces, selectedWorkspaceId }: Props) {
  if (state === 'empty') return null;

  return (
    <div className='flex-1 overflow-y-auto p-3.25 pt-0 lg:p-6 lg:pt-0'>
      <WorkspaceList workspaces={workspaces} selectedWorkspaceId={selectedWorkspaceId} />
    </div>
  );
}
