'use client';

import { useEffect, useRef } from 'react';
import GlobalStyles from '../_components/GlobalStyles';
import AboutAiDetect from './_components/AboutAiDetect';
import AboutBento from './_components/AboutBento';
import AboutCompare from './_components/AboutCompare';
import { AboutCta, AboutFooter } from './_components/AboutCtaFooter';
import AboutFaq from './_components/AboutFaq';
import AboutHero from './_components/AboutHero';
import AboutStats from './_components/AboutStats';
import AboutTimeline from './_components/AboutTimeline';
import AboutUseCases from './_components/AboutUseCases';

const REVEAL = 'opacity-0 translate-y-7 transition-all duration-700 ease-out';

export default function Page() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', '!translate-y-0');
          }
        });
      },
      { threshold: 0.12 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLElement | null, idx: number) => {
    refs.current[idx] = el;
  };

  return (
    <>
      <GlobalStyles />
      <style>{`
        .bento-card {
          transition: box-shadow .2s, transform .2s;
        }
        .bento-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(15,23,42,0.12);
        }
      `}</style>
      <AboutHero />
      <AboutStats revealClass={REVEAL} setRef={setRef} idx={0} />
      <AboutBento revealClass={REVEAL} setRef={setRef} idxTitle={1} idxGrid={2} />
      <AboutAiDetect revealClass={REVEAL} setRef={setRef} idxTitle={3} idxContent={4} />
      <AboutTimeline revealClass={REVEAL} setRef={setRef} idxTitle={5} idxGrid={6} />
      <AboutCompare revealClass={REVEAL} setRef={setRef} idxTitle={7} idxTable={8} />
      <AboutUseCases revealClass={REVEAL} setRef={setRef} idxTitle={9} idxCards={10} />
      <AboutFaq revealClass={REVEAL} setRef={setRef} idxTitle={11} idxList={12} />
      <AboutCta revealClass={REVEAL} setRef={setRef} idx={13} />
      <AboutFooter />
    </>
  );
}
