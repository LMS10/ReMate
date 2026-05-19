export default function UploadMockPanel() {
  return (
    <div className='relative w-full max-w-105'>
      <div
        className='pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full'
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
      />

      <div className='overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_16px_56px_rgba(15,23,42,0.12)]'>
        <div className='flex h-9 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3'>
          <span className='h-2.5 w-2.5 rounded-full bg-[#FF5F57]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#FEBC2E]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#28C840]' />
          <span className='ml-2 text-[11px] font-medium text-[#94A3B8]'>영수증 업로드</span>
        </div>

        <div className='flex min-h-85'>
          <div className='flex w-[44%] flex-col items-center justify-center border-r border-[#E2E8F0] bg-[#F8FAFC] px-4 py-5'>
            <div className='w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-5 shadow-sm'>
              <div className='mb-2 text-center text-[11px] font-black tracking-[.08em] text-[#333236]'>
                RECEIPT
              </div>
              <div className='mb-2 text-center text-[8px] text-[#94A3B8]'>★★★</div>
              <div className='mb-2 h-px w-full bg-[#E2E8F0]' />
              {[
                { w: '85%' },
                { w: '60%' },
                { w: '75%' },
                { w: '90%' },
                { w: '55%' },
                { w: '70%' },
                { w: '80%' },
                { w: '65%' },
              ].map((line, i) => (
                <div
                  key={i}
                  className='mb-1.5 h-1.25 rounded-full bg-[#EEEEEE]'
                  style={{ width: line.w }}
                />
              ))}
              <div className='mt-3 mb-2 h-px w-full border-t border-dashed border-[#E2E8F0]' />
              <div className='text-left text-[9px] font-medium text-[#94A3B8]'>Total:</div>
              <div className='mt-1 h-1.25 w-[60%] rounded-full bg-[#EEEEEE]' />
            </div>

            <div className='mt-3 w-full'>
              <div className='mb-1 flex items-center justify-between'>
                <span className='text-[10px] font-semibold text-[#94A3B8]'>AI 분석 완료</span>
                <span className='text-[10px] font-bold text-[#2563EB]'>100%</span>
              </div>
              <div className='h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]'>
                <div className='h-full w-full rounded-full bg-[#2563EB]' />
              </div>
            </div>
          </div>

          <div className='flex-1 px-3 py-11 md:px-4'>
            <div className='grid grid-cols-2 gap-x-3 gap-y-4'>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>게시자</div>
                <div className='flex items-center gap-1.5'>
                  <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEEE] text-[9px] font-semibold text-[#787486]'>
                    김
                  </div>
                  <span className='text-[11px] font-medium md:font-semibold'>김승호</span>
                </div>
              </div>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>결제일</div>
                <div className='text-[11px] font-medium md:font-semibold'>2026-05-20 19:00</div>
              </div>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>AI 분석 결과</div>
                <span className='inline-block rounded-full border border-[#FECACA] bg-[#FFE4E4] px-2.5 py-0.5 text-[10px] font-medium text-[#CA2323] md:font-semibold'>
                  분할결제 의심
                </span>
              </div>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>가맹점</div>
                <div className='text-[11px] font-medium md:font-semibold'>카페 A</div>
              </div>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>상태</div>
                <span className='inline-flex items-center gap-1 rounded-full bg-[#FFF8C1] px-2 py-0.5 text-[10px] font-medium text-[#A69300] md:font-semibold'>
                  <span className='h-0.75 w-0.75 rounded-full bg-[#A69300]' />
                  대기
                </span>
              </div>
              <div>
                <div className='mb-1 text-[9px] font-semibold text-[#94A3B8]'>결제금액</div>
                <div className='text-[12px] font-medium text-[#0F172A] md:font-semibold'>
                  ₩50,000
                </div>
              </div>
            </div>
            <div className='mt-5 flex gap-2'>
              <button className='flex-1 rounded-lg border border-[#E2E8F0] py-1.25 text-[11px] font-medium text-[#787486] md:font-semibold'>
                취소
              </button>
              <button className='flex-1 rounded-lg bg-[#2563EB] py-1.25 text-[11px] font-medium text-white md:font-semibold'>
                저장
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 flex justify-center'>
        <div className='flex items-center gap-1.5 rounded-full border border-[#FFE4E4] bg-white px-3 py-1.5 shadow-sm'>
          <span className='h-1.5 w-1.5 rounded-full bg-[#CA2323]' />
          <span className='text-[11px] font-semibold text-[#CA2323]'>
            AI가 분할결제 의심 감지 — 관리자 검토 필요
          </span>
        </div>
      </div>
    </div>
  );
}
