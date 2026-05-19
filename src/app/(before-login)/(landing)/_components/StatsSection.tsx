import { useReveal } from './useReveal';

const STATS = [
  {
    big: (
      <>
        {'100'}
        <em className='text-[#2563EB] not-italic'>%</em>
      </>
    ),
    small: '정확도',
  },
  { big: <em className='text-[#2563EB] not-italic'>∞</em>, small: '워크스페이스 제한 없음' },
  {
    big: (
      <>
        {'100'}
        <em className='text-[#2563EB] not-italic'>%</em>
      </>
    ),
    small: '이력 투명하게 보관',
  },
] as const;

export default function StatsSection() {
  const statsRef = useReveal();

  return (
    <section className='bg-[#0F172A] px-6 py-15 text-white md:py-20'>
      <div className='mx-auto max-w-270 text-center'>
        <h2 className='mb-4 font-black text-white' style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
          숫자로 보는 Re:Mate
        </h2>
        <p className='mb-15 text-[16px] text-white/60 md:text-[17px]'>
          팀들이 Re:Mate로 영수증을 더 빠르고 정확하게 관리하고 있어요.
        </p>

        <div ref={statsRef} className='reveal-el grid grid-cols-1 gap-0.5 md:grid-cols-3'>
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`px-10 py-10 ${i < 2 ? 'border-b border-white/10 md:border-r md:border-b-0' : ''}`}
            >
              <div className='text-[44px] leading-none font-black text-white md:text-[52px]'>
                {s.big}
              </div>
              <div className='mt-2 text-[15px] text-white/50'>{s.small}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
