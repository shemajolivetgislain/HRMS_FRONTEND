'use client'

import React from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordStrengthIndicatorProps {
  password: string
  showRequirements?: boolean
}

export function PasswordStrengthIndicator({
  password,
  showRequirements = true,
}: PasswordStrengthIndicatorProps) {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const strength = Object.values(requirements).filter(Boolean).length
  const strengthPercentage = (strength / 5) * 100
  const strengthColor =
    strength <= 1 ? 'bg-destructive' :
    strength <= 2 ? 'bg-warning' :
    strength <= 3 ? 'bg-primary/50' :
    strength <= 4 ? 'bg-primary' :
    'bg-success'

  const strengthLabel =
    strength === 0 ? 'None' :
    strength <= 2 ? 'Weak' :
    strength <= 3 ? 'Fair' :
    strength <= 4 ? 'Good' :
    'Strong'

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">
            Password Strength
          </label>
          <span className={cn(
            'text-xs font-semibold',
            strength <= 1 && 'text-destructive',
            strength <= 2 && 'text-warning',
            strength <= 3 && 'text-primary/70',
            strength <= 4 && 'text-primary',
            strength > 4 && 'text-success'
          )}>
            {strengthLabel}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-300 rounded-full',
              strengthColor
            )}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>

      {showRequirements && (
        <div className="space-y-1.5 pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">
            Password Requirements
          </p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              {requirements.minLength ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span className={requirements.minLength ? 'text-success' : ''}>
                At least 8 characters
              </span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              {requirements.hasUppercase ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span className={requirements.hasUppercase ? 'text-success' : ''}>
                One uppercase letter (A-Z)
              </span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              {requirements.hasLowercase ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span className={requirements.hasLowercase ? 'text-success' : ''}>
                One lowercase letter (a-z)
              </span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              {requirements.hasNumber ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span className={requirements.hasNumber ? 'text-success' : ''}>
                One number (0-9)
              </span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              {requirements.hasSpecial ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span className={requirements.hasSpecial ? 'text-success' : ''}>
                One special character (!@#$%^&*)
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
