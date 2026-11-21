
"use client";

import { Accordion, Button, Drawer, Switch, Typography } from "@heroui/react";
import {
  Settings,
  ChevronDown,
  Palette,
  Code,
  Puzzle,
  Sun,
  Moon,
  LanguagesIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { appearanceConfig } from "@/config/setting/site";
import { useLanguage } from "@/components/language/language-provider";
import { AppearanceDrawer } from "./AppreanceDrawer";

export function SettingsDrawer({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const t = appearanceConfig[language];
  const isDark = theme === "dark";
  const isEnglish = language === "en";

  return (
    <Drawer>
      <Button
        aria-label={t.settings}
        className={`hover:bg-accent w-full ${
          collapsed ? "justify-center" : "justify-start"
        }`}
        variant="ghost"
      >
        <Settings size={18} />
        {!collapsed && t.settings}
      </Button>

      <Drawer.Backdrop variant="opaque">
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>{t.settings}</Drawer.Heading>
            </Drawer.Header>

          <AppearanceDrawer />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
