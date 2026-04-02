'use client';

import { useState } from 'react';
import Button from '@/components/Buttons';

type Props = {
  message: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

export default function ConfirmModal({ message, onConfirm, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-6.25 md:gap-7.25'>
      <p className='text-2lg text-center font-medium md:text-xl'>{message}</p>

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
          onClick={handleConfirm}
          loading={loading}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
