# Assets

## Content images

### Location

Images live next to the MDX entry that uses them.

```
src/content/<collection>/<slug>/
├── index.mdx
├── cover.jpg
└── <name>.<ext>
```

- `<collection>` is the content type: `blog` or `projects`.
- `<slug>` is the directory name and the URL slug.
- Images are never placed in `public/`.

### Naming

- Use lowercase kebab-case: `expo-floor.jpg`.
- Do not repeat the slug; the directory already scopes the file: `badge.jpg`, not `aws-summit-china-badge.jpg`.
- Name images by what they show, not by position: `stage.jpg`, not `1.jpg`.
- `cover.jpg` is reserved for the entry's cover image. Each entry has at most one.

### Format

- Store one high-quality source per image: JPEG for photos, PNG for screenshots and graphics.
- Do not commit generated variants such as WebP copies, resized versions, or thumbnails. `next/image` produces them on request.

### Usage

Images are statically imported and rendered with `next/image`. Static imports give Next.js the intrinsic width and height at build time, so they are never written by hand.

```mdx
import stage from "./stage.jpg";

<Image src={stage} alt="The main stage" />
```

`Image` is provided to every entry by `src/mdx-components.tsx`, which wraps `next/image` with the body `sizes` and styles, so entries only import the image files.

| Context | Rendering |
| :-- | :-- |
| Cover at the top of an entry | `loading="eager"` and `fetchPriority="high"` |
| Cover in a listing | Fixed `width` and `height`, no `sizes` |
| Image in the entry body | Shared `img` mapping in `mdx-components.tsx` with `sizes` set to the content width |
| Social card | `cover.jpg` imported in `generateMetadata`, resolved against `metadataBase` |

- `fetchPriority="high"` alone does not disable lazy loading; pair it with `loading="eager"`.
- Do not use `priority`, which is deprecated. Use `preload` only when the image would otherwise be discovered late.

### Configuration

```ts
images: {
  qualities: [75],
  formats: ["image/webp"],
  localPatterns: [],
},
```

- `qualities` is an explicit allowlist; other values are rejected.
- `formats` stays on WebP, which Next.js recommends for most cases.
- An empty `localPatterns` allows only statically imported images, which Next.js adds automatically. Path-based `src` values are rejected.

## Page images

Images used by components rather than content, such as the avatar, live in `src/assets/` and follow the same naming and import rules.

## Icons and social images

Icons and the default social image use the Next.js metadata file conventions in `src/app/`. Next.js generates the `<link>` and `<meta>` tags; do not write them by hand.

| File | Spec | Purpose |
| :-- | :-- | :-- |
| `src/app/favicon.ico` | 16×16, 32×32, 48×48 | Browser tab, legacy browsers |
| `src/app/icon.png` | 512×512 | Modern browsers, search results |
| `src/app/apple-icon.png` | 180×180, opaque background | iOS home screen |
| `src/app/opengraph-image.png` | 1200×630, under 8 MB | Default social card |

Every page sets `openGraph` for its canonical URL, which replaces the root `opengraph-image` tags, so `src/app/shared-metadata.ts` restates the default card with its alt text. Pages build their canonical, Open Graph and Twitter metadata through `sharedMetadata`; a post passes its `cover.jpg` as the image.

## Crawler and feed files

| Output | Source |
| :-- | :-- |
| `/robots.txt` | `src/app/robots.ts` |
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/rss.xml` | `src/app/rss.xml/route.ts` |
| `/rss-styles.xsl` | `public/rss-styles.xsl` |

`public/` holds only files that must be served at a fixed URL and are not covered by a Next.js convention.
