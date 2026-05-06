'use client';

import { useParams } from 'next/navigation';
import { WorkspaceItem } from '@/apis/workspace/workspace.type';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';

export type SidebarState = 'all' | 'empty' | 'selected';

interface SidebarViewProps {
  workspaces: WorkspaceItem[];
  totalCount: number;
  isLoading?: boolean;
}

export default function SidebarView({ workspaces, totalCount, isLoading }: SidebarViewProps) {
  const params = useParams();

  const selectedWorkspaceId = params?.workspaceId ? Number(params.workspaceId) : undefined;

  const state: SidebarState = totalCount === 0 ? 'empty' : selectedWorkspaceId ? 'selected' : 'all';

  return (
    <aside className='relative top-0 left-0 z-10 flex h-full w-16.75 flex-col border-r border-gray-300 transition-all duration-200 md:w-40 lg:w-75'>
      <SidebarHeader />
      <SidebarContent
        state={state}
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        isLoading={isLoading}
      />
    </aside>
  );
}
