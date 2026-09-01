import lume from "lume/mod.ts";
import checkUrls from "lume/plugins/check_urls.ts";
import feed from "lume/plugins/feed.ts";
import sitemap from "lume/plugins/sitemap.ts";
import vento from "lume/plugins/vento.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
  location: new URL("https://noahqin.dev"),
  prettyUrls: true,
});

site.use(vento());
site.use(feed({
  output: "/rss.xml",
  query: "type=blog",
  sort: "publishDate=desc",
  limit: 100,
  stylesheet: "/rss-styles.xsl",
  info: {
    title: "Noah Qin - Writing",
    description: "International High Schooler, Builder, Researcher.",
    lang: "en-us",
  },
  items: {
    title: "=title",
    description: "=description",
    published: "=publishDate",
  },
}));
site.use(sitemap({ filename: "/sitemap-index.xml" }));
site.use(checkUrls({ strict: false, throw: true }));

site.copy("assets");
site.copy("images");
site.copy("404-face.png");
site.copy("apple-touch-icon.png");
site.copy("favicon.png");
site.copy("og-default.png");
site.copy("rss-styles.xsl");

site.filter("slugify", (value: string) => value.toLowerCase().replace(/\s+/g, "-"));
site.filter("readingTime", (value: string) => {
  const words = value.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
});

export default site;
