"use client";

import { useGetPosts, getPosts2 } from "@/services/api";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function TestClient() {
  const { mutate: getPosts, data } = useGetPosts();
  const [data2, setData2] = useState<Post | null>(null);

  const handleGetPosts2 = async () => {
    const data = await getPosts2();
    setData2(data);
  };

  return (
    <div>
      <div>
        <button onClick={() => getPosts()}>getPosts</button>
      </div>
      <div>{data && <div>{data.id}</div>}</div>
      <div>
        <button onClick={handleGetPosts2}>getPosts2</button>
      </div>
      <div>{data2 && <div>{data2.id}</div>}</div>
    </div>
  );
}
