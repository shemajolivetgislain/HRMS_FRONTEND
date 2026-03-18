import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInitiateResetPasswordMutation } from "@/lib/redux/api";

export const Route = createFileRoute("/auth/forgot-password")({
	component: ForgotPasswordPage,
});

const forgotPasswordSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
	const [submitted, setSubmitted] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);
	const [initiateResetPassword] = useInitiateResetPasswordMutation();
	const navigate = useNavigate();
	const id = React.useId();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
	});

	const emailValue = watch("email");

	const onSubmit = async (data: ForgotPasswordValues) => {
		setGlobalError(null);
		try {
			await initiateResetPassword({
				email: data.email.trim(),
			}).unwrap();

			toast.success("Security code sent to your email.");
			navigate({
				to: "/auth/reset-password",
				search: { email: data.email.trim() },
			});
		} catch (error: any) {
			setGlobalError(
				error?.data?.message ||
					error?.message ||
					"Something went wrong. Please try again.",
			);
		}
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
							<p className="text-sm font-semibold text-foreground/80 leading-none">
								Link Sent
							</p>
							<p className="text-xs font-medium text-muted-foreground/50 mt-1.5 leading-relaxed">
								Reset link sent to{" "}
								<span className="text-foreground/70 font-bold">
									{emailValue}
								</span>
							</p>
						</div>
					</div>

					<div className="p-5 bg-muted/5 rounded-xl border border-border/40 space-y-3">
						<p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/40">
							Next Steps
						</p>
						<ul className="space-y-2.5">
							{[
								"Check your email for the reset link",
								"Click the link to create a new password",
								"Sign in with your new credentials",
							].map((step, i) => (
								<li key={step} className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-xs font-bold text-primary">
										{i + 1}
									</span>
									<span className="text-xs font-medium text-muted-foreground/60 leading-tight">
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
								reset({ email: "" });
							}}
							variant="outline"
							size="xl"
							className="w-full font-bold text-muted-foreground/60 hover:text-foreground"
						>
							Use different email
						</Button>

						<Button
							variant="ghost"
							size="lg"
							className="w-full font-bold text-muted-foreground/40 hover:text-foreground"
							render={<Link to="/auth/login" />}
						>
							<HugeiconsIcon
								icon={ArrowLeft01Icon}
								size={14}
								className="mr-2"
							/>
							Back to login
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
					Enter your email to receive a recovery link.
				</p>
			</div>

			{globalError && (
				<Alert
					variant="destructive"
					className="animate-in fade-in slide-in-from-top-2"
				>
					<HugeiconsIcon icon={Alert01Icon} />
					<AlertTitle>Request Failed</AlertTitle>
					<AlertDescription>{globalError}</AlertDescription>
				</Alert>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div className="space-y-2">
					<Label
						htmlFor={`${id}-email`}
						className="text-xs font-semibold text-muted-foreground/60 capitalize"
					>
						Email Address
					</Label>
					<Input
						id={`${id}-email`}
						type="email"
						placeholder="admin@example.com"
						{...register("email")}
						className={`h-10 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all pl-3 shadow-none text-sm ${
							errors.email ? "border-destructive/50 ring-destructive/20" : ""
						}`}
					/>
					{errors.email && (
						<p className="text-xs font-medium text-destructive mt-1">
							{errors.email.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					disabled={!emailValue || isSubmitting}
					size="xl"
					className="w-full bg-primary text-primary-foreground font-bold rounded-lg shadow-sm hover:opacity-95 transition-all group"
				>
					{isSubmitting ? "Sending…" : "Send Reset Link"}
					{!isSubmitting && (
						<HugeiconsIcon
							icon={ArrowRight01Icon}
							size={16}
							className=" group-hover:translate-x-0.5 transition-transform"
						/>
					)}
				</Button>

				<div className="pt-6 border-t border-border/5">
					<Button
						type="button"
						variant="outline"
						size="xl"
						className="w-full font-bold text-muted-foreground/60 hover:text-foreground"
						render={<Link to="/auth/login" />}
					>
						Sign In
					</Button>
				</div>
			</form>
		</div>
	);
}
