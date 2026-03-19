'use client';

import { useParams } from 'next/navigation';
import { Workspace } from '@/types/workspace';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';

export type SidebarState = 'all' | 'empty' | 'selected';

interface SidebarViewProps {
  workspaces: Workspace[];
  totalCount: number;
}

export default function SidebarView({ workspaces, totalCount }: SidebarViewProps) {
  const params = useParams();

  const selectedWorkspaceId = params?.workspaceId ? Number(params.workspaceId) : undefined;

  const state: SidebarState = totalCount === 0 ? 'empty' : selectedWorkspaceId ? 'selected' : 'all';

  return (
    <aside className='flex h-full w-16.75 flex-col border-r border-gray-300 transition-all duration-200 md:w-40 lg:w-75'>
      <SidebarHeader />

      <SidebarContent
        state={state}
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
      />
    </aside>
  );
}
