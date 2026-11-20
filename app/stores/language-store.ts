import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Language = "id" | "en";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "id",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "nautarium-language",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
