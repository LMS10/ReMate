export default async function Page({ params }: { params: Promise<{ workspaceId: string }> }) {
  const { workspaceId } = await params;

  return (
    <div>
      워크스페이스 상세 페이지 <br />
      workspaceId: {workspaceId}
    </div>
  );
}
