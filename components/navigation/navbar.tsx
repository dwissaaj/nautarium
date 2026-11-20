"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer, Accordion, Avatar, Typography } from "@heroui/react";

import {
  House,
  BookOpen,
  Library,
  Sparkles,
  Database,
  AudioLines,
  FileAudio,
  ChartLine,
  FileChartColumn,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Waves,
  Circle,
  AlignLeft,
  Network,
  Waypoints,
  Workflow,
  FileText,
  MessageSquareText,
  Tags,
  KeyRound,
  ListChecks,
  BookImage,
  ScanSearch,
  Brain,
  ImageUp,
  NotebookPenIcon,
} from "lucide-react";


import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { SettingsDrawer } from "./SettingDrawer";
import { useLanguage } from "../language/language-provider";
const iconMap: Record<string, ElementType> = {
  House,
  BookOpen,
  Library,
  Sparkles,
  Database,
  AudioLines,
  FileAudio,
  ChartLine,
  FileChartColumn,
  Settings,
  AlignLeft,
  Network,
  Waypoints,
  Workflow,
  FileText,
  MessageSquareText,
  Tags,
  KeyRound,
  ListChecks,
  BookImage,
  ScanSearch,
  NotebookPenIcon,
  Brain,
  ImageUp,
};

function getIcon(name: string, size = 18) {
  const Icon = iconMap[name] ?? Circle;

  return <Icon size={size} strokeWidth={1.8} />;
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "w-[68px]" : "w-[300px]";

  const enabledGroups = siteConfig.navGroups.filter((group) => group.enabled);

  const disabledGroups = siteConfig.navGroups.filter((group) => !group.enabled);

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);

    return `
      flex items-center gap-3
      rounded-lg px-3 py-2.5
      transition-colors duration-200
      ${active ? "bg-accent/10" : "hover:bg-default/5"}
    `;
  };

  return (
    <aside
      className={`
        ${sidebarWidth}
        flex h-dvh shrink-0 flex-col
        border-r border-separator
        bg-background
        transition-[width] duration-200
      `}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-separator px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              loading="eager"
              src="/icon.svg"
              alt="Nautarium"
              width={42}
              height={42}
            />

            <Typography
              type="body"
              weight="semibold"
              className="tracking-tight"
            >
              {siteConfig.name}
            </Typography>
          </Link>
        )}

        {collapsed && (
          <Link href="/" className="mx-auto">
             <Image loading="eager"  src="/icon.svg" alt="Nautarium" width={24} height={24} />
          </Link>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-default/5 hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {!collapsed && (
          <Typography
            type="body-xs"
            color="muted"
            weight="semibold"
            className="mb-3 px-3 uppercase tracking-wider"
          >
            Workspace
          </Typography>
        )}

        {/* Enabled navigation groups */}
        <Accordion
          allowsMultipleExpanded
          defaultExpandedKeys={["home"]}
          hideSeparator
          className="flex flex-col gap-1"
        >
          {enabledGroups.map((group) => {
            const GroupIcon = iconMap[group.icon] ?? Circle;

            const groupHasActiveChild = group.children.some((child) =>
              isActive(pathname, child.href),
            );

            return (
              <Accordion.Item
                key={group.id}
                id={group.id}
                className="border-none"
              >
                <Accordion.Heading>
                  <Accordion.Trigger
                    className={`
                      flex w-full items-center gap-3
                      rounded-lg px-3 py-2.5
                      transition-colors
                      ${
                        groupHasActiveChild
                          ? "bg-accent/10 text-accent"
                          : "text-muted hover:bg-default/5 hover:text-foreground"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                    onPress={() => {
                      if (collapsed) {
                        setCollapsed(false);
                      }
                    }}
                  >
                    <GroupIcon size={18} strokeWidth={1.8} />

                    {!collapsed && (
                      <>
                        <Typography
                          type="body-sm"
                          weight="medium"
                          color={groupHasActiveChild ? "default" : "muted"}
                          className={`flex-1 text-left ${
                            groupHasActiveChild ? "text-accent" : ""
                          }`}
                        >
                          {group.label[language]}
                        </Typography>

                        <Accordion.Indicator>
                          <ChevronDown size={16} />
                        </Accordion.Indicator>
                      </>
                    )}
                  </Accordion.Trigger>
                </Accordion.Heading>

                {!collapsed && (
                  <Accordion.Panel>
                    <Accordion.Body className="pb-2 pt-1">
                      <div className="ml-2 flex flex-col gap-1 border-l border-separator pl-3">
                        {group.children.map((child) => {
                          const active = isActive(pathname, child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`
                                flex items-center gap-3
                                rounded-lg px-3 py-2
                                transition-colors
                                ${
                                  active ? "bg-accent/10" : "hover:bg-default/5"
                                }
                              `}
                            >
                              {getIcon(child.icon, 16)}

                              <Typography
                                type="body-sm"
                                color={active ? "default" : "muted"}
                                weight={active ? "medium" : "normal"}
                                className={active ? "text-accent" : ""}
                              >
                                {child.label[language]}
                              </Typography>
                            </Link>
                          );
                        })}
                      </div>
                    </Accordion.Body>
                  </Accordion.Panel>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>

        {/* Disabled navigation groups */}
        {/* Disabled navigation groups */}
{/* Disabled navigation groups */}
<Accordion
  allowsMultipleExpanded
  hideSeparator
  className="mt-2 flex flex-col gap-1"
>
  {disabledGroups.map((group) => {
    const GroupIcon = iconMap[group.icon] ?? Circle;

    return (
      <Accordion.Item
        key={group.id}
        id={group.id}
        className="border-none"
      >
        <Accordion.Heading>
          <Accordion.Trigger
            className={`
              flex w-full items-center gap-3
              rounded-lg px-3 py-2.5
              text-muted opacity-60
              transition-colors hover:bg-default/5
              ${collapsed ? "justify-center" : ""}
            `}
            onPress={() => {
              if (collapsed) {
                setCollapsed(false);
              }
            }}
          >
            <GroupIcon size={18} strokeWidth={1.8} />

            {!collapsed && (
              <>
                <Typography
                  type="body-sm"
                  color="muted"
                  className="flex-1 text-left"
                >
                  {group.label[language]}
                </Typography>

                <Typography type="body-xs" color="muted">
                  Soon
                </Typography>

                <Accordion.Indicator>
                  <ChevronDown size={16} />
                </Accordion.Indicator>
              </>
            )}
          </Accordion.Trigger>
        </Accordion.Heading>

        {!collapsed && (
          <Accordion.Panel>
            <Accordion.Body className="pb-2 pt-1">
              <div className="ml-2 flex flex-col gap-1 border-l border-separator pl-3">
                {group.children.map((child) => (
                  <div
                    key={child.href}
                    className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 opacity-40"
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    {getIcon(child.icon, 16)}

                    <Typography type="body-sm" color="muted">
                      {child.label[language]}
                    </Typography>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        )}
      </Accordion.Item>
    );
  })}
</Accordion>
      </div>

      {/* Bottom section */}
      <div className="border-t border-separator p-3">
        <SettingsDrawer collapsed={collapsed} />

        {/* User profile + Theme switch */}
        <div
          className={`
            mt-3 flex items-center gap-3 rounded-lg p-2
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <Avatar size="sm" className="shrink-0">
            <Avatar.Fallback>
              {siteConfig.account.profile.initials}
            </Avatar.Fallback>
          </Avatar>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <Typography type="body-sm" weight="medium" truncate>
                  {siteConfig.account.profile.name}
                </Typography>

                <Typography type="body-xs" color="muted" truncate>
                  {siteConfig.account.profile.description[language]}
                </Typography>
              </div>

              
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
