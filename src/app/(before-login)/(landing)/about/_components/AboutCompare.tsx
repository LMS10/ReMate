import Icon from '@/components/Icon';

interface AboutCompareProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxTable: number;
}

const ROWS: { label: string; before: boolean; note?: string }[] = [
  { label: '영수증 보관', before: false },
  { label: 'OCR 기반 영수증 데이터 추출', before: false },
  { label: '승인·반려 워크플로', before: false },
  { label: 'AI 부적절 결제 자동 감지', before: false },
  { label: 'AI 판단 근거 문장 제공', before: false },
  { label: '지출 이력 투명화', before: false },
  { label: '팀원 권한 분리', before: false },
  { label: 'CSV 일괄 다운로드', before: false },
];

function CheckCell({ ok }: { ok: boolean }) {
  return (
    <span className='flex justify-center'>
      {ok ? (
        <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#E4FBDC] text-[#2BA600]'>
          <Icon name='checkCircle' size={14} />
        </span>
      ) : (
        <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE4E4] text-[#CA2323]'>
          <Icon name='close' size={14} />
        </span>
      )}
    </span>
  );
}

export default function AboutCompare({
  revealClass,
  setRef,
  idxTitle,
  idxTable,
}: AboutCompareProps) {
  return (
    <section className='bg-[#F8FAFC] px-6 py-24'>
      <div className='mx-auto max-w-190'>
        <div
          ref={(el) => setRef(el as HTMLElement, idxTitle)}
          className={`${revealClass} mb-12 text-center`}
        >
          <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
            기존 방식과 비교
          </div>
          <h2
            className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            이렇게 달라집니다
          </h2>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxTable)}
          className={`${revealClass} overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.07)]`}
        >
          <div className='grid grid-cols-[1fr_80px_80px] border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-[12px] font-bold text-[#94A3B8] md:grid-cols-[1fr_120px_120px] md:px-6'>
            <span>항목</span>
            <span className='text-center text-[#CA2323]'>기존 방식</span>
            <span className='text-center text-[#2563EB]'>Re:Mate</span>
          </div>

          {ROWS.map((row) => (
            <div
              key={row.label}
              className='grid grid-cols-[1fr_80px_80px] items-center border-b border-[#E2E8F0] px-4 py-3.5 last:border-b-0 md:grid-cols-[1fr_120px_120px] md:px-6'
            >
              <span className='text-[13px] font-medium text-[#333236] md:text-[14px]'>
                {row.label}
                {row.note && (
                  <span className='ml-2 hidden rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-bold text-[#7C3AED] sm:inline-block'>
                    {row.note}
                  </span>
                )}
              </span>
              <CheckCell ok={row.before} />
              <CheckCell ok={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
