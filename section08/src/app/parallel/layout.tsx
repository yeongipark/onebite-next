import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <>
      <Link href={"/parallel"}>페러렐</Link>
      &nbsp;
      <Link href={"/parallel/setting"}>세팅</Link>
      <br />
      <div>페럴렐 레이아웃</div>
      {children}
      {sidebar}
    </>
  );
}
