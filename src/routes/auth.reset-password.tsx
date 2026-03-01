import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  ViewOffIcon,
  ArrowRight01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // simulate api call
      setTimeout(() => {
        setIsLoading(false);
        setResetComplete(true);
      }, 1500);
    }
  };

  if (resetComplete) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
            Success!
          </h1>
          <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
            Your password has been successfully updated.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/10 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <HugeiconsIcon icon={Tick01Icon} size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/80 leading-none">
                Password Reset
              </p>
              <p className="text-xs font-medium text-muted-foreground/50 mt-1.5 leading-relaxed">
                You can now sign in to your workspace with your new credentials.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              render={<Link to="/auth/login" />}
              size="xl"
              className="w-full bg-primary text-primary-foreground font-bold shadow-sm hover:opacity-95 transition-all group"
            >
              Sign In Now
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
          Set New Password
        </h1>
        <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
          Create a strong password to protect your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-semibold text-muted-foreground/60 capitalize"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 pr-10 shadow-none text-sm ${
                errors.password
                  ? "border-destructive/50 ring-destructive/20"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffIcon : ViewIcon}
                size={16}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.password}
            </p>
          )}
          {formData.password && (
            <div className="pt-1">
              <PasswordStrengthIndicator password={formData.password} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-xs font-semibold text-muted-foreground/60 capitalize"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 pr-10 shadow-none text-sm ${
                errors.confirmPassword
                  ? "border-destructive/50 ring-destructive/20"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              <HugeiconsIcon
                icon={showConfirmPassword ? ViewOffIcon : ViewIcon}
                size={16}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          disabled={
            !formData.password || !formData.confirmPassword || isLoading
          }
          className="w-full bg-primary text-primary-foreground font-bold shadow-sm hover:opacity-95 transition-all group"
        >
          {isLoading ? "Updating…" : "Update Password"}
          {!isLoading && (
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          )}
        </Button>
      </form>
    </div>
  );
}
