import type { iconPaths } from '@/components/Icon.paths';

export interface CheckItemProps {
  children: React.ReactNode;
}

export interface BadgeProps {
  variant: 'green' | 'yellow' | 'red';
  children: React.ReactNode;
}

export interface ApRowProps {
  color: string;
  initial: string;
  name: string;
  store: string;
  amount: string;
}

export interface SidebarItem {
  color: string;
  label: string;
  hasCrown: boolean;
  active: boolean;
}

export interface WorkspaceCard {
  color: string;
  name: string;
  hasCrown?: boolean;
}

export interface Step {
  num: string;
  icon: keyof typeof iconPaths;
  title: string;
  desc: string;
}

export interface StatItem {
  label: string;
  val: string;
  color: string | undefined;
}

export interface TableRow {
  name: string;
  store: string;
  amount: string;
  badge: 'green' | 'yellow' | 'red';
  date: string;
}

export interface InvitedWorkspace {
  name: string;
  inviter: string;
}

export interface ReceiptField {
  label: string;
  val: string;
  avatar?: boolean;
  edit?: boolean;
}
