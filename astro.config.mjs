// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://noahqin.dev',
  prefetch: true,
  // Emits a per-page <meta http-equiv="Content-Security-Policy"> with sha256
  // hashes for every inline script, so no 'unsafe-inline' is needed.
  // frame-ancestors can't live in a meta CSP, so it stays in vercel.json.
  security: {
    csp: {
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
      scriptDirective: {
        resources: ["'self'", 'https://giscus.app'],
        // Hash of the is:inline theme script in Layout.astro, which Astro
        // doesn't hash automatically. Recompute if that script changes:
        //   python3 -c "import re,hashlib,base64;b=[s for _,s in re.findall(r'<script(?![^>]*src=)([^>]*)>(.*?)</script>',open('dist/index.html').read(),re.S) if 'getTheme' in s][0];print('sha256-'+base64.b64encode(hashlib.sha256(b.encode()).digest()).decode())"
        hashes: ['sha256-JdTaamQ7F7ZHQA7WW3yJQ1TgZdFd6WthJ+hLpq1K1Oo='],
      },
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https:",
        "font-src 'self' https://fonts.gstatic.com",
        'frame-src https://giscus.app',
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
  }
});