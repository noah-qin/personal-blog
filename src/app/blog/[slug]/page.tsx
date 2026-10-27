import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Comments } from "@/components/comments";
import { getEntry, getPosts } from "@/lib/content";
import { formatLongDate } from "@/lib/format";
import { site } from "@/lib/site";

async function getPost(slug: string) {
  const post = (await getPosts()).find((post) => post.slug === slug);
  const entry = await getEntry("blog", slug);
  return post && entry ? { ...post, Content: entry.default } : null;
}

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const images = post.cover ? [post.cover.src] : undefined;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishDate,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { Content } = post;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    image: `${site.url}${post.cover?.src ?? "/opengraph-image.png"}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto max-w-2xl">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD as recommended by the Next.js guide, with < escaped
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="mb-10 text-center">
        <div className="flex justify-center gap-2 font-mono text-[13px] text-muted">
          <time dateTime={post.publishDate}>
            {formatLongDate(post.publishDate)}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="my-4 text-[42px]/tight font-bold">{post.title}</h1>
        <p className="text-lg/relaxed text-muted">{post.description}</p>
      </header>
      <div className="leading-[1.8] text-foreground/90">
        <Content />
      </div>
      <div className="mt-16 border-t border-border pt-8">
        <Link href="/blog" className="text-link">
          ← Back to Essays
        </Link>
      </div>
      <div className="mt-16 border-t border-border pt-8">
        <Comments />
      </div>
    </article>
  );
}
