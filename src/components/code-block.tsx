"use client";

import { type ComponentProps, useRef, useState } from "react";

export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(ref.current?.innerText ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative my-6">
      <pre
        ref={ref}
        {...props}
        className="overflow-auto rounded-xl bg-zinc-900 p-5 font-mono text-sm text-zinc-200"
      />
      <button
        type="button"
        aria-label="Copy code"
        onClick={copy}
        className="absolute top-2 right-2 cursor-pointer rounded-md bg-zinc-700 px-2 py-1 font-mono text-xs text-zinc-200 opacity-0 transition group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
