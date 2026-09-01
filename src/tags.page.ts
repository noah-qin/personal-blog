interface PageData {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  type: "blog" | "project";
  projectType?: string;
  stats?: string;
}

interface Search {
  pages(query: string, sort?: string): PageData[];
}

const escape = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

export default function* ({ search }: { search: Search }) {
  const all = search.pages("", "publishDate=desc").filter((page) =>
    page.type === "blog" || page.type === "project"
  );
  const tags = new Map<string, string>();
  for (const page of all) for (const tag of page.tags ?? []) tags.set(slugify(tag), tag);

  for (const [slug, tag] of tags) {
    const pages = all.filter((page) => page.tags?.some((value) => slugify(value) === slug));
    const projects = pages.filter((page) => page.type === "project");
    const posts = pages.filter((page) => page.type === "blog");
    const projectCards = projects.map((project) =>
      `<article class="project-card"><a class="card-link" href="${project.url}" aria-label="${
        escape(project.title)
      }"></a><div class="card-top"><span class="badge badge-${project.projectType}">${
        project.projectType === "app"
          ? "iOS App"
          : project.projectType === "research"
          ? "Research"
          : "Project"
      }</span>${
        project.stats ? `<span class="stat">${escape(project.stats)}</span>` : ""
      }</div><h2>${escape(project.title)}</h2><p>${escape(project.description)}</p></article>`
    ).join("");
    const postRows = posts.map((post) =>
      `<a class="post-row" href="${post.url}"><div><h3>${escape(post.title)}</h3><p>${
        escape(post.description)
      }</p><span class="read-more">Read more →</span></div></a>`
    ).join("");
    yield {
      url: `/tags/${slug}/`,
      title: `#${tag} | Topic`,
      layout: "layouts/base.vto",
      content: `<header class="page-header"><p><a href="/">Home</a> / Tags</p><h1>#${
        escape(tag)
      }</h1><p>${projects.length} Projects, ${posts.length} Essays</p></header>${
        projects.length
          ? `<section class="section"><h2>Projects</h2><div class="card-grid">${projectCards}</div></section>`
          : ""
      }${
        posts.length
          ? `<section class="section"><h2>Essays</h2><div class="post-list">${postRows}</div></section>`
          : ""
      }`,
    };
  }
}
