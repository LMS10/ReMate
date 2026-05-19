import Icon from '@/components/Icon';

interface AboutUseCasesProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxCards: number;
}

const CASES = [
  {
    icon: 'building' as const,
    bg: '#EFF6FF',
    color: '#2563EB',
    title: '동아리·학생회',
    desc: '행사비, 회식비, 물품 구매 등 회비 지출을 투명하게 기록하고 임원진이 한눈에 확인합니다.',
  },
  {
    icon: 'users' as const,
    bg: '#F0FDF4',
    color: '#10B981',
    title: '소규모 팀·스타트업',
    desc: '팀원 각자가 지출한 업무 비용을 모아 관리자가 빠르게 검토·정산합니다.',
  },
  {
    icon: 'zap' as const,
    bg: '#FFF8C1',
    color: '#F59E0B',
    title: '스포츠·취미 모임',
    desc: '풋살, 야구, 등산 등 정기 모임의 장비 구매나 대관료를 함께 관리합니다.',
  },
  {
    icon: 'travelCarry' as const,
    bg: '#F5F3FF',
    color: '#8B5CF6',
    title: '여행·식사 모임',
    desc: '공동 경비 지출을 실시간으로 등록하고 나중에 모아 한 번에 정산합니다.',
  },
] as const;

export default function AboutUseCases({
  revealClass,
  setRef,
  idxTitle,
  idxCards,
}: AboutUseCasesProps) {
  return (
    <section className='bg-white px-6 py-24'>
      <div className='mx-auto max-w-270'>
        <div
          ref={(el) => setRef(el as HTMLElement, idxTitle)}
          className={`${revealClass} mb-12 text-center`}
        >
          <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
            사용 대상
          </div>
          <h2
            className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            어떤 팀이든
            <br />
            바로 시작할 수 있어요
          </h2>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxCards)}
          className={`${revealClass} grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4`}
        >
          {CASES.map((item) => (
            <div
              key={item.title}
              className='rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-[0_2px_16px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]'
            >
              <div
                className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl'
                style={{ background: item.bg }}
              >
                <Icon name={item.icon} size={24} style={{ color: item.color }} />
              </div>
              <div className='mb-2 text-[16px] font-bold text-[#0F172A]'>{item.title}</div>
              <div className='text-[13px] leading-[1.7] text-[#475569]'>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
