import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Page() {
  const projects = await getProjects();
  return (
    <>
      <header className="mb-12 max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="leading-relaxed text-muted">
          App Store apps, research papers, and open source experiments.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
