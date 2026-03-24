import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="mx-auto min-h-screen max-w-md bg-white">
        <header className="sticky top-0 z-10 border-b bg-white p-4">
          <h1 className="text-lg font-semibold">혼밥로그</h1>
          <nav className="mt-2 flex gap-3 text-sm">
            <Link href="/feed">피드</Link>
            <Link href="/feed/new">한 끼 작성</Link>
            <Link href="/recipes">레시피</Link>
            <Link href="/challenges">챌린지</Link>
            <Link href="/me">마이</Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
