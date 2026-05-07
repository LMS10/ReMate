import Header from '@/components/header/Header';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='pt-15 md:pt-17.5'>{children}</main>
    </>
  );
}
