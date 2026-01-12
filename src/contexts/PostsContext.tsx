import { createContext, useContext, useState } from "react";
import type { Post, PostList } from "../types/blog";

type PostsContextValue = {
    posts: PostList;
    setPosts: (posts: PostList) => void;
    findPostById: (id: string) => Post | undefined;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<PostList>([]);

    function findPostById(id: string) {
        return posts.find((post) => post.id === id);
    }

    return (
        <PostsContext.Provider value={{ posts, setPosts, findPostById }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error("usePosts must be used within PostsProvider");
    return ctx;
}
