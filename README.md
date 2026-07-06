# noahqin.dev

Personal website and blog of Noah Qin — projects, essays, and an about/timeline page. Live at [noahqin.dev](https://noahqin.dev).

## Tech Stack

- [Astro 7](https://astro.build) — static site generation, content collections, view transitions
- [React 19](https://react.dev) — interactive islands (command menu, theme toggle, comments)
- [Tailwind CSS 4](https://tailwindcss.com) — styling, with `@tailwindcss/typography` for prose
- [Giscus](https://giscus.app) — comments backed by GitHub Discussions

## Project Structure

```text
/
├── public/                  # Static assets (favicon, OG image, robots.txt, RSS stylesheet)
├── src/
│   ├── components/          # Astro + React components
│   │   ├── CommandMenu.tsx  # ⌘K command palette (cmdk)
│   │   ├── ThemeToggle.tsx  # Light/dark switch
│   │   └── GiscusWidget.tsx # Comments, follows the active theme
│   ├── content/
│   │   ├── blog/            # Blog posts (Markdown)
│   │   ├── projects/        # Project pages (Markdown)
│   │   └── config.ts        # Frontmatter schemas (zod)
│   ├── layouts/Layout.astro # Shared shell: head/SEO/JSON-LD, header, footer
│   ├── lib/collections.ts   # Shared content-collection helpers
│   ├── pages/               # Routes (index, blog, projects, tags, archive, about, rss)
│   └── site.config.ts       # Site metadata: name, URL, GitHub, email
└── astro.config.mjs         # Integrations, markdown plugins, reading-time plugin
```

## Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm install` | Install dependencies                         |
| `pnpm dev`     | Start dev server at `localhost:4321`         |
| `pnpm build`   | Build the production site to `./dist/`       |
| `pnpm preview` | Preview the production build locally         |

## Writing Content

Add a Markdown file under `src/content/blog/` or `src/content/projects/`. Frontmatter is validated by the schemas in `src/content/config.ts`:

- **Blog**: `title`, `description`, `publishDate`, optional `updatedDate`, `tags`, `image`
- **Projects**: `title`, `description`, `publishDate`, `tags`, `type` (`app` | `research` | `other`), optional `image`, `link`, `github`, `stats`

Reading time is computed at build time by the `remarkReadingTime` plugin in `astro.config.mjs`.

## Deployment

Fully static output — deployed on [Vercel](https://vercel.com). Any push to `main` triggers a build (`pnpm build`). Site URL and metadata live in `src/site.config.ts` and `astro.config.mjs` (`site`).
