"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    function apply() {
      localStorage.setItem("theme", next);
      root.setAttribute("data-theme", next);
      document
        .querySelector<HTMLIFrameElement>("iframe.giscus-frame")
        ?.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: next } } },
          "https://giscus.app",
        );
    }

    // Cross-fade the whole page, iframes included, instead of letting each element repaint on its own.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) apply();
    else document.startViewTransition(apply);
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
