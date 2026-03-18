import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert01Icon,
	ArrowRight01Icon,
	LockKeyIcon,
	ViewIcon,
	ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	createFileRoute,
	redirect,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/lib/cookies";
import { useChangePasswordMutation } from "@/lib/redux/api";
import { updateUser } from "@/lib/redux/slices/auth";
import { store, useAppDispatch, useAppSelector } from "@/lib/redux/store";

export const Route = createFileRoute("/auth/change-password")({
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

		// 1. Must be logged in
		if (!token) {
			throw redirect({ to: "/auth/login" });
		}

		if (user) {
			const isVerified = user.status === "ACTIVE";
			const needsPasswordChange =
				(user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
				!user.passwordResetAt;

			// 2. If not verified, go back to verify
			if (!isVerified) {
				throw redirect({
					to: "/auth/verify",
					search: { email: user.email },
				});
			}

			// 3. If already setup, go to dashboard
			if (!needsPasswordChange) {
				if (user.role === "ADMIN") {
					throw redirect({ to: "/admin" });
				}
				throw redirect({ to: "/dashboard" });
			}
		}
	},
	component: ChangePasswordPage,
});

const changePasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, "New password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least one uppercase letter")
			.regex(/[a-z]/, "Must contain at least one lowercase letter")
			.regex(/[0-9]/, "Must contain at least one number")
			.regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
		confirmPassword: z.string().min(1, "Please confirm your new password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

function ChangePasswordPage() {
	const { email } = useSearch({ from: "/auth/change-password" });
	const [showPassword, setShowPassword] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);

	const id = useId();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const [changePasswordApi] = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const passwordValue = watch("password");

	const onSubmit = async (data: ChangePasswordFormValues) => {
		setGlobalError(null);
		try {
			await changePasswordApi({
				newPassword: data.password,
			}).unwrap();

			toast.success("Account setup complete!");

			// Update the local user state to reflect that they've reset their password
			dispatch(updateUser({ passwordResetAt: new Date().toISOString() }));

			// Redirect to appropriate dashboard
			if (user?.role === "ADMIN") {
				navigate({ to: "/admin" });
			} else {
				navigate({ to: "/dashboard" });
			}
		} catch (error: any) {
			setGlobalError(
				error?.data?.message ||
					error?.message ||
					"Failed to update password. Please try again.",
			);
		}
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="space-y-2">
				<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
					<HugeiconsIcon icon={LockKeyIcon} size={20} />
				</div>
				<h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
					Secure Your Account
				</h1>
				<p className="text-[14px] font-medium text-muted-foreground/50 leading-relaxed">
					Set a new secure password for{" "}
					<span className="text-foreground">{email}</span> to complete your
					account setup.
				</p>
			</div>

			{globalError && (
				<Alert
					variant="destructive"
					className="animate-in fade-in slide-in-from-top-2"
				>
					<HugeiconsIcon icon={Alert01Icon} />
					<AlertTitle>Setup Failed</AlertTitle>
					<AlertDescription>{globalError}</AlertDescription>
				</Alert>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div className="space-y-2">
					<Label
						htmlFor={`${id}-password`}
						className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
					>
						New Secure Password
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
						<p className="text-xs text-destructive">
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
						<p className="text-xs text-destructive">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					size="xl"
					disabled={isSubmitting}
					className="w-full bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all group"
				>
					{isSubmitting ? "Processing..." : "Finish Account Setup"}
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
