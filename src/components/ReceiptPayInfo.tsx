'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetReceiptDetail } from '@/apis/receipt/receipt.queries';
import { ReceiptUploadResponse } from '@/apis/receipt/receipt.type';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ReceiptDetail, ReceiptUpload } from '@/mocks/receipts';
import { cn } from '@/utils/cn';
import Icon from './Icon';
import ResultChip from './ResultChip';
import StatusChip from './StatusChip';

interface ReciptPayInfoProps {
  editable?: boolean;
  uploadData?: ReceiptUploadResponse['data'];
}

type EditableField = 'tradeAt' | 'storeName' | 'totalAmount';

function InfoItem({
  label,
  children,
  editable,
  className,
  isEditing,
  onEditClick,
}: {
  label: string;
  children: React.ReactNode;
  editable?: boolean;
  className?: string;
  isEditing?: boolean;
  onEditClick?: () => void;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5')}>
      <p className={cn('text-black-400 text-xs font-semibold')}>{label}</p>
      <div className={cn('flex gap-0.5')}>
        <div>{children}</div>
        <div>
          {editable === true && (
            <Icon name='edit' size={28} className='cursor-pointer' onClick={onEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReceiptPayInfo({ editable = false, uploadData }: ReciptPayInfoProps) {
  const isLg = useMediaQuery('(min-width: 1024px)');
  const params = useParams<{ receiptId: string }>();

  const [editingField, setEditingField] = useState<Set<EditableField>>(new Set());
  const [tempValue, setTempValue] = useState<Record<EditableField, string>>({
    tradeAt: '',
    storeName: '',
    totalAmount: '',
  });

  const mock = ReceiptUpload.data;
  const detailmock = ReceiptDetail.data;

  const detailQuery = useGetReceiptDetail(Number(params.receiptId), { enabled: !editable });
  const data = editable ? (uploadData ?? mock) : (detailQuery.data?.data ?? detailmock);

  function handleEditClick(field: EditableField, currentValue: string) {
    setEditingField((prev) => {
      const keepEditing = new Set(prev);
      if (keepEditing.has(field)) {
        keepEditing.delete(field);
      } else {
        keepEditing.add(field);
        setTempValue((prev) => ({ ...prev, [field]: currentValue }));
      }
      return keepEditing;
    });
  }

  const formatDate = (iso: string) => iso.slice(0, 16).replace('T', ' ');

  const formatAmount = (amount: number) => `₩${amount.toLocaleString('ko-KR')}`;

  //   if (!editable && detailQuery.isLoading) {
  //     return <div>로딩중...</div>;
  //   }
  //   if (!editable && detailQuery.isError) {
  //     return <div>{detailQuery.error.message}</div>;
  //   }
  //   if (!data) {
  //     return null;
  //   }

  return (
    <div className={cn('min-w-[236.5px] rounded-lg border border-gray-300 p-4 lg:max-w-100')}>
      {isLg ? (
        <div className={cn('grid grid-cols-2')}>
          <div className={cn('flex flex-col gap-4')}>
            <InfoItem label='게시자'>홍길동</InfoItem>
            <InfoItem label='AI 분석 결과'>
              <ResultChip reasons={mock.inappropriateReasons} />
            </InfoItem>
            <InfoItem label='상태'>
              <StatusChip status={mock.status} />
            </InfoItem>
          </div>
          <div className={cn('flex min-w-0 flex-col gap-4')}>
            <InfoItem
              label='결제일'
              editable={editable}
              isEditing={editingField.has('tradeAt')}
              onEditClick={() => handleEditClick('tradeAt', mock.tradeAt)}
              className='h-6'
            >
              {editingField.has('tradeAt') ? (
                <input
                  type='text'
                  value={tempValue.tradeAt}
                  onChange={(e) => setTempValue((prev) => ({ ...prev, tradeAt: e.target.value }))}
                  className={cn(
                    'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                  )}
                />
              ) : (
                formatDate(mock.tradeAt)
              )}
            </InfoItem>
            <InfoItem
              label='가맹점'
              editable={editable}
              isEditing={editingField.has('storeName')}
              onEditClick={() => handleEditClick('storeName', mock.storeName)}
              className='h-6'
            >
              {editingField.has('storeName') ? (
                <input
                  type='text'
                  value={tempValue.storeName}
                  onChange={(e) => setTempValue((prev) => ({ ...prev, storeName: e.target.value }))}
                  className={cn(
                    'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                  )}
                />
              ) : (
                mock.storeName
              )}
            </InfoItem>
            <InfoItem
              label='결제 금액'
              editable={editable}
              isEditing={editingField.has('totalAmount')}
              onEditClick={() => handleEditClick('totalAmount', String(mock.totalAmount))}
              className='h-6'
            >
              {editingField.has('totalAmount') ? (
                <input
                  type='text'
                  value={tempValue.totalAmount}
                  onChange={(e) =>
                    setTempValue((prev) => ({ ...prev, totalAmount: e.target.value }))
                  }
                  className={cn(
                    'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                  )}
                />
              ) : (
                formatAmount(mock.totalAmount)
              )}
            </InfoItem>
          </div>
        </div>
      ) : (
        <div className={cn('flex min-w-0 flex-col gap-4')}>
          <InfoItem label='게시자'>홍길동</InfoItem>
          <InfoItem
            label='결제일'
            editable={editable}
            isEditing={editingField.has('tradeAt')}
            onEditClick={() => handleEditClick('tradeAt', mock.tradeAt)}
            className='h-6'
          >
            {editingField.has('tradeAt') ? (
              <input
                type='text'
                value={tempValue.tradeAt}
                onChange={(e) => setTempValue((prev) => ({ ...prev, tradeAt: e.target.value }))}
                className={cn(
                  'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                )}
              />
            ) : (
              formatDate(mock.tradeAt)
            )}
          </InfoItem>
          <InfoItem
            label='가맹점'
            editable={editable}
            isEditing={editingField.has('storeName')}
            onEditClick={() => handleEditClick('storeName', mock.storeName)}
            className='h-6'
          >
            {editingField.has('storeName') ? (
              <input
                type='text'
                value={tempValue.storeName}
                onChange={(e) => setTempValue((prev) => ({ ...prev, storeName: e.target.value }))}
                className={cn(
                  'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                )}
              />
            ) : (
              mock.storeName
            )}
          </InfoItem>
          <InfoItem
            label='결제 금액'
            editable={editable}
            isEditing={editingField.has('totalAmount')}
            onEditClick={() => handleEditClick('totalAmount', String(mock.totalAmount))}
            className='h-6'
          >
            {editingField.has('totalAmount') ? (
              <input
                type='text'
                value={tempValue.totalAmount}
                onChange={(e) => setTempValue((prev) => ({ ...prev, totalAmount: e.target.value }))}
                className={cn(
                  'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                )}
              />
            ) : (
              formatAmount(mock.totalAmount)
            )}
          </InfoItem>
          <InfoItem label='AI 분석 결과'>
            <ResultChip reasons={mock.inappropriateReasons} />
          </InfoItem>
          <InfoItem label='상태'>
            <StatusChip status={mock.status} />
          </InfoItem>
        </div>
      )}
    </div>
  );
}
