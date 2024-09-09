import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <BookItemSkeleton key={idx} />
        ))}
    </>
  );
}
