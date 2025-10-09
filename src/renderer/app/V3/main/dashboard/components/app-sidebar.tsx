"use client";

import { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../../../components/ui/sidebar";
import { useSharedState } from "../../../../../context/state-context";
import HomePage from "../../../pages/home/page";

export type ItemsProp = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content: React.ReactNode;
};

const items: ItemsProp[] = [
  { title: "Home", icon: Home, content: <HomePage /> },
  { title: "Inbox", icon: Inbox, content: <>Página Inbox</> },
  { title: "Calendar", icon: Calendar, content: <>Página Calendar</> },
  { title: "Search", icon: Search, content: <>Página Search</> },
  { title: "Settings", icon: Settings, content: <>Página Settings</> },
];

export function AppSidebar() {
  const { hover, setOpen } = useSidebar();
  const { setState } = useSharedState();
  const [activeItem, setActiveItem] = useState<string>("Home");

  const handleMouseEnter = () => {
    if (hover) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (hover) setOpen(false);
  };

  const handlePageChange = (title: string, item: ItemsProp) => {
    setActiveItem(title);
    setState("main_page_v3", item);
  };

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-neutral-800 text-base-100 border-none"
    >
      <SidebarHeader>
        <SidebarMenu />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`rounded-md ${
                      activeItem === item.title
                        ? "bg-primary text-white"
                        : "hover:bg-primary/70"
                    }`}
                    onClick={() => handlePageChange(item.title, item)}
                  >
                    <SidebarMenuButton className="cursor-pointer flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
