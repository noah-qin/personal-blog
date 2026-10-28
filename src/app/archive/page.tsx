import type { Metadata } from "next";
import Link from "next/link";
import { sharedMetadata } from "@/app/shared-metadata";
import { getPosts } from "@/lib/content";
import { formatShortDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Archive",
  ...sharedMetadata({ path: "/archive" }),
};

export default async function Page() {
  const posts = await getPosts();
  const years = Map.groupBy(posts, (post) =>
    new Date(post.publishDate).getUTCFullYear(),
  );

  return (
    <>
      <header className="mb-12 max-w-2xl">
        <p className="leading-relaxed text-muted">
          <Link href="/" className="text-sm text-link">
            Home
          </Link>{" "}
          / Archive
        </p>
        <h1 className="my-4 text-4xl font-bold">Archive</h1>
        <p className="leading-relaxed text-muted">
          {posts.length} posts in total.
        </p>
      </header>
      <div>
        {[...years].map(([year, yearPosts]) => (
          <section key={year} className="mb-10">
            <h2 className="flex items-center gap-4 text-2xl font-bold">
              {year}
              <span className="h-px flex-1 bg-border" />
            </h2>
            <ul className="mt-4">
              {yearPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    prefetch={true}
                    className="flex justify-between gap-4 py-2 hover:text-primary"
                  >
                    <strong>{post.title}</strong>
                    <time
                      dateTime={post.publishDate}
                      className="shrink-0 font-mono text-sm text-muted"
                    >
                      {formatShortDate(post.publishDate)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
