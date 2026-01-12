import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { usePosts } from "../../contexts/PostsContext";
import { postsService } from "../../services/posts.service";
import styles from "./Home.module.scss";

export default function Home() {
    const { posts, setPosts } = usePosts();
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const q = (searchParams.get("q") ?? "").trim().toLowerCase();

    useEffect(() => {
        setLoading(true);
        setError(null);

        postsService
            .list()
            .then(setPosts)
            .catch((err) =>
                setError(err instanceof Error ? err.message : "Failed to load posts")
            )
            .finally(() => setLoading(false));
    }, [setPosts]);

    const filteredPosts = q
        ? posts.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.content.toLowerCase().includes(q)
        )
        : posts;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>DWS blog</h1>
            </header>

            {error && <p className={styles.error}>{error}</p>}

            <main className={styles.content}>
                {loading ? (
                    <p>Loading...</p>
                ) : filteredPosts.length === 0 ? (
                    <p className={styles.noResults}>
                        No results found for <strong>“{q}”</strong>.
                    </p>
                ) : (
                    <ul className={styles.cards} aria-label="Posts">
                        {filteredPosts.map((p) => (
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
            </main>
        </div>
    );
}
