"use client";

import { useState } from "react";
import { Button, Card, Input, Typography } from "@heroui/react";

import {
  Database,
  FilePlus2,
  FolderOpen,
  FolderPlus,
} from "lucide-react";
import { useProjectHandler } from "@/components/(home)/project/project-handler";



export default function Projects() {
  const [projectName, setProjectName] = useState("My Project");

  const {
    handleCreateProject,
    handleOpenProject,
    isCreating,
    isOpening,
  } = useProjectHandler(projectName, setProjectName);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 p-6">
      <header className="space-y-2">
        <Typography
          type="h1"
          className="text-3xl font-semibold tracking-tight"
        >
          Projects
        </Typography>

        <Typography type="body" className="text-default-500">
          Create a new workspace or continue working on an existing project.
        </Typography>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border border-default-200 bg-background shadow-sm">
          <Card.Header className="flex flex-row items-center gap-3 px-5 pt-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-default-100">
              <FolderPlus className="size-5 text-default-700" />
            </div>

            <div className="flex flex-col gap-1">
              <Typography type="h3" className="font-semibold">
                Create project
              </Typography>

              <Typography type="body-xs" className="text-default-500">
                Start a new Nautarium workspace.
              </Typography>
            </div>
          </Card.Header>

          <Card.Content className="space-y-4 px-5 py-5">
            <Input
              placeholder="My Research Project"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />

            <div className="flex items-center gap-2 text-default-400">
              <Database className="size-4" />

              <Typography type="body-xs">
                Nautarium project file (.nt)
              </Typography>
            </div>

            <Button
              className="w-full"
              onPress={handleCreateProject}
              isDisabled={isCreating || isOpening}
            >
              <FilePlus2 className="size-4" />
              {isCreating ? "Creating project..." : "Create project"}
            </Button>
          </Card.Content>
        </Card>

        <Card className="border border-default-200 bg-background shadow-sm">
          <Card.Header className="flex flex-row items-center gap-3 px-5 pt-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-default-100">
              <FolderOpen className="size-5 text-default-700" />
            </div>

            <div className="flex flex-col gap-1">
              <Typography type="h3" className="font-semibold">
                Open project
              </Typography>

              <Typography type="body-xs" className="text-default-500">
                Continue with an existing Nautarium project.
              </Typography>
            </div>
          </Card.Header>

          <Card.Content className="flex flex-1 flex-col justify-between gap-4 px-5 py-5">
            <div className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-300 p-4 text-center">
              <Database className="size-6 text-default-400" />

              <Typography type="body-sm" className="text-default-500">
                Select an existing .nt project file from your computer.
              </Typography>
            </div>

            <Button
              className="w-full"
              onPress={handleOpenProject}
              isDisabled={isCreating || isOpening}
            >
              <FolderOpen className="size-4" />
              {isOpening ? "Opening project..." : "Browse projects"}
            </Button>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}