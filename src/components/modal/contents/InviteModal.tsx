'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Buttons';
import Input from '@/components/Input';

type Props = {
  onClose: () => void;
};

export default function InviteModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      setLoading(true);
      console.log('초대:', email);
      onClose();
    } finally {
      setLoading(false);
    }
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
          onChange={(e) => setEmail(e.target.value)}
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
            loading={loading}
          >
            초대하기
          </Button>
        </div>
      </div>
    </div>
  );
}
