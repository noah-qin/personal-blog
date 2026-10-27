export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}
