"use client";

import { useLayoutEffect } from "react";

export function ThemeToggle() {
  // Re-apply after React clears it on the dev remount. This is a no-op in production.
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    root.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="size-7 cursor-pointer text-2xl text-muted"
    >
      <span aria-hidden="true" className="dark:hidden">
        ☾
      </span>
      <span aria-hidden="true" className="hidden dark:inline">
        ☀
      </span>
    </button>
  );
}
