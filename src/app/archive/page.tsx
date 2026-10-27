import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "Archive",
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function Page() {
  const years = Map.groupBy(posts, (post) =>
    new Date(post.publishDate).getUTCFullYear(),
  );

  return (
    <>
      <header className="mb-12 max-w-2xl">
        <p className="leading-relaxed text-muted">
          <Link href="/" className="text-sm text-indigo-600">
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
                    className="flex justify-between gap-4 py-2 hover:text-primary"
                  >
                    <strong>{post.title}</strong>
                    <time
                      dateTime={post.publishDate}
                      className="shrink-0 font-mono text-sm text-muted"
                    >
                      {dateFormat.format(new Date(post.publishDate))}
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
