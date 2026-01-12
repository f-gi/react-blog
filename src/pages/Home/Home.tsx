import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { postsService } from "../../services/posts.service";
import type { PostList } from "../../types/blog";
import styles from "./Home.module.scss";

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
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>DWS blog</h1>
            </header>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.layout}>
                <aside className={styles.filters} aria-label="Filters" />

                <main className={styles.content}>
                    {loading ? (
                        <p className={styles.loading}>Loading...</p>
                    ) : (
                        <ul className={styles.cards} aria-label="Posts">
                            {posts.map((p) => (
                                <li key={p.id} className={styles.cardItem}>
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
                </main>
            </div>
        </div>
    );
}
