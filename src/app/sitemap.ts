import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";
import { getTags } from "@/lib/tags";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects, tags] = await Promise.all([
    getPosts(),
    getProjects(),
    getTags(),
  ]);
  const pages = ["", "/about", "/projects", "/blog", "/archive"].map(
    (path) => ({ url: `${site.url}${path}` }),
  );

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.publishDate,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: project.publishDate,
    })),
    ...[...tags.keys()].map((tag) => ({
      url: `${site.url}/tags/${tag}`,
    })),
  ];
}
