"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setErrors("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
            Check Your Email
          </h1>
          <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
            We've sent a password reset link to your inbox.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/10 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <HugeiconsIcon icon={Mail01Icon} size={20} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-foreground/80 leading-none">
                Link Sent
              </p>
              <p className="text-[11px] font-medium text-muted-foreground/50 mt-1.5 leading-relaxed">
                Reset link sent to{" "}
                <span className="text-foreground/70 font-bold">{email}</span>
              </p>
            </div>
          </div>

          <div className="p-5 bg-muted/5 rounded-xl border border-border/40 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40">
              Next Steps
            </p>
            <ul className="space-y-2.5">
              {[
                "Check your email for the reset link",
                "Click the link to create a new password",
                "Sign in with your new credentials",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground/60 leading-tight">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
              variant="outline"
              className="w-full h-10 border-border/40 text-[12px] font-bold text-muted-foreground/60 hover:text-foreground"
            >
              Use different email
            </Button>

            <Link href="/auth/login" className="block">
              <Button
                variant="ghost"
                className="w-full h-9 text-[11px] font-bold text-muted-foreground/40 hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={14}
                  className="mr-2"
                />
                Back to login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
          Reset Password
        </h1>
        <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
          Enter your email to receive a recovery link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] font-semibold text-muted-foreground/60 capitalize"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors) setErrors("");
            }}
            className={`h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm ${
              errors ? "border-destructive/50 ring-destructive/20" : ""
            }`}
          />
          {errors && (
            <p className="text-[11px] font-medium text-destructive mt-1">
              {errors}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!email || isLoading}
          size="xl"
          className="w-full bg-primary text-primary-foreground font-bold rounded-lg shadow-sm hover:opacity-95 transition-all group"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
          {!isLoading && (
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              className=" group-hover:translate-x-0.5 transition-transform"
            />
          )}
        </Button>

        <div className="pt-6 border-t border-border/5">
          <Link href="/auth/login" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-border/40 text-[12px] font-bold text-muted-foreground/60 hover:text-foreground"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
