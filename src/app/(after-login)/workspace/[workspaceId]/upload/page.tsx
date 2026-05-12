'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useUploadReceipt } from '@/apis/receipt/receipt.queries';
import { ReceiptUploadResponse } from '@/apis/receipt/receipt.type';
import ReceiptPayInfo from '@/components/ReceiptPayInfo';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<ReceiptUploadResponse['data'] | null>(null);
  const params = useParams<{ workspaceId: string }>();
  const { mutate: upload, isPending, isError, error } = useUploadReceipt();

  function handleUpload() {
    if (!file) return;
    upload(
      { file, workspaceId: Number(params.workspaceId) },
      {
        onSuccess: (res) => setUploadData(res.data),
      },
    );
  }

  return (
    <div className='p-8'>
      <h1>영수증 업로드 테스트</h1>
      <input
        className='bg-status-return-bg border border-gray-300'
        type='file'
        accept='image/*'
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button
        className='bg-status-approval-bg border border-gray-300'
        onClick={handleUpload}
        disabled={!file || isPending}
      >
        {isPending ? '분석 중...' : 'AI 분석 시작하기'}
      </button>
      {isError && <p>{error.message}</p>}
      {uploadData && <ReceiptPayInfo editable uploadData={uploadData} />}
    </div>
  );
}
