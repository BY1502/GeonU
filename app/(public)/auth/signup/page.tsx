export default function SignupPage() {
  return (
    <form className="space-y-3" method="post" action="/api/auth/signup">
      <input aria-label="이메일" name="email" type="email" className="w-full rounded border p-2" placeholder="이메일" />
      <input aria-label="비밀번호" name="password" type="password" className="w-full rounded border p-2" placeholder="비밀번호" />
      <input aria-label="닉네임" name="name" type="text" className="w-full rounded border p-2" placeholder="닉네임" />
      <button aria-label="회원가입" className="w-full rounded bg-black p-2 text-white" type="submit">
        회원가입
      </button>
    </form>
  );
}
