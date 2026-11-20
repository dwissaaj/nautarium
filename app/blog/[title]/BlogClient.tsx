"use client";

import Link from "next/link";

import { Typography } from "@heroui/react";
import { ArrowLeft, CalendarDays, Folder } from "lucide-react";

import { blogConfig } from "@/config/blog/blogs";
import { useLanguageStore } from "@/app/stores/language-store";
import BlogReadProgress from "@/components/blog/BlogReadProgress";

interface BlogArticleClientProps {
  title: string;
}

export default function BlogArticleClient({
  title,
}: BlogArticleClientProps) {
  const language = useLanguageStore((state) => state.language);

  const article = blogConfig.categories
    .flatMap((category) =>
      category.articles.map((item) => ({
        ...item,
        category,
      }))
    )
    .find((item) => item.id === title);

  if (!article) {
    return (
      <main className="w-full space-y-6">
        <BlogReadProgress
          items={[
            {
              label: language === "id" ? "Beranda" : "Home",
              href: "/",
            },
            {
              label: "Blog",
              href: "/blog",
            },
          ]}
        />

        <Typography type="h2">
          {language === "id"
            ? "Artikel tidak ditemukan"
            : "Article not found"}
        </Typography>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-default-500 hover:text-default-900"
        >
          <ArrowLeft size={16} />
          {language === "id" ? "Kembali ke Blog" : "Back to Blog"}
        </Link>
      </main>
    );
  }

  const content = article.content[language];

  return (
    <main className="w-full space-y-10">
      {/* Breadcrumb */}
      <BlogReadProgress
        items={[
          {
            label: language === "id" ? "Beranda" : "Home",
            href: "/",
          },
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: article.category.title[language],
            href: "/blog",
          },
          {
            label: article.title[language],
          },
        ]}
      />

      {/* Article header */}
      <header className="mx-auto w-full max-w-3xl space-y-5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-default-500 transition-colors hover:text-default-900"
        >
          <ArrowLeft size={16} />
          {language === "id" ? "Semua artikel" : "All articles"}
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-separator px-3 py-1 text-xs text-default-500">
            <Folder size={13} />
            {article.category.title[language]}
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-default-500">
            <CalendarDays size={13} />
            {new Date(`${article.date}T00:00:00`).toLocaleDateString(
              language === "id" ? "id-ID" : "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>

        <Typography type="h1">
          {article.title[language]}
        </Typography>

        <Typography type="body" color="muted">
          {article.description[language]}
        </Typography>

        <div className="border-b border-separator pt-3" />
      </header>

      {/* Article content */}
      <article className="mx-auto w-full max-w-3xl space-y-6">
        {content.map((paragraph, index) => (
          <Typography
            key={index}
            type="body"
            className="leading-8"
          >
            {paragraph}
          </Typography>
        ))}
      </article>

      {/* Article footer */}
      <footer className="mx-auto w-full max-w-3xl border-t border-separator pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-default-500 transition-colors hover:text-default-900"
        >
          <ArrowLeft size={16} />
          {language === "id"
            ? "Kembali ke koleksi blog"
            : "Back to blog collection"}
        </Link>
      </footer>
    </main>
  );
}