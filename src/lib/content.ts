import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";

type Entry = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
};

export type Post = Entry & {
  cover?: StaticImageData;
  readingTime: string;
};

export type Project = Entry & {
  projectType: "app" | "research" | "other";
  stats?: string;
  link?: string;
  github?: string;
};

type Collection = "blog" | "projects";

const contentDir = path.join(process.cwd(), "src/content");

function getSlugs(collection: Collection) {
  return readdirSync(path.join(contentDir, collection), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function load(collection: Collection, slug: string) {
  const mdx: { default: ComponentType; metadata: Omit<Entry, "slug"> } =
    await import(`@/content/${collection}/${slug}/index.mdx`);
  return mdx;
}

function readingTime(collection: Collection, slug: string) {
  const source = readFileSync(
    path.join(contentDir, collection, slug, "index.mdx"),
    "utf8",
  );
  const body = source.slice(source.indexOf("};") + 2).replace(/<[^>]*>/g, " ");
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function byDate(a: Entry, b: Entry) {
  return b.publishDate.localeCompare(a.publishDate);
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getSlugs("blog").map(async (slug) => ({
      slug,
      ...((await load("blog", slug)).metadata as Omit<
        Post,
        "slug" | "readingTime"
      >),
      readingTime: readingTime("blog", slug),
    })),
  );
  return posts.sort(byDate);
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    getSlugs("projects").map(async (slug) => ({
      slug,
      ...((await load("projects", slug)).metadata as Omit<Project, "slug">),
    })),
  );
  return projects.sort(byDate);
}

export async function getEntry(collection: Collection, slug: string) {
  if (!getSlugs(collection).includes(slug)) return null;
  return load(collection, slug);
}
