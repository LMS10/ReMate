import { WorkspaceItem } from '@/apis/workspace/workspace.type';
import WorkspaceItemComponent from './WorkspaceItem';

interface Props {
  workspaces: WorkspaceItem[];
  selectedWorkspaceId?: number;
}

export default function WorkspaceList({ workspaces, selectedWorkspaceId }: Props) {
  return (
    <ul className='flex flex-col gap-1.5 md:gap-0.5'>
      {workspaces.map((ws) => (
        <WorkspaceItemComponent
          key={ws.workspaceId}
          workspace={ws}
          isSelected={ws.workspaceId === selectedWorkspaceId}
        />
      ))}
    </ul>
  );
}
