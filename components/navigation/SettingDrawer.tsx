"use client";

import { Button, Drawer } from "@heroui/react";
import { Settings } from "lucide-react";
import { useTheme } from "next-themes";

import { AppearanceDrawer } from "./AppreanceDrawer";

import { appearanceConfig } from "@/config/setting/site";
import { useLanguage } from "@/components/language/language-provider";

export function SettingsDrawer({ collapsed }: { collapsed: boolean }) {

  const { language } = useLanguage();

  const t = appearanceConfig[language];

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
