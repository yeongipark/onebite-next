import Book from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Modal>
        <Book params={params} />
      </Modal>
    </>
  );
}
