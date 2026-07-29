"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SteezIconProvider } from "@steez-ui/icons";
import { SITE_NAV, REPOSITORY_URL, NPM_UI_URL } from "@/lib/docs/site-data";
import styles from "./site-layout.module.css";

type NavKey = (typeof SITE_NAV)[number]["key"] | "home";

export function DocsSiteLayout({
  currentNav,
  title,
  description,
  children,
}: {
  currentNav: NavKey;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SteezIconProvider size={16} strokeWidth={2}>
      <div className={styles.app}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <Link href="/" className={styles.brand}>
              Steez UI
            </Link>

            <nav className={styles.nav} aria-label="Primary">
              {SITE_NAV.map((item) => {
                const isActive =
                  item.key === currentNav ||
                  (item.key === "components" && pathname.startsWith("/components"));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.headerActions}>
              <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={NPM_UI_URL} target="_blank" rel="noreferrer">
                npm
              </a>
            </div>
          </header>

          <main className={styles.main}>
            {title ? (
              <div>
                <h1 className={styles.pageTitle}>{title}</h1>
                {description ? <p className={styles.pageLead}>{description}</p> : null}
              </div>
            ) : null}
            {children}
          </main>
        </div>
      </div>
    </SteezIconProvider>
  );
}
