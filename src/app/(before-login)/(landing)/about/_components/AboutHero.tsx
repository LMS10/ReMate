'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import UploadMockPanel from './UploadMockPanel';

export default function AboutHero() {
  return (
    <section
      className='hero-section relative overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24'
      style={{ background: 'linear-gradient(160deg,#EFF6FF 0%,#FFFFFF 50%,#F8FAFC 100%)' }}
    >
      <div className='pointer-events-none absolute inset-0'>
        <div
          className='absolute top-0 -right-24 h-105 w-105 rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className='absolute bottom-0 -left-16 h-75 w-75 rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className='relative mx-auto flex max-w-270 flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16'>
        <div className='flex-1 text-center lg:text-left'>
          <div className='anim-fadeup-0 mb-7 inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3.5 py-1.5 text-[13px] font-semibold text-[#2563EB]'>
            <Icon name='receipt' size={13} className='text-[#2563EB]' />
            Re:Mate 서비스 소개
          </div>

          <h1
            className='anim-fadeup-1 leading-[1.12] font-extrabold tracking-[-0.03em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            팀 지출 관리,
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #2563EB 0%, #818CF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              투명하게 시작하세요
            </span>
          </h1>

          <p className='anim-fadeup-2 mx-auto mt-6 max-w-120 text-[16px] leading-[1.7] text-[#475569] md:text-[17px] lg:mx-0'>
            영수증 사진을 올리면 OCR이 정보를 자동으로 읽고,
            <br />
            AI가 부적절 결제 패턴을 즉시 분석합니다.
          </p>

          <div className='anim-fadeup-3 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start'>
            <Link
              href='/login'
              className='flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] px-8 py-3 text-[16px] font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)] sm:w-auto md:py-3.5'
            >
              바로 시작하기
              <Icon name='arrowRight' size={18} />
            </Link>
            <Link
              href='/'
              className='w-full rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white px-8 py-3 text-[16px] font-semibold text-[#475569] transition-all hover:border-[#2563EB] hover:text-[#2563EB] sm:w-auto md:py-3.5'
            >
              홈으로 돌아가기
            </Link>
          </div>

          <div className='anim-fadeup-4 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start'>
            {[
              { icon: 'building' as const, text: '워크스페이스 수 제한 없음' },
              { icon: 'users' as const, text: '팀원 수 제한 없음' },
              { icon: 'shield' as const, text: '투명한 이력 보관' },
            ].map((badge) => (
              <div
                key={badge.text}
                className='flex items-center gap-1.5 text-[13px] text-[#94A3B8]'
              >
                <Icon name={badge.icon} size={14} className='text-[#2563EB]' />
                {badge.text}
              </div>
            ))}
          </div>
        </div>

        <div className='anim-fadeup-1 flex w-full justify-center lg:w-105 lg:shrink-0'>
          <UploadMockPanel />
        </div>
      </div>
    </section>
  );
}
