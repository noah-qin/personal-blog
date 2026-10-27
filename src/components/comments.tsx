"use client";

import { useEffect, useRef } from "react";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    const attributes = {
      repo: "noah-qin/personal-blog",
      "repo-id": "R_kgDOQusUUA",
      category: "Announcements",
      "category-id": "DIC_kwDOQusUUM4C0O8G",
      mapping: "pathname",
      strict: "0",
      "reactions-enabled": "1",
      "emit-metadata": "0",
      "input-position": "top",
      theme: document.documentElement.getAttribute("data-theme") ?? "light",
      lang: "en",
      loading: "lazy",
    };
    for (const [key, value] of Object.entries(attributes)) {
      script.setAttribute(`data-${key}`, value);
    }
    container.append(script);

    return () => container.replaceChildren();
  }, []);

  return <div ref={ref} className="giscus" />;
}
