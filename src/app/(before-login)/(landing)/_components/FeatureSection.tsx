import Icon from '@/components/Icon';
import CheckItem from './CheckItem';
import { WORKSPACE_CARDS, INVITED_WORKSPACES, RECEIPT_FIELDS, APPROVAL_RECEIPT } from './constants';
import { useReveal } from './useReveal';

type AiVariant = 'ok' | 'warn' | 'danger';

const AI_CHIP_STYLES: Record<AiVariant, string> = {
  ok: 'border-[#BBF7D0] bg-[#E4FBDC] text-[#2BA600]',
  warn: 'border-[#FDE68A] bg-[#FFF8C1] text-[#A69300]',
  danger: 'border-[#FECACA] bg-[#FFE4E4] text-[#CA2323]',
};

const AI_CHIP_LABEL: Record<AiVariant, string> = {
  ok: 'AI 분석 결과 적절',
  warn: APPROVAL_RECEIPT.aiResult,
  danger: APPROVAL_RECEIPT.aiResult,
};

function AiChip({ variant }: { variant: AiVariant }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-0.75 text-[11px] font-medium md:font-semibold ${AI_CHIP_STYLES[variant]}`}
    >
      {AI_CHIP_LABEL[variant]}
    </span>
  );
}

function ApprovalMock() {
  const r = APPROVAL_RECEIPT;

  return (
    <div className='overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]'>
      <div className='flex h-9 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3'>
        <span className='h-2.5 w-2.5 rounded-full bg-[#FF5F57]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#FEBC2E]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#28C840]' />
        <span className='ml-2 text-[11px] font-medium text-[#94A3B8]'>영수증 업로드</span>
      </div>

      <div className='flex'>
        <div className='flex w-[38%] flex-col items-center justify-center border-r border-[#E2E8F0] bg-[#F8FAFC] px-4 py-5'>
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
              { w: '75%' },
              { w: '85%' },
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
        </div>

        <div className='flex-1 px-4 py-4'>
          <div className='mb-3 grid grid-cols-2 gap-3'>
            <div>
              <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
                게시자
              </div>
              <div className='flex items-center gap-1.5'>
                <div
                  className='flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-[#787486]'
                  style={{ background: r.posterColor }}
                >
                  {r.posterInitial}
                </div>
                <span className='text-[12px] font-medium text-[#333236] md:font-semibold'>
                  {r.poster}
                </span>
              </div>
            </div>
            <div>
              <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
                결제일
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-[11px] font-medium text-[#333236] md:font-semibold'>
                  {r.date}
                </span>
              </div>
            </div>
          </div>

          <div className='mb-3'>
            <div className='mb-1.5 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
              AI 분석 결과
            </div>
            <AiChip variant={r.aiVariant} />
          </div>

          <div className='mb-3 grid grid-cols-2 gap-3'>
            <div>
              <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
                가맹점
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-[12px] font-medium text-[#333236] md:font-semibold'>
                  {r.store}
                </span>
              </div>
            </div>
            <div>
              <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
                상태
              </div>
              <span className='inline-flex items-center gap-1 rounded-full bg-[#FFF8C1] px-2.5 py-1 text-[12px] font-medium text-[#A69300] md:font-semibold'>
                <span className='h-1 w-1 rounded-full bg-[#A69300]' />
                {r.status}
              </span>
            </div>
          </div>

          <div className='mb-3'>
            <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#9FA6B2] uppercase'>
              결제금액
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-[14px] font-medium text-[#333236] md:font-bold'>
                {r.amount}
              </span>
            </div>
          </div>

          <div className='mb-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5'>
            <div className='mb-1 text-[10px] font-bold text-[#A69300]'>AI 판단 근거</div>
            <div className='text-[11px] leading-[1.6] text-[#475569]'>{r.aiReason}</div>
          </div>

          <div className='mb-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5'>
            <div className='mb-1.5 text-[10px] font-semibold text-[#333236]'>반려 사유</div>
            <div className='text-[11px] text-[#9FA6B2]'>
              유흥업소 관련 지출은 승인이 어렵습니다.
            </div>
          </div>

          <div className='flex gap-2'>
            <button className='flex-1 rounded-lg border border-[#E2E8F0] py-2 text-[11px] font-semibold text-[#787486]'>
              취소
            </button>
            <button className='flex-1 rounded-lg bg-[#2563EB] py-2 text-[11px] font-semibold text-white'>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureSection() {
  const f1Ref = useReveal();
  const f2Ref = useReveal();
  const f3Ref = useReveal();

  return (
    <section className='px-6 py-15 md:py-25'>
      <div className='mx-auto max-w-270'>
        <div
          ref={f1Ref}
          className='reveal-el mb-20 grid grid-cols-1 items-center gap-8 md:mb-30 md:grid-cols-2 md:gap-20'
        >
          <div>
            <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
              워크스페이스
            </div>
            <h2
              className='mb-4 leading-[1.2] font-extrabold tracking-[-0.02em] md:font-black'
              style={{ fontSize: 'clamp(28px,4vw,44px)' }}
            >
              팀마다
              <br />
              별도의 공간으로
            </h2>
            <p className='max-w-125 text-[16px] leading-[1.7] text-[#475569] md:text-[17px]'>
              동아리, 회사 부서, 여행 모임 등 목적에 맞는 워크스페이스를 만들고,{' '}
              <br className='hidden md:block' />
              팀원을 초대해 영수증을 함께 관리하세요.
            </p>
            <ul className='mt-6 flex flex-col gap-2.5'>
              <CheckItem>워크스페이스별 색상으로 한눈에 구분</CheckItem>
              <CheckItem>관리자·멤버 권한 구분</CheckItem>
              <CheckItem>이메일로 간편 초대</CheckItem>
            </ul>
          </div>

          <div className='overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-[0_12px_40px_rgba(15,23,42,0.08)]'>
            <div className='p-4 md:p-6'>
              <div className='mb-3.5 text-[13px] font-semibold text-[#0F172A] md:font-bold'>
                내 워크스페이스
              </div>
              <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-2.5'>
                {WORKSPACE_CARDS.map((ws) => (
                  <div
                    key={ws.name}
                    className='flex items-center justify-between rounded-[10px] border border-[#E2E8F0] bg-white px-3 py-3 text-[12px] font-medium md:px-3.5 md:py-3.5 md:text-[13px] md:font-semibold'
                  >
                    <div className='flex min-w-0 items-center gap-2'>
                      <span
                        className='h-1.5 w-1.5 shrink-0 rounded-full'
                        style={{ background: ws.color }}
                      />
                      <span className='truncate'>{ws.name}</span>
                      {ws.hasCrown && (
                        <Icon name='crown' className='h-3 w-3 shrink-0 text-[#F59E0B]' />
                      )}
                    </div>
                    <svg
                      className='ml-1 h-3.5 w-3.5 shrink-0 text-[#94A3B8]'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M9 18l6-6-6-6' />
                    </svg>
                  </div>
                ))}
                <div className='flex items-center justify-center gap-1.5 rounded-[10px] border-[1.5px] border-dashed border-[#D9D9D9] px-3 py-3 text-[12px] font-medium text-[#94A3B8] md:px-3.5 md:py-3.5 md:text-[13px]'>
                  <span className='truncate'>+ 새 워크스페이스</span>
                </div>
              </div>

              <div className='mt-5 mb-3.5 text-[13px] font-semibold text-[#0F172A] md:font-bold'>
                초대받은 워크스페이스
              </div>
              <div className='overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white'>
                <div className='grid grid-cols-[1fr_60px_90px] border-b border-[#F1F5F9] px-3.5 py-2 text-[11px] font-semibold text-[#94A3B8] md:grid-cols-[1fr_50px_120px] lg:grid-cols-[1fr_100px_120px]'>
                  <span>이름</span>
                  <span>초대자</span>
                  <span>수락 여부</span>
                </div>
                {INVITED_WORKSPACES.map((inv, i) => (
                  <div
                    key={inv.name}
                    className={`grid grid-cols-[1fr_60px_90px] items-center px-3.5 py-2.5 text-[12px] md:grid-cols-[1fr_50px_120px] lg:grid-cols-[1fr_100px_120px] ${
                      i === 0 ? 'border-b border-[#F8FAFC]' : ''
                    }`}
                  >
                    <span className='truncate font-medium md:font-semibold'>{inv.name}</span>
                    <span className='text-[#475569]'>{inv.inviter}</span>
                    <span className='flex gap-1.5'>
                      <span className='rounded-[5px] bg-[#2563EB] px-2.5 py-0.5 text-[11px] font-medium text-white md:font-semibold'>
                        수락
                      </span>
                      <span className='rounded-[5px] bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#475569] md:font-semibold'>
                        거절
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={f2Ref}
          className='reveal-el mb-20 grid grid-cols-1 items-center gap-8 md:mb-30 md:grid-cols-2 md:gap-20'
        >
          <div className='order-2 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-[0_12px_40px_rgba(15,23,42,0.08)] md:order-1'>
            <div className='border-b border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-[12px] font-bold text-[#475569]'>
              영수증 업로드
            </div>
            <div className='flex flex-col gap-4 p-4 sm:flex-row md:p-6'>
              <div className='flex w-full flex-col gap-1.5 rounded-[10px] border border-[#E2E8F0] bg-white px-3 py-4 sm:w-35 sm:shrink-0'>
                <div className='mb-2 text-center text-[11px] font-black tracking-[.05em] text-[#1E293B]'>
                  RECEIPT
                </div>
                {(['85%', '50%', '70%'] as const).map((w, i) => (
                  <div key={i} className='h-1.5 rounded-full bg-[#F1F5F9]' style={{ width: w }} />
                ))}
                <div className='my-2 h-px bg-[#E2E8F0]' />
                {(['85%', '70%', '50%', '85%', '70%'] as const).map((w, i) => (
                  <div key={i} className='h-1.5 rounded-full bg-[#F1F5F9]' style={{ width: w }} />
                ))}
                <div className='my-2 h-px bg-[#E2E8F0]' />
                <div className='text-[9px] font-semibold text-[#94A3B8]'>Total: ₩90,600</div>
              </div>

              <div className='flex-1 rounded-[10px] border border-[#E2E8F0] bg-white p-4'>
                {RECEIPT_FIELDS.map((row) => (
                  <div key={row.label} className='mb-3.5'>
                    <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#94A3B8] uppercase'>
                      {row.label}
                    </div>
                    <div className='flex items-center gap-1.5 text-[13px] font-medium md:font-semibold'>
                      {row.avatar && (
                        <div className='flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#EEEEEE] text-[9px] font-semibold text-[#787486]'>
                          이
                        </div>
                      )}
                      {row.val}
                      {row.edit && (
                        <span className='text-[#94A3B8]'>
                          <Icon name='edit' className='h-3 w-3' />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className='mb-3.5'>
                  <div className='mb-1.5 text-[10px] font-semibold tracking-[.05em] text-[#94A3B8] uppercase'>
                    AI 분석 결과
                  </div>
                  <AiChip variant='ok' />
                </div>

                <div className='mb-2'>
                  <div className='mb-1 text-[10px] font-semibold tracking-[.05em] text-[#94A3B8] uppercase'>
                    상태
                  </div>
                  <span className='inline-flex items-center gap-1 rounded-full bg-[#FFF8C1] px-2.5 py-1 text-[11px] font-medium text-[#A69300]'>
                    <span className='h-1 w-1 rounded-full bg-current' />
                    대기
                  </span>
                </div>

                <div className='mt-2 text-right'>
                  <span className='inline-block rounded-[7px] bg-[#2563EB] px-4 py-1.5 text-[12px] font-medium text-white md:font-semibold'>
                    저장
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='order-1 md:order-2'>
            <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
              AI 스마트 스캔
            </div>
            <h2
              className='mb-4 leading-[1.2] font-extrabold tracking-[-0.02em] md:font-black'
              style={{ fontSize: 'clamp(28px,4vw,44px)' }}
            >
              사진 한 장으로
              <br />
              AI가 다 읽어요
            </h2>
            <p className='max-w-125 text-[16px] leading-[1.7] text-[#475569] md:text-[17px]'>
              영수증 사진을 올리면 OCR이 결제일·가맹점·금액을 자동으로 인식합니다. 동시에 AI가 심야
              결제, 유흥업소, 분할 결제 같은 이상 패턴을 즉시 감지해 관리자에게 알려줍니다.
            </p>
            <ul className='mt-6 flex flex-col gap-2.5'>
              <CheckItem>OCR 자동 인식으로 입력 최소화</CheckItem>
              <CheckItem>AI 이상 패턴 감지 칩으로 한눈에 확인</CheckItem>
              <CheckItem>원본 영수증 이미지 함께 보관</CheckItem>
            </ul>
          </div>
        </div>

        <div
          ref={f3Ref}
          className='reveal-el grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-20'
        >
          <div>
            <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
              승인 관리
            </div>
            <h2
              className='mb-4 leading-[1.2] font-extrabold tracking-[-0.02em] md:font-black'
              style={{ fontSize: 'clamp(28px,4vw,44px)' }}
            >
              수작업 검토는 줄이고
              <br />
              실수는 더 줄이고
            </h2>
            <p className='max-w-125 text-[16px] leading-[1.7] text-[#475569] md:text-[17px]'>
              AI가 이상 지출을 선별해 관리자 앞에 먼저 가져다 놓습니다. 의심 항목은 칩으로 강조
              표시되어 놓치지 않고, 반려 사유를 남겨 팀원에게 명확한 피드백까지. 영수증 목록은 CSV로
              한 번에 다운로드.
            </p>
            <ul className='mt-6 flex flex-col gap-2.5'>
              <CheckItem>대기·승인·반려 상태를 한눈에</CheckItem>
              <CheckItem>의심 패턴 칩으로 실수 없는 승인·반려</CheckItem>
              <CheckItem>반려 사유 작성으로 팀원에게 명확한 피드백</CheckItem>
              <CheckItem>영수증 목록 CSV 다운로드</CheckItem>
            </ul>
          </div>

          <ApprovalMock />
        </div>
      </div>
    </section>
  );
}
