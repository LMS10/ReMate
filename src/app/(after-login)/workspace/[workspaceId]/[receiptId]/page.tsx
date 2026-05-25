'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useGetMe } from '@/apis/auth/auth.queries';
import {
  useDeleteReceipt,
  useExportSelectedReceipts,
  useGetReceiptDetail,
  useGetReceiptFile,
} from '@/apis/receipt/receipt.queries';
import { useGetWorkspace } from '@/apis/workspace/workspace.queries';
import Button from '@/components/Buttons';
import ConfirmModal from '@/components/modal/contents/ConfirmModal';
import Modal from '@/components/modal/Modal';
import ReceiptItemInfo from '@/components/ReceiptItemInfo';
import ReceiptPayInfo from '@/components/ReceiptPayInfo';

export default function Page() {
  const params = useParams<{ receiptId: string; workspaceId: string }>();
  const router = useRouter();

  const {
    data: detailData,
    isLoading,
    isError,
    error,
  } = useGetReceiptDetail(Number(params.receiptId), Number(params.workspaceId));
  const { data: wsData } = useGetWorkspace(Number(params.workspaceId));
  const { data: meData } = useGetMe();
  const isAdmin = wsData?.data.role === 'ADMIN';

  const fileAssetId = detailData?.data.fileAssetId;
  const { data: imageUrl } = useGetReceiptFile(fileAssetId);

  const { mutate: exportSelected, isPending: isExporting } = useExportSelectedReceipts();
  const { mutateAsync: deleteReceipt } = useDeleteReceipt();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const receipt = detailData?.data;
  const isMyReceipt = receipt?.userId === meData?.data.id;
  const isWaiting = receipt?.status === 'WAITING';
  const canDelete = isMyReceipt && isWaiting;

  function handleDownload() {
    exportSelected(
      { receiptIds: [Number(params.receiptId)], workspaceId: Number(params.workspaceId) },
      { onError: (err) => toast.error(err.message || '영수증 다운로드 중 오류가 발생했습니다.') },
    );
  }

  async function handleDeleteConfirm() {
    try {
      await deleteReceipt({
        id: Number(params.receiptId),
        workspaceId: Number(params.workspaceId),
      });
      router.push(`/workspace/${params.workspaceId}`);
      toast.success('영수증이 삭제되었습니다.');
    } catch {
      toast.error('영수증 삭제에 실패했습니다.');
      throw new Error();
    }
  }

  if (isLoading) {
    return (
      <div className='m-6 flex flex-col gap-5 rounded-lg bg-white p-6 md:m-10 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='h-7 w-24 animate-pulse rounded bg-gray-200' />
          <div className='h-8 w-20 animate-pulse rounded bg-gray-200' />
        </div>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-stretch'>
          <div className='min-h-64 flex-1 animate-pulse rounded-xl bg-gray-100' />
          <div className='flex flex-col gap-4'>
            <div className='min-w-[236.5px] rounded-lg border border-gray-200 p-4 lg:w-100'>
              <div className='grid gap-4 lg:grid-cols-2'>
                <div className='flex flex-col gap-4'>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className='flex flex-col gap-1.5'>
                      <div className='h-3 w-14 animate-pulse rounded bg-gray-200' />
                      <div className='h-6 w-24 animate-pulse rounded bg-gray-200' />
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-4'>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className='flex flex-col gap-1.5'>
                      <div className='h-3 w-10 animate-pulse rounded bg-gray-200' />
                      <div className='h-5 w-28 animate-pulse rounded bg-gray-200' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='min-w-57.75 rounded-lg border border-gray-200 p-4 lg:max-w-100'>
              <div className='flex flex-col gap-3.25'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='flex justify-between'>
                    <div className='h-4 w-32 animate-pulse rounded bg-gray-200' />
                    <div className='h-4 w-14 animate-pulse rounded bg-gray-200' />
                  </div>
                ))}
              </div>
              <div className='mt-5.25 border-t border-gray-200 pt-2.5'>
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-1.5'>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className='h-4 w-14 animate-pulse rounded bg-gray-200' />
                    ))}
                  </div>
                  <div className='flex flex-col items-end gap-1.5'>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className='h-4 w-16 animate-pulse rounded bg-gray-200' />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='md:text-md text-sm text-gray-400'>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className='m-6 flex flex-col gap-5 rounded-lg bg-white p-6 md:m-10 md:p-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-black-200 text-lg font-bold md:text-xl'>영수증 상세</h1>
        <div className='flex gap-1.5 md:gap-2'>
          {canDelete && (
            <Button
              group='sub'
              variant='white'
              size='sm'
              className='md:text-md w-17 md:h-8 md:w-21'
              onClick={() => setShowDeleteConfirm(true)}
            >
              삭제
            </Button>
          )}
          {isAdmin && (
            <Button
              group='sub'
              variant='blue'
              size='sm'
              className='md:text-md w-17 md:h-8 md:w-21'
              onClick={handleDownload}
              loading={isExporting}
            >
              다운로드
            </Button>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-4 lg:flex-row lg:items-stretch'>
        <div className='relative min-h-100 flex-1 overflow-hidden rounded-xl border border-gray-200 lg:w-105'>
          {imageUrl ? (
            <Image src={imageUrl} alt='영수증' fill unoptimized className='object-contain' />
          ) : (
            <div className='h-full w-full animate-pulse bg-gray-100' />
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <ReceiptPayInfo />
          <ReceiptItemInfo />
        </div>
      </div>

      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(false)}>
          <ConfirmModal
            message='영수증을 삭제하시겠습니까?'
            onConfirm={handleDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
          />
        </Modal>
      )}
    </div>
  );
}
