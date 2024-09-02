export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  description: string;
  coverImgUrl: string;
}

export interface reviewData {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  bookId: string;
}
