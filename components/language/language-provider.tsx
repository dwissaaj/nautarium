
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "@/i18n/message/en.json";
import idMessages from "@/i18n/message/id.json";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const messages = {
  en: enMessages,
  id: idMessages,
};

const LANGUAGE_STORAGE_KEY = "nautarium-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (savedLanguage === "id" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    }
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <NextIntlClientProvider
        locale={language}
        messages={messages[language]}
        timeZone="Asia/Jakarta"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
