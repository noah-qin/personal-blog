// Temporary data for page layouts. Replaced by MDX content in step 3.

export type Post = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  projectType: "app" | "research" | "other";
  stats?: string;
};

export const posts: Post[] = [
  {
    slug: "usaco-achievement",
    title: "USACO: From Bronze to Platinum",
    description:
      "How specific problems changed the way I think — binary search under adversarial conditions, decomposing coupled systems, and turning exponential problems into linear ones.",
    publishDate: "2026-01-10",
    tags: ["Competition", "Programming", "Algorithms"],
  },
  {
    slug: "building-nightguard",
    title: "Building NightGuard: The Irony of Sleep",
    description:
      "How staying up late for 3 months helped me build an app to fix my sleep.",
    publishDate: "2025-11-28",
    tags: ["DevLog", "SwiftUI", "Product"],
  },
];

export const projects: Project[] = [
  {
    slug: "vex",
    title: "Vex",
    description:
      "A fast, multi-language version manager for macOS. Symlink-based switching, zero shim overhead, everything under ~/.vex.",
    tags: ["Rust", "DevTools", "Open Source", "CLI"],
    projectType: "other",
    stats: "19 Releases",
  },
  {
    slug: "nightguard",
    title: "NightGuard: Sleep & Habits",
    description:
      "An iOS application designed to help users build better sleep habits through tracking and analytics.",
    tags: ["iOS", "SwiftUI", "HealthKit", "Productivity"],
    projectType: "app",
    stats: "Verify on AppStore",
  },
];
