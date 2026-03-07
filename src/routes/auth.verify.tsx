import {
  Alert01Icon,
  ArrowRight01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSendOtpMutation, useVerifyEmailMutation } from "@/lib/redux/api";
import { setCredentials } from "@/lib/redux/slices/auth";
import { useAppDispatch } from "@/lib/redux/store";

import { store } from "@/lib/redux/store";
import { getCookie } from "@/lib/cookies";

export const Route = createFileRoute("/auth/verify")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: (search.email as string) || "",
    };
  },
  beforeLoad: () => {
    if (typeof window === "undefined") return;

    const state = store.getState();
    const { user } = state.auth;
    const token = getCookie("auth_token");

    // 1. Must be logged in to verify
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }

    // 2. If already verified, move them along
    if (user && user.isEmailVerified) {
      const needsPasswordChange =
        (user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
        !user.passwordResetAt;

      if (needsPasswordChange) {
        throw redirect({
          to: "/auth/change-password",
          search: { email: user.email },
        });
      }

      if (user.role === "ADMIN") {
        throw redirect({ to: "/admin" });
      }
      throw redirect({ to: "/dashboard" });
    }
  },
  component: VerifyPage,
});

function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [verifyEmailApi] = useVerifyEmailMutation();
  const [sendOtpApi] = useSendOtpMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const search: any = useSearch({ from: "/auth/verify" });
  const email = search?.email || "your email";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);
    setGlobalError(null);
    try {
      const response = await verifyEmailApi({
        email: email.trim(),
        otp,
      }).unwrap();

      const { user: verifiedUser, accessToken } = response;

      dispatch(
        setCredentials({
          user: verifiedUser,
          token: accessToken,
        }),
      );
      toast.success("Email verified successfully");

      const needsPasswordChange =
        (verifiedUser.role === "COMPANY_ADMIN" ||
          verifiedUser.role === "EMPLOYEE") &&
        !verifiedUser.passwordResetAt;

      if (needsPasswordChange) {
        navigate({
          to: "/auth/change-password",
          search: { email: verifiedUser.email },
        });
      } else if (verifiedUser.role === "ADMIN") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (error: any) {
      setGlobalError(
        error?.data?.message ||
          error?.message ||
          "Invalid or expired verification code.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setIsResending(true);
    setGlobalError(null);
    try {
      await sendOtpApi({
        email: email,
        type: "REGISTER_USER_OTP",
      }).unwrap();
      setTimer(59);
      toast.success("A new verification code has been sent.");
    } catch (error: any) {
      setGlobalError(
        error?.data?.message || error?.message || "Failed to resend code.",
      );
    } finally {
      setIsResending(false);
    }
  };

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

      {globalError && (
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-top-2"
        >
          <HugeiconsIcon icon={Alert01Icon} />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/10 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <HugeiconsIcon icon={Mail01Icon} size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/80 leading-none">
              Code Sent
            </p>
            <p className="text-xs font-medium text-muted-foreground/50 mt-1.5 leading-relaxed">
              We've sent a 6-digit code to{" "}
              <span className="text-foreground/70 font-bold">{email}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <Label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
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
              <p className="text-xs font-medium text-muted-foreground/40">
                Resend code in{" "}
                <span className="text-foreground/60 font-bold tabular-nums">
                  {timer}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            size="xl"
            className="w-full bg-primary text-primary-foreground font-bold group"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
            {!isVerifying && (
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
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
