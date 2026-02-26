'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

export default function AdminLoginPage() {
  const [role, setRole] = useState<'system' | 'company'>('system')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Login attempt:', { role, ...formData, rememberMe })
    }
  }

  return (
    <AuthCard
      title="Admin Portal"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selector */}
        <Tabs value={role} onValueChange={(value) => setRole(value as 'system' | 'company')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="system">System Admin</TabsTrigger>
            <TabsTrigger value="company">Company Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">
              System administrators manage multiple companies and platform-wide settings.
            </p>
          </TabsContent>

          <TabsContent value="company" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">
              Company administrators manage employees and settings within their organization.
            </p>
          </TabsContent>
        </Tabs>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-destructive focus:ring-destructive' : ''}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
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
              <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="w-4 h-4" />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          Sign In
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-card text-muted-foreground">
              New to HRMS?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Button
          type="button"
          variant="outline"
          className="w-full border-border"
          render={<Link href="/register/company" />}
        >
          Create Account
        </Button>

        {/* Employee Login Link */}
        <p className="text-center text-xs text-muted-foreground">
          Looking for employee portal?{' '}
          <Link href="/login/employee" className="text-primary hover:underline font-medium">
            Login as Employee
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
