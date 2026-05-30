import Icon from '@/components/Icon';

interface AboutTimelineProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxGrid: number;
}

const MEMBER_STEPS = [
  { step: '초대 수락', desc: '이메일로 받은 초대를 수락하고 워크스페이스에 합류합니다.' },
  { step: '영수증 사진 업로드', desc: '지출 후 영수증을 촬영해 바로 올립니다.' },
  {
    step: 'OCR 결과 확인·수정',
    desc: '자동 인식된 결제일·가맹점·금액을 확인하고 필요시 수정합니다.',
  },
  { step: '저장 후 대기', desc: '저장하면 관리자 검토를 기다리는 대기 상태가 됩니다.' },
  { step: '승인·반려 결과 확인', desc: '관리자의 결정과 반려 사유를 확인합니다.' },
];

const ADMIN_STEPS = [
  { step: '워크스페이스 생성', desc: '팀 이름과 색상을 설정해 워크스페이스를 생성합니다.' },
  { step: '팀원 초대', desc: '이메일로 팀원을 초대하고 참여를 관리합니다.' },
  {
    step: '대시보드에서 현황 파악',
    desc: '총 영수증·승인 대기·완료·반려 건수를 한눈에 확인합니다.',
  },
  { step: '필터링 후 상세 검토', desc: '게시자·상태·가맹점으로 필터링해 집중 검토합니다.' },
  { step: '승인 또는 반려', desc: '반려 시 사유를 작성하면 팀원에게 전달됩니다.' },
  { step: 'CSV 다운로드', desc: '완료된 영수증 목록을 내보내 회계·정산을 마무리합니다.' },
];

interface TimelineListProps {
  steps: typeof MEMBER_STEPS;
  dotColor: string;
}

function TimelineList({ steps, dotColor }: TimelineListProps) {
  return (
    <div className='relative pl-5'>
      <div className='absolute top-4 bottom-4 left-2.25 w-px bg-[#E2E8F0]' />
      {steps.map((item, i) => (
        <div key={i} className='relative mb-6 flex gap-5 last:mb-0'>
          <div
            className='relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white'
            style={{ background: dotColor }}
          >
            {i + 1}
          </div>
          <div>
            <div className='text-[14px] font-semibold text-[#0F172A] md:font-bold'>{item.step}</div>
            <div className='mt-1 text-[13px] leading-[1.65] text-[#475569]'>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutTimeline({
  revealClass,
  setRef,
  idxTitle,
  idxGrid,
}: AboutTimelineProps) {
  return (
    <section className='bg-white px-6 py-24'>
      <div className='mx-auto max-w-270'>
        <div
          ref={(el) => setRef(el as HTMLElement, idxTitle)}
          className={`${revealClass} mb-14 text-center`}
        >
          <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
            사용 흐름
          </div>
          <h2
            className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            관리자와 팀원,
            <br />
            각자의 역할이 명확합니다
          </h2>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxGrid)}
          className={`${revealClass} grid grid-cols-1 gap-12 md:grid-cols-2`}
        >
          <div>
            <div className='mb-8 flex items-center gap-3'>
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE]'>
                <Icon name='users' size={18} className='text-[#2563EB]' />
              </div>
              <span className='text-[17px] font-bold text-[#0F172A]'>팀원의 흐름</span>
            </div>
            <TimelineList steps={MEMBER_STEPS} dotColor='#2563EB' />
          </div>

          <div>
            <div className='mb-8 flex items-center gap-3'>
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8C1]'>
                <Icon name='shield' size={18} className='text-[#A69300]' />
              </div>
              <span className='text-[17px] font-bold text-[#0F172A]'>관리자의 흐름</span>
            </div>
            <TimelineList steps={ADMIN_STEPS} dotColor='#F59E0B' />
          </div>
        </div>
      </div>
    </section>
  );
}
