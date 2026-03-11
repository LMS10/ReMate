export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string; receiptId: string }>;
}) {
  const { workspaceId, receiptId } = await params;

  return (
    <div>
      영수증 상세 페이지 <br />
      workspaceId: {workspaceId} <br />
      receiptId: {receiptId}
    </div>
  );
}
