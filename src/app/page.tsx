"use client";

interface User {
  name: string;
}

export default function Home() {
  // 의도적으로 undefined를 User 타입으로 사용
  const user: User = undefined as unknown as User;

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <div>Hello World</div>
    </div>
  );
}
