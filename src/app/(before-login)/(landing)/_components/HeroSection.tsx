import Link from 'next/link';
import Icon from '@/components/Icon';
import Badge from './Badge';
import { SIDEBAR_ITEMS, HERO_STATS, HERO_TABLE_ROWS, BADGE_LABEL } from './constants';

export default function HeroSection() {
  return (
    <section
      className='hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-25 pb-15 text-center'
      style={{ background: 'linear-gradient(160deg,#EFF6FF 0%,#FFFFFF 50%,#F8FAFC 100%)' }}
    >
      <div className='anim-fadeup-0 mb-7 inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3.5 py-1.5 text-[13px] font-semibold text-[#2563EB]'>
        <span className='h-1.5 w-1.5 rounded-full bg-[#2563EB]' />팀 영수증 관리의 새로운 방법
      </div>

      <h1
        className='anim-fadeup-1 leading-[1.12] font-extrabold tracking-[-0.03em] text-[#0F172A] md:font-black'
        style={{ fontSize: 'clamp(36px,6vw,72px)' }}
      >
        팀 영수증, 이제
        <br />
        <em className='text-[#2563EB] not-italic'>AI가 먼저 검토</em>합니다
      </h1>

      <p className='anim-fadeup-2 mt-5 max-w-130 text-[16px] leading-[1.7] font-normal text-[#475569] md:text-[18px]'>
        사진 한 장으로 등록하면 AI가 자동 분석하고,
        <br />
        팀원들과 함께 승인·반려·정산까지 한 번에.
      </p>

      <div className='anim-fadeup-3 mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row'>
        <Link
          href='/login'
          className='flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] px-8 py-3 text-[16px] font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)] sm:w-auto md:py-3.5'
        >
          바로 시작하기
          <Icon name='arrowRight' size={18} />
        </Link>
        <Link
          href='/about'
          className='w-full rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white px-8 py-3 text-[16px] font-semibold text-[#475569] transition-all hover:border-[#2563EB] hover:text-[#2563EB] sm:w-auto md:py-3.5'
        >
          서비스 둘러보기
        </Link>
      </div>

      <div className='anim-fadeup-4 relative mt-16 w-full max-w-225'>
        <div className='overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.5)]'>
          <div className='flex h-11 items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4'>
            <span className='h-3 w-3 rounded-full bg-[#FF5F57]' />
            <span className='h-3 w-3 rounded-full bg-[#FEBC2E]' />
            <span className='h-3 w-3 rounded-full bg-[#28C840]' />
          </div>

          <div className='flex flex-col md:h-102 md:flex-row'>
            <div className='hidden w-45 shrink-0 border-r border-[#E2E8F0] p-5 pl-3.5 md:block'>
              <div className='mb-3 text-[10px] font-semibold tracking-[.08em] text-[#94A3B8] uppercase'>
                Workspaces
              </div>
              {SIDEBAR_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium ${
                    item.active ? 'bg-[#DBEAFE] font-semibold text-[#2563EB]' : 'text-[#475569]'
                  }`}
                >
                  <span
                    className='h-2 w-2 shrink-0 rounded-full'
                    style={{ background: item.color }}
                  />
                  <span className='truncate'>{item.label}</span>
                  {item.hasCrown && <Icon name='crown' className='ml-auto h-3 w-3 shrink-0' />}
                </div>
              ))}
            </div>

            <div className='flex-1 overflow-auto p-4 md:p-6'>
              <div className='mb-4 flex items-center justify-between gap-2 md:mb-5'>
                <span className='flex items-center gap-1.5 text-[15px] font-semibold md:text-[18px] md:font-bold'>
                  경영관리팀
                  <Icon name='crown' className='h-4 w-4 text-[#F59E0B]' />
                </span>
                <div className='flex gap-2'>
                  <div className='flex items-center gap-1 rounded-[7px] border border-[#E2E8F0] px-2 py-1.5 text-[11px] font-semibold text-[#475569] md:px-3 md:text-[12px]'>
                    <Icon name='settings' className='h-3.5 w-3.5' />
                    <span className='hidden sm:inline'>관리</span>
                  </div>
                  <div className='flex items-center justify-center rounded-[7px] bg-[#2563EB] px-2.5 py-1.5 text-[11px] font-medium text-white md:px-3 md:text-[12px] md:font-semibold'>
                    + 초대하기
                  </div>
                </div>
              </div>

              <div className='mb-4 grid grid-cols-2 gap-2 md:mb-5 md:grid-cols-4 md:gap-2.5'>
                {HERO_STATS.map((s) => (
                  <div
                    key={s.label}
                    className='rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 md:px-4 md:py-3.5'
                  >
                    <div className='mb-1 text-[10px] font-medium text-[#94A3B8]'>{s.label}</div>
                    <div
                      className='text-[16px] font-bold md:text-[20px] md:font-extrabold'
                      style={s.color ? { color: s.color } : undefined}
                    >
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>

              <div className='overflow-x-auto'>
                <div className='min-w-[320px]'>
                  <div className='grid grid-cols-[72px_1fr_72px_60px] border-b border-[#E2E8F0] px-3 py-2 text-[11px] font-semibold text-[#94A3B8] md:grid-cols-[80px_1fr_80px_70px_90px]'>
                    <span>게시자</span>
                    <span>가맹점</span>
                    <span>금액</span>
                    <span>상태</span>
                    <span className='hidden md:inline'>게시일</span>
                  </div>
                  {HERO_TABLE_ROWS.map((row) => (
                    <div
                      key={row.name + row.store}
                      className='grid grid-cols-[72px_1fr_72px_60px] items-center border-b border-[#F1F5F9] px-3 py-2 text-[12px] md:grid-cols-[80px_1fr_80px_70px_90px] md:py-2.5'
                    >
                      <span>{row.name}</span>
                      <span className='truncate'>{row.store}</span>
                      <span>{row.amount}</span>
                      <span>
                        <Badge variant={row.badge}>{BADGE_LABEL[row.badge]}</Badge>
                      </span>
                      <span className='hidden text-[11px] text-[#94A3B8] md:inline'>
                        {row.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
