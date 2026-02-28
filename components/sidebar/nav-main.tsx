"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="gap-1.5 mt-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                render={<Link href={item.url} />}
                className=" flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200 hover:bg-muted/40 cursor-pointer data-[active=true]:bg-primary/5 data-[active=true]:text-primary"
              >
                <div className="text-muted-foreground/70 transition-colors group-data-[active=true]:text-primary">
                  {item.icon}
                </div>
                <span className="font-medium text-foreground/80 tracking-wide transition-colors duration-200 group-data-[active=true]:text-primary group-data-[active=true]:font-semibold">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
