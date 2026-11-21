
"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open, save } from "@tauri-apps/plugin-dialog";
import {
  Button,
  Card,
  Input,
  Typography,
} from "@heroui/react";
import {
  Database,
  FilePlus2,
  FolderOpen,
  FolderPlus,
} from "lucide-react";

export default function ProjectsPage() {
  const [projectName, setProjectName] = useState("My Project");
  const [isCreating, setIsCreating] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setError("Please enter a project name.");
      return;
    }

    setError("");
    setMessage("");
    setIsCreating(true);

    try {
      const path = await save({
        title: "Create Nautarium Project",
        defaultPath: `${projectName.trim()}.nt`,
        filters: [
          {
            name: "Nautarium Project",
            extensions: ["nt"],
          },
        ],
      });

      if (!path) return;

      await invoke("create_project", {
        name: projectName.trim(),
        path,
      });

      setMessage("Project created successfully.");
    } catch (err) {
      console.error("Failed to create project:", err);
      setError(String(err));
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenProject = async () => {
    setError("");
    setMessage("");
    setIsOpening(true);

    try {
      const path = await open({
        title: "Open Nautarium Project",
        multiple: false,
        directory: false,
        filters: [
          {
            name: "Nautarium Project",
            extensions: ["nt"],
          },
        ],
      });

      if (!path) return;

      await invoke("open_project", { path });

      setMessage("Project opened successfully.");
    } catch (err) {
      console.error("Failed to open project:", err);
      setError(String(err));
    } finally {
      setIsOpening(false);
    }
  };

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
                DuckDB project database (.nt)
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

      {message && (
        <div className="rounded-xl border border-success-200 bg-success-50 p-3">
          <Typography type="body-sm" className="text-success-700">
            {message}
          </Typography>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-danger-200 bg-danger-50 p-3">
          <Typography type="body-sm" className="text-danger-700">
            {error}
          </Typography>
        </div>
      )}
    </main>
  );
}
