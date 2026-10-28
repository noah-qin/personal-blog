import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sharedMetadata } from "@/app/shared-metadata";
import avatar from "@/assets/avatar.png";
import { PostRow } from "@/components/post-row";
import { ProjectCard } from "@/components/project-card";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

const technologies = [
  "Swift",
  "Python",
  "Java",
  "Rust",
  "SQL",
  "PyTorch",
  "Next.js",
  "Spring Boot",
];

export const metadata: Metadata = sharedMetadata({ path: "/" });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: [site.github],
  jobTitle: "Student & Developer",
};

export default async function Page() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD as recommended by the Next.js guide, with < escaped
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="grid items-center gap-12 pt-6 pb-15 md:grid-cols-2 md:pt-15 md:pb-20">
        <div className="order-2 md:order-1">
          <h1 className="mb-6 text-5xl/[1.05] font-bold tracking-[-0.04em] md:text-[56px]">
            Hi, I&apos;m{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Noah Qin
            </span>
            .
          </h1>
          <p className="text-xl/[1.65] text-muted [&_strong]:text-foreground">
            Class of 2027 Applicant. I build <strong>systems</strong>,{" "}
            <strong>products</strong>, and <strong>communities</strong>. From
            open-source developer tools and iOS apps to Cobay, I turn technical
            ideas into things people can use together.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/projects"
              className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white dark:bg-white dark:text-zinc-900"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="inline-flex rounded-lg border border-border bg-soft px-5 py-2.5 font-semibold"
            >
              Read Essays
            </Link>
          </div>
        </div>
        <div className="relative order-1 mx-auto grid aspect-square w-full max-w-52 place-items-center md:order-2 md:max-w-none">
          <div className="absolute inset-[8%] animate-glow rounded-full bg-linear-45 from-primary to-purple-500 opacity-25 blur-[60px]" />
          <Image
            src={avatar}
            alt="Noah Qin Avatar"
            sizes="(min-width: 768px) 290px, 136px"
            loading="eager"
            fetchPriority="high"
            className="relative w-[65%] animate-float drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="mb-20">
        <p className="text-[13px] font-bold tracking-widest text-muted uppercase">
          Technologies I work with
        </p>
        <div className="mt-4 flex flex-wrap gap-7 text-xl font-bold opacity-80">
          {technologies.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-link">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Essays</h2>
          <Link href="/blog" className="text-sm text-link">
            Read Blog →
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {posts.slice(0, 3).map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
