'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/apis/auth/auth.queries';
import { useUploadFileMutation } from '@/apis/file/file.queries';
import {
  useUpdateNameMutation,
  useUpdateProfileImageMutation,
  useUpdatePasswordMutation,
} from '@/apis/user/user.queries';
import Button from '@/components/Buttons';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { isApiError } from '@/utils/apiError';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: meData } = useGetMe();
  const user = meData?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');

  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setInitialName(user.name);

    if (!selectedFileRef.current) {
      if (user.picture) {
        const url = user.picture.startsWith('http') ? user.picture : `${BASE_URL}${user.picture}`;
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  }, [user]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const { mutateAsync: uploadFile } = useUploadFileMutation();
  const { mutateAsync: updateProfileImage } = useUpdateProfileImageMutation();
  const { mutateAsync: updateName } = useUpdateNameMutation();
  const { mutateAsync: updatePassword } = useUpdatePasswordMutation();

  const isNameChanged = name !== initialName;
  const isImageChanged = hasSelectedFile;
  const isProfileChanged = isNameChanged || isImageChanged;
  const isNameEmpty = name.trim() === '';
  const isProfileSaveDisabled = !isProfileChanged || isNameEmpty;
  const isPasswordFilled =
    currentPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    selectedFileRef.current = file;
    setHasSelectedFile(true);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    setIsProfileLoading(true);
    try {
      const tasks: Promise<unknown>[] = [];

      if (isImageChanged && selectedFileRef.current) {
        tasks.push(
          uploadFile({ file: selectedFileRef.current, type: 'PROFILE' })
            .then((res: { fileId: number }) => updateProfileImage({ fileId: res.fileId }))
            .catch((err: unknown) => {
              if (isApiError(err) && err.status === 400) {
                toast.error('허용되지 않은 파일 형식입니다.');
              } else if (isApiError(err) && err.status === 404) {
                toast.error('파일을 찾을 수 없습니다.');
              } else {
                toast.error('프로필 이미지 변경에 실패했습니다.');
              }
              throw err;
            }),
        );
      }

      if (isNameChanged) {
        tasks.push(
          updateName({ name }).catch((err: unknown) => {
            toast.error('이름 변경에 실패했습니다.');
            throw err;
          }),
        );
      }

      await Promise.all(tasks);
      toast.success('프로필이 수정되었습니다.');
      selectedFileRef.current = null;
      setHasSelectedFile(false);

      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      router.refresh();
    } catch {
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsPasswordLoading(true);
    try {
      await updatePassword({ currentPassword, newPassword, confirmPassword });
      toast.success('비밀번호가 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      if (isApiError(err) && err.status === 401) {
        setCurrentPasswordError('현재 비밀번호가 일치하지 않습니다.');
      } else if (isApiError(err) && err.status === 400) {
        setNewPasswordError('비밀번호는 영문, 숫자, 특수문자 포함 6자 이상입니다.');
      } else {
        toast.error('비밀번호 변경에 실패했습니다.');
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className='mb-12 w-full max-w-3xl px-6 py-3 md:px-10 md:py-5'>
      <button
        onClick={() => router.back()}
        className='text-md mb-3 flex cursor-pointer items-center gap-2 font-medium text-gray-400 transition-all duration-200 hover:text-gray-500 md:mb-5 md:text-lg'
      >
        <Icon name='arrowLeft' size={16} className='md:h-4.5 md:w-4.5' />
        돌아가기
      </button>

      <section className='mb-8 rounded-xl border border-gray-200 bg-white p-6 md:p-8'>
        <h2 className='text-black-200 mb-6 text-lg font-semibold md:text-xl'>프로필</h2>

        <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8'>
          <div className='shrink-0'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
            <div
              className='group relative h-24 w-24 cursor-pointer rounded-full border border-gray-300 bg-gray-100 md:h-28 md:w-28'
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt='프로필 이미지'
                  fill
                  className='rounded-full object-cover'
                />
              )}
              <div className='absolute inset-0 hidden items-center justify-center rounded-full bg-black/30 group-hover:flex'>
                <Icon name='plus' size={28} className='text-white' />
              </div>
            </div>
          </div>

          <div className='w-full flex-1 space-y-1'>
            <Input
              label='이메일'
              type='email'
              value={user?.email ?? ''}
              readOnly
              disabled
              className='bg-gray-50 text-gray-400'
            />
            <Input
              label='이름'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='이름을 입력하세요'
            />
            <Button
              className='w-full'
              disabled={isProfileSaveDisabled}
              loading={isProfileLoading}
              onClick={handleProfileSave}
            >
              저장
            </Button>
          </div>
        </div>
      </section>

      <section className='rounded-xl border border-gray-200 bg-white p-6 md:p-8'>
        <h2 className='text-black-200 mb-6 text-lg font-semibold md:text-xl'>비밀번호 변경</h2>

        <div className='space-y-2'>
          <Input
            label='현재 비밀번호'
            type='password'
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (currentPasswordError) setCurrentPasswordError('');
            }}
            placeholder='현재 비밀번호 입력'
            error={currentPasswordError}
          />
          <Input
            label='새 비밀번호'
            type='password'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (newPasswordError) setNewPasswordError('');
            }}
            placeholder='영문, 숫자, 특수문자(!@#$%^&*) 포함 6자 이상'
            error={newPasswordError}
          />
          <Input
            label='새 비밀번호 확인'
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) setConfirmPasswordError('');
            }}
            placeholder='새 비밀번호 입력'
            error={confirmPasswordError}
          />
          <Button
            className='mt-1.5 w-full'
            disabled={!isPasswordFilled}
            loading={isPasswordLoading}
            onClick={handlePasswordSave}
          >
            저장
          </Button>
        </div>
      </section>
    </div>
  );
}
