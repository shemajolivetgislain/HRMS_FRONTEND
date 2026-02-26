'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Notification01Icon,
  Settings02Icon,
  Logout01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TopNavProps {
  title?: string
  showBreadcrumb?: boolean
}

export function TopNav({ title, showBreadcrumb = true }: TopNavProps) {
  const pathname = usePathname()

  // Generate breadcrumb from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 1).join('/'),
    }))
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Title & Breadcrumb */}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-xl font-bold text-foreground">
              {title}
            </h1>
          )}
          {showBreadcrumb && breadcrumbs.length > 0 && !title && (
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  <span className="text-muted-foreground">/</span>
                  <Link 
                    href={crumb.href}
                    className={index === breadcrumbs.length - 1 ?
                      'text-foreground font-medium' :
                      'text-muted-foreground hover:text-foreground transition-colors'
                    }
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            title="Notifications"
          >
            <HugeiconsIcon icon={Notification01Icon} className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/dashboard/settings" title="Settings" />}
          >
            <HugeiconsIcon icon={Settings02Icon} className="w-5 h-5" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                />
              }
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://avatar.vercel.sh/admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/profile" />}>
                <HugeiconsIcon icon={UserIcon} className="w-4 h-4 mr-2" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

