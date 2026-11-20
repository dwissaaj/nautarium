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
import { useLanguageStore } from "@/app/stores/language-store";

export function SettingsDrawer({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

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

            <Drawer.Body className="w-96">
              <Accordion
                allowsMultipleExpanded
                hideSeparator
                className="flex flex-col gap-2"
              >
                {/* Appearance */}
                <Accordion.Item
                  className="rounded-xl border border-separator px-3"
                  id="appearance"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Palette size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.appearance}
                        </Typography>

                        <Typography color="muted" type="body-xs">
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

                          <Typography color="muted" type="body-xs">
                            {isDark ? t.darkDescription : t.lightDescription}
                          </Typography>
                        </div>

                        <Switch
                          aria-label={t.mode}
                          isSelected={isDark}
                          onChange={(selected) =>
                            setTheme(selected ? "dark" : "light")
                          }
                          size="lg"
                        >
                          {({ isSelected }) => (
                            <Switch.Content>
                              <Switch.Control
                                className={
                                  isSelected ? "bg-indigo-600" : "bg-amber-400"
                                }
                              >
                                <Switch.Thumb>
                                  <Switch.Icon>
                                    {isSelected ? (
                                      <Moon className="size-3.5 text-indigo-600 opacity-100" />
                                    ) : (
                                      <Sun className="size-3.5 text-amber-600 opacity-100" />
                                    )}
                                  </Switch.Icon>
                                </Switch.Thumb>
                              </Switch.Control>
                            </Switch.Content>
                          )}
                        </Switch>
                      </div>

                      {/* Language */}
                      <div className=" flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <Typography type="body-sm" weight="medium">
                            {t.language}
                          </Typography>

                          <Typography color="muted" type="body-xs">
                            {isEnglish ? t.english : t.indonesian}
                          </Typography>
                        </div>

                        <Switch
                          aria-label="Language"
                          isSelected={language === "en"}
                          onChange={(selected) =>
                            setLanguage(selected ? "en" : "id")
                          }
                          size="lg"
                        >
                          {({ isSelected }) => (
                            <Switch.Content>
                              <Switch.Control
                                className={
                                  isSelected ? "bg-blue-600" : "bg-emerald-600"
                                }
                              >
                                <Switch.Thumb>
                                  <Switch.Icon>
                                    <LanguagesIcon className="size-3.5 text-current opacity-100" />
                                  </Switch.Icon>
                                </Switch.Thumb>
                              </Switch.Control>
                            </Switch.Content>
                          )}
                        </Switch>
                      </div>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Snippets */}
                <Accordion.Item
                  className="rounded-xl border border-separator px-3"
                  id="snippets"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Code size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.snippets}
                        </Typography>

                        <Typography color="muted" type="body-xs">
                          {t.snippetsDescription}
                        </Typography>
                      </div>

                      <Typography color="muted" type="body-xs">
                        {t.snippetsSoon}
                      </Typography>

                      <Accordion.Indicator>
                        <ChevronDown size={16} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body className="pb-4 pt-2">
                      <Typography color="muted" type="body-xs">
                        {t.snippetsSoon}
                      </Typography>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Extensions */}
                <Accordion.Item
                  className="rounded-xl border border-separator px-3"
                  id="extensions"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center gap-3 py-3">
                      <Puzzle size={18} />

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <Typography type="body-sm" weight="medium">
                          {t.extensions}
                        </Typography>

                        <Typography color="muted" type="body-xs">
                          {t.extensionsDescription}
                        </Typography>
                      </div>

                      <Typography color="muted" type="body-xs">
                        {t.extensionsSoon}
                      </Typography>

                      <Accordion.Indicator>
                        <ChevronDown size={16} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body className="pb-4 pt-2">
                      <Typography color="muted" type="body-xs">
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
