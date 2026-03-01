import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Tick01Icon,
  ViewIcon,
  ViewOffIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showCompanyPassword, setShowCompanyPassword] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
          {step === 1
            ? "Organization"
            : step === 2
              ? "Administrator"
              : "Verify"}
        </h1>
        <p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
          {step === 1
            ? "Initialize your company profile and TIN"
            : step === 2
              ? "Create your owner credentials"
              : "Confirm your account registration"}
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between relative px-2">
          <div className="absolute left-0 right-0 top-4 h-px bg-border/5 -z-10" />
          <Step
            number={1}
            active={step === 1}
            completed={step > 1}
            label="Company"
          />
          <Step
            number={2}
            active={step === 2}
            completed={step > 2}
            label="Admin"
          />
          <Step
            number={3}
            active={step === 3}
            completed={step > 3}
            label="Verify"
          />
        </div>

        {step === 1 && (
          <form
            className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-500"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                Legal Entity Name
              </Label>
              <Input
                placeholder="e.g. Igihe Logistics Inc."
                className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all shadow-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                  TIN Number
                </Label>
                <Input
                  placeholder="9 Digits"
                  className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all shadow-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                  Sector
                </Label>
                <Select>
                  <SelectTrigger className="h-10 rounded-lg border-border/40 bg-muted/5">
                    <SelectValue placeholder="Select" className="text-sm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                Company Unique Password
              </Label>
              <div className="relative">
                <Input
                  type={showCompanyPassword ? "text" : "password"}
                  placeholder="Master Tenant Password"
                  className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pr-10 shadow-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowCompanyPassword(!showCompanyPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                >
                  <HugeiconsIcon
                    icon={showCompanyPassword ? ViewOffIcon : ViewIcon}
                    size={16}
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground/40 font-medium leading-tight pt-1 italic">
                * This will be required for all staff members during initial
                setup.
              </p>
            </div>

            <Button
              size="xl"
              className="w-full mt-2 bg-primary text-primary-foreground font-bold group"
              type="submit"
            >
              Continue
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </form>
        )}

        {step === 2 && (
          <form
            className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-500"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                Full Name
              </Label>
              <Input
                placeholder="Primary Administrator"
                className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all shadow-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                Work Email
              </Label>
              <Input
                type="email"
                placeholder="admin@company.com"
                className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all shadow-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                Personal Admin Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pr-10 shadow-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    size={16}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="xl"
                className="flex-1 font-bold"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                size="xl"
                className="flex-[2] bg-primary text-primary-foreground font-bold group "
                type="submit"
              >
                Complete
                <HugeiconsIcon icon={Tick01Icon} size={16} />
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="size-16 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mx-auto shadow-sm">
              <HugeiconsIcon icon={Shield01Icon} size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground/90">
                Setup Successful
              </h3>
              <p className="text-sm font-medium text-muted-foreground/50 leading-relaxed px-4">
                Your organization account has been submitted. Check your email
                for a verification link to activate your dashboard.
              </p>
            </div>
            <Button
              render={<Link to="/dashboard" />}
              size="xl"
              className="w-full bg-primary text-primary-foreground font-bold shadow-sm "
            >
              Access Dashboard
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-border/5 text-center">
          <p className="text-xs font-medium text-muted-foreground/60">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  active,
  completed,
  label,
}: {
  number: number;
  active: boolean;
  completed: boolean;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 relative z-10">
      <div
        className={cn(
          "size-8 rounded-full border flex items-center justify-center transition-all duration-500",
          active
            ? "bg-primary border-primary text-white shadow-sm ring-4 ring-primary/5"
            : completed
              ? "bg-success border-success text-white"
              : "bg-background border-border/40 text-muted-foreground/40",
        )}
      >
        {completed ? (
          <HugeiconsIcon icon={Tick01Icon} size={12} strokeWidth={3} />
        ) : (
          <span className="text-xs font-bold tabular-nums">{number}</span>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-bold uppercase tracking-tight",
          active ? "text-foreground/80" : "text-muted-foreground/30",
        )}
      >
        {label}
      </span>
    </div>
  );
}
