import { useEffect, useState } from "react";
import Post from "../components/Post/Post";
import { postsService } from "../services/posts.service";
import type { PostList } from "../types/blog";

export default function Home() {
    const [posts, setPosts] = useState<PostList>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        setError(null);

        postsService
            .list(controller.signal)
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Unknown error");
                setLoading(false);
            });

        return () => controller.abort();
    }, []);

    return (
        <div>
            <h1>React Blog</h1>

            {error && <p>{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {posts.map((p) => (
                        <li key={p.id}>
                            <Post
                                id={p.id}
                                title={p.title}
                                excerpt={p.content}
                                thumbnailUrl={p.thumbnail_url}
                                createdAt={p.createdAt}
                                author={p.author}
                                categories={p.categories}
                            />
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
}
