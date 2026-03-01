import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  ViewOffIcon,
  ArrowRight01Icon,
  UserCircle02Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
          {isAdmin ? "Admin Login" : "Employee Portal"}
        </h1>
        <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
          Welcome back. Sign in to your workspace.
        </p>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] font-semibold text-muted-foreground/60 capitalize"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-[11px] font-semibold text-muted-foreground/60 capitalize"
            >
              Password
            </Label>
            <Link
              to="/auth/forgot-password"
              className="text-[11px] text-primary font-semibold hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative group/pass">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pr-10 shadow-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-foreground transition-colors"
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffIcon : ViewIcon}
                size={16}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 pt-1">
          <Checkbox
            id="remember"
            className="size-4 rounded-md border-border/60"
          />
          <label
            htmlFor="remember"
            className="text-[12px] font-medium text-muted-foreground/60 cursor-pointer select-none"
          >
            Remember me
          </label>
        </div>

        <Button
          render={<Link to="/dashboard" />}
          size="xl"
          className="w-full bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all group"
        >
          Sign In
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Button>
      </form>

      <div className="pt-6 border-t border-border/5 space-y-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-[11px] font-semibold text-muted-foreground/40 hover:text-primary transition-all flex items-center gap-2 bg-muted/5 px-4 py-1.5 rounded-full"
          >
            <HugeiconsIcon
              icon={isAdmin ? UserCircle02Icon : Shield01Icon}
              size={14}
            />
            Switch to {isAdmin ? "Employee" : "Admin"} Login
          </button>
        </div>

        <p className="text-[12px] font-medium text-muted-foreground/60 text-center">
          New here?{" "}
          <Link
            to="/auth/register"
            className="text-primary font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
