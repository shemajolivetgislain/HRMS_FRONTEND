import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert01Icon,
	ArrowRight01Icon,
	Shield01Icon,
	UserCircle02Icon,
	ViewIcon,
	ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/lib/redux/api";
import { setCredentials } from "@/lib/redux/slices/auth";
import { useAppDispatch } from "@/lib/redux/store";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

const loginSchema = z.object({
	identifier: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	companyId: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isAdmin, setIsAdmin] = useState(true);
	const id = useId();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loginApi] = useLoginMutation();
	const [globalError, setGlobalError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			identifier: "",
			password: "",
			companyId: "",
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		setGlobalError(null);
		try {
			const response = await loginApi({
				identifier: data.identifier,
				password: data.password,
			}).unwrap();

			const { user, accessToken } = response;

			dispatch(setCredentials({ user, token: accessToken }));

			// unverified → send to verify page
			if (!user.isEmailVerified) {
				toast.info("Please verify your email to continue.");
				navigate({ to: "/auth/verify", search: { email: user.email } });
				return;
			}

			// admin-created account with no password change yet → force change
			if (
				(user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
				!user.passwordResetAt
			) {
				toast.info("Please set a new password to continue.");
				navigate({
					to: "/auth/change-password",
					search: { email: user.email },
				});
				return;
			}

			toast.success("Login successful!");

			if (user.role === "ADMIN") {
				navigate({ to: "/admin" });
			} else {
				navigate({ to: "/dashboard" });
			}
		} catch (error: any) {
			setGlobalError(
				error?.data?.message ||
					error?.message ||
					"Failed to login. Please check your credentials.",
			);
			reset({ password: "" });
		}
	};

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

			{globalError && (
				<Alert
					variant="destructive"
					className="animate-in fade-in slide-in-from-top-2"
				>
					<HugeiconsIcon icon={Alert01Icon} />
					<AlertTitle>Authentication Failed</AlertTitle>
					<AlertDescription>{globalError}</AlertDescription>
				</Alert>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				{!isAdmin && (
					<div className="space-y-2 animate-in fade-in slide-in-from-top-2">
						<Label
							htmlFor={`${id}-companyId`}
							className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
						>
							Company Identifier
						</Label>
						<Input
							id={`${id}-companyId`}
							placeholder="e.g. Igihe Logistics"
							className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm"
							{...register("companyId")}
						/>
					</div>
				)}

				<div className="space-y-2">
					<Label
						htmlFor={`${id}-email`}
						className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
					>
						Email Address
					</Label>
					<Input
						id={`${id}-email`}
						type="email"
						placeholder="name@company.com"
						className="h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm"
						{...register("identifier")}
					/>
					{errors.identifier && (
						<p className="text-xs text-destructive">
							{errors.identifier.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label
							htmlFor={`${id}-password`}
							className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest"
						>
							Password
						</Label>
						<Link
							to="/auth/forgot-password"
							className="text-xs text-primary font-semibold hover:underline"
						>
							Forgot?
						</Link>
					</div>
					<div className="relative group/pass">
						<Input
							id={`${id}-password`}
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
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
					{errors.password && (
						<p className="text-xs text-destructive">
							{errors.password.message}
						</p>
					)}
				</div>

				<div className="flex items-center space-x-2.5 pt-1">
					<Checkbox
						id={`${id}-remember`}
						className="size-4 rounded-md border-border/60"
					/>
					<label
						htmlFor={`${id}-remember`}
						className="text-xs font-medium text-muted-foreground/60 cursor-pointer select-none"
					>
						Remember me
					</label>
				</div>

				<Button
					type="submit"
					size="xl"
					disabled={isSubmitting}
					className="w-full bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all group"
				>
					{isSubmitting ? "Signing in..." : "Sign In"}
					{!isSubmitting && (
						<HugeiconsIcon
							icon={ArrowRight01Icon}
							size={16}
							className="group-hover:translate-x-0.5 transition-transform"
						/>
					)}
				</Button>
			</form>

			<div className="pt-6 border-t border-border/5 space-y-4">
				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={() => setIsAdmin(!isAdmin)}
						className="text-xs font-semibold text-muted-foreground/40 hover:text-primary transition-all flex items-center gap-2 bg-muted/5 px-4 py-1.5 rounded-full"
					>
						<HugeiconsIcon
							icon={isAdmin ? UserCircle02Icon : Shield01Icon}
							size={14}
						/>
						Switch to {isAdmin ? "Employee" : "Admin"} Login
					</button>
				</div>

				<p className="text-xs font-medium text-muted-foreground/60 text-center">
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
