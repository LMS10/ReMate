export default function SidebarSkeleton() {
  return (
    <div className='flex flex-col gap-1.5 md:gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='flex items-center justify-center rounded-sm p-4 md:justify-start md:p-2 md:px-3 lg:p-2.5'
        >
          <div className='h-7 w-7 shrink-0 animate-pulse rounded-full bg-gray-200' />
          <div className='ml-4 hidden h-4 flex-1 animate-pulse rounded bg-gray-200 md:block' />
        </div>
      ))}
    </div>
  );
}
