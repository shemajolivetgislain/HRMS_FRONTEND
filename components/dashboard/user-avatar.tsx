'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  src?: string
  name: string
  email?: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline' | 'away'
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const statusColorMap = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  away: 'bg-warning',
}

export function UserAvatar({
  src,
  name,
  email,
  size = 'md',
  status,
  className,
}: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const avatarContent = (
    <div className="relative">
      <Avatar className={cn(sizeMap[size], className)}>
        <AvatarImage src={src} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
          statusColorMap[status]
        )} />
      )}
    </div>
  )

  if (email) {
    return (
      <div className="flex items-center gap-2">
        {avatarContent}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
      </div>
    )
  }

  return avatarContent
}
