import { Icon } from "@steez-ui/icons";
import { SOCIAL_LINKS } from "../lib/docs/site-data";

export function SiteFooter() {
  return (
    <footer className="main-footer">
      <span>Steez UI</span>
      <nav aria-label="Social" className="social-links">
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon icon={icon} width={16} height={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </footer>
  );
}
