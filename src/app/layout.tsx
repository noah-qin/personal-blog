import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CommandMenuProvider } from "@/components/command-menu";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Noah Qin - Writing" }],
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme script from the Next.js flash-prevention guide */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background font-sans text-foreground">
        <CommandMenuProvider>
          <SiteHeader />
          <main className="mx-auto min-h-[calc(100vh-180px)] max-w-4xl px-6 py-12">
            {children}
          </main>
          <SiteFooter />
        </CommandMenuProvider>
      </body>
    </html>
  );
}
