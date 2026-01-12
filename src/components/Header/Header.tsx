import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Header.module.scss";

type HeaderProps = {
    closeOnSubmitMobile?: boolean;
};

export default function Header({ closeOnSubmitMobile = true }: HeaderProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const urlQuery = searchParams.get("q") ?? "";

    const [query, setQuery] = useState(urlQuery);
    const [mobileOpen, setMobileOpen] = useState(false);

    // mantém input sincronizado com URL
    useEffect(() => setQuery(urlQuery), [urlQuery]);

    function submit() {
        const normalizedQuery = query.trim();

        // atualiza URL
        if (normalizedQuery) setSearchParams({ q: normalizedQuery });
        else setSearchParams({}); // remove ?q=

        // se não estiver na Home, vai pra Home e mantém querystring
        if (location.pathname !== "/") {
            const nextUrl = normalizedQuery ? `?q=${encodeURIComponent(normalizedQuery)}` : "";
            navigate(`/${nextUrl}`);
        }

        if (closeOnSubmitMobile) setMobileOpen(false);
    }

    const searchClass = mobileOpen
        ? `${styles.search} ${styles.searchOpen}`
        : styles.search;

    return (
        <header className={styles.header}>
            <div className={styles.brand} aria-label="Brand">
                <strong className={styles.logo}>dentsu</strong>
                <span className={styles.sub}>world services</span>
            </div>

            <form
                className={searchClass}
                onSubmit={(e) => {
                    e.preventDefault();

                    // mobile: primeiro submit abre, segundo submit busca
                    if (!mobileOpen && window.innerWidth < 768) {
                        setMobileOpen(true);
                        return;
                    }

                    submit();
                }}
            >
                <input
                    type="search"
                    value={query}
                    onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);

                        if (value === "") {
                            setSearchParams({});
                        }
                    }}
                    placeholder="Search"
                    className={styles.input}
                    aria-label="Search posts"
                />

                <button type="submit" className={styles.iconBtn} aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </form>
        </header>
    );
}
