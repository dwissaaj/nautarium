import { useState } from "react";
import { toast } from "@heroui/react";
import {
  AlertCircle,
  CheckCircle2,
  TriangleExclamationPoint,
} from "lucide-react";

import {
  createProject,
  openProject,
} from "../../../app/lib/(home)/project/use-project-handler";

export function useProjectHandler(
  projectName: string,
  setProjectName: (name: string) => void,
) {
  const [isCreating, setIsCreating] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleCreateProject = async () => {
    if (isCreating || isOpening) return;

    setIsCreating(true);

    try {
      const savedProjectName = await createProject(projectName);

      if (!savedProjectName) return;

      setProjectName(savedProjectName);

      toast(`Project "${savedProjectName}" created successfully.`, {
        description: "Your new Nautarium project is ready.",
        indicator: <CheckCircle2 />,
        variant: "success",
      });
    } catch (error) {
      toast("Failed to create project.", {
        description: error instanceof Error ? error.message : String(error),
        indicator: <AlertCircle />,
        variant: "danger",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenProject = async () => {
    if (isCreating || isOpening) return;

    setIsOpening(true);

    try {
      const openedProjectName = await openProject();

      if (!openedProjectName) return;

      setProjectName(openedProjectName);

      toast(`Project "${openedProjectName}" opened successfully.`, {
        description: "Your Nautarium workspace is ready.",
        indicator: <CheckCircle2 />,
        variant: "success",
      });
    } catch (error) {
      toast("Failed to open project.", {
        description: error instanceof Error ? error.message : String(error),
        variant: "danger",
        indicator: <TriangleExclamationPoint />,
      });
    } finally {
      setIsOpening(false);
    }
  };

  return {
    handleCreateProject,
    handleOpenProject,
    isCreating,
    isOpening,
  };
}
