import type { Metadata } from "next";
import Link from "next/link";
import { PostRow } from "@/components/post-row";
import { posts } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "Writing",
};

export default function Page() {
  return (
    <>
      <header className="mb-12 max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">Writing</h1>
        <p className="leading-relaxed text-muted">
          Reflection on coding, research, and the future.{" "}
          <Link href="/archive" className="text-sm text-link">
            View Archive →
          </Link>
        </p>
      </header>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
