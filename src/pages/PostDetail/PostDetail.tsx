import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PostDetail.module.scss";

import { usePosts } from "../../contexts/PostsContext";
import { postsService } from "../../services/posts.service";
import type { Post } from "../../types/blog";
import { formatDate } from "../../utils/date";

type State =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "success"; post: Post };

export default function PostDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { findPostById } = usePosts();

    const [state, setState] = useState<State>({ status: "loading" });

    useEffect(() => {
        if (!id) {
            setState({ status: "error", message: "Invalid post id." });
            return;
        }

        const cached = findPostById(id);
        if (cached) {
            setState({ status: "success", post: cached });
            return;
        }

        postsService
            .getById(id)
            .then((post) => setState({ status: "success", post }))
            .catch(() =>
                setState({ status: "error", message: "Post not found." })
            );
    }, [id, findPostById]);

    if (state.status === "loading") {
        return <p className={styles.status}>Loading...</p>;
    }

    if (state.status === "error") {
        return <p className={styles.status}>{state.message}</p>;
    }

    const post = state.post;
    const authorLabel = post.author?.name ?? "Unknown author";
    const dateLabel = formatDate(post.createdAt);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <button className={styles.back} onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <main className={styles.content}>
                    <h1 className={styles.title}>{post.title}</h1>

                    <div className={styles.meta}>
                        <img
                            className={styles.avatar}
                            src={post.author.profilePicture}
                            alt=""
                        />
                        <div>
                            <div>Written by: <strong>{authorLabel}</strong></div>
                            <time>{dateLabel}</time>
                        </div>
                    </div>

                    <div className={styles.hero}>
                        <img className={styles.heroImg} src={post.thumbnail_url} alt="" />
                    </div>

                    <article className={styles.body}>{post.content}</article>
                </main>
            </div>
        </div>
    );
}
