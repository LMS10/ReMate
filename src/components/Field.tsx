'use client';

import { useState } from 'react';
import { cva } from 'class-variance-authority';
import Icon from './Icon';

type FieldType =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'prePassword'
  | 'newPassword'
  | 'confirmNewPassword'
  | 'name'
  | 'search'
  | 'workspaceName';
type FieldContext = 'login' | 'signup' | 'mypage' | 'modal' | 'workspace' | 'manage';

interface FieldProps {
  type: FieldType;
  context: FieldContext;
  value?: string;
}

const fieldMeta = ({ type, context }: FieldProps) => {
  switch (type) {
    case 'email':
      return { label: '이메일', placeholder: '이메일 입력' };
    case 'password':
      return context === 'signup'
        ? { label: '비밀번호', placeholder: '영문, 숫자, 특수문자(!@#$%^&*) 포함 6자 이상' }
        : { label: '비밀번호', placeholder: '비밀번호 입력' };
    case 'confirmPassword':
      return { label: '비밀번호 확인', placeholder: '비밀번호 확인' };
    case 'prePassword':
      return { label: '현재 비밀번호', placeholder: '현재 비밀번호 입력' };
    case 'newPassword':
      return { label: '새 비밀번호', placeholder: '새 비밀번호 입력' };
    case 'confirmNewPassword':
      return { label: '새 비밀번호 확인', placeholder: '새 비밀번호 입력' };
    case 'name':
      return { label: '이름', placeholder: '이름' };
    case 'search':
      return { label: '', placeholder: '가맹점 검색' };
    case 'workspaceName':
      return { label: '워크스페이스 이름', placeholder: '워크스페이스 이름을 입력해 주세요' };
  }
};

const errorMessage: Record<FieldType, string> = {
  email: '이메일은 필수 입력입니다.',
  password: '비밀번호는 필수 입력입니다.',
  confirmPassword: '비밀번호 확인은 필수 입력입니다.',
  prePassword: '비밀번호가 일치하지 않습니다.',
  newPassword: '',
  confirmNewPassword: '새 비밀번호와 일치하지 않습니다.',
  name: '이름은 필수 입력입니다.',
  search: '',
  workspaceName: '워크스페이스 이름은 필수 입력입니다.',
};

const inputVariants = cva(
  'pl-[20px] outline-none rounded-[12px] border-[1px] h-[42px] md:h-[48px] text-gray-400 fontSize-sm leading-[24px] md:fontSize-lg lg:fontSize-lg',
  {
    variants: {
      type: {
        email: '',
        password: '',
        confirmPassword: '',
        prePassword: '',
        newPassword: '',
        confirmNewPassword: '',
        name: '',
        search: '',
        workspaceName: '',
      },

      context: {
        login: 'w-[307px]  md:w-[460px]',
        signup: 'w-[307px] md:w-[460px]',
        mypage: 'w-[252px] md:w-[500px] lg:w-[624px]',
        modal: 'w-[282px] md:w-[382px] lg:w-[400px]',
        workspace: 'w-[151px] h-[26px] md:w-[382px] md:h-[40px] lg:w-[618px] lg:h-[40px] pl-[48px]',
        manage: 'w-[252px] md:w-[488px] lg:w-[564px]',
      },
    },

    compoundVariants: [
      {
        type: 'email',
        context: 'mypage',
        className: 'w-[252px] md:w-[276px] lg:w-[400px]',
      },
      {
        type: 'name',
        context: 'mypage',
        className: 'w-[252px] md:w-[276px] lg:w-[400px]',
      },
    ],
  },
);

export default function Field({ type, context, value }: FieldProps) {
  const [error, setError] = useState<string>('');
  const meta = fieldMeta({ type, context });

  return (
    <div className='flex flex-col gap-2.5'>
      {meta.label && <label className='fontSize-md md:fontSize-lg'>{meta.label}</label>}
      <div className='relative'>
        {type === 'search' && (
          <Icon name='search' size={24} className='absolute top-1/2 left-4 -translate-y-1/2' />
        )}
        <input
          className={
            inputVariants({ type, context }) +
            (error ? ' border-error focus:border-error' : ' border-gray-300')
          }
          placeholder={meta.placeholder}
          value={value}
          readOnly={context === 'mypage' && (type === 'email' || type === 'name')}
          onChange={(e) => {
            if (!e.target.value) {
              setError(errorMessage[type]);
            } else {
              setError('');
            }
          }}
        />
      </div>
      {error && <p className='fontSize-xs text-error leading-4.5'>{error}</p>}
    </div>
  );
}
