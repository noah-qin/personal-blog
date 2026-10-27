import { posts, projects } from "@/lib/placeholder";

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function getTags() {
  const tags = new Map<string, string>();
  for (const entry of [...projects, ...posts]) {
    for (const tag of entry.tags) tags.set(tagSlug(tag), tag);
  }
  return tags;
}

export function getTagged(slug: string) {
  const hasTag = (entry: { tags: string[] }) =>
    entry.tags.some((tag) => tagSlug(tag) === slug);
  return {
    projects: projects.filter(hasTag),
    posts: posts.filter(hasTag),
  };
}
