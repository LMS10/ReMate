'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Buttons';
import ColorChips from '@/components/ColorChips';
import Input from '@/components/Input';

type Props = {
  onClose: () => void;
};

export default function CreateWorkspaceModal({ onClose }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name) return;

    try {
      setLoading(true);
      console.log('생성:', name);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold md:text-2xl'>새로운 워크스페이스</h2>

      <div className='mt-4.5 mb-4 flex flex-col gap-3 md:gap-2.5'>
        <Input
          type='text'
          label='워크스페이스 이름'
          placeholder='워크스페이스 이름을 입력해 주세요'
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <ColorChips />
      </div>
      <div className='flex gap-3'>
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
          disabled={!name}
          loading={loading}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}
