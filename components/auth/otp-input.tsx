'use client'

import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  length?: number
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
}

export function OTPInput({
  length = 6,
  onChange,
  onComplete,
  disabled = false,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/[^0-9]/g, '')

    if (digit.length > 1) {
      const digits = digit.split('').slice(0, length - index)
      const newValues = [...values]
      digits.forEach((d, i) => {
        if (index + i < length) {
          newValues[index + i] = d
        }
      })
      setValues(newValues)
      const nextIndex = Math.min(index + digits.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    } else {
      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const fullValue = [...values.slice(0, index), digit, ...values.slice(index + 1)].join('')
    onChange?.(fullValue)

    if (newValues.every(v => v) && digit) {
      onComplete?.([...newValues.slice(0, index), digit, ...newValues.slice(index + 1)].join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newValues = [...values]
      newValues[index] = ''
      setValues(newValues)
      if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').split('')
    const newValues = [...values]
    paste.slice(0, length).forEach((digit, i) => {
      newValues[i] = digit
    })
    setValues(newValues)
    const lastIndex = Math.min(paste.length - 1, length - 1)
    inputRefs.current[lastIndex]?.focus()
    onChange?.(newValues.join(''))
    if (newValues.every(v => v)) {
      onComplete?.(newValues.join(''))
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'w-12 h-12 text-center text-lg font-bold border border-border rounded-lg',
            'bg-card text-foreground placeholder:text-muted-foreground',
            'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:border-primary',
            'transition-all duration-200',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          placeholder="•"
        />
      ))}
    </div>
  )
}
