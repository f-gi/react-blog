import { useEffect, useState } from "react";
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
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} style={{ marginBottom: 24 }}>
                            <img
                                src={post.thumbnail_url}
                                alt={post.title}
                                style={{ width: 320, height: "auto", display: "block" }}
                            />

                            <div>
                                <div>
                                    <span>{post.createdAt}</span> --- <span>{post.author?.name}</span>
                                </div>

                                <h2>{post.title}</h2>
                                <p>{post.content}</p>

                                <div>
                                    {post.categories?.map((category) => (
                                        <span key={category.id} style={{ marginRight: 8 }}>
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
