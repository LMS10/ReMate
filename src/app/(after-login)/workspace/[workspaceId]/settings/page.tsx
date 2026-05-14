'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetWorkspace,
  useGetWorkspaceMembers,
  useUpdateWorkspaceSettings,
  useDeleteWorkspaceMember,
  useDeleteWorkspace,
} from '@/apis/workspace/workspace.queries';
import { WorkspaceMember } from '@/apis/workspace/workspace.type';
import Avatar from '@/components/Avatar';
import Button from '@/components/Buttons';
import ColorChips from '@/components/ColorChips';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import ConfirmModal from '@/components/modal/contents/ConfirmModal';
import InviteModal from '@/components/modal/contents/InviteModal';
import Modal from '@/components/modal/Modal';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = Number(
    Array.isArray(params?.workspaceId) ? params.workspaceId[0] : params?.workspaceId,
  );

  const { data: workspaceData } = useGetWorkspace(workspaceId);
  const workspace = workspaceData?.data;

  const [name, setName] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  const initializedRef = useState(false);
  if (workspace && !initializedRef[0]) {
    initializedRef[1](true);
    if (name === undefined) setName(workspace.workspaceName);
    if (color === undefined) setColor(workspace.color);
  }

  const currentName = name ?? workspace?.workspaceName ?? '';
  const currentColor = color ?? workspace?.color ?? 'GREEN';

  const isSettingsChanged =
    workspace != null &&
    (currentName !== workspace.workspaceName || currentColor !== workspace.color);

  const { mutate: updateSettings, isPending: isUpdating } = useUpdateWorkspaceSettings(workspaceId);

  const handleUpdateSettings = () => {
    updateSettings(
      { name: currentName, color: currentColor },
      {
        onSuccess: () => {
          toast.success('워크스페이스 설정이 변경되었습니다.');
        },
        onError: (error: Error) => {
          toast.error(error.message || '워크스페이스 설정 변경에 실패했습니다.');
        },
      },
    );
  };

  const { data: membersData } = useGetWorkspaceMembers(workspaceId, 'ACCEPTED');
  const [kickedIds, setKickedIds] = useState<number[]>([]);
  const members: WorkspaceMember[] = (membersData?.data ?? []).filter(
    (m: WorkspaceMember) => !kickedIds.includes(m.userId),
  );

  const [kickTarget, setKickTarget] = useState<WorkspaceMember | null>(null);
  const { mutate: deleteMember } = useDeleteWorkspaceMember(workspaceId);

  const handleKickMember = async (member: WorkspaceMember) => {
    return new Promise<void>((resolve, reject) => {
      deleteMember(member.userId, {
        onSuccess: () => {
          setKickedIds((prev) => [...prev, member.userId]);
          toast.success(`${member.name}님을 강퇴했습니다.`);
          resolve();
        },
        onError: (error: Error) => {
          toast.error(error.message || '멤버 강퇴에 실패했습니다.');
          reject(error);
        },
      });
    });
  };

  const { data: pendingData } = useGetWorkspaceMembers(workspaceId, 'PENDING');
  const [cancelledIds, setCancelledIds] = useState<number[]>([]);
  const pendingMembers: WorkspaceMember[] = (pendingData?.data ?? []).filter(
    (m: WorkspaceMember) => !cancelledIds.includes(m.userId),
  );

  const [cancelTarget, setCancelTarget] = useState<WorkspaceMember | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { mutate: cancelInvite } = useDeleteWorkspaceMember(workspaceId);

  const handleCancelInvite = async (member: WorkspaceMember) => {
    return new Promise<void>((resolve, reject) => {
      cancelInvite(member.userId, {
        onSuccess: () => {
          setCancelledIds((prev) => [...prev, member.userId]);
          toast.success('초대를 취소했습니다.');
          resolve();
        },
        onError: (error: Error) => {
          toast.error(error.message || '초대 취소에 실패했습니다.');
          reject(error);
        },
      });
    });
  };

  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] = useState(false);
  const { mutate: deleteWorkspace } = useDeleteWorkspace();

  const handleDeleteWorkspace = async () => {
    return new Promise<void>((resolve, reject) => {
      deleteWorkspace(workspaceId, {
        onSuccess: () => {
          toast.success('워크스페이스가 삭제되었습니다.');
          router.push('/workspace');
          resolve();
        },
        onError: (error: Error) => {
          toast.error(error.message || '워크스페이스 삭제에 실패했습니다.');
          reject(error);
        },
      });
    });
  };

  return (
    <div className='mb-12 w-full max-w-3xl px-6 py-3 md:px-10 md:py-5'>
      <button
        onClick={() => router.back()}
        className='text-md mb-3 flex cursor-pointer items-center gap-2 font-medium text-gray-400 transition-all duration-200 hover:text-gray-500 md:mb-5 md:text-lg'
      >
        <Icon name='arrowLeft' size={16} className='md:h-4.5 md:w-4.5' />
        <span>돌아가기</span>
      </button>

      <section className='mb-6 rounded-xl border border-gray-200 bg-white p-5 md:p-6'>
        <h2 className='mb-4 h-6.5 text-lg font-bold md:h-8 md:text-xl'>
          {workspace?.workspaceName}
        </h2>

        <div className='flex flex-col gap-3'>
          <Input
            label='워크스페이스 이름'
            type='text'
            placeholder='워크스페이스 이름을 입력해 주세요'
            value={currentName}
            onChange={(e) => setName(e.target.value)}
          />
          <ColorChips selected={currentColor} onSelect={setColor} />
        </div>

        <Button
          variant='primary'
          size='lg'
          className='mt-4 w-full font-medium md:h-12.5 md:text-lg'
          onClick={handleUpdateSettings}
          disabled={!isSettingsChanged || !currentName}
          loading={isUpdating}
        >
          변경
        </Button>
      </section>

      <section className='mb-6 rounded-xl border border-gray-200 bg-white p-5 md:p-6'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-bold md:text-xl'>멤버</h2>
        </div>

        <p className='mb-2 text-sm text-gray-400'>이름</p>

        <div className='scrollbar-hide max-h-55 overflow-y-auto pr-1 md:max-h-60'>
          {members.length === 0 ? (
            <p className='py-4 text-center text-sm text-gray-400'>멤버가 없습니다.</p>
          ) : (
            <ul className='flex flex-col divide-y divide-gray-100'>
              {members.map((member) => (
                <li key={member.userId} className='flex items-center justify-between py-2.5'>
                  <Avatar name={member.name} picture={member.picture} member className='md:gap-3' />
                  {member.role !== 'ADMIN' && (
                    <Button
                      group='sub'
                      className='md:text-md w-13 rounded-sm md:h-8 md:w-16'
                      variant='white'
                      size='sm'
                      onClick={() => setKickTarget(member)}
                    >
                      삭제
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className='mb-6 rounded-xl border border-gray-200 bg-white p-5 md:p-6'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-bold md:text-xl'>초대 내역</h2>
          <Button
            group='sub'
            className='md:text-md h-6.5 w-18 rounded-sm md:h-8 md:w-21'
            variant='blue'
            size='sm'
            onClick={() => setShowInviteModal(true)}
          >
            초대하기
          </Button>
        </div>

        <p className='mb-2 text-sm text-gray-400'>이메일</p>

        <div className='scrollbar-hide max-h-49 overflow-y-auto pr-1 md:max-h-53'>
          {pendingMembers.length === 0 ? (
            <p className='py-4 text-center text-sm text-gray-400'>초대 내역이 없습니다.</p>
          ) : (
            <ul className='flex flex-col divide-y divide-gray-100'>
              {pendingMembers.map((member) => (
                <li key={member.userId} className='flex items-center justify-between py-2.5'>
                  <span className='text-sm md:text-base'>{member.email}</span>
                  <Button
                    group='sub'
                    className='md:text-md w-13 rounded-sm md:h-8 md:w-16'
                    variant='white'
                    size='sm'
                    onClick={() => setCancelTarget(member)}
                  >
                    취소
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className='rounded-xl border border-gray-200 bg-white p-5 md:p-6'>
        <Button
          variant='secondary'
          size='lg'
          className='w-full md:h-12.5 md:text-lg'
          onClick={() => setShowDeleteWorkspaceModal(true)}
        >
          워크스페이스 삭제하기
        </Button>
      </section>

      {kickTarget && (
        <Modal onClose={() => setKickTarget(null)}>
          <ConfirmModal
            message={`${kickTarget.name}님을 삭제하시겠습니까?`}
            onConfirm={() => handleKickMember(kickTarget)}
            onClose={() => setKickTarget(null)}
          />
        </Modal>
      )}

      {cancelTarget && (
        <Modal onClose={() => setCancelTarget(null)}>
          <ConfirmModal
            message={`초대를 취소하시겠습니까?`}
            onConfirm={() => handleCancelInvite(cancelTarget)}
            onClose={() => setCancelTarget(null)}
          />
        </Modal>
      )}

      {showDeleteWorkspaceModal && (
        <Modal onClose={() => setShowDeleteWorkspaceModal(false)}>
          <ConfirmModal
            message='워크스페이스를 삭제하시겠습니까?'
            onConfirm={handleDeleteWorkspace}
            onClose={() => setShowDeleteWorkspaceModal(false)}
          />
        </Modal>
      )}

      {showInviteModal && (
        <Modal onClose={() => setShowInviteModal(false)}>
          <InviteModal onClose={() => setShowInviteModal(false)} />
        </Modal>
      )}
    </div>
  );
}
