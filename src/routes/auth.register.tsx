import {
	ArrowRight01Icon,
	InformationCircleIcon,
	Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/register")({
	component: RegisterPage,
});

function RegisterPage() {
	return (
		<div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 py-4">
			<div className="text-center space-y-4">
				<div className="size-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-sm rotate-3">
					<HugeiconsIcon icon={Shield01Icon} size={40} />
				</div>
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter text-foreground/90 uppercase">
						Managed Provisioning
					</h1>
					<p className="text-[15px] font-medium text-muted-foreground/50 leading-relaxed px-4">
						HRMS organization accounts are restricted to managed provisioning by
						system administrators.
					</p>
				</div>
			</div>

			<div className="p-6 rounded-2xl bg-muted/5 border border-border/40 space-y-4">
				<div className="flex items-start gap-3">
					<div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
						<HugeiconsIcon icon={InformationCircleIcon} size={14} />
					</div>
					<div>
						<p className="text-sm font-bold text-foreground/80">
							Account Registration
						</p>
						<p className="text-xs text-muted-foreground font-medium leading-relaxed mt-1">
							To join the HRMS platform as a new organization, please coordinate
							with your system supervisor or regional operations manager.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<Button
					render={<Link to="/auth/login" />}
					size="xl"
					className="w-full bg-primary text-primary-foreground font-bold shadow-sm rounded-xl group"
				>
					Sign in to your account
					<HugeiconsIcon
						icon={ArrowRight01Icon}
						size={18}
						className="ml-2 group-hover:translate-x-1 transition-transform"
					/>
				</Button>

				<p className="text-[10px] text-center text-muted-foreground/40 font-bold uppercase tracking-widest px-8">
					Self-registration is currently disabled for security and compliance
					audits.
				</p>
			</div>

			<div className="pt-6 border-t border-border/5 text-center">
				<p className="text-xs font-medium text-muted-foreground/60">
					Forgot your credentials?{" "}
					<Link
						to="/auth/forgot-password"
						className="text-primary font-bold hover:underline"
					>
						Reset Password
					</Link>
				</p>
			</div>
		</div>
	);
}
