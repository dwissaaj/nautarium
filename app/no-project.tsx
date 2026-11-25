"use client";

import { Button, Card, Typography } from "@heroui/react";
import { FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoProject() {
  const router = useRouter();

  return (
    <section className="font-mono min-h-1/2 bg-default flex h-screen w-full flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto w-full max-w-5xl md:max-w-3xl xl:max-w-full">
        <Card className="">
          <div className="flex flex-col items-center gap-4 text-center">
            <FolderOpen size={40} />

            <Typography type="h3">No project is open</Typography>

            <Typography className="text-muted">
              Open or create a project to start using this feature.
            </Typography>

            <Button variant="primary" onPress={() => router.push("/project")}>
              Open or create a project
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
