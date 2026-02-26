'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator'
import { Eye, EyeOff, ChevronRight, CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      console.log('Resetting password...')

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setResetComplete(true)
      }, 1500)
    }
  }

  if (resetComplete) {
    return (
      <AuthCard
        title="Password Reset Successful"
        subtitle="Your password has been updated"
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <p className="text-sm text-foreground">
              Your password has been successfully reset.
            </p>
            <p className="text-xs text-muted-foreground">
              You can now sign in with your new password.
            </p>
          </div>

          {/* Sign In Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
            asChild
          >
            <Link href="/login">
              Back to Sign In
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Set New Password"
      subtitle="Create a strong password for your account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'border-destructive focus:ring-destructive' : ''}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
          {formData.password && (
            <PasswordStrengthIndicator password={formData.password} />
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border-destructive focus:ring-destructive' : ''}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!formData.password || !formData.confirmPassword || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
          {!isLoading && (
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          )}
        </Button>

        {/* Back to Login */}
        <Button
          type="button"
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/login">
            Back to Sign In
          </Link>
        </Button>
      </form>
    </AuthCard>
  )
}
