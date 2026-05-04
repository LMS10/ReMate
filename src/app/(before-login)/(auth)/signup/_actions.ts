'use server';

import { redirect } from 'next/navigation';
import { ApiError, signupApi } from '@/lib/auth-api';

interface SignupActionResult {
  error?: string;
  field?: 'email' | 'password' | 'form';
}

export async function signupAction(
  email: string,
  name: string,
  password: string,
): Promise<SignupActionResult> {
  try {
    await signupApi({ email, name, password });
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.status === 409) {
        return { error: '이미 가입된 이메일입니다.', field: 'email' };
      }
      if (e.status === 400) {
        return {
          error: '비밀번호는 영문, 숫자, 특수문자 포함 6자 이상입니다.',
          field: 'password',
        };
      }
    }
    return { error: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', field: 'form' };
  }

  redirect('/login');
}
