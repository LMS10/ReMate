import Icon from '@/components/Icon';

interface AiChipProps {
  label: string;
  variant: 'warn' | 'danger' | 'ok';
}

function AiChip({ label, variant }: AiChipProps) {
  const styles = {
    warn: 'bg-[#FFF8C1] text-[#A69300] border-[#FDE68A]',
    danger: 'bg-[#FFE4E4] text-[#CA2323] border-[#FECACA]',
    ok: 'bg-[#E4FBDC] text-[#2BA600] border-[#BBF7D0]',
  };
  return (
    <span
      className={`inline-block rounded-full border px-3 py-0.5 text-[12px] font-semibold ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

const PATTERNS = [
  {
    code: 'NIGHT_PAYMENT',
    label: '심야 결제',
    variant: 'warn' as const,
    rule: '23시 이후 ~ 06시 이전',
    detail: '업무 시간 외 결제를 자동으로 분류해 검토합니다.',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
  },
  {
    code: 'HOLIDAY_PAYMENT',
    label: '공휴일 결제',
    variant: 'warn' as const,
    rule: '법정 공휴일 및 대체 공휴일',
    detail: '휴일에 발생한 결제를 자동으로 표시해 관리합니다.',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
  },
  {
    code: 'SUSPICIOUS_ENTERTAINMENT',
    label: '유흥업소 의심',
    variant: 'danger' as const,
    rule: '업종 분류 + 상호명 키워드 2중 검증',
    detail: '유흥·주류 업종으로 추정되는 결제를 분류합니다.',
    bg: 'bg-[#FFF5F5]',
    border: 'border-[#FECACA]',
  },
  {
    code: 'SPLIT_PAYMENT_SUSPICIOUS',
    label: '분할 결제',
    variant: 'danger' as const,
    rule: '30분 이내 동일 상호 2건 이상',
    detail: '여러 건으로 나누어진 결제를 자동으로 감지합니다.',
    bg: 'bg-[#FFF5F5]',
    border: 'border-[#FECACA]',
  },
] as const;

interface AboutAiDetectProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxContent: number;
}

export default function AboutAiDetect({
  revealClass,
  setRef,
  idxTitle,
  idxContent,
}: AboutAiDetectProps) {
  return (
    <section className='bg-white px-6 py-24'>
      <div className='mx-auto max-w-270'>
        <div ref={(el) => setRef(el as HTMLElement, idxTitle)} className={`${revealClass} mb-14`}>
          <div className='mb-4 inline-block rounded-full bg-[#F5F3FF] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#7C3AED] uppercase md:font-bold'>
            AI 자동 감지
          </div>
          <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <h2
              className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
              style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
            >
              AI가 먼저 걸러냅니다,
              <br />
              최종 판단은 관리자가 합니다
            </h2>
            <p className='max-w-100 shrink-0 text-[15px] leading-[1.75] text-[#475569]'>
              영수증이 등록되는 순간 AI가 4가지 부적절 패턴을 자동 분석합니다. AI는 의심 태그와 판단
              근거만 제시하고, 최종 승인·반려 결정은 관리자가 직접 내립니다.
            </p>
          </div>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxContent)}
          className={`${revealClass} grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]`}
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {PATTERNS.map((p) => (
              <div key={p.code} className={`rounded-2xl border p-6 ${p.bg} ${p.border}`}>
                <div className='mb-3 flex items-center gap-2'>
                  <AiChip label={p.label} variant={p.variant} />
                </div>
                <div className='mb-1 text-[14px] font-bold text-[#0F172A]'>{p.rule}</div>
                <div className='text-[12px] leading-[1.65] text-[#475569]'>{p.detail}</div>
              </div>
            ))}

            <div className='col-span-1 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:col-span-2'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF]'>
                  <Icon name='shield' size={22} className='text-[#7C3AED]' />
                </div>
                <div>
                  <div className='text-[14px] font-bold text-[#0F172A]'>
                    AI는 분석, 결정은 관리자
                  </div>
                  <div className='mt-1 text-[13px] leading-[1.65] text-[#475569]'>
                    AI가 영수증 데이터를 분석해 검토가 필요한 결제를 빠르게 찾아냅니다. 의심 태그와
                    판단 근거를 함께 제공해 관리자가 더 빠르게 검토할 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]'>
              <div className='flex h-9 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3'>
                <span className='h-2.5 w-2.5 rounded-full bg-[#FF5F57]' />
                <span className='h-2.5 w-2.5 rounded-full bg-[#FEBC2E]' />
                <span className='h-2.5 w-2.5 rounded-full bg-[#28C840]' />
                <span className='ml-3 text-[11px] font-medium text-[#94A3B8]'>영수증 상세</span>
              </div>

              <div className='flex gap-0'>
                <div className='flex-1 p-5'>
                  <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>게시자</div>
                      <div className='flex items-center gap-1.5'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEEE] text-[9px] font-semibold text-[#787486]'>
                          김
                        </div>
                        <span className='text-[12px] font-medium md:font-semibold'>김민준</span>
                      </div>
                    </div>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>결제일</div>
                      <div className='text-[12px] font-medium md:font-semibold'>
                        2026-05-05 23:30
                      </div>
                    </div>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>
                        AI 분석 결과
                      </div>
                      <span className='inline-block rounded-full border border-[#FECACA] bg-[#FFE4E4] px-2.5 py-0.5 text-[11px] font-medium text-[#CA2323] md:font-semibold'>
                        심야/공휴일 결제
                      </span>
                    </div>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>가맹점</div>
                      <div className='text-[12px] font-medium md:font-semibold'>카페 A</div>
                    </div>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>상태</div>
                      <span className='inline-flex items-center gap-1 rounded-full bg-[#FFF8C1] px-2.5 py-0.5 text-[11px] font-medium text-[#A69300] md:font-semibold'>
                        <span className='h-0.75 w-0.75 rounded-full bg-[#A69300]' />
                        대기
                      </span>
                    </div>
                    <div>
                      <div className='mb-1 text-[10px] font-semibold text-[#94A3B8]'>결제금액</div>
                      <div className='text-[13px] font-medium text-[#0F172A] md:font-semibold'>
                        ₩34,800
                      </div>
                    </div>
                  </div>

                  <div className='mt-5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2'>
                    <div className='mb-1 text-[10px] font-semibold text-[#A69300]'>
                      AI 판단 근거
                    </div>
                    <div className='text-[11px] leading-[1.6] text-[#475569]'>
                      공휴일(2026-05-05) 23시 30분 결제 건으로 심야·공휴일 패턴에 해당합니다.
                    </div>
                  </div>

                  <div className='mt-5 flex gap-2'>
                    <button className='flex-1 rounded-lg bg-[#2563EB] py-1.75 text-[12px] font-semibold text-white md:font-bold'>
                      승인
                    </button>
                    <button className='flex-1 rounded-lg border border-[#E2E8F0] py-1.75 text-[12px] font-semibold text-[#475569]'>
                      반려
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
