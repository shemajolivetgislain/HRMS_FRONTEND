'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  description?: string
  className?: string
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn(
      'p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-foreground mb-2">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={cn(
                'text-xs font-medium',
                trend.direction === 'up' ? 'text-success' : 'text-destructive'
              )}>
                {trend.direction === 'up' ? '+' : '-'}{trend.percentage}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
