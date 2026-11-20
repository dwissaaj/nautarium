"use client";

import Link from "next/link";
import { Accordion, Typography } from "@heroui/react";
import { Folder, FileText, ChevronDown } from "lucide-react";


import { blogConfig } from "@/config/blog/blogs";
import { useLanguageStore } from "@/app/stores/language-store";


interface BlogCategoriesProps {
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function BlogCategories({
  activeCategory,
  onCategoryChange,
}: BlogCategoriesProps) {
  const language = useLanguageStore((state) => state.language);
  const t = blogConfig;

  return (
    <Accordion
      className="w-full"
      hideSeparator
      allowsMultipleExpanded={false}
      expandedKeys={activeCategory ? [activeCategory] : []}
      onExpandedChange={(keys) => {
        const selected = Array.from(keys)[0] ?? null;
        onCategoryChange(selected ? String(selected) : null);
      }}
    >
      {t.categories.map((category) => (
        <Accordion.Item
          key={category.id}
          id={category.id}
          className="border-b border-separator"
        >
          <Accordion.Heading>
            <Accordion.Trigger className="flex w-full items-center gap-3 py-4 text-left transition-opacity hover:opacity-70">
              <Folder
                size={19}
                strokeWidth={1.5}
                className="shrink-0 text-default-500"
              />

              <div className="min-w-0 flex-1">
                <Typography type="body-sm" className="font-medium">
                  {category.title[language]}
                </Typography>
              </div>

              <Typography type="body-xs" color="muted">
                {category.articles.length} {t.articles[language]}
              </Typography>

              <Accordion.Indicator>
                <ChevronDown size={17} strokeWidth={1.5} />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>

          <Accordion.Panel>
            <Accordion.Body className="pb-5 pl-8">
              <div className="space-y-4 border-l border-separator pl-5">
                <Typography type="body-sm" color="muted">
                  {category.description[language]}
                </Typography>

                {category.articles.length > 0 ? (
                  <div className="space-y-1">
                    {category.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/blog/${article.id}`}
                        className="flex gap-3 rounded-md px-3 py-3 transition-colors hover:bg-surface-secondary"
                      >
                        <FileText
                          size={16}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-default-400"
                        />

                        <div className="min-w-0 flex-1 space-y-1">
                          <Typography
                            type="body-sm"
                            className="font-medium"
                          >
                            {article.title[language]}
                          </Typography>

                          <Typography type="body-xs" color="muted">
                            {article.description[language]}
                          </Typography>

                          <Typography type="body-xs" color="muted">
                            {new Date(
                              `${article.date}T00:00:00`
                            ).toLocaleDateString(
                              language === "id" ? "id-ID" : "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Typography>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Typography type="body-xs" color="muted">
                    {t.empty[language]}
                  </Typography>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}