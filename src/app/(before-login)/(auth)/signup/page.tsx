'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Buttons';
import Input from '@/components/Input';
import { signupAction } from './_actions';

interface SignupForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

interface SignupErrors {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
  form?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{6,}$/;

export default function Page() {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isPending, startTransition] = useTransition();

  function validateEmail(value: string): string | undefined {
    if (!value) return '이메일은 필수 입력입니다.';
    if (!EMAIL_REGEX.test(value)) return '이메일 형식으로 작성해 주세요.';
    return undefined;
  }

  function validateName(value: string): string | undefined {
    if (!value) return '이름은 필수 입력입니다.';
    return undefined;
  }

  function validatePassword(value: string): string | undefined {
    if (!value) return '비밀번호는 필수 입력입니다.';
    if (value.length < 6) return '6자 이상 입력해 주세요.';
    if (!PASSWORD_REGEX.test(value)) return '비밀번호는 영문, 숫자, 특수문자 포함 6자 이상입니다.';
    return undefined;
  }

  function validatePasswordConfirm(value: string, password: string): string | undefined {
    if (!value) return '비밀번호 확인은 필수 입력입니다.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return undefined;
  }

  function handleEmailBlur() {
    setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
  }

  function handleNameBlur() {
    setErrors((prev) => ({ ...prev, name: validateName(form.name) }));
  }

  function handlePasswordBlur() {
    setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
  }

  function handlePasswordConfirmBlur() {
    setErrors((prev) => ({
      ...prev,
      passwordConfirm: validatePasswordConfirm(form.passwordConfirm, form.password),
    }));
  }

  const isFormValid =
    form.email.trim() !== '' &&
    form.name.trim() !== '' &&
    form.password.trim() !== '' &&
    form.passwordConfirm.trim() !== '' &&
    !errors.email &&
    !errors.name &&
    !errors.password &&
    !errors.passwordConfirm;

  function handleSubmit() {
    const emailError = validateEmail(form.email);
    const nameError = validateName(form.name);
    const passwordError = validatePassword(form.password);
    const passwordConfirmError = validatePasswordConfirm(form.passwordConfirm, form.password);

    setErrors({
      email: emailError,
      name: nameError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    });

    if (emailError || nameError || passwordError || passwordConfirmError) return;

    startTransition(async () => {
      const result = await signupAction(form.email, form.name, form.password);
      if (result?.error) {
        if (result.field === 'email') {
          setErrors((prev) => ({ ...prev, email: result.error }));
        } else if (result.field === 'password') {
          setErrors((prev) => ({ ...prev, password: result.error }));
        } else {
          setErrors((prev) => ({ ...prev, form: result.error }));
        }
      }
    });
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
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
            placeholder='remate@email.com'
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
            label='이름'
            type='text'
            placeholder='이름'
            value={form.name}
            error={errors.name}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
              }
            }}
            onBlur={handleNameBlur}
          />
          <Input
            label='비밀번호'
            type='password'
            placeholder='영문, 숫자, 특수문자(!@#$%^&*) 포함 6자 이상'
            value={form.password}
            error={errors.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              }
            }}
            onBlur={handlePasswordBlur}
          />
          <Input
            label='비밀번호 확인'
            type='password'
            placeholder='비밀번호 확인'
            value={form.passwordConfirm}
            error={errors.passwordConfirm}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, passwordConfirm: e.target.value }));
              if (errors.passwordConfirm) {
                setErrors((prev) => ({
                  ...prev,
                  passwordConfirm: validatePasswordConfirm(e.target.value, form.password),
                }));
              }
            }}
            onBlur={handlePasswordConfirmBlur}
            onKeyDown={(e) => e.key === 'Enter' && isFormValid && handleSubmit()}
          />
        </div>

        {errors.form && (
          <p className='text-error md:text-md min-h-4.5 text-[12px] leading-4.5'>{errors.form}</p>
        )}

        <div className='mt-6.5 md:mt-8'>
          <Button
            className='w-full md:h-12.5 md:text-lg'
            loading={isPending}
            disabled={!isFormValid}
            onClick={handleSubmit}
            size='lg'
          >
            가입하기
          </Button>
        </div>

        <p className='text-md mt-8 text-center text-gray-400 md:text-lg'>
          계정이 이미 있으신가요?{' '}
          <Link href='/login' className='font-medium text-blue-200'>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
