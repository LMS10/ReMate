'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useInviteWorkspace } from '@/apis/workspace/workspace.queries';
import Button from '@/components/Buttons';
import Input from '@/components/Input';

type Props = {
  onClose: () => void;
};

export default function InviteModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const workspaceId = Number(
    Array.isArray(params?.workspaceId) ? params.workspaceId[0] : params?.workspaceId,
  );

  const { mutate: inviteWorkspace, isPending } = useInviteWorkspace(workspaceId);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!email) return;
    setErrorMessage('');

    inviteWorkspace(
      { email },
      {
        onSuccess: () => {
          toast.success('초대가 완료되었습니다.');
          onClose();
        },
        onError: (error: Error) => {
          const message =
            error.message === '워크스페이스를 찾을 수 없습니다.' ||
            error.message === '이미 참여 중인 워크스페이스입니다.'
              ? error.message
              : '초대에 실패했습니다. 이메일을 확인해 주세요.';

          setErrorMessage(message);
        },
      },
    );
  };

  return (
    <div className='flex flex-col gap-4 md:gap-6.5'>
      <h2 className='text-xl font-bold md:text-2xl'>초대하기</h2>

      <div className='flex flex-col gap-3.5 md:gap-5'>
        <Input
          type='email'
          label='이메일'
          placeholder='이메일을 입력해 주세요'
          ref={inputRef}
          value={email}
          error={errorMessage}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage('');
          }}
        />

        <div className='flex gap-2.5'>
          <Button
            variant='secondary'
            size='lg'
            className='flex-1 md:h-12.5 md:text-lg'
            onClick={onClose}
          >
            취소
          </Button>

          <Button
            variant='primary'
            size='lg'
            className='flex-1 md:h-12.5 md:text-lg'
            onClick={handleSubmit}
            disabled={!email}
            loading={isPending}
          >
            초대하기
          </Button>
        </div>
      </div>
    </div>
  );
}
