import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        link: z.string().url().optional(), // AppStore or deployed link
        github: z.string().url().optional(), // Repo link
        type: z.enum(['app', 'research', 'other']).default('other'),
        stats: z.string().optional(), // e.g. "10k+ Users"
    }),
});

const blog = defineCollection({
    type: 'content',
    // blog posts
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        heroImage: z.string().optional(),
    }),
});

export const collections = { projects, blog };
