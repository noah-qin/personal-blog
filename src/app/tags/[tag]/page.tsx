import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostRow } from "@/components/post-row";
import { ProjectCard } from "@/components/project-card";
import { getTagged, getTags } from "@/lib/tags";

export async function generateStaticParams() {
  return [...(await getTags()).keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const name = (await getTags()).get(tag);
  return name ? { title: `#${name}` } : {};
}

export default async function Page({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const name = (await getTags()).get(tag);
  if (!name) notFound();

  const { projects, posts } = await getTagged(tag);

  return (
    <>
      <header className="mb-12 max-w-2xl">
        <p className="leading-relaxed text-muted">
          <Link href="/" className="text-sm text-link">
            Home
          </Link>{" "}
          / Tags
        </p>
        <h1 className="my-4 text-4xl font-bold">#{name}</h1>
        <p className="leading-relaxed text-muted">
          {projects.length} Projects, {posts.length} Essays
        </p>
      </header>
      {projects.length > 0 && (
        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-bold">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
      {posts.length > 0 && (
        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-bold">Essays</h2>
          <div className="flex flex-col gap-2">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
