'use client';

import { useGetReceiptDetail } from '@/apis/receipt/receipt.queries';
import { cn } from '@/utils/cn';

interface ReceiptItemInfoProps {
  receiptId: number;
  workspaceId: number;
}

export default function ReceiptItemInfo({ receiptId, workspaceId }: ReceiptItemInfoProps) {
  const { data } = useGetReceiptDetail(receiptId, workspaceId);
  const items = data?.data.items;
  const itemsTotalAmount = items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const totalAmount = data?.data.totalAmount;
  const discountAmount = data?.data.discountAmount;

  return (
    <div
      className={cn(
        'flex min-w-57.75 flex-col gap-5.25 rounded-lg border border-gray-300 p-4 lg:max-w-100',
      )}
    >
      <div className='scrollbar-hide flex max-h-70.75 flex-col gap-3.25 overflow-y-auto lg:max-h-98.5'>
        {items?.map((item) => (
          <div key={item.id} className={cn('flex justify-between')}>
            <div className={cn('flex items-center gap-2')}>
              <div className={cn('text-md')}>{item.name}</div>
              <div className={cn('text-xs font-medium')}>{item.quantity}</div>
            </div>
            <div>
              <div className={cn('text-md')}>{item.price.toLocaleString('ko-KR')}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={cn('flex justify-between border-t border-gray-300 pt-2.5')}>
        <div className='flex flex-col gap-1.5 text-sm font-semibold'>
          <p>총 금액</p>
          <p>할인 금액</p>
          <p>결제 금액</p>
        </div>
        <div className='text-md flex flex-col gap-1.5 font-semibold'>
          <div>{itemsTotalAmount?.toLocaleString('ko-KR')}</div>
          {discountAmount && <div>{discountAmount?.toLocaleString('ko-KR')}</div>}
          <div>{totalAmount?.toLocaleString('ko-KR')}</div>
        </div>
      </div>
    </div>
  );
}
