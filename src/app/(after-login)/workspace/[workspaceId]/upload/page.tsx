'use client';

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  useConfirmReceipt,
  useUpdateReceipt,
  useUploadReceipt,
} from '@/apis/receipt/receipt.queries';
import { ReceiptUploadResponse } from '@/apis/receipt/receipt.type';
import Button from '@/components/Buttons';
import Icon from '@/components/Icon';
import ConfirmModal from '@/components/modal/contents/ConfirmModal';
import Modal from '@/components/modal/Modal';
import ReceiptItemInfo from '@/components/ReceiptItemInfo';
import ReceiptPayInfo, { ReceiptPayInfoHandle } from '@/components/ReceiptPayInfo';
import { cn } from '@/utils/cn';

type Step = 'idle' | 'ready' | 'loading' | 'done';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState<ReceiptUploadResponse['data'] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const receiptPayInfoRef = useRef<ReceiptPayInfoHandle>(null);

  const { mutate: upload, isError, error } = useUploadReceipt();
  const { mutateAsync: update } = useUpdateReceipt();
  const { mutateAsync: confirm } = useConfirmReceipt();
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  function handleFileSelect(selected: File) {
    setFile(selected);
    setStep('ready');
    setIsDuplicate(false);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selected);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type.startsWith('image/')) {
      handleFileSelect(dropped);
    }
  }

  function handleUpload() {
    if (!file) return;
    setStep('loading');
    upload(
      { file, workspaceId: Number(params.workspaceId) },
      {
        onSuccess: (res) => {
          if (res.data.duplicate) {
            setIsDuplicate(true);
            setStep('ready');
            return;
          }
          setUploadData(res.data);
          setStep('done');
        },
        onError: () => {
          setStep('ready');
        },
      },
    );
  }

  async function handleSaveConfirm() {
    if (!uploadData) return;

    const editedValues = receiptPayInfoRef.current?.getEditedValues() ?? {
      storeName: uploadData.storeName,
      totalAmount: uploadData.totalAmount,
      tradeAt: uploadData.tradeAt,
    };

    try {
      await update({
        id: uploadData.id,
        workspaceId: Number(params.workspaceId),
        body: editedValues,
      });
    } catch {
      toast.error('영수증 저장에 실패했습니다.');
      throw new Error();
    }

    try {
      const res = await confirm({ id: uploadData.id, workspaceId: Number(params.workspaceId) });
      toast.success('저장되었습니다. 관리자 승인 후 처리됩니다.');
      router.push(`/workspace/${params.workspaceId}/${res.data.id}`);
    } catch {
      toast.error('영수증 저장에 실패했습니다.');
      throw new Error();
    }
  }

  function handleCancel() {
    setIsSaving(false);
    setStep('idle');
    setFile(null);
    setPreview(null);
    setUploadData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className='m-6 flex flex-col gap-5 rounded-lg bg-white p-6 md:m-10 md:p-8'>
      <h1 className='text-black-200 text-lg font-bold md:text-xl'>영수증 업로드</h1>

      <div className='flex flex-1 flex-col gap-4'>
        {(step === 'idle' || step === 'ready') && (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'flex min-h-100 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors',
                isDragging
                  ? 'border-blue-200 bg-blue-50'
                  : preview
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-200 hover:bg-blue-50',
              )}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt='영수증 미리보기'
                  width={500}
                  height={500}
                  className='max-h-94 max-w-full rounded-lg object-contain'
                />
              ) : (
                <>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200'>
                    <Icon name='upload' size={20} className='text-gray-500' />
                  </div>
                  <div className='text-center'>
                    <p className='md:text-md text-sm font-medium text-gray-700'>
                      파일을 클릭하거나 여기로 드래그하세요
                    </p>
                    <p className='mt-1 text-xs text-gray-400 md:text-sm'>PNG, JPG, JPEG 지원</p>
                  </div>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleInputChange}
            />

            {file && (
              <p className='text-xs text-gray-500 md:text-sm'>
                선택된 파일: <span className='font-medium text-gray-700'>{file.name}</span>
              </p>
            )}

            {isError && (
              <p className='text-xs text-red-500 md:text-sm'>
                {error?.message ?? '업로드에 실패했습니다.'}
              </p>
            )}
            {isDuplicate && (
              <p className='text-xs text-red-500 md:text-sm'>이미 등록된 영수증입니다.</p>
            )}

            <Button
              group='main'
              variant='primary'
              size='lg'
              className='w-full'
              disabled={step !== 'ready'}
              onClick={handleUpload}
            >
              AI 분석 시작하기
            </Button>
          </>
        )}

        {step === 'loading' && (
          <div className='flex flex-1 flex-col items-center justify-center gap-6 py-16'>
            {preview && (
              <Image
                src={preview}
                alt='영수증 미리보기'
                width={144}
                height={192}
                className='max-h-48 max-w-xs rounded-xl object-contain'
              />
            )}
            <div className='flex w-full max-w-xs flex-col items-center gap-3'>
              <p className='md:text-md text-sm font-medium text-gray-700'>
                AI가 영수증을 분석하고 있어요
              </p>
              <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-200'>
                <div className='h-full animate-[loading_1.6s_ease-in-out_infinite] rounded-full bg-blue-200' />
              </div>
              <p className='text-xs text-gray-400 md:text-sm'>잠시만 기다려주세요...</p>
            </div>
          </div>
        )}

        {step === 'done' && uploadData && (
          <>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-stretch'>
              {preview && (
                <div className='relative min-h-100 flex-1 overflow-hidden rounded-xl border border-gray-200 lg:w-105'>
                  <Image src={preview} alt='영수증' fill className='object-contain' />
                </div>
              )}
              <div className='flex flex-col gap-4'>
                <ReceiptPayInfo ref={receiptPayInfoRef} editable uploadData={uploadData} />
                <ReceiptItemInfo editable uploadData={uploadData} />
                <div className='mt-auto flex gap-3 lg:justify-end'>
                  <Button
                    group='main'
                    variant='secondary'
                    size='md'
                    className='h-10 flex-1 md:h-11.5'
                    disabled={isSaving}
                    onClick={handleCancel}
                  >
                    취소
                  </Button>
                  {showSaveConfirm && (
                    <Modal onClose={() => setShowSaveConfirm(false)}>
                      <ConfirmModal
                        message='영수증을 저장하시겠습니까?'
                        onConfirm={handleSaveConfirm}
                        onClose={() => setShowSaveConfirm(false)}
                      />
                    </Modal>
                  )}
                  <Button
                    group='main'
                    variant='primary'
                    size='md'
                    className='h-10 flex-1 md:h-11.5'
                    loading={isSaving}
                    onClick={() => setShowSaveConfirm(true)}
                  >
                    저장
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
