'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Buttons';
import Icon from '@/components/Icon';
import Input from '@/components/Input';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Page() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  function validateEmail(value: string): string | undefined {
    if (!value) return '이메일은 필수 입력입니다.';
    if (!EMAIL_REGEX.test(value)) return '이메일 형식으로 작성해 주세요.';
    return undefined;
  }

  function validatePassword(value: string): string | undefined {
    if (!value) return '비밀번호는 필수 입력입니다.';
    return undefined;
  }

  function handleEmailBlur() {
    setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
  }

  function handlePasswordBlur() {
    setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
  }

  const isFormValid =
    form.email.trim() !== '' && form.password.trim() !== '' && !errors.email && !errors.password;

  async function handleSubmit() {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setLoading(true);

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setErrors({ email: '이메일 혹은 비밀번호를 확인해주세요.' });
      return;
    }

    window.location.href = '/workspace';
  }

  return (
    <div className='my-31 flex flex-col items-center md:my-40'>
      <div className='w-full max-w-132 px-8.5'>
        <div className='mb-12 flex justify-center md:mb-15'>
          <Link href='/'>
            <Image
              src='/logo_lg.svg'
              alt='Re:Mate logo'
              width={293}
              height={65}
              className='h-12 w-54.25 sm:h-16.25 sm:w-73.25'
              priority
            />
          </Link>
        </div>

        <div className='flex flex-col gap-1 md:gap-2'>
          <Input
            label='이메일'
            type='email'
            placeholder='이메일 입력'
            value={form.email}
            error={errors.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              }
            }}
            onBlur={handleEmailBlur}
          />
          <Input
            label='비밀번호'
            type='password'
            placeholder='비밀번호 입력'
            value={form.password}
            error={errors.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              }
            }}
            onBlur={handlePasswordBlur}
            onKeyDown={(e) => e.key === 'Enter' && isFormValid && handleSubmit()}
          />
        </div>

        <div className='mt-6.5 flex flex-col gap-3.75 md:mt-8'>
          <Button
            className='w-full md:h-12.5 md:text-lg'
            loading={loading}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            로그인
          </Button>
          <Button
            className='text-black-200 w-full border border-gray-300 bg-white font-medium md:h-12.5 md:text-lg'
            variant='secondary'
            onClick={() => signIn('google', { callbackUrl: '/workspace' })}
          >
            <Icon name='google' className='h-5 w-5 md:h-6 md:w-6' />
            Google로 시작하기
          </Button>
          <Button
            className='text-black-200 w-full border border-gray-300 bg-white font-medium md:h-12.5 md:text-lg'
            variant='secondary'
            onClick={() => signIn('kakao', { callbackUrl: '/workspace' })}
          >
            <Icon name='kakao' className='h-5 w-5 md:h-6 md:w-6' />
            Kakao로 시작하기
          </Button>
        </div>

        <p className='text-md mt-8 text-center text-gray-400 md:text-lg'>
          계정이 없으신가요?{' '}
          <Link href='/signup' className='font-medium text-blue-200'>
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
