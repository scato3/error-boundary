import api from "./instance";
import { axiosInstance } from "./instance";
import { useMutation } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface CustomError {
  title: string;
  message: string;
}

const getPosts = async () => {
  try {
    return await api.post<Post>({
      url: "/posts/1124124123123",
    });
  } catch (error: unknown) {
    throw {
      title: "게시글 조회 실패",
      message: (error as Error).message,
    } as CustomError;
  }
};

export const getPosts2 = async () => {
  try {
    const response = await axiosInstance.get<Post>("/posts/1124124123123");
    return response.data;
  } catch (error: unknown) {
    throw {
      title: "게시글 조회 실패",
      message: (error as Error).message,
    } as CustomError;
  }
};

export const useGetPosts = () => {
  return useMutation<Post, CustomError>({
    mutationFn: getPosts,
  });
};

export const useGetPosts2 = () => {
  return useMutation<Post, CustomError>({
    mutationFn: getPosts2,
  });
};
