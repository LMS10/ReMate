import localFont from 'next/font/local';
import './globals.css';
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
        {children}
        <ModalRoot />
        <div id='modal-root' />
      </body>
    </html>
  );
}
