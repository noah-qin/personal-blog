import Link from "next/link";
import type { Project } from "@/lib/content";
import { tagSlug } from "@/lib/tags";

const badges = {
  app: { label: "iOS App", className: "bg-blue-50 text-blue-600" },
  research: { label: "Research", className: "bg-purple-50 text-purple-600" },
  other: { label: "Project", className: "bg-emerald-50 text-emerald-600" },
};

export function ProjectBadges({
  project,
  className = "justify-between",
}: {
  project: Project;
  className?: string;
}) {
  const badge = badges[project.projectType];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`rounded-full border border-border px-3 py-1 text-xs ${badge.className}`}
      >
        {badge.label}
      </span>
      {project.stats && (
        <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
          {project.stats}
        </span>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-lg transition duration-250 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={project.title}
        className="absolute inset-0"
      />
      <ProjectBadges
        project={project}
        className="pointer-events-none relative justify-between"
      />
      <h2 className="pointer-events-none relative mt-1 text-xl font-bold">
        {project.title}
      </h2>
      <p className="pointer-events-none relative text-sm/normal text-muted">
        {project.description}
      </p>
      <div className="relative mt-auto flex flex-wrap gap-2.5 pt-3">
        {project.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tagSlug(tag)}`}
            className="z-10 font-mono text-xs text-muted hover:text-primary"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
