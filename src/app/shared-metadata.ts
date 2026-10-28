import type { Metadata } from "next";
import { site } from "@/lib/site";

// A segment that sets openGraph replaces the root opengraph-image, so it restates the default.
const defaultImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Hand-drawn avatar of Noah Qin",
};

type Image = string | typeof defaultImage;

export function sharedMetadata({
  path,
  image = defaultImage,
  publishedTime,
}: {
  path: string;
  image?: Image;
  publishedTime?: string;
}): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      ...(publishedTime
        ? { type: "article", publishedTime }
        : { type: "website" }),
      url: path,
      siteName: site.name,
      locale: "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
