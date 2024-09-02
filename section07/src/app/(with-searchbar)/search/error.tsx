"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div>
      <h3>검색과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
