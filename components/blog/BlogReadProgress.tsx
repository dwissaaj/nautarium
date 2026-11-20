
import { Breadcrumbs } from "@heroui/react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function BlogReadProgress({
  items,
}: AppBreadcrumbsProps) {
  return (
    <Breadcrumbs>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Breadcrumbs.Item
            key={`${item.label}-${index}`}
            href={isLast ? undefined : item.href}
          >
            {item.label}
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs>
  );
}
