import { create } from "zustand";
import type { ProjectStateDto } from "./project.dto";

interface ProjectState extends ProjectStateDto {
  setProject: (project: ProjectStateDto["project"]) => void;
  clearProject: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useProjectState = create<ProjectState>((set) => ({
  project: null,
  isLoading: false,

  setProject: (project) => set({ project }),
  clearProject: () => set({ project: null }),
  setLoading: (isLoading) => set({ isLoading }),
}));