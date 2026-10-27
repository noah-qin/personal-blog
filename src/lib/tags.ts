import { getPosts, getProjects } from "@/lib/content";

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export async function getTags() {
  const tags = new Map<string, string>();
  for (const entry of [...(await getProjects()), ...(await getPosts())]) {
    for (const tag of entry.tags) tags.set(tagSlug(tag), tag);
  }
  return tags;
}

export async function getTagged(slug: string) {
  const hasTag = (entry: { tags: string[] }) =>
    entry.tags.some((tag) => tagSlug(tag) === slug);
  return {
    projects: (await getProjects()).filter(hasTag),
    posts: (await getPosts()).filter(hasTag),
  };
}
