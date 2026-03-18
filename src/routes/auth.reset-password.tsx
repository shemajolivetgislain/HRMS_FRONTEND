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
import { toast } from "sonner";
import { z } from "zod";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/lib/redux/api";

const resetPasswordSchema = z
	.object({
		otp: z.string().length(6, "Security code must be 6 digits"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least one uppercase letter")
			.regex(/[a-z]/, "Must contain at least one lowercase letter")
			.regex(/[0-9]/, "Must contain at least one number")
			.regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/auth/reset-password")({
	validateSearch: (search: Record<string, unknown>) => {
		return {
			email: (search.email as string) || "",
		};
	},
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const { email } = useSearch({ from: "/auth/reset-password" });

	const [showPassword, setShowPassword] = useState(false);
	const [resetComplete, setResetComplete] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);

	const [resetPasswordApi] = useResetPasswordMutation();
	const id = React.useId();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { otp: "", password: "", confirmPassword: "" },
	});

	const otpValue = watch("otp");
	const passwordValue = watch("password");

	const onSubmit = async (data: ResetPasswordValues) => {
		setGlobalError(null);

		if (!email) {
			setGlobalError(
				"User email is missing. Please restart the reset process.",
			);
			return;
		}

		try {
			await resetPasswordApi({
				email,
				otp: data.otp,
				newPassword: data.password,
			}).unwrap();

			setResetComplete(true);
			toast.success("Password reset successful!");
		} catch (error: any) {
			setGlobalError(
				error?.data?.message ||
					error?.message ||
					"Failed to reset password. The code might be invalid or expired.",
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
						Your account has been secured with a new password.
					</p>
				</div>

				<div className="space-y-6">
					<div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/10 flex items-start gap-4">
						<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
							<HugeiconsIcon icon={Tick01Icon} size={20} />
						</div>
						<div>
							<p className="text-sm font-semibold text-foreground/80 leading-none">
								Password Secured
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
					Reset Password
				</h1>
				<p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
					Enter the security code sent to{" "}
					<span className="text-foreground font-bold">
						{email || "your email"}
					</span>
					.
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

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* OTP Input Section */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
							Security Code
						</Label>
						{email && (
							<Link
								to="/auth/forgot-password"
								className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
							>
								Resend?
							</Link>
						)}
					</div>
					<div className="flex justify-center">
						<InputOTP
							maxLength={6}
							value={otpValue}
							onChange={(val) => setValue("otp", val, { shouldValidate: true })}
						>
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
					{errors.otp && (
						<p className="text-center text-xs text-destructive">
							{errors.otp.message}
						</p>
					)}
				</div>

				<div className="space-y-5 pt-2 border-t border-border/5">
					<div className="space-y-2">
						<Label
							htmlFor={`${id}-password`}
							className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
						>
							New Password
						</Label>
						<div className="relative group/pass">
							<Input
								id={`${id}-password`}
								type={showPassword ? "text" : "password"}
								placeholder="At least 8 characters"
								className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pr-10 shadow-none text-sm"
								{...register("password")}
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
						<PasswordStrengthIndicator password={passwordValue} />
						{errors.password && (
							<p className="text-xs text-destructive mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor={`${id}-confirmPassword`}
							className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
						>
							Confirm Password
						</Label>
						<Input
							id={`${id}-confirmPassword`}
							type="password"
							placeholder="••••••••"
							className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<p className="text-xs text-destructive mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
				</div>

				<Button
					type="submit"
					size="xl"
					disabled={isSubmitting || otpValue.length !== 6}
					className="w-full bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all group mt-2"
				>
					{isSubmitting ? "Securing account..." : "Reset Password"}
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
