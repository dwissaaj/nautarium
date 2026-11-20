import BlogArticleClient from "./BlogClient";

import { blogConfig } from "@/config/blog/blogs";

export function generateStaticParams() {
  return blogConfig.categories.flatMap((category) =>
    category.articles.map((article) => ({
      title: article.id,
    })),
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  return <BlogArticleClient title={title} />;
}
