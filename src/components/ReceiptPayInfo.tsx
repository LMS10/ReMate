'use client';

import { useState } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { toast } from 'react-toastify';
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
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('ko', ko);

type InappropriateReason =
  | 'NIGHT_PAYMENT'
  | 'HOLIDAY_PAYMENT'
  | 'SUSPICIOUS_ENTERTAINMENT'
  | 'SPLIT_PAYMENT_SUSPICIOUS';

const REASON_DESCRIPTIONS: Record<InappropriateReason, { title: string; description: string }> = {
  NIGHT_PAYMENT: {
    title: '심야 결제',
    description:
      '결제 시간이 심야 시간대(23시~06시)에 해당합니다. 공식적인 활동 목적의 지출이 맞는지 확인해 주세요.',
  },
  HOLIDAY_PAYMENT: {
    title: '공휴일 결제',
    description:
      '공휴일에 발생한 결제입니다. 공식 일정 외의 지출일 수 있으니 사용 목적을 검토해 주세요.',
  },
  SUSPICIOUS_ENTERTAINMENT: {
    title: '유흥업소 의심',
    description:
      '가맹점 정보와 영수증 상세 품목을 분석한 결과 유흥 목적의 지출로 의심됩니다. 공동 경비 사용 목적에 맞는지 검토가 필요합니다.',
  },
  SPLIT_PAYMENT_SUSPICIOUS: {
    title: '분할결제 의심',
    description:
      '동일 가맹점에서 단기간 내 복수의 결제가 감지되었습니다. 결제 한도 우회를 위한 분할결제일 가능성이 있습니다.',
  },
};

