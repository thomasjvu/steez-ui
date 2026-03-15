import React from "react";

import "@steez-ui/theme/tokens.css";

import { SteezIconProvider } from "@steez-ui/icons";
import { PageTemplate, ThemeToggle } from "@steez-ui/ui";
import buttonStyles from "@steez-ui/ui/styles/Buttons.module.css";

import styles from "./RegistrySiteLayout.module.css";
import { NPM_UI_URL, REPOSITORY_URL, SITE_NAV } from "./siteData";

interface RegistrySiteLayoutProps {
  currentNav: (typeof SITE_NAV)[number]["key"];
  title: string;
  description: string;
  children: React.ReactNode;
}

export function RegistrySiteLayout({
  currentNav,
  title,
  description,
  children,
}: RegistrySiteLayoutProps) {
  const currentOrigin = typeof window === "undefined" ? "/" : window.location.origin;

  const headerActions = (
    <div className={styles.headerActions}>
      <a
        className={`${buttonStyles.secondary} ${styles.linkButton}`}
        href={REPOSITORY_URL}
      >
        GitHub
      </a>
      <a
        className={`${buttonStyles.secondary} ${styles.linkButton}`}
        href={NPM_UI_URL}
      >
        npm
      </a>
      <ThemeToggle />
    </div>
  );

  return (
    <SteezIconProvider size={16} strokeWidth={2}>
      <div className={styles.app}>
        <div className={styles.shell}>
          <PageTemplate
            title={title}
            description={description}
            brand={<span className={styles.brandMark}>SU</span>}
            brandTitle="Go to Steez UI home"
            brandAriaLabel="Go to Steez UI home"
            onBrandClick={() => {
              window.location.href = `${currentOrigin}/`;
            }}
            extra={headerActions}
          >
            <div className={styles.content}>
              <nav className={styles.pageNav} aria-label="Steez UI navigation">
                {SITE_NAV.map((item) => {
                  const isActive = item.key === currentNav;
                  return (
                    <a
                      key={item.key}
                      className={`${isActive ? buttonStyles.primary : buttonStyles.secondary} ${styles.linkButton}`}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              {children}
            </div>
          </PageTemplate>
        </div>
      </div>
    </SteezIconProvider>
  );
}
