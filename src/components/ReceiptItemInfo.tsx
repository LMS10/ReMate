'use client';

import { useParams } from 'next/navigation';
import { useGetReceiptDetail } from '@/apis/receipt/receipt.queries';
import { ReceiptUploadResponse } from '@/apis/receipt/receipt.type';
import { cn } from '@/utils/cn';

interface ReceiptItemInfoProps {
  editable?: boolean;

  uploadData?: ReceiptUploadResponse['data'];
}

export default function ReceiptItemInfo({ editable = false, uploadData }: ReceiptItemInfoProps) {
  const params = useParams<{ receiptId: string; workspaceId: string }>();

  const { data: detailData } = useGetReceiptDetail(
    Number(params.receiptId),

    Number(params.workspaceId),

    { enabled: !editable },
  );

  const data = editable ? uploadData : detailData?.data;

  if (!data) return null;

  const items = 'items' in data ? data.items : [];

  const totalAmount = data.totalAmount;

  const discountAmount = data.discountAmount;

  const allPriceZero = items?.every((item) => item.price === 0) ?? false;

  const itemsTotalAmount = allPriceZero
    ? (totalAmount ?? 0) + (discountAmount ?? 0)
    : (items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0);

  return (
    <div
      className={cn(
        'flex min-w-57.75 flex-col gap-5.25 rounded-lg border border-gray-300 p-4 lg:max-w-100',
      )}
    >
      <div className='scrollbar-hide flex max-h-70.75 flex-col gap-3.25 overflow-y-auto lg:max-h-98.5'>
        {items.map((item) => (
          <div key={item.id} className={cn('flex justify-between')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-md')}>{item.name}</span>

              <span className={cn('text-xs font-medium text-gray-400')}>{item.quantity}</span>
            </div>

            <span className={cn('text-md')}>{item.price.toLocaleString('ko-KR')}</span>
          </div>
        ))}
      </div>

      <div className={cn('flex flex-col gap-1.5 border-t border-gray-300 pt-2.5 font-semibold')}>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>총 금액</p>

          <span className='text-md'>{itemsTotalAmount.toLocaleString('ko-KR')}</span>
        </div>

        {data.amountMismatch && (
          <p className='text-xs font-medium text-yellow-500'>
            ⚠ 품목 합계와 결제 금액이 달라요. 확인이 필요해요.
          </p>
        )}

        {discountAmount != null && (
          <div className='flex items-center justify-between'>
            <p className='text-sm'>할인 금액</p>

            <span className='text-md'>{discountAmount.toLocaleString('ko-KR')}</span>
          </div>
        )}

        <div className='flex items-center justify-between'>
          <p className='text-sm'>결제 금액</p>

          <span className='text-md'>{totalAmount?.toLocaleString('ko-KR')}</span>
        </div>
      </div>
    </div>
  );
}
