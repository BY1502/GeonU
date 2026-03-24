"use client";

import { useState } from "react";

export default function NewFeedPage() {
  const [title, setTitle] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await fetch("/api/feed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description: "간단 식사",
            cookingTimeMin: 10,
            estimatedCostWon: 5000,
            imageUrls: ["https://picsum.photos/200"],
            ingredientTags: ["계란"],
            visibility: "PUBLIC",
          }),
        });
        location.href = "/feed";
      }}
    >
      <input
        aria-label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="w-full rounded border p-2"
      />
      <button aria-label="한 끼 작성" className="w-full rounded bg-black p-2 text-white" type="submit">
        등록
      </button>
    </form>
  );
}
