import { Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { formatDate } from "../../utils/date";

type Category = { id: string; name: string };
type Author = { name?: string | null };

export type PostCardProps = {
    id: string;
    title: string;
    excerpt?: string;
    thumbnailUrl?: string | null;
    createdAt?: string;
    author?: Author | null;
    categories?: Category[] | null;
};

export default function Post({
    id,
    title,
    excerpt,
    thumbnailUrl,
    createdAt,
    author,
    categories,
}: PostCardProps) {
    const dateLabel = formatDate(createdAt);
    const authorLabel = author?.name ?? "Unknown author";

    return (
        <article className={styles.card}>
            <Link to={`/posts/${id}`} className={styles.coverLink} aria-label={title}>
                <div className={styles.media}>
                    {thumbnailUrl ? (
                        <img className={styles.image} src={thumbnailUrl} alt="" />
                    ) : (
                        <div className={styles.imagePlaceholder} aria-hidden="true" />
                    )}
                </div>

                <div className={styles.body}>
                    <header className={styles.meta}>
                        {dateLabel && (
                            <time className={styles.date} dateTime={createdAt}>
                                {dateLabel}
                            </time>
                        )}

                        <span className={styles.dot} aria-hidden="true" />

                        <span className={styles.author}>{authorLabel}</span>
                    </header>

                    <h2 className={styles.title}>{title}</h2>

                    {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

                    {categories?.length ? (
                        <ul className={styles.categories} aria-label="Categories">
                            {categories.map((c) => (
                                <li key={c.id} className={styles.tag}>
                                    {c.name}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </Link>
        </article>
    );
}
