import type { CollectionEntry } from "astro:content";

type DatedEntry = CollectionEntry<"blog"> | CollectionEntry<"projects">;

/** Returns a new array of collection entries sorted newest-first by publishDate. */
export function sortByPublishDate<T extends DatedEntry>(entries: T[]): T[] {
    return [...entries].sort(
        (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
    );
}

/** URL-safe slug for a tag, e.g. "Computer Vision" → "computer-vision". */
export function slugifyTag(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, "-");
}
