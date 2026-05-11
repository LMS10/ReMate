'use client';

import { toast } from 'react-toastify';
import Link from 'next/link';
import {
  useGetMyWorkspaces,
  useGetInvitations,
  useGetAdminName,
  useAcceptInvitation,
  useRejectInvitation,
} from '@/apis/workspace/workspace.queries';
import Button from '@/components/Buttons';
import Icon from '@/components/Icon';
import WorkspaceCard from '@/components/WorkspaceCard';
import { useModalStore } from '@/store/modal.store';

function WorkspaceListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='h-14.5 animate-pulse rounded-lg border border-gray-200 bg-gray-100 md:h-17 lg:h-17.5'
        />
      ))}
    </>
  );
}

function InvitationSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='flex flex-col gap-3 border-b border-gray-200 py-4 md:hidden'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex gap-3'>
              <div className='h-5 w-10 shrink-0 animate-pulse rounded bg-gray-100' />
              <div className='h-5 w-24 animate-pulse rounded bg-gray-200' />
            </div>

            <div className='flex gap-3'>
              <div className='h-5 w-10 shrink-0 animate-pulse rounded bg-gray-100' />
              <div className='h-5 w-16 animate-pulse rounded bg-gray-200' />
            </div>
          </div>

          <div className='flex gap-1.5'>
            <div className='h-8 flex-1 animate-pulse rounded-md bg-gray-200' />
            <div className='h-8 flex-1 animate-pulse rounded-md bg-gray-200' />
          </div>
        </div>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className='hidden grid-cols-[2fr_2fr_1fr] items-center gap-4 border-b border-gray-200 py-4 md:grid'
        >
          <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
          <div className='flex gap-2.5'>
            <div className='h-8 flex-1 animate-pulse rounded-md bg-gray-200' />
            <div className='h-8 flex-1 animate-pulse rounded-md bg-gray-200' />
          </div>
        </div>
      ))}
    </>
  );
}

function AdminName({ workspaceId }: { workspaceId: number }) {
  const { data, isLoading } = useGetAdminName(workspaceId);
  if (isLoading) return <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />;
  return <span>{data?.data.adminName ?? '-'}</span>;
}

export default function Page() {
  const open = useModalStore((s) => s.open);

  const { data: wsData } = useGetMyWorkspaces();
  const { data: invData } = useGetInvitations();

  const { mutate: acceptInvitation } = useAcceptInvitation();
  const { mutate: rejectInvitation } = useRejectInvitation();

  const workspaces = wsData?.data ?? [];
  const invitations = invData?.data ?? [];

  const handleAccept = (membershipId: number) => {
    open({
      type: 'confirm',
      message: '초대를 수락하시겠습니까?',
      onConfirm: () =>
        new Promise<void>((resolve, reject) => {
          acceptInvitation(membershipId, {
            onSuccess: () => {
              toast.success('초대를 수락했습니다.');
              resolve();
            },
            onError: () => {
              toast.error('초대 수락에 실패했습니다.');
              reject();
            },
          });
        }),
    });
  };

  const handleReject = (membershipId: number) => {
    open({
      type: 'confirm',
      message: '초대를 거절하시겠습니까?',
      onConfirm: () =>
        new Promise<void>((resolve, reject) => {
          rejectInvitation(membershipId, {
            onSuccess: () => {
              toast.success('초대를 거절했습니다.');
              resolve();
            },
            onError: () => {
              toast.error('초대 거절에 실패했습니다.');
              reject();
            },
          });
        }),
    });
  };

  return (
    <div className='flex flex-col gap-8 overflow-hidden p-6 md:gap-10 md:p-10'>
      <section className='flex min-h-0 flex-col'>
        <div className='scrollbar-hide h-64 min-h-0 overflow-y-auto md:h-56 lg:h-38'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2.5 lg:grid-cols-3 lg:gap-3'>
            <button
              onClick={() => open({ type: 'createWorkspace' })}
              className='text-black-200 flex h-14.5 cursor-pointer items-center gap-3 rounded-lg border border-gray-300 bg-white px-5 md:h-17 lg:h-17.5'
            >
              <div className='flex aspect-square h-5 items-center justify-center rounded-sm bg-blue-100 md:h-5.5'>
                <Icon name='plus' size={18} className='text-blue-200' />
              </div>
              <span className='text-md font-semibold md:text-lg'>새로운 워크스페이스</span>
            </button>

            {!wsData ? (
              <WorkspaceListSkeleton />
            ) : (
              workspaces.map((ws) => (
                <Link key={ws.workspaceId} href={`/workspace/${ws.workspaceId}`}>
                  <WorkspaceCard name={ws.workspaceName} color={ws.color} role={ws.role} />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className='flex h-111 min-h-0 flex-col gap-4 rounded-lg bg-white px-4 py-6 md:h-134 md:gap-8 md:px-7 md:py-8'>
        <h2 className='text-black-200 shrink-0 text-lg font-bold md:text-xl'>
          초대받은 워크스페이스
        </h2>

        {!invData ? (
          <InvitationSkeleton />
        ) : invitations.length === 0 ? (
          <div className='flex flex-col items-center gap-4 py-16 text-gray-400'>
            <Icon name='empty' size={64} className='md:h-25 md:w-25' />
            <p className='md:text-2lg text-sm'>아직 초대받은 워크스페이스가 없어요</p>
          </div>
        ) : (
          <div className='flex min-h-0 flex-col'>
            <div className='hidden shrink-0 grid-cols-[2fr_2fr_1fr] gap-4 pb-2 text-lg text-gray-400 md:grid'>
              <span>이름</span>
              <span>초대자</span>
              <span className='text-center'>수락 여부</span>
            </div>

            <div className='scrollbar-hide min-h-0 flex-1 overflow-y-auto'>
              {invitations.map((inv) => (
                <div key={inv.membershipId}>
                  <div className='hidden grid-cols-[2fr_2fr_1fr] items-center gap-4 border-b border-gray-200 py-4 md:grid'>
                    <span className='text-black-200 text-lg font-medium'>{inv.workspaceName}</span>
                    <span className='text-black-200 text-lg'>
                      <AdminName workspaceId={inv.workspaceId} />
                    </span>
                    <div className='flex gap-2.5'>
                      <Button
                        group='sub'
                        variant='blue'
                        size='md'
                        className='flex-1'
                        onClick={() => handleAccept(inv.membershipId)}
                      >
                        수락
                      </Button>
                      <Button
                        group='sub'
                        variant='white'
                        size='md'
                        className='flex-1'
                        onClick={() => handleReject(inv.membershipId)}
                      >
                        거절
                      </Button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 border-b border-gray-200 py-4 md:hidden'>
                    <div className='flex flex-col gap-0.5'>
                      <div className='flex gap-3'>
                        <span className='text-md w-10 shrink-0 text-gray-400'>이름</span>
                        <span className='text-black-200 text-md font-medium'>
                          {inv.workspaceName}
                        </span>
                      </div>
                      <div className='flex gap-3'>
                        <span className='text-md w-10 shrink-0 text-gray-400'>초대자</span>
                        <span className='text-black-200 text-md'>
                          <AdminName workspaceId={inv.workspaceId} />
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-1.5'>
                      <Button
                        group='sub'
                        variant='blue'
                        size='sm'
                        onClick={() => handleAccept(inv.membershipId)}
                        className='flex-1'
                      >
                        수락
                      </Button>
                      <Button
                        group='sub'
                        variant='white'
                        size='sm'
                        onClick={() => handleReject(inv.membershipId)}
                        className='flex-1'
                      >
                        거절
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
