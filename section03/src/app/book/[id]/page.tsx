export default function Page({
  params,
}: {
  params: { id?: number | string[] };
}) {
  return <div>북 {params.id} 페이지 입니다.</div>;
}
