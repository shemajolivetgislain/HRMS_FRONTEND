'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type StatusType = 'active' | 'inactive' | 'pending' | 'error' | 'success'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  variant?: 'default' | 'outline'
  className?: string
}

const statusConfig = {
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success border border-success/30',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-muted text-muted-foreground border border-border',
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning border border-warning/30',
  },
  error: {
    label: 'Error',
    className: 'bg-destructive/10 text-destructive border border-destructive/30',
  },
  success: {
    label: 'Success',
    className: 'bg-success/10 text-success border border-success/30',
  },
}

export function StatusBadge({
  status,
  label,
  variant = 'default',
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.inactive
  const displayLabel = label || config.label

  return (
    <Badge
      variant={variant}
      className={cn(
        config.className,
        className
      )}
    >
      {displayLabel}
    </Badge>
  )
}
