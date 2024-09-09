"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(state: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author) {
    return {
      status: false,
      error: "본문 혹은 작성자를 입력해주세요!",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
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
    console.error(e);
    return {
      status: false,
      error: "본문 혹은 작성자를 입력해주세요!",
    };
  }
}
