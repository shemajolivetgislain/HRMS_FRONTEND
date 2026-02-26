"use client";

import React, { useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(59);
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setErrors("Please enter a valid 6-digit code");
      return;
    }
    setIsLoading(true);
    setErrors("");
    console.log("Verifying OTP:", otp);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      console.log("OTP verified successfully");
    }, 1500);
  };

  const handleResend = () => {
    setOtp("");
    setOtpTimer(59);
    setErrors("");
    console.log("OTP resent");
  };

  return (
    <AuthCard
      title="Verify Your Email"
      subtitle="Enter the verification code sent to your email"
    >
      <div className="space-y-6">
        {/* Contact Info */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            Verification code sent to:
          </p>
          <p className="text-sm font-medium text-foreground mt-1">
            admin@example.com
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Enter 6-Digit Code
          </label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (errors) setErrors("");
            }}
            disabled={isLoading}
          >
            <InputOTPGroup className="w-full flex justify-center gap-2">
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-12 text-lg font-bold place-content-center"
              />
            </InputOTPGroup>
          </InputOTP>
          {errors && (
            <p className="text-xs text-destructive text-center">{errors}</p>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          {isLoading ? "Verifying..." : "Verify"}
          {!isLoading && (
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
            />
          )}
        </Button>

        {/* Resend OTP */}
        <div className="space-y-3 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground text-center">
            Didn't receive the code?
          </p>
          {otpTimer > 0 ? (
            <p className="text-sm text-center font-medium text-foreground">
              Resend code in <span className="text-primary">{otpTimer}s</span>
            </p>
          ) : (
            <Button
              onClick={handleResend}
              variant="ghost"
              className="w-full text-primary"
            >
              Resend Code
            </Button>
          )}
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={() => window.history.back()}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4 mr-2" />
          Back to Login
        </Button>
      </div>
    </AuthCard>
  );
}
