import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <>
      네비게이션 : <Link href={"/parallel"}>페러렐</Link>
      &nbsp;
      <Link href={"/parallel/setting"}>세팅</Link>
      <br />
      <br />
      <div>페럴렐 레이아웃</div>
      {children}
      {sidebar}
      {feed}
    </>
  );
}
