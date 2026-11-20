"use client";

import {
  Accordion,
  Button,
  Drawer,
  Switch,
  Typography,
} from "@heroui/react";

import {
  Settings,
  ChevronDown,
  Palette,
  Code,
  Puzzle,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useLanguage } from "../language/language-provider";
import { appearanceConfig } from "@/config/setting/site";


export function SettingsDrawer({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const t = appearanceConfig[language];
  const isDark = theme === "dark";
  const isEnglish = language === "en";

  return (
    <Drawer>
      <Button
        variant="ghost"
        aria-label={t.settings}
        className={`hover:bg-accent w-full ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <Settings size={18} />
        {!collapsed && t.settings}
      </Button>

      <Drawer.Backdrop variant="transparent" >
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>{t.settings}</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body className="w-96">
              <Accordion
                allowsMultipleExpanded
                hideSeparator
                className="flex flex-col gap-2"
              >
                {/* Appearance */}
                <Accordion.Item
                  id="appearance"
                  className="rounded-xl border border-separator px-3"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Palette size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.appearance}
                        </Typography>

                        <Typography type="body-xs" color="muted">
                          {t.appearanceDescription}
                        </Typography>
                      </div>

                      <Accordion.Indicator>
                        <ChevronDown size={16} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body className="flex flex-col gap-5 pb-4 pt-2">
                      {/* Mode */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <Typography type="body-sm" weight="medium">
                            {t.mode}
                          </Typography>

                          <Typography type="body-xs" color="muted">
                            {isDark
                              ? t.darkDescription
                              : t.lightDescription}
                          </Typography>
                        </div>

                        <Switch
                          aria-label={t.mode}
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

                      {/* Language */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <Typography type="body-sm" weight="medium">
                            {t.language}
                          </Typography>

                          <Typography type="body-xs" color="muted">
                            {isEnglish ? t.english : t.indonesian}
                          </Typography>
                        </div>

                        <Switch
                          aria-label={t.language}
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
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Snippets */}
                <Accordion.Item
                  id="snippets"
                  className="rounded-xl border border-separator px-3"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Code size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.snippets}
                        </Typography>

                        <Typography type="body-xs" color="muted">
                          {t.snippetsDescription}
                        </Typography>
                      </div>

                      <Typography type="body-xs" color="muted">
                        {t.snippetsSoon}
                      </Typography>

                      <Accordion.Indicator>
                        <ChevronDown size={16} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body className="pb-4 pt-2">
                      <Typography type="body-xs" color="muted">
                        {t.snippetsSoon}
                      </Typography>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Extensions */}
                <Accordion.Item
                  id="extensions"
                  className="rounded-xl border border-separator px-3"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Puzzle size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.extensions}
                        </Typography>

                        <Typography type="body-xs" color="muted">
                          {t.extensionsDescription}
                        </Typography>
                      </div>

                      <Typography type="body-xs" color="muted">
                        {t.extensionsSoon}
                      </Typography>

                      <Accordion.Indicator>
                        <ChevronDown size={16} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body className="pb-4 pt-2">
                      <Typography type="body-xs" color="muted">
                        {t.extensionsSoon}
                      </Typography>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}