# noahqin.dev

Personal website and blog of Noah Qin — projects, essays, and an about/timeline page. Live at [noahqin.dev](https://noahqin.dev).

## Tech stack

- [Deno](https://deno.com/) — runtime, tasks, formatting, linting, and type checking
- [Lume](https://lume.land/) — Deno-native static site generator
- Vento and Markdown — templates and content
- Native CSS and browser JavaScript — design and interactions, with no client framework or bundler
- [Giscus](https://giscus.app/) — native comments embed backed by GitHub Discussions

This repository has no `package.json`, npm commands, or `node_modules`. Lume and its official plugins are loaded by Deno from a pinned Lume release. Some internal Lume implementation packages are recorded transitively in `deno.lock`; they are resolved and executed by Deno and do not require Node.js or npm tooling.

## Commands

| Command           | Action                                                                |
| :---------------- | :-------------------------------------------------------------------- |
| `deno task serve` | Build and serve locally at `http://localhost:3000` with file watching |
| `deno task build` | Build the production site into `./_site/`                             |
| `deno task fmt`   | Format source files                                                   |
| `deno task lint`  | Run the Deno linter                                                   |
| `deno task check` | Type-check configuration and site scripts                             |

Before committing, run:

```sh
deno fmt
deno lint
deno task check
deno task build
```

## Project structure

```text
.
├── _config.ts                 # Lume config, feed, sitemap, and URL checks
├── deno.json                  # Deno imports and tasks
├── src/
│   ├── _data.yml              # Shared site metadata
│   ├── _includes/             # Vento layouts and components
│   ├── assets/                # Native CSS and browser JavaScript
│   ├── content/blog/          # Blog posts in Markdown
│   ├── content/projects/      # Project pages in Markdown
│   ├── images/                # Static article images
│   ├── tags.page.ts           # Tag page generator
│   └── *.vto                  # Home, lists, archive, about, and 404
├── vercel.json                # Static output and security headers
└── _site/                     # Generated output (ignored)
```

## Writing content

Add Markdown under `src/content/blog/` or `src/content/projects/`. Every content file declares an explicit `url` so published links cannot change accidentally.

Blog frontmatter uses `title`, `description`, `publishDate`, `url`, optional `tags`, `image`, and `thumbnail`. Project frontmatter additionally uses `projectType` (`app`, `research`, or `other`) and optional `link`, `github`, and `stats`.

Reading time, tag pages, archive grouping, RSS, and the sitemap are generated during the Lume build. The build fails when an internal page or asset link is broken.

## Interactions and CSP

- Theme selection is stored under the `theme` local-storage key and follows the system preference initially.
- The command menu supports `⌘K`/`Ctrl+K`, filtering, arrow keys, Enter, and Escape.
- Code blocks receive a native clipboard button.
- Giscus uses its native embed and follows the active site theme.

Browser code is served from `/assets/`; there is no inline executable JavaScript. JSON-LD hashes in `vercel.json` are fixed CSP hashes and must be regenerated if structured-data content changes.

## Deployment

Vercel runs `deno task build` and publishes `_site`. Do not add an install command or Node.js package manager. `vercel.json` owns the static security headers and CSP.
