"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          location.href = "/auth/login";
        }
      }}
    >
      <input
        aria-label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full rounded border p-2"
        placeholder="이메일"
      />
      <input
        aria-label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full rounded border p-2"
        placeholder="비밀번호"
      />
      <input
        aria-label="닉네임"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="w-full rounded border p-2"
        placeholder="닉네임"
      />
      <button aria-label="회원가입" className="w-full rounded bg-black p-2 text-white" type="submit">
        회원가입
      </button>
    </form>
  );
}
