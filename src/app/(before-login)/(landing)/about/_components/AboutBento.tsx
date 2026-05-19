import Icon from '@/components/Icon';

interface AboutBentoProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxGrid: number;
}

export default function AboutBento({ revealClass, setRef, idxTitle, idxGrid }: AboutBentoProps) {
  return (
    <section className='bg-[#F8FAFC] px-6 py-24'>
      <div className='mx-auto max-w-270'>
        <div
          ref={(el) => setRef(el as HTMLElement, idxTitle)}
          className={`${revealClass} mb-14 max-w-140`}
        >
          <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
            핵심 기능
          </div>
          <h2
            className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            필요한 것만,
            <br />딱 맞게 갖췄습니다
          </h2>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxGrid)}
          className={`${revealClass} grid grid-cols-1 gap-4 md:grid-cols-12`}
        >
          <div className='bento-card col-span-1 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:col-span-7'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]'>
                <Icon name='building' size={22} />
              </div>
              <div className='inline-block rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]'>
                워크스페이스
              </div>
            </div>
            <h3 className='mb-3 text-[20px] font-bold text-[#0F172A] md:font-extrabold'>
              팀마다 독립된 공간
            </h3>
            <p className='mb-6 text-[14px] leading-[1.75] text-[#475569]'>
              부서, 소모임, 동아리 등 목적에 맞는 워크스페이스를 만들고 색상으로 구분하세요. 여러
              팀을 동시에 운영하며 각각 독립적으로 영수증을 관리할 수 있습니다.
            </p>
            <div className='rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4'>
              <div className='grid grid-cols-3 gap-2 truncate'>
                {[
                  { color: '#2563EB', name: '기획팀' },
                  { color: '#F59E0B', name: '학생회' },
                  { color: '#10B981', name: '밴드부' },
                ].map((ws) => (
                  <div
                    key={ws.name}
                    className='flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-[12px] font-medium text-[#333236] md:font-semibold'
                  >
                    <span
                      className='h-2 w-2 shrink-0 rounded-full'
                      style={{ background: ws.color }}
                    />
                    {ws.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='bento-card col-span-1 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:col-span-5'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]'>
                <Icon name='mail' size={22} />
              </div>
              <div className='inline-block rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]'>
                팀원 초대
              </div>
            </div>
            <h3 className='mb-3 text-[20px] font-bold text-[#0F172A] md:font-extrabold'>
              이메일 한 줄로 초대
            </h3>
            <p className='text-[14px] leading-[1.75] text-[#475569]'>
              이메일만 입력하면 초대장이 전송됩니다. 수락·거절은 팀원이 직접 결정하고, 중복 초대는
              자동으로 차단됩니다.
            </p>
            <div className='mt-5 flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3'>
              <div className='h-2 w-2 rounded-full bg-[#10B981]' />
              <span className='text-[12px] text-[#475569]'>team@company.com</span>
              <div className='ml-auto rounded-lg bg-[#2563EB] px-3 py-1 text-[11px] font-semibold text-white md:font-bold'>
                초대
              </div>
            </div>
          </div>

          <div className='bento-card col-span-1 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:col-span-5'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]'>
                <Icon name='scan' size={22} />
              </div>
              <div className='inline-block rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]'>
                OCR 스캔
              </div>
            </div>
            <h3 className='mb-3 text-[20px] font-bold text-[#0F172A] md:font-extrabold'>
              사진 한 장, 자동 인식
            </h3>
            <p className='text-[14px] leading-[1.75] text-[#475569]'>
              영수증 사진을 올리면 결제일·가맹점·금액·품목을 자동으로 읽어옵니다. 잘못된 정보는 바로
              수정할 수 있어요.
            </p>
            <div className='mt-5 overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3'>
              <div className='mb-2 text-center text-[10px] font-black tracking-[.06em] text-[#94A3B8]'>
                RECEIPT
              </div>
              {['70%', '50%', '85%', '60%'].map((w, i) => (
                <div
                  key={i}
                  className='mb-1.5 h-1.5 rounded-full bg-[#E2E8F0]'
                  style={{ width: w }}
                />
              ))}
              <div className='mt-3 flex items-center justify-between rounded-lg bg-[#EFF6FF] px-3 py-2'>
                <span className='text-[11px] font-medium text-[#2563EB] md:font-semibold'>
                  카페 A · ₩34,800
                </span>
                <span className='flex items-center gap-1 text-[10px] font-semibold text-[#10B981] md:font-bold'>
                  <Icon name='checkCircle' size={12} />
                  인식 완료
                </span>
              </div>
            </div>
          </div>

          <div className='bento-card col-span-1 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:col-span-7'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]'>
                <Icon name='shield' size={22} />
              </div>
              <div className='inline-block rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]'>
                승인 관리
              </div>
            </div>
            <h3 className='mb-3 text-[20px] font-bold text-[#0F172A] md:font-extrabold'>
              관리자만 승인·반려 권한 보유
            </h3>
            <p className='mb-6 text-[14px] leading-[1.75] text-[#475569]'>
              AI가 미리 의심 태그를 붙여 놓으면 관리자가 집중 검토합니다. 반려 시 사유를 작성하면
              팀원에게 명확한 피드백이 전달됩니다.
            </p>
            <div className='flex flex-col gap-2'>
              {[
                {
                  name: '김민준',
                  store: '카페 A',
                  amount: '₩34,800',
                  status: '승인',
                  statusBg: 'bg-[#E4FBDC]',
                  statusText: 'text-[#2BA600]',
                  tag: null,
                },
                {
                  name: '이소영',
                  store: '편의점 B',
                  amount: '₩26,300',
                  status: '대기',
                  statusBg: 'bg-[#FFF8C1]',
                  statusText: 'text-[#A69300]',
                  tag: {
                    label: '심야 결제',
                    bg: 'bg-[#FFF8C1]',
                    text: 'text-[#A69300]',
                    border: 'border-[#FDE68A]',
                  },
                },
                {
                  name: '박지호',
                  store: '식당 C',
                  amount: '₩86,000',
                  status: '반려',
                  statusBg: 'bg-[#FFE4E4]',
                  statusText: 'text-[#CA2323]',
                  tag: {
                    label: '유흥업소 의심',
                    bg: 'bg-[#FFE4E4]',
                    text: 'text-[#CA2323]',
                    border: 'border-[#FECACA]',
                  },
                },
              ].map((row) => (
                <div
                  key={row.name}
                  className='flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5'
                >
                  <div className='flex min-w-0 items-center gap-2'>
                    <div className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#94A3B8]' />
                    <span className='text-[12px] font-medium text-[#333236] md:font-semibold'>
                      {row.name}
                    </span>
                    <span className='text-[11px] text-[#94A3B8]'>{row.store}</span>
                    {row.tag && (
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium sm:hidden md:block md:font-bold ${row.tag.bg} ${row.tag.text} ${row.tag.border}`}
                      >
                        {row.tag.label}
                      </span>
                    )}
                  </div>
                  <div className='flex shrink-0 items-center gap-2'>
                    <span className='text-[12px] font-medium text-[#333236] md:font-semibold'>
                      {row.amount}
                    </span>
                    <span
                      className={`hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline-block md:font-bold ${row.statusBg} ${row.statusText}`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bento-card col-span-1 rounded-2xl border border-[#E2E8F0] bg-linear-to-r from-[#EFF6FF] to-[#F0F4FF] p-8 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:col-span-12'>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white'>
                  <Icon name='download' size={24} />
                </div>
                <div>
                  <h3 className='text-[18px] font-bold text-[#0F172A] md:font-extrabold'>
                    CSV 일괄 다운로드
                  </h3>
                  <p className='mt-1 text-[14px] text-[#475569]'>
                    승인 완료된 영수증 목록을 한 번에 내보내 회계·정산을 간편하게 마무리하세요.
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-2 rounded-xl border border-[#2563EB]/20 bg-white px-5 py-3 shadow-sm'>
                <Icon name='download' size={18} className='text-[#2563EB]' />
                <span className='text-[13px] font-semibold text-[#2563EB] md:font-bold'>
                  receipts_2026.csv
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
