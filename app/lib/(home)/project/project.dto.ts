export interface CreateProjectDto {
  name: string;
  path: string;
}

export interface OpenProjectDto {
  path: string;
}

export type ProjectCommandResponse = string;


export interface ProjectDto {
  name: string;
  path: string;
}

export interface ProjectStateDto {
  project: ProjectDto | null;
  isLoading: boolean;
}

export interface ProjectFunctionsDto {
  createProject: (name: string) => Promise<string | null>;
  openProject: () => Promise<string | null>;
}