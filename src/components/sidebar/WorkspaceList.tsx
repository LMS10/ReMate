import { Workspace } from '@/types/workspace';
import WorkspaceItem from './WorkspaceItem';

interface Props {
  workspaces: Workspace[];
  selectedWorkspaceId?: number;
}

export default function WorkspaceList({ workspaces, selectedWorkspaceId }: Props) {
  return (
    <ul className='flex flex-col gap-1.5 md:gap-0.5'>
      {workspaces.map((ws) => (
        <WorkspaceItem
          key={ws.workspaceId}
          workspace={ws}
          isSelected={ws.workspaceId === selectedWorkspaceId}
        />
      ))}
    </ul>
  );
}
