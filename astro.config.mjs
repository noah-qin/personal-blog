// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// Astro's CSP always emits hashes for style-src, and per the CSP spec any
// hash in a directive makes 'unsafe-inline' ignored. But ClientRouter and
// cmdk apply style attributes at runtime, which hashes can never cover
// (Safari enforces this and blocks them). So after the build we swap the
// style-src hash list for 'unsafe-inline', keeping script-src fully hashed.
function relaxStyleCsp() {
  return {
    name: 'relax-style-csp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const files = await readdir(root, { recursive: true });
        for (const file of files) {
          if (!file.endsWith('.html')) continue;
          const path = join(root, file);
          const html = await readFile(path, 'utf8');
          const patched = html.replace(
            /(<meta http-equiv="content-security-policy" content="[^"]*)style-src[^;"]*/i,
            `$1style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
          );
          if (patched !== html) await writeFile(path, patched);
        }
      },
    },
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

  integrations: [react(), sitemap(), relaxStyleCsp()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
  }
});