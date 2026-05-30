import Icon from '@/components/Icon';
import { STEPS } from './constants';
import { useReveal } from './useReveal';

export default function HowItWorksSection() {
  const stepsRef = useReveal();

  return (
    <section className='bg-[#F8FAFC] px-6 py-15 md:py-25'>
      <div className='mx-auto max-w-270 text-center'>
        <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
          사용 방법
        </div>
        <h2
          className='mt-4 leading-[1.2] font-extrabold tracking-[-0.02em] md:font-black'
          style={{ fontSize: 'clamp(28px,4vw,44px)' }}
        >
          4단계로 끝나는
          <br />팀 영수증 관리
        </h2>

        <div
          ref={stepsRef}
          className='reveal-el mt-15 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className='step-arrow-el relative rounded-2xl border border-[#E2E8F0] bg-white px-6 py-7 text-left'
            >
              {i < 3 && (
                <div className='step-arrow absolute top-1/2 -right-5 z-10 hidden -translate-y-1/2 text-[20px] text-[#D9D9D9] lg:block'>
                  ›
                </div>
              )}
              <div className='mb-4 flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB] text-[16px] font-semibold text-white'>
                {step.num}
              </div>
              <div className='flex flex-col items-center'>
                <div className='mb-3.5 text-[#2563EB]'>
                  <Icon name={step.icon} className='h-11 w-11' />
                </div>
                <div className='mb-2 text-[16px] font-semibold md:font-bold'>{step.title}</div>
                <div className='text-[13px] leading-[1.6] text-[#475569]'>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
