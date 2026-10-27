import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { CodeBlock } from "@/components/code-block";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 mb-4 text-[27px] font-bold" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-[21px] font-bold" {...props} />,
  p: (props) => <p className="my-5" {...props} />,
  a: (props) => (
    <a className="text-link underline underline-offset-2" {...props} />
  ),
  strong: (props) => <strong className="text-foreground" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-border pl-4 italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (props) => (
    <code
      className="rounded bg-soft px-1.5 py-0.5 font-mono text-[0.9em] in-[pre]:bg-transparent in-[pre]:p-0"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-border px-3 py-2 font-bold" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-border px-3 py-2 align-top" {...props} />
  ),
  Image: (props: ImageProps) => (
    <Image
      sizes="(min-width: 720px) 672px, 100vw"
      className="my-6 h-auto w-full rounded-xl"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
