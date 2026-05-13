'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetReceiptStats,
  useGetReceiptList,
  useExportReceipts,
} from '@/apis/receipt/receipt.queries';
import { useGetWorkspace } from '@/apis/workspace/workspace.queries';
import { useGetWorkspaceMembers } from '@/apis/workspace/workspace.queries';
import Button from '@/components/Buttons';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import StatCard from '@/components/StatCard';
import StatusChip from '@/components/StatusChip';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

function toNullIfAll(value: string): string | null {
  return value === '전체' ? null : value;
}

const STATUS_OPTIONS = ['전체', '대기', '승인', '반려'];
const SORT_OPTIONS = ['최신순', '오래된순'];

const STATUS_MAP: Record<string, 'WAITING' | 'APPROVED' | 'REJECTED'> = {
  대기: 'WAITING',
  승인: 'APPROVED',
  반려: 'REJECTED',
};

const SORT_MAP: Record<string, 'LATEST' | 'OLDEST'> = {
  최신순: 'LATEST',
  오래된순: 'OLDEST',
};

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = Number(params.workspaceId);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const pageSize = isMobile ? 5 : 6;

  const [storeName, setStoreName] = useState('');
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const { data: workspaceData, isError: isWorkspaceError } = useGetWorkspace(workspaceId);
  const isAdmin = workspaceData?.data?.role === 'ADMIN';

  const { data: membersData, isError: isMembersError } = useGetWorkspaceMembers(
    workspaceId,
    'ACCEPTED',
  );
  const memberOptions = ['전체', ...(membersData?.data?.map((m) => m.name) ?? [])];
  const selectedMember =
    selectedMemberName != null
      ? membersData?.data?.find((m) => m.name === selectedMemberName)
      : undefined;

  const { data: statsData, isError: isStatsError } = useGetReceiptStats(workspaceId);

  useEffect(() => {
    setPage(0);
  }, [storeName, selectedMemberName, selectedStatus, selectedSort]);

  const listParams = {
    workspaceId,
    ...(storeName ? { storeName } : {}),
    ...(selectedMember ? { userId: selectedMember.userId } : {}),
    ...(selectedStatus && STATUS_MAP[selectedStatus] ? { status: STATUS_MAP[selectedStatus] } : {}),
    sort: selectedSort ? SORT_MAP[selectedSort] : 'LATEST',
    page,
    size: pageSize,
  };
  const { data: listData, isError: isListError } = useGetReceiptList(listParams);

  const { mutateAsync: exportReceipts, isPending: isExporting } = useExportReceipts();

  useEffect(() => {
    if (isWorkspaceError) toast.error('워크스페이스 정보를 불러오지 못했습니다.');
  }, [isWorkspaceError]);

  useEffect(() => {
    if (isMembersError) toast.error('멤버 목록을 불러오지 못했습니다.');
  }, [isMembersError]);

  useEffect(() => {
    if (isStatsError) toast.error('통계 정보를 불러오지 못했습니다.');
  }, [isStatsError]);

  useEffect(() => {
    if (isListError) toast.error('영수증 목록을 불러오지 못했습니다.');
  }, [isListError]);

  const stats = statsData?.data;
  const receipts = listData?.data ?? [];
  const totalPages = listData?.totalPages ?? 1;

  const handleDownloadClick = async () => {
    try {
      await exportReceipts(workspaceId);
      toast.success('다운로드가 완료되었습니다.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '다운로드에 실패했습니다.');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium transition-colors md:h-8 md:w-8',
            i === page
              ? 'bg-blue-200 text-white'
              : 'text-black-200 hover:cursor-pointer hover:bg-gray-100',
          )}
        >
          {i + 1}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className='flex flex-col gap-8 overflow-visible p-6 md:gap-10 md:p-10'>
      <section className='rounded-lg bg-white p-3.5 md:p-4.5 lg:px-8.75 lg:py-6.5'>
        <div className='grid gap-2.5 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-5.5'>
          <StatCard name='총 영수증' total={stats?.totalCount ?? 0} />
          <StatCard name='승인 대기' total={stats?.pendingCount ?? 0} />
          <StatCard name='승인 완료' total={stats?.approvedCount ?? 0} />
          <StatCard name='반려' total={stats?.rejectedCount ?? 0} />
        </div>
      </section>

      <section className='flex flex-col gap-3 overflow-visible rounded-lg bg-white p-3.5 md:gap-5 md:p-4.5 lg:px-8.75 lg:py-6.5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-bold md:text-xl'>영수증 목록</h2>
          <div className='flex gap-1.5 md:gap-2'>
            {isAdmin && (
              <Button
                group='sub'
                variant='blue'
                size='sm'
                className='md:text-md w-17 md:h-8 md:w-17.5'
                onClick={handleDownloadClick}
                loading={isExporting}
              >
                다운로드
              </Button>
            )}
            <Button
              group='sub'
              variant='blue'
              size='sm'
              className='md:text-md w-14.25 md:h-8 md:w-14.75'
              onClick={() => router.push(`/workspace/${workspaceId}/upload`)}
            >
              업로드
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:items-center'>
          <div className='w-full md:flex-1'>
            <Input
              type='search'
              placeholder='가맹점 검색'
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className='w-full'
            />
          </div>
          <div className='flex gap-2 overflow-visible'>
            <Dropdown
              options={memberOptions}
              value={selectedMemberName}
              onSelect={(v) => setSelectedMemberName(toNullIfAll(v))}
              placeholder='게시자'
              variant='default'
            />
            <Dropdown
              options={STATUS_OPTIONS}
              value={selectedStatus}
              onSelect={(v) => setSelectedStatus(toNullIfAll(v))}
              placeholder='상태'
              variant='status'
            />
            <Dropdown
              options={SORT_OPTIONS}
              value={selectedSort}
              onSelect={(v) => setSelectedSort(v)}
              placeholder='최신순'
              variant='status'
            />
          </div>
        </div>

        <div className='hidden md:block'>
          <table className='w-full table-fixed text-sm md:text-base'>
            <thead>
              <tr className='text-black-200 border-b border-gray-200 text-left'>
                <th className='w-[18%] pb-4 text-lg font-medium text-gray-400'>게시자</th>
                <th className='w-[32%] pb-4 text-lg font-medium text-gray-400'>가맹점</th>
                <th className='w-[16%] pb-4 text-lg font-medium text-gray-400'>금액</th>
                <th className='w-[16%] pb-4 text-lg font-medium text-gray-400'>상태</th>
                <th className='w-[18%] pb-4 text-lg font-medium text-gray-400'>게시일</th>
              </tr>
            </thead>
            <tbody>
              {receipts.length === 0 ? (
                <tr>
                  <td colSpan={5} className='text-md py-10 text-center text-gray-400'>
                    영수증이 없습니다.
                  </td>
                </tr>
              ) : (
                receipts.map((receipt) => (
                  <tr
                    key={receipt.id}
                    className='text-black-200 cursor-pointer border-b border-gray-100 hover:bg-gray-50'
                    onClick={() => router.push(`/workspace/${workspaceId}/${receipt.id}`)}
                  >
                    <td className='truncate py-3.5 pr-4'>{receipt.userName}</td>
                    <td className='truncate py-3.5 pr-4'>{receipt.storeName}</td>
                    <td className='py-3.5 pr-4'>₩{receipt.totalAmount.toLocaleString()}</td>
                    <td className='py-3.5 pr-4'>
                      <StatusChip status={receipt.status} />
                    </td>
                    <td className='py-3.5 text-gray-500'>{receipt.createdAt.slice(0, 10)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col md:hidden'>
          {receipts.length === 0 ? (
            <p className='py-10 text-center text-sm text-gray-400'>영수증이 없습니다.</p>
          ) : (
            receipts.map((receipt, idx) => (
              <div
                key={receipt.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 py-3.5',
                  idx !== receipts.length - 1 && 'border-b border-gray-100',
                )}
                onClick={() => router.push(`/workspace/${workspaceId}/${receipt.id}`)}
              >
                <div className='flex flex-1 flex-col gap-1'>
                  <div className='flex items-center justify-between'>
                    <span className='text-black-200 text-md font-medium'>{receipt.storeName}</span>
                    <StatusChip status={receipt.status} />
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                    <span>{receipt.userName}</span>
                    <span className='text-gray-300'>|</span>
                    <span>₩{receipt.totalAmount.toLocaleString()}</span>
                    <span className='text-gray-300'>|</span>
                    <span>{receipt.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-1 pt-2'>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors md:h-8 md:w-8 ${
                page === 0 ? 'cursor-default opacity-30' : 'cursor-pointer hover:bg-gray-100'
              }`}
            >
              &lt;
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors md:h-8 md:w-8 ${
                page === totalPages - 1
                  ? 'cursor-default opacity-30'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
