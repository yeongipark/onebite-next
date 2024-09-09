import { reviewData } from "@/types";
import style from "./review-item.module.css";
import { deleteReview } from "@/actions/delete-review.action";
import ReviewItemDeleteBtn from "./review-item-delete-btn";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: reviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}> {content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <ReviewItemDeleteBtn reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}
