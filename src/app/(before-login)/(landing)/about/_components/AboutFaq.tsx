'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

interface FaqItemProps {
  q: string;
  a: React.ReactNode;
}

function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border-b border-[#E2E8F0] last:border-b-0'>
      <button
        onClick={() => setOpen(!open)}
        className='flex w-full items-center justify-between py-5 text-left'
      >
        <span className='text-[15px] font-medium text-[#0F172A] md:text-[16px] md:font-semibold'>
          {q}
        </span>
        <span
          className='ml-4 shrink-0 text-[#2563EB] transition-transform duration-200'
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <Icon name={open ? 'close' : 'plus'} size={20} className='cursor-pointer' />
        </span>
      </button>
      {open && (
        <div className='pb-5 text-[14px] leading-[1.8] text-[#475569] md:text-[15px]'>{a}</div>
      )}
    </div>
  );
}

const FAQS: FaqItemProps[] = [
  {
    q: 'Re:Mate는 무슨 뜻인가요?',
    a: (
      <>
        Re:Mate는 두 가지 의미를 담고 있습니다.
        <br />
        <br />
        <strong>Re:</strong>는 이메일에서 &apos;답장·검토(Review)&apos;를 뜻하는 접두어로, 영수증을
        AI가 먼저 읽고 분석한 뒤 관리자가 승인·반려로 &apos;응답&apos;하는 워크플로우를 상징합니다.
        <br />
        <br />
        <strong>Mate</strong>는 &apos;동료·파트너&apos;를 의미합니다. 팀의 지출을 함께 관리하는
        동반자로서, 멤버와 관리자가 하나의 워크스페이스 안에서 투명하게 협력한다는 뜻을 담았습니다.
        <br />
        <br />
        즉, Re:Mate는 &apos;팀 지출을 함께 검토하는 동료&apos;라는 철학을 이름에 녹인 서비스입니다.
      </>
    ),
  },
  {
    q: 'AI가 부적절 결제를 어떻게 탐지하나요?',
    a: (
      <>
        영수증이 등록되면 AI가 결제 정보를 분석해 4가지 패턴을 자동으로 판별합니다.
        <br />
        <br />
        ① 심야 결제(23시~06시)
        <br />
        ② 공휴일 결제(대체공휴일 포함)
        <br />
        ③ 유흥업소 의심(업종·상호명 기반 분석)
        <br />
        ④ 분할 결제(짧은 시간 내 반복 결제)
        <br />
        <br />
        탐지된 패턴은 의심 태그와 판단 근거로 제공되며, 최종 승인·반려 결정은 관리자가 직접
        진행합니다.
      </>
    ),
  },
  {
    q: '영수증 데이터를 파일로 저장할 수 있나요?',
    a: '네, 영수증 목록을 CSV 형식으로 내보낼 수 있습니다. 정산·회계·엑셀 작업에 바로 활용할 수 있어요.',
  },
  {
    q: '영수증 원본 이미지는 보관되나요?',
    a: '네, 업로드한 영수증 원본 이미지를 함께 보관합니다. 상세 페이지는 물론 CSV 파일에서도 확인할 수 있어요.',
  },
  {
    q: '관리자와 멤버의 차이가 무엇인가요?',
    a: '관리자는 워크스페이스를 만든 사람입니다. 팀원 초대·삭제, 영수증 승인·반려, 워크스페이스 설정 변경 권한을 가집니다. 멤버는 영수증 업로드와 본인 영수증 삭제(대기 상태일 때)만 가능합니다.',
  },
  {
    q: '여러 워크스페이스에 동시에 소속될 수 있나요?',
    a: '네, 하나의 계정으로 여러 워크스페이스에 참여할 수 있습니다. 사이드바에서 워크스페이스를 전환하며 각각 관리하세요.',
  },
];

interface AboutFaqProps {
  revealClass: string;
  setRef: (el: HTMLElement | null, idx: number) => void;
  idxTitle: number;
  idxList: number;
}

export default function AboutFaq({ revealClass, setRef, idxTitle, idxList }: AboutFaqProps) {
  return (
    <section className='bg-[#F8FAFC] px-6 py-24'>
      <div className='mx-auto max-w-180'>
        <div
          ref={(el) => setRef(el as HTMLElement, idxTitle)}
          className={`${revealClass} mb-12 text-center`}
        >
          <div className='mb-4 inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold tracking-widest text-[#2563EB] uppercase md:font-bold'>
            FAQ
          </div>
          <h2
            className='leading-[1.2] font-extrabold tracking-[-0.025em] text-[#0F172A] md:font-black'
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            자주 묻는 질문
          </h2>
        </div>

        <div
          ref={(el) => setRef(el as HTMLElement, idxList)}
          className={`${revealClass} rounded-2xl border border-[#E2E8F0] bg-white px-6 py-2 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:px-8`}
        >
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
