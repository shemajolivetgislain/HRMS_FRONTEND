'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OTPInput } from '@/components/auth/otp-input'
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'

export default function CompanyAdminRegistrationPage() {
  const [step, setStep] = useState<'details' | 'verify'>('details')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
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

  const validateDetails = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOTP = async () => {
    if (validateDetails()) {
      setOtpSent(true)
      setStep('verify')
      setOtpTimer(59)
      const interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleVerifyOTP = () => {
    if (formData.otp.length !== 6) {
      setErrors(prev => ({
        ...prev,
        otp: 'Please enter a valid 6-digit code',
      }))
      return
    }
    console.log('OTP verified:', formData.otp)
    // Proceed to next step or dashboard
  }

  const handleResendOTP = () => {
    setOtpTimer(59)
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  if (step === 'verify') {
    return (
      <AuthCard
        title="Verify Email"
        subtitle="We've sent a verification code to your email"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleVerifyOTP() }} className="space-y-5">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              ✓
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Company Details
            </span>
            <div className="flex-1 h-0.5 mx-2 bg-primary rounded" />
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Admin Setup
            </span>
            <div className="flex-1 h-0.5 mx-2 bg-muted rounded" />
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-bold text-muted-foreground">
              3
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Verify
            </span>
          </div>

          {/* Email Display */}
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              Verification code sent to:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              {formData.email}
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-3">
            <Label className="text-sm">
              Enter Verification Code
            </Label>
            <OTPInput
              length={6}
              onChange={(value) => handleInputChange('otp', value)}
              onComplete={(value) => {
                handleInputChange('otp', value)
              }}
            />
            {errors.otp && (
              <p className="text-xs text-destructive text-center">{errors.otp}</p>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {otpTimer > 0 ? (
              <p className="text-xs text-muted-foreground">
                Resend code in <span className="font-semibold text-foreground">{otpTimer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-xs text-primary hover:underline font-medium"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
          >
            Verify & Continue
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>

          {/* Back Button */}
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setStep('details')
              setOtpSent(false)
            }}
          >
            Back
          </Button>
        </form>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Register Admin"
      subtitle="Create your admin account"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSendOTP() }} className="space-y-5">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            ✓
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Company Details
          </span>
          <div className="flex-1 h-0.5 mx-2 bg-primary rounded" />
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            2
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Admin Setup
          </span>
          <div className="flex-1 h-0.5 mx-2 bg-muted rounded" />
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-bold text-muted-foreground">
            3
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Verify
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={errors.fullName ? 'border-destructive focus:ring-destructive' : ''}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@company.com"
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
            <Label htmlFor="password" className="text-sm">
              Password
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
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          Send Verification Code
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
