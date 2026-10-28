import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

export function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={true}
      className="group -mx-4 flex items-center justify-between gap-6 rounded-xl p-4 hover:bg-soft/65"
    >
      <div>
        <h3 className="mb-2 font-bold">{post.title}</h3>
        <p className="text-sm/relaxed text-muted">{post.description}</p>
        <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-muted">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <span className="mt-2.5 block -translate-x-2 text-sm text-link opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          Read more →
        </span>
      </div>
      {post.cover && (
        <Image
          src={post.cover}
          alt={post.title}
          width={128}
          height={128}
          className="hidden size-32 flex-none rounded-lg border border-border object-cover sm:block"
        />
      )}
    </Link>
  );
}
