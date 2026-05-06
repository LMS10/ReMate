import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import ModalRoot from '@/components/modal/ModalRoot';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <AuthProvider>{children}</AuthProvider>
        <ModalRoot />
        <div id='modal-root' />
      </body>
    </html>
  );
}
