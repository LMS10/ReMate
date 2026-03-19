import Sidebar from '@/components/sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <main className='flex-1 overflow-auto bg-gray-100'>{children}</main>
    </div>
  );
}
