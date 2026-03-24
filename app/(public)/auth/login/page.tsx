"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/feed" });
      }}
    >
      <input aria-label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded border p-2" />
      <input aria-label="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded border p-2" />
      <button aria-label="로그인" className="w-full rounded bg-black p-2 text-white" type="submit">
        로그인
      </button>
    </form>
  );
}
