'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useGetMe } from '@/apis/auth/auth.queries';
import { useGetWorkspace } from '@/apis/workspace/workspace.queries';
import Icon from '@/components/Icon';
import { useModalStore } from '@/store/modal.store';
import { cn } from '@/utils/cn';
import HeaderSkeleton from './HeaderSkeleton';
import HeaderUserProfile from './HeaderUserProfile';

function useWorkspaceId(): number | null {
  const params = useParams();
  const raw = params?.workspaceId;
  if (!raw) return null;
  const id = Number(Array.isArray(raw) ? raw[0] : raw);
  return isNaN(id) ? null : id;
}

function LandingHeader() {
  const { data: meData, isLoading } = useGetMe();
  const user = meData?.data;

  return (
    <div className='flex w-full items-center justify-between'>
      <Link href='/'>
        <Image
          src='/logo_sm.svg'
          alt='Re:Mate'
          width={20}
          height={26}
          priority
          className='block pt-1 md:hidden'
        />
        <Image
          src='/logo_lg.svg'
          alt='Re:Mate'
          width={117.35}
          height={26}
          priority
          className='hidden pt-1 md:block'
        />
      </Link>
      {isLoading ? (
        <HeaderSkeleton />
      ) : user ? (
        <HeaderUserProfile name={user.name} picture={user.picture} />
      ) : (
        <div className='text-md flex items-center gap-4 text-gray-500 md:gap-8 md:text-lg'>
          <Link href='/login' className='hover:text-black-200 transition-all duration-200'>
            로그인
          </Link>
          <Link href='/signup' className='hover:text-black-200 transition-all duration-200'>
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
}

function WorkspaceDetailHeader() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: wsData, isLoading: wsLoading } = useGetWorkspace(workspaceId ?? 0);
  const { data: meData, isLoading: meLoading } = useGetMe();
  const open = useModalStore((s) => s.open);

  const workspace = wsData?.data;
  const user = meData?.data;
  const isAdmin = workspace?.role === 'ADMIN';

  return (
    <div className='flex w-full items-center'>
      <div className='flex w-full min-w-0 items-center justify-between'>
        {wsLoading ? (
          <HeaderSkeleton />
        ) : (
          <>
            <div className='flex w-35 items-center gap-1.5 truncate md:w-50 md:gap-2 lg:w-75'>
              <button
                className='text-black-200 truncate text-lg font-bold md:text-xl'
                onClick={() => router.push(`/workspace/${workspaceId}`)}
              >
                {workspace?.workspaceName ?? ''}
              </button>
              {isAdmin && <Icon name='crown' size={20} className='flex-none md:h-6 md:w-6' />}
            </div>

            {isAdmin && (
              <div className='flex gap-1.5 md:gap-2'>
                <button
                  className='md:text-md flex shrink-0 cursor-pointer items-center gap-1 rounded border border-gray-300 px-1.5 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 md:pr-3 md:pl-2.5'
                  onClick={() => router.push(`/workspace/${workspaceId}/settings`)}
                >
                  <Icon name='settings' size={20} className='hidden md:block' />
                  <span>관리</span>
                </button>
                <button
                  className='md:text-md flex shrink-0 cursor-pointer items-center gap-1 rounded border border-gray-300 px-1.5 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 md:pr-3 md:pl-2.5'
                  onClick={() => open({ type: 'invite' })}
                >
                  <Icon name='addBox' size={20} className='hidden text-gray-500 md:block' />
                  <span>초대하기</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className='flex shrink-0 items-center'>
        <div className='mx-3 h-5.5 w-px bg-gray-300 md:mx-4 md:h-7' />
        {meLoading ? (
          <HeaderSkeleton />
        ) : (
          user && <HeaderUserProfile name={user.name} picture={user.picture} />
        )}
      </div>
    </div>
  );
}

function WorkspaceListHeader() {
  const { data: meData, isLoading } = useGetMe();
  const user = meData?.data;

  return (
    <div className='flex w-full items-center justify-between'>
      <span className='text-black-200 truncate text-lg font-bold md:text-xl'>내 워크스페이스</span>

      <div className='flex shrink-0 items-center'>
        <div className='mx-3 h-5.5 w-px bg-gray-300 md:mx-4 md:h-7' />
        {isLoading ? (
          <HeaderSkeleton />
        ) : (
          user && <HeaderUserProfile name={user.name} picture={user.picture} />
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { status } = useSession();
  const workspaceId = useWorkspaceId();

  const isLoggedIn = status === 'authenticated';
  const isLanding = pathname === '/';

  const renderContent = () => {
    if (isLanding) return <LandingHeader />;
    if (!isLoggedIn) return null;
    if (workspaceId !== null) return <WorkspaceDetailHeader />;
    return <WorkspaceListHeader />;
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-15 border-b border-gray-300 bg-white md:h-17.5',
        isLanding
          ? 'left-0 pr-4 pl-[23.5px] md:pr-15 md:pl-6'
          : 'left-16.75 pr-4 pl-6 md:left-40 md:pr-7 md:pl-10 lg:left-75 lg:pr-12',
      )}
    >
      <div className='mx-auto flex h-full'>{renderContent()}</div>
    </header>
  );
}
