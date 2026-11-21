import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { open, save } from "@tauri-apps/plugin-dialog";

export async function createProject(
  name: string,
): Promise<string | null> {
  const projectName = name.trim();

  if (!projectName) {
    throw new Error("Please enter a project name.");
  }

  const path = await save({
    title: "Create Nautarium Project",
    defaultPath: `${projectName}.nt`,
    filters: [
      {
        name: "Nautarium Project",
        extensions: ["nt"],
      },
    ],
  });

  if (!path) return null;

  const savedProjectName = await invoke<string>("create_project", {
    name: projectName,
    path,
  });

  await getCurrentWindow().setTitle(
    `${savedProjectName} — Nautarium`,
  );

  return savedProjectName;
}

export async function openProject(): Promise<string | null> {
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

  if (!path || Array.isArray(path)) return null;

  const projectName = await invoke<string>("open_project", {
    path,
  });

  await getCurrentWindow().setTitle(
    `${projectName} — Nautarium`,
  );

  return projectName;
}