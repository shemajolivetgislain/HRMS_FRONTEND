import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/auth/verify")({
  component: VerifyPage,
});

function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
          Verify Identity
        </h1>
        <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
          Check your inbox for the security code.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/10 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <HugeiconsIcon icon={Mail01Icon} size={20} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground/80 leading-none">
              Code Sent
            </p>
            <p className="text-[11px] font-medium text-muted-foreground/50 mt-1.5 leading-relaxed">
              We've sent a 6-digit code to{" "}
              <span className="text-foreground/70 font-bold">
                admin@acme.com
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              Enter Security Code
            </Label>
            <div className="flex justify-center pt-2">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <div className="flex items-center gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </div>
              </InputOTP>
            </div>
          </div>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-[11px] font-medium text-muted-foreground/40">
                Resend code in{" "}
                <span className="text-foreground/60 font-bold tabular-nums">
                  {timer}s
                </span>
              </p>
            ) : (
              <button className="text-[11px] font-bold text-primary hover:underline">
                Resend Code
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            render={<Link to="/dashboard" />}
            size="xl"
            className="w-full bg-primary text-primary-foreground font-bold group"
          >
            Verify & Continue
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Button>
          <Button
            render={<Link to="/auth/login" />}
            variant="ghost"
            size="lg"
            className="w-full font-bold text-muted-foreground/40 hover:text-foreground"
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
}
