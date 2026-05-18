'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetMe } from '@/apis/auth/auth.queries';
import { useGetReceiptDetail, useUpdateStatus } from '@/apis/receipt/receipt.queries';
import { ReceiptDetailResponse, ReceiptUploadResponse } from '@/apis/receipt/receipt.type';
import { useGetWorkspace } from '@/apis/workspace/workspace.queries';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import Avatar from './Avatar';
import Button from './Buttons';
import Icon from './Icon';
import ConfirmModal from './modal/contents/ConfirmModal';
import Modal from './modal/Modal';
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
  action,
  onEditClick,
}: {
  label: string;
  children: React.ReactNode;
  editable?: boolean;
  className?: string;
  isEditing?: boolean;
  action?: React.ReactNode;
  onEditClick?: () => void;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5')}>
      <div className={cn('flex gap-35.5 lg:gap-29')}>
        <p className={cn('text-black-400 text-xs font-semibold')}>{label}</p>
        {action}
      </div>
      <div className={cn('flex gap-0.5')}>
        <div className='h-7.5'>{children}</div>
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
  const params = useParams<{ receiptId: string; workspaceId: string }>();

  const [editingField, setEditingField] = useState<Set<EditableField>>(new Set());
  const [tempValue, setTempValue] = useState<Record<EditableField, string>>({
    tradeAt: '',
    storeName: '',
    totalAmount: '',
  });

  const detailQuery = useGetReceiptDetail(Number(params.receiptId), Number(params.workspaceId), {
    enabled: !editable,
  });
  const data = editable ? uploadData : detailQuery.data?.data;
  const { data: meData } = useGetMe();
  const { mutateAsync: updateStatus } = useUpdateStatus();
  const { data: wsData } = useGetWorkspace(Number(params.workspaceId));
  const isAdmin = wsData?.data.role === 'ADMIN';

  const [confirmStatus, setConfirmStatus] = useState<'APPROVED' | 'REJECTED' | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const showBtn = data?.status === 'WAITING' && isAdmin && !isSaving;

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

  if (!editable && detailQuery.isLoading) {
    return <div>로딩중...</div>;
  }
  if (!editable && detailQuery.isError) {
    return <div>{detailQuery.error.message}</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {confirmStatus && (
        <Modal onClose={() => setConfirmStatus(null)}>
          <ConfirmModal
            message={
              confirmStatus === 'APPROVED'
                ? '영수증을 승인하시겠습니까?'
                : '영수증을 반려하시겠습니까?'
            }
            onConfirm={async () => {
              await updateStatus({
                id: Number(params.receiptId),
                workspaceId: Number(params.workspaceId),
                status: confirmStatus === 'APPROVED' ? 'APPROVED' : 'REJECTED',
              });
            }}
            onClose={() => setConfirmStatus(null)}
          />
        </Modal>
      )}

      <div className={cn('min-w-[236.5px] rounded-lg border border-gray-300 p-4 lg:max-w-100')}>
        {isLg ? (
          <div
            className={cn('grid grid-cols-2 gap-2.5')}
            style={{ gridTemplateColumns: '55% 45%' }}
          >
            <div className={cn('flex flex-col gap-4')}>
              <InfoItem label='게시자'>
                <Avatar
                  name={
                    editable
                      ? (meData?.data.name ?? '')
                      : ((data as ReceiptDetailResponse['data']).userName ?? '')
                  }
                  picture={
                    editable
                      ? (meData?.data?.picture ?? null)
                      : ((data as ReceiptDetailResponse['data']).userPicture ?? null)
                  }
                />
              </InfoItem>
              <InfoItem label='AI 분석 결과'>
                <ResultChip reasons={data.inappropriateReasons} />
              </InfoItem>
              <InfoItem
                label='상태'
                action={
                  isRejecting && (
                    <Button
                      group='sub'
                      variant='blue'
                      onClick={async () => {
                        setIsSaving(true);
                        await updateStatus({
                          id: Number(params.receiptId),
                          workspaceId: Number(params.workspaceId),
                          status: 'REJECTED',
                          reason: rejectReason,
                        });
                        setIsRejecting(false);
                      }}
                      className={cn('h-5 w-8.5 rounded-sm text-[10px] leading-4.5 font-medium')}
                    >
                      저장
                    </Button>
                  )
                }
              >
                {showBtn && !isRejecting ? (
                  <div className={cn('flex gap-1.5')}>
                    <Button
                      group='sub'
                      variant='blue'
                      onClick={() => setConfirmStatus('APPROVED')}
                      className={cn('h-6.5 w-22.75 text-xs font-medium')}
                    >
                      승인
                    </Button>
                    <Button
                      group='sub'
                      variant='white'
                      onClick={() => setIsRejecting(true)}
                      className={cn('h-6.5 w-22.75 text-xs font-medium')}
                    >
                      반려
                    </Button>
                  </div>
                ) : isRejecting ? (
                  <input
                    type='text'
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder='반려 사유를 입력해주세요'
                    className={cn(
                      'text-black-400 rounded-sm border border-gray-300 px-1.5 py-1.25 text-xs placeholder:text-gray-400',
                    )}
                  />
                ) : (
                  <div className={cn('flex items-center gap-1.5')}>
                    <StatusChip status={data.status} />
                    {data.status === 'REJECTED' && data.rejectionReason && (
                      <span
                        title={data.rejectionReason}
                        className={cn('text-md text-black-200 max-w-30 truncate')}
                      >
                        {data.rejectionReason}
                      </span>
                    )}
                  </div>
                )}
              </InfoItem>
            </div>
            <div className={cn('text-md flex flex-col gap-4')}>
              <InfoItem
                label='결제일'
                editable={editable}
                isEditing={editingField.has('tradeAt')}
                onEditClick={() => handleEditClick('tradeAt', data.tradeAt)}
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
                  formatDate(data.tradeAt)
                )}
              </InfoItem>
              <InfoItem
                label='가맹점'
                editable={editable}
                isEditing={editingField.has('storeName')}
                onEditClick={() => handleEditClick('storeName', data.storeName)}
                className='h-6'
              >
                {editingField.has('storeName') ? (
                  <input
                    type='text'
                    value={tempValue.storeName}
                    onChange={(e) =>
                      setTempValue((prev) => ({ ...prev, storeName: e.target.value }))
                    }
                    className={cn(
                      'text-black-200 h-5 w-full rounded-xl border border-gray-300 px-3.5 py-3 text-lg focus:border-blue-200 focus:outline-none',
                    )}
                  />
                ) : (
                  data.storeName
                )}
              </InfoItem>
              <InfoItem
                label='결제 금액'
                editable={editable}
                isEditing={editingField.has('totalAmount')}
                onEditClick={() => handleEditClick('totalAmount', String(data.totalAmount))}
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
                  formatAmount(data.totalAmount)
                )}
              </InfoItem>
            </div>
          </div>
        ) : (
          <div className={cn('text-md flex min-w-0 flex-col gap-4')}>
            <InfoItem label='게시자'>
              <Avatar
                name={
                  editable
                    ? (meData?.data.name ?? '')
                    : ((data as ReceiptDetailResponse['data']).userName ?? '')
                }
                picture={
                  editable
                    ? (meData?.data?.picture ?? null)
                    : ((data as ReceiptDetailResponse['data']).userPicture ?? null)
                }
              />
            </InfoItem>
            <InfoItem
              label='결제일'
              editable={editable}
              isEditing={editingField.has('tradeAt')}
              onEditClick={() => handleEditClick('tradeAt', data.tradeAt)}
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
                formatDate(data.tradeAt)
              )}
            </InfoItem>
            <InfoItem
              label='가맹점'
              editable={editable}
              isEditing={editingField.has('storeName')}
              onEditClick={() => handleEditClick('storeName', data.storeName)}
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
                data.storeName
              )}
            </InfoItem>
            <InfoItem
              label='결제 금액'
              editable={editable}
              isEditing={editingField.has('totalAmount')}
              onEditClick={() => handleEditClick('totalAmount', String(data.totalAmount))}
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
                formatAmount(data.totalAmount)
              )}
            </InfoItem>
            <InfoItem label='AI 분석 결과'>
              <ResultChip reasons={data.inappropriateReasons} />
            </InfoItem>
            <InfoItem
              label='상태'
              action={
                isRejecting && (
                  <Button
                    group='sub'
                    variant='blue'
                    onClick={async () => {
                      setIsSaving(true);
                      await updateStatus({
                        id: Number(params.receiptId),
                        workspaceId: Number(params.workspaceId),
                        status: 'REJECTED',
                        reason: rejectReason,
                      });
                      setIsRejecting(false);
                    }}
                    className={cn('h-5 w-8.5 rounded-sm text-[10px] leading-4.5 font-medium')}
                  >
                    저장
                  </Button>
                )
              }
            >
              {showBtn && !isRejecting ? (
                <div className={cn('flex gap-1.5')}>
                  <Button
                    group='sub'
                    variant='blue'
                    onClick={() => setConfirmStatus('APPROVED')}
                    className={cn('h-6.5 w-22.75 text-xs font-medium')}
                  >
                    승인
                  </Button>
                  <Button
                    group='sub'
                    variant='white'
                    onClick={() => setIsRejecting(true)}
                    className={cn('h-6.5 w-22.75 text-xs font-medium')}
                  >
                    반려
                  </Button>
                </div>
              ) : isRejecting ? (
                <input
                  type='text'
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder='반려 사유를 입력해주세요'
                  className={cn('rounded-sm border border-gray-300 px-1.5 py-1.25')}
                />
              ) : (
                <div className={cn('flex items-center gap-1.5')}>
                  <StatusChip status={data.status} />
                  {data.status === 'REJECTED' && data.rejectionReason && (
                    <span
                      title={data.rejectionReason}
                      className={cn('text-md text-black-200 max-w-37.5 truncate')}
                    >
                      {data.rejectionReason}
                    </span>
                  )}
                </div>
              )}
            </InfoItem>
          </div>
        )}
      </div>
    </div>
  );
}
