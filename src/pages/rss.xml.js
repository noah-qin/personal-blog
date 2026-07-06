import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../site.config';

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: `${SITE.name} - Writing`,
        description: SITE.description,
        site: context.site,
        stylesheet: '/rss-styles.xsl',
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
