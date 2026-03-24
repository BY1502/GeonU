async function getFeed() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/feed`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function FeedPage() {
  const payload = await getFeed();
  const items = payload?.data?.items ?? [];

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold">한 끼 피드</h2>
      {items.length === 0 && <p className="text-sm text-slate-500">아직 게시물이 없습니다.</p>}
      {items.map((item: any) => (
        <article key={item.id} className="rounded border p-3">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.description}</p>
          <p className="mt-1 text-xs text-slate-500">좋아요 {item.likeCount} · 댓글 {item.commentCount}</p>
        </article>
      ))}
    </section>
  );
}
