import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/avatar.png";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Image src={avatar} alt="" sizes="192px" className="w-48 opacity-80" />
      <h1 className="my-6 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted">
        Looks like you&apos;ve ventured into the void. The page you&apos;re
        looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white dark:bg-white dark:text-zinc-900"
      >
        Return Home
      </Link>
    </div>
  );
}
