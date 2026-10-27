import Link from "next/link";
import { SearchButton } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-6 bg-background/70 px-6 py-4 backdrop-blur-md md:flex-nowrap md:py-6">
      <Link href="/" className="font-mono text-lg font-bold hover:text-primary">
        Noah Qin
      </Link>
      <div className="flex w-full items-center justify-between gap-6 md:w-auto">
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-4 text-sm font-medium text-muted md:gap-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-l border-border pl-3.5 md:pl-5">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
