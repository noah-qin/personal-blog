import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { sharedMetadata } from "@/app/shared-metadata";
import { ProjectBadges } from "@/components/project-card";
import { getEntry, getProjects } from "@/lib/content";
import { tagSlug } from "@/lib/tags";

const linkLabels = {
  app: "App Store",
  research: "View Paper",
  other: "Visit Website",
};

async function getProject(slug: string) {
  const project = (await getProjects()).find(
    (project) => project.slug === slug,
  );
  const entry = await getEntry("projects", slug);
  return project && entry ? { ...project, Content: entry.default } : null;
}

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project
    ? {
        title: project.title,
        description: project.description,
        ...sharedMetadata({ path: `/projects/${slug}` }),
      }
    : {};
}

async function ProjectDetails({
  params,
}: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { Content } = project;

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-10 text-center">
        <ProjectBadges project={project} className="justify-center" />
        <h1 className="my-4 text-[42px]/tight font-bold">{project.title}</h1>
        <p className="text-lg/relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {project.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tagSlug(tag)}`}
              className="font-mono text-xs text-muted hover:text-primary"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-4">
          {project.link && (
            <a
              href={project.link}
              className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white dark:bg-white dark:text-zinc-900"
            >
              {linkLabels[project.projectType]} ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              className="inline-flex rounded-lg border border-border bg-soft px-5 py-2.5 font-semibold"
            >
              GitHub
            </a>
          )}
        </div>
      </header>
      <div className="leading-[1.8] text-foreground/90">
        <Content />
      </div>
    </article>
  );
}

// Read params inside Suspense so the route keeps a URL-independent App Shell.
export default function Page({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense>
      <ProjectDetails params={params} />
    </Suspense>
  );
}
