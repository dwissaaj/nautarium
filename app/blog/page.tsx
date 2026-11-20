"use client";

import { useState } from "react";
import { Typography } from "@heroui/react";

import { useLanguageStore } from "../stores/language-store";

import { blogConfig } from "@/config/blog/blogs";
import BlogReadProgress from "@/components/blog/BlogReadProgress";
import BlogCategories from "@/components/blog/BlogCategory";

export default function BlogPage() {
  const language = useLanguageStore((state) => state.language);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selectedCategory = blogConfig.categories.find(
    (category) => category.id === activeCategory,
  );

  const t = blogConfig;

  return (
    <main className="w-full space-y-8">
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
          ...(selectedCategory
            ? [{ label: selectedCategory.title[language] }]
            : []),
        ]}
      />

      <section className="space-y-2">
        <Typography type="h1">{t.heading[language]}</Typography>

        <Typography color="muted" type="body">
          {t.description[language]}
        </Typography>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <Typography type="h3">{t.collection[language]}</Typography>

          <Typography color="muted" type="body-xs">
            {t.categories.length}{" "}
            {language === "id" ? "Kategori" : "Categories"}
          </Typography>
        </div>

        <BlogCategories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>
    </main>
  );
}
