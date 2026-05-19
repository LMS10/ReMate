import Link from 'next/link';
import Icon from '@/components/Icon';

interface AboutCtaProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idx: number;
}

export function AboutCta({ revealClass, setRef, idx }: AboutCtaProps) {
  return (
    <section
      className='px-6 py-28 text-center text-white'
      style={{ background: 'linear-gradient(135deg,#2563EB 0%,#1E40AF 100%)' }}
    >
      <div
        ref={(el) => setRef(el as HTMLElement, idx)}
        className={`${revealClass} mx-auto max-w-160`}
      >
        <h2
          className='mb-4 leading-[1.15] font-bold md:font-extrabold'
          style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}
        >
          지금 바로 팀과 함께
          <br />
          시작해보세요
        </h2>
        <p className='mb-10 text-[17px] text-white/75'>워크스페이스를 만들고 팀원을 초대하세요.</p>
        <Link
          href='/login'
          className='inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-[16px] font-bold text-[#2563EB] shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] md:font-extrabold'
        >
          바로 시작하기
          <Icon name='arrowRight' size={20} className='text-[#2563EB]' />
        </Link>
      </div>
    </section>
  );
}

export function AboutFooter() {
  return (
    <footer className='flex flex-row justify-between gap-4 border-t border-[#E2E8F0] px-4 py-10 text-center md:px-15'>
      <div className='text-[16px] font-black'>Re:Mate</div>
      <div className='text-[12px] text-[#94A3B8]'>© 2026 Re:Mate. All rights reserved.</div>
    </footer>
  );
}
