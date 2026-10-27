import { cacheLife } from "next/cache";
import { site } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-4xl justify-between border-t border-border px-6 py-8 font-mono text-sm text-muted">
      <span>
        © <CurrentYear /> {site.name}.
      </span>
      <span className="flex items-center gap-4">
        <a href="/rss.xml" className="hover:text-primary">
          RSS
        </a>
        <a href={site.github} className="hover:text-primary">
          GitHub
        </a>
      </span>
    </footer>
  );
}
