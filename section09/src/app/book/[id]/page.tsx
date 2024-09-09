import { BookData, reviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { createReviewAction } from "@/actions/create-review.action";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import { delay } from "@/util/delay";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const books = await res.json();

  return books.map((item: BookData) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} 상세보기`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} 상세보기`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book: BookData = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} alt="표지" width={240} height={300} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      cache: "force-cache",
      next: { tags: [`review-${bookId}`] },
    }
  );
  if (!res.ok) {
    throw new Error("에러가 발생했습니다.");
  }
  const reviewList: reviewData[] = await res.json();
  return (
    <section>
      {reviewList.map((data) => (
        <ReviewItem key={`review-item-${data.id}`} {...data} />
      ))}
    </section>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <Suspense fallback={<BookItemSkeleton />}>
        <BookDetail bookId={params.id} />
      </Suspense>
      <ReviewEditor bookId={params.id} />
      <Suspense fallback={<div>로딩중...</div>}>
        <ReviewList bookId={params.id} />
      </Suspense>
    </div>
  );
}
