import Icon from '@/components/Icon';

const STATS = [
  {
    icon: 'scan' as const,
    value: '영수증 OCR 분석',
    label: 'OCR 기반 자동 입력',
    desc: '결제일·가맹점·금액·품목 자동 추출',
    color: '#10B981',
    bg: '#F0FDF4',
  },
  {
    icon: 'zap' as const,
    value: 'AI 자동 감지',
    label: '4가지 부적절 패턴 탐지',
    desc: '심야·공휴일·유흥업소·분할 결제 자동 분류',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: 'download' as const,
    value: 'CSV 내보내기',
    label: '엑셀용 데이터 추출',
    desc: '정리된 영수증 데이터를 CSV로 다운로드',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
] as const;

interface AboutStatsProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idx: number;
}

export default function AboutStats({ revealClass, setRef, idx }: AboutStatsProps) {
  return (
    <section className='border-b border-[#E2E8F0] bg-white px-6 py-0'>
      <div
        ref={(el) => setRef(el as HTMLElement, idx)}
        className={`${revealClass} mx-auto grid max-w-270 grid-cols-1 divide-y divide-[#E2E8F0] sm:grid-cols-3 sm:divide-x sm:divide-y-0`}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className='flex items-start gap-4 px-8 py-8'>
            <div
              className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
              style={{ background: stat.bg }}
            >
              <Icon name={stat.icon} size={22} style={{ color: stat.color }} />
            </div>
            <div>
              <div className='text-[19px] font-bold tracking-tight text-[#0F172A] md:font-extrabold'>
                {stat.value}
              </div>
              <div className='text-[13px] font-semibold' style={{ color: stat.color }}>
                {stat.label}
              </div>
              <div className='mt-0.5 text-[12px] leading-normal text-[#94A3B8]'>{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
