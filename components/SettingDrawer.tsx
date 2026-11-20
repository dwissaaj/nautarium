"use client";

import {
  Button,
  Drawer,
  Switch,
  Typography,
} from "@heroui/react";

import { Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "./language/language-provider";

export function SettingsDrawer({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const isID = language === "id";
  const isDark = theme === "dark";
  const isEnglish = language === "en";

  return (
    <Drawer>
      <Button
        variant="ghost"
        aria-label={isID ? "Pengaturan" : "Settings"}
        className={`hover:bg-accent w-full ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <Settings size={18} />
        {!collapsed && (isID ? "Pengaturan" : "Settings")}
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>
                {isID ? "Pengaturan" : "Settings"}
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body className="flex flex-col gap-4">
              {/* Appearance */}
              <section className="rounded-xl border border-separator p-4">
                <div className="mb-5">
                  <Typography type="body-sm" weight="semibold">
                    {isID ? "Tampilan" : "Appearance"}
                  </Typography>

                  <Typography type="body-xs" color="muted">
                    {isID
                      ? "Atur tema tampilan aplikasi."
                      : "Customize your application theme."}
                  </Typography>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <Typography type="body-sm" weight="medium">
                      {isDark ? "Dark Mode" : "Light Mode"}
                    </Typography>

                    <Typography type="body-xs" color="muted">
                      {isID
                        ? isDark
                          ? "Tema gelap sedang aktif."
                          : "Tema terang sedang aktif."
                        : isDark
                          ? "Dark theme is enabled."
                          : "Light theme is enabled."}
                    </Typography>
                  </div>

                  <Switch
                    aria-label={isID ? "Mode gelap" : "Dark mode"}
                    isSelected={isDark}
                    onChange={(selected) =>
                      setTheme(selected ? "dark" : "light")
                    }
                  >
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>
              </section>

              {/* Language */}
              <section className="rounded-xl border border-separator p-4">
                <div className="mb-5">
                  <Typography type="body-sm" weight="semibold">
                    {isID ? "Bahasa" : "Language"}
                  </Typography>

                  <Typography type="body-xs" color="muted">
                    {isID
                      ? "Pilih bahasa aplikasi."
                      : "Choose your application language."}
                  </Typography>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <Typography type="body-sm" weight="medium">
                      {isEnglish ? "English" : "Indonesia"}
                    </Typography>

                    <Typography type="body-xs" color="muted">
                      {isID
                        ? "Ganti bahasa aplikasi."
                        : "Change application language."}
                    </Typography>
                  </div>

                  <Switch
                    aria-label={isID ? "Bahasa Inggris" : "English language"}
                    isSelected={isEnglish}
                    onChange={(selected) =>
                      setLanguage(selected ? "en" : "id")
                    }
                  >
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>
              </section>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}