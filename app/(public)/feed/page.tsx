"use client";

import { useEffect, useState } from "react";

type FeedItem = {
  id: string;
  title: string;
  description: string;
  likeCount: number;
  commentCount: number;
};

export default function FeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/feed", { cache: "no-store" });
      const payload = await res.json();
      setItems(payload?.data?.items ?? []);
    })();
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold">한 끼 피드</h2>
      {items.length === 0 && <p className="text-sm text-slate-500">아직 게시물이 없습니다.</p>}
      {items.map((item) => (
        <article key={item.id} className="rounded border p-3">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.description}</p>
          <p className="mt-1 text-xs text-slate-500">좋아요 {item.likeCount} · 댓글 {item.commentCount}</p>
        </article>
      ))}
    </section>
  );
}
