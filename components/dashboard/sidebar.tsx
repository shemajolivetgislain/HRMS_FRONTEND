'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: 'Companies',
    href: '/dashboard/companies',
    icon: Building2,
    badge: null,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
    badge: null,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null,
  },
]

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void
  collapsed?: boolean
}

export function Sidebar({ onToggle, collapsed: initialCollapsed = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const pathname = usePathname()

  const handleToggle = () => {
    const newState = !collapsed
    setCollapsed(newState)
    onToggle?.(newState)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40',
          'lg:relative lg:translate-x-0',
          collapsed ? 'w-20' : 'w-64',
          !collapsed && 'translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary/10">
                  <span className="text-sm font-bold text-sidebar-primary">H</span>
                </div>
                <span className="font-bold text-sidebar-foreground text-sm">HRMS</span>
              </div>
            )}
            {collapsed && (
              <div className="flex items-center justify-center w-full">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary/10">
                  <span className="text-sm font-bold text-sidebar-primary">H</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    'relative flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent cursor-pointer',
                    isActive && 'bg-sidebar-accent text-sidebar-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-sidebar-primary before:rounded-r-full'
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-sidebar-primary text-sidebar-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-sidebar-border p-3">
          <div className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200',
            collapsed && 'justify-center'
          )}>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://avatar.vercel.sh/admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-sidebar-accent-foreground truncate">
                  admin@example.com
                </p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            className={cn(
              'relative flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent cursor-pointer w-full mt-2',
              collapsed && 'justify-center'
            )}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="flex-1">Logout</span>}
          </button>
        </div>

        {/* Collapse Button (Desktop only) */}
        <div className="hidden lg:flex border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="w-full"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={handleToggle}
        />
      )}
    </>
  )
}
