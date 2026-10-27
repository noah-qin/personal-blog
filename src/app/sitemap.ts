import type { MetadataRoute } from "next";
import { posts, projects } from "@/lib/placeholder";
import { site } from "@/lib/site";
import { getTags } from "@/lib/tags";

export default function sitemap(): MetadataRoute.Sitemap {
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
    })),
    ...[...getTags().keys()].map((tag) => ({
      url: `${site.url}/tags/${tag}`,
    })),
  ];
}
