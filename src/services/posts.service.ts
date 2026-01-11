import { getJson } from "./http";
import type { Post, PostList } from "../types/blog";

export const postsService = {
  list(signal?: AbortSignal) {
    return getJson<PostList>("/posts", signal);
  },

  getById(id: string, signal?: AbortSignal) {
    return getJson<Post>(`/posts/${id}`, signal);
  },
};