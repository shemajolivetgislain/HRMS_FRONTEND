import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert01Icon,
  ArrowRight01Icon,
  Tick01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/lib/redux/api";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [resetPassword] = useResetPasswordMutation();
  const id = React.useId();

  const search: any = useSearch({ from: "/auth/reset-password" });
  const token = search?.token || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: ResetPasswordValues) => {
    setGlobalError(null);
    if (!token) {
      setGlobalError(
        "Invalid or missing reset token. Please request a new link.",
      );
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword: data.password,
      }).unwrap();
      setResetComplete(true);
    } catch (error: any) {
      setGlobalError(
        error?.data?.message ||
          error?.message ||
          "Failed to reset password. The link might be expired.",
      );
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

      {globalError && (
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-top-2"
        >
          <HugeiconsIcon icon={Alert01Icon} />
          <AlertTitle>Reset Failed</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor={`${id}-password`}
            className="text-xs font-semibold text-muted-foreground/60 capitalize"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id={`${id}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
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
              {errors.password.message}
            </p>
          )}
          {passwordValue && (
            <div className="pt-1">
              <PasswordStrengthIndicator password={passwordValue} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`${id}-confirmPassword`}
            className="text-xs font-semibold text-muted-foreground/60 capitalize"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id={`${id}-confirmPassword`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
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
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          disabled={!passwordValue || !confirmPasswordValue || isSubmitting}
          className="w-full bg-primary text-primary-foreground font-bold shadow-sm hover:opacity-95 transition-all group"
        >
          {isSubmitting ? "Updating…" : "Update Password"}
          {!isSubmitting && (
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
