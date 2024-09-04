"use server";

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

export async function deleteReview(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰가 없습니다.",
    };
  }
  try {
    await delay(1000);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (e) {
    return {
      status: false,
      error: "리뷰 삭제에 실패했습니다.",
    };
  }
}
