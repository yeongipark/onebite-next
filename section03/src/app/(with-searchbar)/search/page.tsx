import CilentComponent from "@/components/client-component";
import ServerComponent from "@/components/server-component";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div>
      서치페이지 {searchParams.q}
      <CilentComponent>
        <ServerComponent />
      </CilentComponent>
    </div>
  );
}
