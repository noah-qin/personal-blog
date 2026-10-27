import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Timeline } from "./timeline";

export const metadata: Metadata = {
  title: "About",
};

const stack = [
  { label: "Languages", items: "Swift, Python, Java, Rust, SQL" },
  { label: "Frameworks", items: "SwiftUI, PyTorch, Next.js, Spring Boot" },
  { label: "Tools", items: "Git, Docker, VS Code, Xcode, Cursor" },
];

export default function Page() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12">
      <section>
        <h1 className="mb-6 text-3xl font-bold">About Me</h1>
        <div className="space-y-5 leading-[1.8] [&_strong]:text-foreground">
          <p>
            I am a software engineer and researcher targeting the{" "}
            <strong>Class of 2027</strong>. My passion lies in dissecting
            complex systems and rebuilding them with better efficiency and
            design.
          </p>
          <p>
            It began in <strong>2018</strong> with a single line of Python. By{" "}
            <strong>2021</strong>, I was integrating code with hardware,
            competing in the <em>Beijing Robotics Competition</em> with custom
            Arduino implementations. This engineering rigor carried into{" "}
            <strong>2023</strong> at the <em>Jinpeng Sci-Tech Forum</em>.
          </p>
          <p>
            Recently, I&apos;ve shifted focus to solving tangible problems. In{" "}
            <strong>2024</strong>, I engineered a Python-based data analysis
            system to automate business intelligence for{" "}
            <strong>my family&apos;s business</strong>. In <strong>2025</strong>
            , I expanded into mobile development, launching{" "}
            <strong>NightGuard</strong> on the App Store. I also actively
            engaged with the industry by attending the{" "}
            <em>Vivo Developer Conference</em>, while simultaneously working on
            experimental Computer Vision research.
          </p>
          <p>
            In <strong>2026</strong>, I pushed further on both the technical and
            the community side. I advanced from Bronze to{" "}
            <strong>USACO Platinum</strong> in a single contest, submitted my
            first research paper to <em>EUSIPCO</em>, and earned two Kaggle
            medals: a team <strong>silver in BirdCLEF+ 2026</strong> and a solo{" "}
            <strong>
              bronze in the NVIDIA Nemotron Model Reasoning Challenge
            </strong>
            . I also built <strong>Corta</strong>, a native macOS terminal
            written in Swift.
          </p>
          <p>
            Beyond code, I expanded from building products to building
            communities. I co-founded <strong>Cobay</strong>, where I organize
            offline founder meetups and lead development of the website and
            community product. I also continued exploring the wider builder
            ecosystem through <em>AWS Summit China</em>,{" "}
            <em>Cafe Cursor Beijing</em>, and the <em>Grok Bot Meetup</em>.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Tech Stack</h2>
        <ul className="grid gap-3">
          {stack.map((group) => (
            <li
              key={group.label}
              className="before:mr-2.5 before:inline-block before:size-2 before:rounded-full before:bg-indigo-500"
            >
              <strong>{group.label}:</strong> {group.items}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Journey</h2>
        <Timeline />
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="mb-4 text-2xl font-bold">Connect</h2>
        <a
          href={site.github}
          className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white dark:bg-white dark:text-zinc-900"
        >
          GitHub
        </a>
        <p className="mt-4 text-muted">
          Contact me via{" "}
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
          </a>
        </p>
      </section>
    </div>
  );
}
