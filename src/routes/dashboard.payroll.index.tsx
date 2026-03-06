import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Clock01Icon,
	Download01Icon,
	InformationCircleIcon,
	Tick01Icon,
	UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Frame,
	FrameContent,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
import { api } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/payroll/")({
	loader: async () => {
		const [history, activeRun] = await Promise.all([
			api.getPayroll(),
			api.getActivePayrollRun(),
		]);
		return { history, activeRun };
	},
	pendingComponent: DashboardPending,
	errorComponent: ErrorComponent,
	component: PayrollPage,
});

const steps = [
	{ id: 1, label: "Attendance", desc: "Verify working days" },
	{ id: 2, label: "HR Verify", desc: "Policy check" },
	{ id: 3, label: "Mgmt Approv.", desc: "Review anomalies" },
	{ id: 4, label: "Salary Sheet", desc: "Tax & Net Calc" },
	{ id: 5, label: "Final Approv.", desc: "Board sign-off" },
	{ id: 6, label: "Payment", desc: "Execute bank transfer" },
];

function PayrollPage() {
	const { activeRun } = Route.useLoaderData();
	const [currentStep, setCurrentStep] = useState(activeRun.currentStep);

	return (
		<main className="flex flex-1 flex-col gap-0 overflow-hidden">
			<DashboardHeader
				category="Financials"
				title="Payroll Engine"
				description="Localized tax compliance and disbursement management"
			>
				<div className="flex gap-2">
					<Button variant="outline">
						<HugeiconsIcon icon={Download01Icon} />
						History
					</Button>
					<Button className="bg-success hover:bg-success/90">
						<HugeiconsIcon icon={Tick01Icon} />
						Complete Cycle
					</Button>
				</div>
			</DashboardHeader>

			<div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
				{/* Active Wizard */}
				<section>
					<Frame>
						<FramePanel className="p-0 overflow-hidden bg-card">
							<FrameHeader className="border-b border-border/5">
								<div className="flex items-center gap-3">
									<div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
										<HugeiconsIcon icon={Clock01Icon} size={20} />
									</div>
									<div>
										<FrameTitle>
											Active Run: {activeRun.month} {activeRun.year}
										</FrameTitle>
										<FrameDescription>
											Following the 6-step compliance workflow
										</FrameDescription>
									</div>
								</div>
								<Badge
									variant="warning"
									className="h-6 px-3 rounded-md font-bold text-xs uppercase"
								>
									Step {currentStep} of 6
								</Badge>
							</FrameHeader>

							<div className="px-10 py-12 border-b border-border/5 bg-muted/[0.02]">
								<div className="flex items-center justify-between relative max-w-4xl mx-auto">
									<div className="absolute left-0 right-0 top-5 -translate-y-1/2 h-0.5 bg-border/10 -z-0" />
									{steps.map((s) => (
										<div
											key={s.id}
											className="relative z-10 flex flex-col items-center gap-4"
										>
											<div
												className={cn(
													"size-10 rounded-full flex items-center justify-center transition-all duration-500",
													currentStep === s.id
														? "bg-primary text-white scale-110 shadow-lg shadow-primary/20 ring-4 ring-primary/20 border-2 border-white"
														: currentStep > s.id
															? "bg-success text-white"
															: "bg-muted text-muted-foreground/40 border border-border/5",
												)}
											>
												{currentStep > s.id ? (
													<HugeiconsIcon
														icon={Tick01Icon}
														size={16}
														strokeWidth={3}
													/>
												) : (
													<span className="text-xs font-bold">{s.id}</span>
												)}
											</div>
											<div className="text-center">
												<p
													className={cn(
														"text-xs font-bold uppercase tracking-widest",
														currentStep === s.id
															? "text-primary"
															: "text-muted-foreground/30",
													)}
												>
													{s.label}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<FrameContent className="p-16 text-center max-w-2xl mx-auto space-y-8">
								<div className="space-y-3">
									<h3 className="text-3xl font-semibold tracking-tight text-foreground/90">
										{steps[currentStep - 1].label}
									</h3>
									<p className="text-[15px] text-muted-foreground/50 leading-relaxed font-medium">
										{steps[currentStep - 1].desc}. Ensure all department
										attendance sheets are submitted and verified before
										proceeding to HR validation.
									</p>
								</div>

								<div className="flex items-center justify-center gap-4 pt-6">
									<Button
										variant="ghost"
										size="xl"
										disabled={currentStep === 1}
										onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
									>
										<HugeiconsIcon icon={ArrowLeft01Icon} />
										Back
									</Button>
									<Button
										size="xl"
										disabled={currentStep === 6}
										onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
									>
										Next Step
										<HugeiconsIcon icon={ArrowRight01Icon} />
									</Button>
								</div>
							</FrameContent>

							<FrameFooter className="bg-primary/[0.02] border-t border-primary/5 px-8 py-4 flex items-center justify-between">
								<div className="flex items-center gap-6">
									<div className="flex flex-col">
										<span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest leading-none mb-1.5">
											Estimated Gross
										</span>
										<span className="text-[14px] font-bold text-foreground/80 tabular-nums">
											$450,000.00
										</span>
									</div>
									<div className="flex flex-col">
										<span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest leading-none mb-1.5">
											Tax & Deductions
										</span>
										<span className="text-[14px] font-bold text-destructive/70 tabular-nums">
											-$125,000.00
										</span>
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="text-xs font-bold text-primary gap-2"
								>
									<HugeiconsIcon icon={InformationCircleIcon} size={14} />
									View Logic
								</Button>
							</FrameFooter>
						</FramePanel>
					</Frame>
				</section>

				{/* Info Grid */}
				<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Frame>
						<FramePanel className="p-6 bg-card space-y-4">
							<div className="flex items-center gap-3">
								<div className="size-8 rounded-lg bg-info/10 flex items-center justify-center text-info">
									<HugeiconsIcon icon={InformationCircleIcon} size={16} />
								</div>
								<h4 className="font-semibold text-foreground/90">
									Compliance Note
								</h4>
							</div>
							<p className="text-sm text-muted-foreground/70 leading-relaxed italic">
								“Statutory deductions are automatically calculated based on the
								RRA 2024 brackets and RSSB pension contributions (6% Employee,
								8% Employer).”
							</p>
						</FramePanel>
					</Frame>

					<Frame>
						<FramePanel className="p-6 bg-card space-y-4">
							<div className="flex items-center gap-3">
								<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
									<HugeiconsIcon icon={UserGroupIcon} size={16} />
								</div>
								<h4 className="font-semibold text-foreground/90">
									Departmental Status
								</h4>
							</div>
							<div className="flex items-center gap-4 pt-1">
								<div className="flex -space-x-2">
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className="size-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground/60"
										>
											DP
										</div>
									))}
								</div>
								<p className="text-xs font-medium text-muted-foreground/60">
									8 of 12 departments have submitted attendance.
								</p>
							</div>
						</FramePanel>
					</Frame>
				</section>
			</div>
		</main>
	);
}
