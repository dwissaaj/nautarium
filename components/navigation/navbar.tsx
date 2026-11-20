"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, Avatar, Typography } from "@heroui/react";
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
import Image from "next/image";

import { useLanguage } from "../language/language-provider";

import { SettingsDrawer } from "./SettingDrawer";

import { siteConfig } from "@/config/site";
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
          <Link className="flex items-center gap-2" href="/">
            <Image
              alt="Nautarium"
              height={42}
              loading="eager"
              src="/icon.svg"
              width={42}
            />

            <Typography
              className="tracking-tight"
              type="body"
              weight="semibold"
            >
              {siteConfig.name}
            </Typography>
          </Link>
        )}

        {collapsed && (
          <Link className="mx-auto" href="/">
            <Image
              alt="Nautarium"
              height={24}
              loading="eager"
              src="/icon.svg"
              width={24}
            />
          </Link>
        )}

        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-default/5 hover:text-foreground"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
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
            className="mb-3 px-3 uppercase tracking-wider"
            color="muted"
            type="body-xs"
            weight="semibold"
          >
            Workspace
          </Typography>
        )}

        {/* Enabled navigation groups */}
        <Accordion
          allowsMultipleExpanded
          hideSeparator
          className="flex flex-col gap-1"
          defaultExpandedKeys={["home"]}
        >
          {enabledGroups.map((group) => {
            const GroupIcon = iconMap[group.icon] ?? Circle;

            const groupHasActiveChild = group.children.some((child) =>
              isActive(pathname, child.href),
            );

            return (
              <Accordion.Item
                key={group.id}
                className="border-none"
                id={group.id}
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
                          className={`flex-1 text-left ${
                            groupHasActiveChild ? "text-accent" : ""
                          }`}
                          color={groupHasActiveChild ? "default" : "muted"}
                          type="body-sm"
                          weight="medium"
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
                              className={`
                                flex items-center gap-3
                                rounded-lg px-3 py-2
                                transition-colors
                                ${
                                  active ? "bg-accent/10" : "hover:bg-default/5"
                                }
                              `}
                              href={child.href}
                            >
                              {getIcon(child.icon, 16)}

                              <Typography
                                className={active ? "text-accent" : ""}
                                color={active ? "default" : "muted"}
                                type="body-sm"
                                weight={active ? "medium" : "normal"}
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
                className="border-none"
                id={group.id}
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
                          className="flex-1 text-left"
                          color="muted"
                          type="body-sm"
                        >
                          {group.label[language]}
                        </Typography>

                        <Typography color="muted" type="body-xs">
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
                            aria-disabled="true"
                            className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 opacity-40"
                            title="Coming soon"
                          >
                            {getIcon(child.icon, 16)}

                            <Typography color="muted" type="body-sm">
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
          <Avatar className="shrink-0" size="sm">
            <Avatar.Fallback>
              {siteConfig.account.profile.initials}
            </Avatar.Fallback>
          </Avatar>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <Typography truncate type="body-sm" weight="medium">
                  {siteConfig.account.profile.name}
                </Typography>

                <Typography truncate color="muted" type="body-xs">
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
