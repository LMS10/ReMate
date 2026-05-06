'use client';

import { useGetMyWorkspaces } from '@/apis/workspace/workspace.queries';
import SidebarView from './SidebarView';

export default function Sidebar() {
  const { data, isLoading } = useGetMyWorkspaces();

  const workspaces = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  return <SidebarView workspaces={workspaces} totalCount={totalCount} isLoading={isLoading} />;
}
