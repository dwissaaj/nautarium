"use client";

import type { ReactNode } from "react";



import {
  Button,
  Card,
  Typography,
} from "@heroui/react";
import NoProject from "@/app/no-project";
import { useProjectState } from "@/app/lib/(home)/project/project.state";

export default function AudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  const project = useProjectState((state) => state.project);

  if (!project) {
    return (
      <NoProject />
    );
  }

  return (
    <section className="font-sans bg-default flex min-h-full w-full flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto w-full max-w-5xl md:max-w-3xl xl:max-w-full">
        {children}
      </div>
    </section>
  );
}