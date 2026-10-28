"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { site } from "@/lib/site";

type Command = { label: string; keywords: string; href: string };

const groups: { heading: string; commands: Command[] }[] = [
  {
    heading: "Navigation",
    commands: [
      { label: "Home", keywords: "home", href: "/" },
      { label: "Projects", keywords: "projects", href: "/projects" },
      { label: "Writing", keywords: "writing blog essays", href: "/blog" },
      { label: "About", keywords: "about", href: "/about" },
      { label: "Archive", keywords: "archive", href: "/archive" },
    ],
  },
  {
    heading: "Socials",
    commands: [
      { label: "GitHub", keywords: "github", href: site.github },
      {
        label: "Email",
        keywords: "email contact",
        href: `mailto:${site.email}`,
      },
    ],
  },
];

const CommandMenuContext = createContext<() => void>(() => {});

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = groups
    .map((group) => ({
      ...group,
      commands: group.commands.filter((command) =>
        command.keywords.includes(query.trim().toLowerCase()),
      ),
    }))
    .filter((group) => group.commands.length > 0);
  const visible = results.flatMap((group) => group.commands);

  function open() {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
  }

  function run(command: Command) {
    dialogRef.current?.close();
    if (command.href.startsWith("/")) router.push(command.href);
    else window.location.href = command.href;
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (dialogRef.current?.open) dialogRef.current.close();
      else open();
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (visible.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((active + step + visible.length) % visible.length);
    } else if (event.key === "Enter" && visible[active]) {
      run(visible[active]);
    }
  }

  return (
    <CommandMenuContext value={open}>
      {children}
      <button
        type="button"
        aria-label="Open command menu"
        onClick={open}
        className="fixed right-4 bottom-4 z-20 size-12 rounded-full bg-primary text-2xl text-primary-foreground md:hidden"
      >
        ⌕
      </button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click mirrors Escape, which dialog handles natively */}
      <dialog
        ref={dialogRef}
        aria-label="Global command menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(640px,calc(100%-32px))] rounded-xl border border-border bg-card p-2 text-foreground shadow-2xl backdrop-blur-xl backdrop:bg-black/35"
      >
        <div className="flex items-center gap-2.5 border-b border-border px-3 pt-1.5 pb-2.5">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search for projects, essays, or commands..."
            autoComplete="off"
            className="h-10 w-full bg-transparent outline-none"
          />
        </div>
        <div role="listbox" className="max-h-100 overflow-auto p-2">
          {results.map((group) => (
            <div key={group.heading}>
              <p className="mx-2 my-1.5 py-1 text-xs text-muted">
                {group.heading}
              </p>
              {group.commands.map((command) => (
                <button
                  key={command.href}
                  type="button"
                  role="option"
                  aria-selected={visible[active] === command}
                  onClick={() => run(command)}
                  onMouseEnter={() => setActive(visible.indexOf(command))}
                  className="block w-full cursor-pointer rounded-md p-2.5 text-left text-sm aria-selected:bg-soft aria-selected:text-primary"
                >
                  {command.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </dialog>
    </CommandMenuContext>
  );
}

export function SearchButton() {
  const open = use(CommandMenuContext);
  return (
    <button
      type="button"
      aria-label="Search"
      onClick={open}
      className="size-7 cursor-pointer text-2xl text-muted"
    >
      ⌕
    </button>
  );
}
