import { Slide, ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import QueryProvider from '@/components/header/QueryProvider';
import ModalRoot from '@/components/modal/ModalRoot';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastContainer
              toastStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content',
                backgroundColor: '#454545',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '10px 28px',
                minHeight: 'unset',
                minWidth: 'unset',
                marginBottom: '60px',
              }}
              toastClassName='text-md lg:text-lg'
              position='bottom-center'
              autoClose={2000}
              icon={false}
              closeButton={false}
              hideProgressBar
              newestOnTop={false}
              pauseOnFocusLoss
              draggable
              closeOnClick={true}
              pauseOnHover
              transition={Slide}
              limit={3}
            />
            <ModalRoot />
          </AuthProvider>
        </QueryProvider>
        <div id='modal-root' />
      </body>
    </html>
  );
}
