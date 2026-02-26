'use client'

import React from 'react'
import { Card } from '@/components/ui/card'

interface AuthCardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export function AuthCard({
  children,
  title,
  subtitle,
  className = '',
}: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <span className="text-xl font-bold text-primary">HRMS</span>
          </div>
          {title && (
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <Card className={`bg-card rounded-lg border border-border shadow-lg p-8 ${className}`}>
          {children}
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 HRMS System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
