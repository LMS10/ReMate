import { mockWorkspaces } from '@/mocks/workspaces';
import SidebarView from './SidebarView';

export default function Sidebar() {
  const { totalCount, data } = mockWorkspaces;

  return <SidebarView workspaces={data} totalCount={totalCount} />;
}
