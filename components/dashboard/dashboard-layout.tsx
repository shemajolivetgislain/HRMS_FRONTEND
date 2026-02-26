'use client'

import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { TopNav } from './top-nav'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  showBreadcrumb?: boolean
}

export function DashboardLayout({
  children,
  title,
  showBreadcrumb = true,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
      />

      {/* Main Content */}
      <main className={cn(
        'transition-all duration-300',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-20'
      )}>
        {/* Top Navigation */}
        <TopNav title={title} showBreadcrumb={showBreadcrumb} />

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
