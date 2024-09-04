"use client";

import { deleteReview } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteBtn({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReview, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  if (isPending) return "삭제중...";

  const onClick = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={formAction}>
      <input hidden name="reviewId" value={reviewId} />
      <input hidden name="bookId" value={bookId} />
      <div onClick={onClick}>삭제하기</div>
    </form>
  );
}
