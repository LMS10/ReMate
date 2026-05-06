'use client';

import { signOut } from 'next-auth/react';
import Button from './Buttons';

export default function TempLogoutButton() {
  async function handleLogout() {
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <div className='fixed top-10 left-4 z-50'>
      <Button variant='secondary' size='xl' className='px-3' onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  );
}
