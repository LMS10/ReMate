import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <main className='flex-1 overflow-auto bg-gray-100 pt-15 md:pt-17.5'>
        <Header />
        {children}
      </main>
    </div>
  );
}
