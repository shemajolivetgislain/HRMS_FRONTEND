'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ChevronRight, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = () => {
    if (!email.trim()) {
      setErrors('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors('Please enter a valid email')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors('')

    if (!validateEmail()) {
      return
    }

    setIsLoading(true)
    console.log('Sending reset link to:', email)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <AuthCard
        title="Check Your Email"
        subtitle="We've sent a password reset link"
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-success" />
            </div>
          </div>

          {/* Email Display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to:
            </p>
            <p className="text-sm font-medium text-foreground break-all">
              {email}
            </p>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
            <p className="text-xs font-medium text-foreground">
              Next Steps:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Check your email for the reset link</li>
              <li>Click the link to create a new password</li>
              <li>Sign in with your new password</li>
            </ol>
          </div>

          {/* Note */}
          <p className="text-xs text-muted-foreground text-center">
            If you don't see the email, check your spam folder or try again.
          </p>

          {/* Resend Button */}
          <Button
            onClick={() => {
              setSubmitted(false)
              setEmail('')
            }}
            variant="ghost"
            className="w-full text-primary"
          >
            Use different email
          </Button>

          {/* Back to Login */}
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors) setErrors('')
            }}
            className={errors ? 'border-destructive focus:ring-destructive' : ''}
          />
          {errors && (
            <p className="text-xs text-destructive">{errors}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!email || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
          {!isLoading && (
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-card text-muted-foreground">
              Remember your password?
            </span>
          </div>
        </div>

        {/* Back to Login */}
        <Button
          type="button"
          variant="outline"
          className="w-full border-border"
          asChild
        >
          <Link href="/login">
            Sign In
          </Link>
        </Button>
      </form>
    </AuthCard>
  )
}
