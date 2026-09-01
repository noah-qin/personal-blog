# Astro to Lume migration record

## Route parity

| Before               | After                | Source              |
| :------------------- | :------------------- | :------------------ |
| `/`                  | `/`                  | `src/index.vto`     |
| `/about`             | `/about/`            | `src/about.vto`     |
| `/archive`           | `/archive/`          | `src/archive.vto`   |
| `/blog`              | `/blog/`             | `src/blog.vto`      |
| `/projects`          | `/projects/`         | `src/projects.vto`  |
| `/404.html`          | `/404.html`          | `src/404.vto`       |
| `/rss.xml`           | `/rss.xml`           | Lume feed plugin    |
| `/sitemap-index.xml` | `/sitemap-index.xml` | Lume sitemap plugin |

All pretty URLs are emitted as `index.html`. At migration time the site was still hosted on Vercel, which served both the former no-trailing-slash form and the canonical trailing-slash form; this is a historical note about that prior host, not the current Deno Deploy setup.

### Blog posts (11/11)

- `/blog/2026-new-year/`
- `/blog/ai-illusion-of-certainty/`
- `/blog/aws-summit-china-2026/`
- `/blog/building-nightguard/`
- `/blog/building-vex/`
- `/blog/cafe-cursor-beijing/`
- `/blog/freelancing-reflection/`
- `/blog/ssc-reflection/`
- `/blog/usaco-achievement/`
- `/blog/vivo-dev-conf/`
- `/blog/why-i-co-founded-cobay/`

### Projects (6/6)

- `/projects/cobay/`
- `/projects/curve-studio/`
- `/projects/iron-sets/`
- `/projects/nightguard/`
- `/projects/rethinking-data-augmentation/`
- `/projects/vex/`

### Tag pages (34/34)

`accessibility`, `ai`, `algorithms`, `cli`, `cloud`, `community`, `competition`, `computer-vision`, `data`, `devlog`, `devtools`, `education`, `entrepreneurship`, `event`, `fitness`, `freelancing`, `growth`, `healthkit`, `ios`, `math`, `open-source`, `opinion`, `personal`, `product`, `productivity`, `programming`, `publication`, `reflection`, `rust`, `small-sample-learning`, `swift`, `swiftui`, `watchos`, and `web-development`.

## Feature parity

| Astro implementation             | Lume implementation                              |
| :------------------------------- | :----------------------------------------------- |
| Astro content collections        | Markdown plus cascading `_data.ts`               |
| Astro layouts/components         | Vento layouts and includes                       |
| Tailwind and typography          | Repository-owned responsive CSS and prose styles |
| React theme island               | Native external JavaScript                       |
| React/cmdk command menu          | Native dialog and keyboard navigation            |
| React Giscus component           | Native Giscus embed with theme messages          |
| Astro copy-code component        | Native clipboard enhancement                     |
| Astro RSS and sitemap            | Official Lume feed and sitemap plugins           |
| Astro reading-time remark plugin | Local Lume TypeScript filter                     |

The site remains English-only because the original site had no multilingual routes or dictionaries.
