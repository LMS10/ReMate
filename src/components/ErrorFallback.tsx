'use client';

interface ErrorFallbackProps {
  statusCode?: number;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

function NotFoundIllustration() {
  return (
    <svg
      width='200'
      height='200'
      viewBox='0 0 200 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <g opacity='0.18'>
        {[20, 50, 80, 110, 140, 170].map((x) =>
          [20, 50, 80, 110, 140, 170].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r='1.5' fill='#3B5BDB' />
          )),
        )}
      </g>
      <circle cx='90' cy='88' r='36' stroke='#3B5BDB' strokeWidth='2.5' />
      <circle cx='90' cy='88' r='24' stroke='#748FFC' strokeWidth='1.5' strokeDasharray='4 3' />
      <line
        x1='90'
        y1='76'
        x2='90'
        y2='88'
        stroke='#3B5BDB'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
      <line
        x1='90'
        y1='93'
        x2='90'
        y2='95'
        stroke='#3B5BDB'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
      <line
        x1='117'
        y1='115'
        x2='133'
        y2='131'
        stroke='#3B5BDB'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <circle cx='133' cy='131' r='5' fill='#3B5BDB' />
      <path
        d='M38 58 L38 44 L52 44'
        stroke='#748FFC'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M142 118 L142 132 L128 132'
        stroke='#748FFC'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function ErrorIllustration() {
  return (
    <svg
      width='200'
      height='200'
      viewBox='0 0 200 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <g opacity='0.07'>
        {[20, 50, 80, 110, 140, 170].map((x) =>
          [20, 50, 80, 110, 140, 170].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r='1.5' fill='#3B5BDB' />
          )),
        )}
      </g>
      <circle cx='100' cy='90' r='40' stroke='#3B5BDB' strokeWidth='2.5' />
      <circle cx='100' cy='90' r='54' stroke='#748FFC' strokeWidth='1' strokeDasharray='5 4' />
      <rect x='96.5' y='67' width='7' height='26' rx='3.5' fill='#3B5BDB' />
      <circle cx='100' cy='105' r='4' fill='#3B5BDB' />
      <line
        x1='100'
        y1='32'
        x2='100'
        y2='38'
        stroke='#748FFC'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='100'
        y1='142'
        x2='100'
        y2='148'
        stroke='#748FFC'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='148'
        y1='90'
        x2='142'
        y2='90'
        stroke='#748FFC'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='52'
        y1='90'
        x2='58'
        y2='90'
        stroke='#748FFC'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M42 56 L42 44 L54 44'
        stroke='#B2C4FF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M158 124 L158 136 L146 136'
        stroke='#B2C4FF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default function ErrorFallback({
  statusCode,
  title,
  description,
  primaryAction,
  secondaryAction,
}: ErrorFallbackProps) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#F0F4FF] px-5 py-16 md:py-24'>
      <div className='flex w-full max-w-md flex-col items-center text-center'>
        {statusCode === 404 ? <NotFoundIllustration /> : <ErrorIllustration />}

        <p className='mt-2 mb-2 text-sm font-semibold tracking-widest text-blue-600'>
          {statusCode ? `${statusCode}` : '오류 발생'}
        </p>

        <h1 className='text-gray-00 mb-3 text-2xl leading-tight font-semibold md:text-3xl md:font-bold lg:text-4xl'>
          {title}
        </h1>

        <p className='mb-8 text-sm leading-relaxed whitespace-pre-line text-[#36414f] md:text-base'>
          {description}
        </p>

        <div className='flex w-full flex-col gap-3 sm:flex-row'>
          {primaryAction && (
            <button
              className='text-md h-10 w-full cursor-pointer rounded-lg bg-[#2563EB] font-medium text-white transition-all hover:bg-[#1D4ED8] active:scale-[0.99] md:text-lg'
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              className='text-md h-10 w-full cursor-pointer rounded-lg border-[1.5px] border-[#E2E8F0] bg-white font-medium text-[#475569] transition-all hover:border-[#2563EB] hover:text-[#2563EB] active:scale-[0.99] md:text-lg'
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
