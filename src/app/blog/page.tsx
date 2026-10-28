import type { Metadata } from "next";
import Link from "next/link";
import { sharedMetadata } from "@/app/shared-metadata";
import { PostRow } from "@/components/post-row";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  ...sharedMetadata({ path: "/blog" }),
};

export default async function Page() {
  const posts = await getPosts();
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