function AIJudgmentBasis({ reasons }: { reasons: string[] }) {
  const validReasons = reasons.filter((r): r is InappropriateReason => r in REASON_DESCRIPTIONS);
  if (validReasons.length === 0) return null;

  return (
    <div
      className={cn(
        'rounded-lg border border-yellow-200 bg-yellow-50 px-3.5 py-3',
        'flex flex-col gap-2.5',
      )}
    >
      <p className='flex items-center gap-1.5 text-xs font-semibold text-yellow-700'>
        <span>⚠</span>
        <span>AI 판단 근거</span>
      </p>
      <ul className='flex flex-col gap-2'>
        {validReasons.map((reason) => {
          const { title, description } = REASON_DESCRIPTIONS[reason];
          return (
            <li key={reason} className='flex flex-col gap-0.5'>
              <span className='text-xs font-medium text-yellow-800'>{title}</span>
              <span className='text-xs leading-relaxed text-yellow-700'>{description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface ReceiptPayInfoProps {
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
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className={cn('flex items-center justify-between')}>
        <p className={cn('text-black-400 text-xs font-semibold')}>{label}</p>
        {action}
      </div>
      <div className='flex min-w-0 items-start gap-0.5'>
        <div className='flex min-h-7.5 min-w-0 flex-1 items-start'>{children}</div>
        {editable === true && (
          <Icon
            name={isEditing ? 'close' : 'edit'}
            size={24}
            className='shrink-0 cursor-pointer'
            onClick={onEditClick}
          />
        )}
      </div>
    </div>
  );
}

export interface ReceiptPayInfoHandle {
  getEditedValues: () => { storeName: string; totalAmount: number; tradeAt: string };
}

const ReceiptPayInfo = forwardRef<ReceiptPayInfoHandle, ReceiptPayInfoProps>(
  ({ editable = false, uploadData }, ref) => {
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
    const [showReason, setShowReason] = useState(false);

    const showBtn = data?.status === 'WAITING' && isAdmin && !isSaving;

    function handleEditClick(field: EditableField, currentValue: string) {
      setEditingField((prev) => {
        const next = new Set(prev);
        if (next.has(field)) {
          next.delete(field);
        } else {
          next.add(field);
          setTempValue((prev) => ({ ...prev, [field]: currentValue }));
        }
        return next;
      });
    }

    const formatDate = (iso: string) => iso.slice(0, 16).replace('T', ' ');
    const formatAmount = (amount: number) => `₩${amount.toLocaleString('ko-KR')}`;

    useImperativeHandle(
      ref,
      () => ({
        getEditedValues: () => ({
          storeName: editingField.has('storeName') ? tempValue.storeName : (data?.storeName ?? ''),
          totalAmount: editingField.has('totalAmount')
            ? Number(tempValue.totalAmount.replace(/,/g, ''))
            : (data?.totalAmount ?? 0),
          tradeAt: (editingField.has('tradeAt')
            ? tempValue.tradeAt
            : (data?.tradeAt ?? '')
          ).replace('T', ' '),
        }),
      }),
      [editingField, tempValue, data],
    );

    if (!editable && detailQuery.isLoading) return <div>로딩중...</div>;
    if (!editable && detailQuery.isError) return <div>{detailQuery.error.message}</div>;
    if (!data) return null;

    const rejectSaveAction = isRejecting ? (
      <Button
        group='sub'
        variant='blue'
        disabled={!rejectReason.trim()}
        onClick={() => setConfirmStatus('REJECTED')}
        className={cn('h-5 w-8.5 rounded-sm text-[10px] leading-4.5 font-medium')}
      >
        저장
      </Button>
    ) : undefined;

    const statusContent =
      showBtn && !isRejecting ? (
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
          placeholder='반려 사유를 입력해 주세요'
          className={cn(
            'w-50 md:w-60 lg:w-46',
            'text-black-400 rounded-sm border border-gray-300 px-1.5 py-1.25 text-xs placeholder:text-gray-400',
            'hover:border-blue-200 focus:border-blue-200 focus:outline-none',
          )}
        />
      ) : (
        <div className='flex flex-col gap-1'>
          <div className='flex items-start gap-2.5'>
            <StatusChip status={data.status} />
            {data.status === 'REJECTED' && data.rejectionReason && (
              <button
                onClick={() => setShowReason((v) => !v)}
                className='cursor-pointer text-sm text-gray-400 underline underline-offset-2'
              >
                사유 {showReason ? '접기' : '보기'}
              </button>
            )}
          </div>
          {showReason && data.rejectionReason && (
            <p className={cn('text-black-200 text-md pl-0.5 break-keep')}>{data.rejectionReason}</p>
          )}
        </div>
      );

    const posterName = editable
      ? (meData?.data.name ?? '')
      : ((data as ReceiptDetailResponse['data']).userName ?? '');
    const posterPicture = editable
      ? (meData?.data?.picture ?? null)
      : ((data as ReceiptDetailResponse['data']).userPicture ?? null);

    const aiJudgmentBasis = <AIJudgmentBasis reasons={data.inappropriateReasons ?? []} />;

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
                try {
                  setIsSaving(true);
                  await updateStatus({
                    id: Number(params.receiptId),
                    workspaceId: Number(params.workspaceId),
                    status: confirmStatus,
                    ...(confirmStatus === 'REJECTED' && { reason: rejectReason }),
                  });
                  toast.success(
                    confirmStatus === 'APPROVED'
                      ? '영수증이 승인되었습니다.'
                      : '영수증이 반려되었습니다.',
                  );
                  if (confirmStatus === 'REJECTED') {
                    setIsRejecting(false);
                    setRejectReason('');
                  }
                } catch (error) {
                  toast.error(
                    confirmStatus === 'APPROVED'
                      ? '영수증 승인에 실패했습니다.'
                      : '영수증 반려에 실패했습니다.',
                  );
                  console.error(error);
                } finally {
                  setIsSaving(false);
                  setConfirmStatus(null);
                }
              }}
              onClose={() => setConfirmStatus(null)}
            />
          </Modal>
        )}

        <div className={cn('min-w-[236.5px] rounded-lg border border-gray-300 p-4 lg:w-100')}>
          {isLg ? (
            <div className='flex flex-col gap-4'>
              <div
                className={cn('grid grid-cols-2 gap-2.5')}
                style={{ gridTemplateColumns: '55fr 45fr' }}
              >
                <div className={cn('flex flex-col gap-4')}>
                  <InfoItem label='게시자'>
                    <Avatar name={posterName} picture={posterPicture} />
                  </InfoItem>
                  <InfoItem label='AI 분석 결과'>
                    <ResultChip reasons={data.inappropriateReasons} />
                  </InfoItem>
                  <InfoItem label='상태' action={rejectSaveAction} className='w-fit'>
                    {statusContent}
                  </InfoItem>
                </div>
                <div className={cn('text-md flex flex-col gap-4')}>
                  <InfoItem
                    label='결제일'
                    editable={editable}
                    isEditing={editingField.has('tradeAt')}
                    onEditClick={() => handleEditClick('tradeAt', data.tradeAt)}
                  >
                    {editingField.has('tradeAt') ? (
                      <DatePicker
                        selected={(() => {
                          const val = tempValue.tradeAt || data.tradeAt;
                          return new Date(val.includes('T') ? val : val.replace(' ', 'T'));
                        })()}
                        onChange={(date: Date | null) => {
                          if (!date) return;
                          const pad = (n: number) => String(n).padStart(2, '0');
                          setTempValue((prev) => ({
                            ...prev,
                            tradeAt: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`,
                          }));
                        }}
                        showTimeSelect
                        timeCaption='시간'
                        timeFormat='HH:mm'
                        timeIntervals={1}
                        dateFormat='yyyy-MM-dd HH:mm'
                        locale='ko'
                        popperProps={{ strategy: 'fixed' }}
                        wrapperClassName='w-full'
                        className={cn(
                          'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                        )}
                      />
                    ) : (
                      <span className='text-sm'>{formatDate(data.tradeAt)}</span>
                    )}
                  </InfoItem>
                  <InfoItem
                    label='가맹점'
                    editable={editable}
                    isEditing={editingField.has('storeName')}
                    onEditClick={() => handleEditClick('storeName', data.storeName)}
                  >
                    {editingField.has('storeName') ? (
                      <input
                        type='text'
                        value={tempValue.storeName}
                        onChange={(e) =>
                          setTempValue((prev) => ({ ...prev, storeName: e.target.value }))
                        }
                        className={cn(
                          'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                        )}
                      />
                    ) : (
                      <span className='text-sm'>{data.storeName}</span>
                    )}
                  </InfoItem>
                  <InfoItem
                    label='결제 금액'
                    editable={editable}
                    isEditing={editingField.has('totalAmount')}
                    onEditClick={() =>
                      handleEditClick('totalAmount', data.totalAmount.toLocaleString('ko-KR'))
                    }
                  >
                    {editingField.has('totalAmount') ? (
                      <input
                        type='text'
                        value={tempValue.totalAmount}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setTempValue((prev) => ({
                            ...prev,
                            totalAmount: raw ? Number(raw).toLocaleString('ko-KR') : '',
                          }));
                        }}
                        className={cn(
                          'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                        )}
                      />
                    ) : (
                      <span className='text-sm'>{formatAmount(data.totalAmount)}</span>
                    )}
                  </InfoItem>
                </div>
              </div>
              {aiJudgmentBasis}
            </div>
          ) : (
            <div className={cn('text-md flex min-w-0 flex-col gap-4')}>
              <InfoItem label='게시자'>
                <Avatar name={posterName} picture={posterPicture} />
              </InfoItem>
              <InfoItem
                label='결제일'
                editable={editable}
                isEditing={editingField.has('tradeAt')}
                onEditClick={() => handleEditClick('tradeAt', data.tradeAt)}
              >
                {editingField.has('tradeAt') ? (
                  <DatePicker
                    selected={(() => {
                      const val = tempValue.tradeAt || data.tradeAt;
                      return new Date(val.includes('T') ? val : val.replace(' ', 'T'));
                    })()}
                    onChange={(date: Date | null) => {
                      if (!date) return;
                      const pad = (n: number) => String(n).padStart(2, '0');
                      setTempValue((prev) => ({
                        ...prev,
                        tradeAt: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`,
                      }));
                    }}
                    showTimeSelect
                    timeCaption='시간'
                    timeFormat='HH:mm'
                    timeIntervals={1}
                    dateFormat='yyyy-MM-dd HH:mm'
                    locale='ko'
                    popperProps={{ strategy: 'fixed' }}
                    wrapperClassName='w-full'
                    className={cn(
                      'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                    )}
                  />
                ) : (
                  <span className='text-sm'>{formatDate(data.tradeAt)}</span>
                )}
              </InfoItem>
              <InfoItem
                label='가맹점'
                editable={editable}
                isEditing={editingField.has('storeName')}
                onEditClick={() => handleEditClick('storeName', data.storeName)}
              >
                {editingField.has('storeName') ? (
                  <input
                    type='text'
                    value={tempValue.storeName}
                    onChange={(e) =>
                      setTempValue((prev) => ({ ...prev, storeName: e.target.value }))
                    }
                    className={cn(
                      'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                    )}
                  />
                ) : (
                  <span className='text-sm'>{data.storeName}</span>
                )}
              </InfoItem>
              <InfoItem
                label='결제 금액'
                editable={editable}
                isEditing={editingField.has('totalAmount')}
                onEditClick={() =>
                  handleEditClick('totalAmount', data.totalAmount.toLocaleString('ko-KR'))
                }
              >
                {editingField.has('totalAmount') ? (
                  <input
                    type='text'
                    value={tempValue.totalAmount}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setTempValue((prev) => ({
                        ...prev,
                        totalAmount: raw ? Number(raw).toLocaleString('ko-KR') : '',
                      }));
                    }}
                    className={cn(
                      'text-black-200 h-7 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-200 focus:outline-none',
                    )}
                  />
                ) : (
                  <span className='text-sm'>{formatAmount(data.totalAmount)}</span>
                )}
              </InfoItem>
              <InfoItem label='AI 분석 결과'>
                <ResultChip reasons={data.inappropriateReasons} />
              </InfoItem>
              {aiJudgmentBasis}
              <InfoItem label='상태' action={rejectSaveAction} className='w-fit'>
                {statusContent}
              </InfoItem>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ReceiptPayInfo.displayName = 'ReceiptPayInfo';
export default ReceiptPayInfo;
