import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	BookOpen01Icon,
	Briefcase02Icon,
	Building03Icon,
	CheckmarkCircle01Icon,
	DashboardSquare01Icon,
	GlobalIcon,
	UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
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

export const Route = createFileRoute("/docs")({
	component: DocsPage,
});

function DocsPage() {
	const navigate = useNavigate();

	const sections = [
		{
			category: "Platform Administration",
			icon: GlobalIcon,
			modules: [
				{
					title: "System Admin Workspace",
					desc: "Global view for platform owners managing multiple companies (companies).",
					features: [
						"Company Database: View and manage all registered companies.",
						"Managed Provisioning: Administrator-led wizard for creating new companies and lead admins.",
						"Security Audits: Immutable system-level logs tracking critical actions.",
					],
					links: [
						{ label: "Admin Console", to: "/admin" },
						{ label: "Tenants List", to: "/admin/companies" },
						{ label: "Provision Tenant", to: "/admin/companies/register" },
						{ label: "Audit Logs", to: "/admin/logs" },
						{ label: "Platform Settings", to: "/admin/settings" },
					],
				},
				{
					title: "Authentication & Security",
					desc: "Comprehensive identity management for all platform users.",
					features: [
						"Secure Gateway: Role-based access control (RBAC) for different tiers.",
						"Restricted Access: Self-registration disabled to enforce managed onboarding.",
					],
					links: [
						{ label: "Login Portal", to: "/auth/login" },
						{ label: "Managed Provisioning Info", to: "/auth/login" },
						{ label: "Forgot Password", to: "/auth/forgot-password" },
					],
				},
			],
		},
		{
			category: "Organization & Structure",
			icon: Building03Icon,
			modules: [
				{
					title: "Department Management",
					desc: "Define the organizational structure and hierarchies within a company.",
					features: [
						"Department CRUD: Manage Engineering, Sales, and other units.",
						"Metrics at a Glance: View active employee counts directly on cards.",
						"Job Titling: Map specific roles to designated departments.",
					],
					links: [{ label: "Department Hub", to: "/dashboard/departments" }],
				},
			],
		},
		{
			category: "Employee Lifecycle",
			icon: UserMultiple02Icon,
			modules: [
				{
					title: "Onboarding Automation",
					desc: "A frictionless 3-step wizard to register and induct new hires.",
					features: [
						"Personal Data: Safely capture PII and identification.",
						"Compliance Docs: Enforce collection of mandatory files.",
					],
					links: [
						{ label: "Directory", to: "/dashboard/employees" },
						{ label: "Launch Onboarding", to: "/dashboard/employees/onboard" },
					],
				},
				{
					title: "Offboarding & Resignation",
					desc: "Formalize the exit process ensuring full compliance.",
					features: [
						"Resignation Logging: Record notice periods and exit reasons.",
						"State Updates: Automatically switches employee state to 'Resigned'.",
					],
					links: [
						{ label: "Process Resignation", to: "/dashboard/employees/resign" },
					],
				},
			],
		},
		{
			category: "Recruitment & ATS",
			icon: Briefcase02Icon,
			modules: [
				{
					title: "Applicant Tracking System",
					desc: "End-to-end recruitment pipelines to source and hire top talent.",
					features: [
						"Job Requisitions: Create and publish new Job Openings.",
						"External Apply: Branded application forms for candidates.",
						"Kanban Pipelines: Move candidates through custom stages.",
					],
					links: [
						{ label: "Recruitment HQ", to: "/dashboard/recruitment" },
						{ label: "Public Apply Form", to: "/apply/JOB-101" },
					],
				},
			],
		},
		{
			category: "Finance & Operations",
			icon: DashboardSquare01Icon,
			modules: [
				{
					title: "Statutory Payroll Engine",
					desc: "Compliant payroll processing honoring local tax laws.",
					features: [
						"Tax Calculations: Hardcoded RRA brackets (0% - 30%).",
						"Guided Execution: 6-step wizard taking payroll from draft to bank transfer.",
					],
					links: [{ label: "Payroll Dashboard", to: "/dashboard/payroll" }],
				},
				{
					title: "Leave & Performance",
					desc: "Continuous evaluation and absence tracking modules.",
					features: [
						"Leave Vault: Automated accruals and request processing.",
						"Balanced Scorecard: Target tracking for periodic reviews.",
					],
					links: [
						{ label: "Leaves Hub", to: "/dashboard/leaves" },
						{ label: "Appraisals", to: "/dashboard/performance" },
					],
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-muted/20">
			{/* Top Navigation */}
			<nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<Link to="/" className="flex items-center gap-2">
						<Logo className="size-7" />
						<span className="text-sm font-bold tracking-tight uppercase">
							HRMS Docs
						</span>
					</Link>
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => window.history.back()}
						>
							<HugeiconsIcon icon={ArrowLeft01Icon} />
							Back
						</Button>
						<Button size="sm" onClick={() => navigate({ to: "/dashboard" })}>
							Enter System
							<HugeiconsIcon icon={ArrowRight01Icon} />
						</Button>
					</div>
				</div>
			</nav>

			<main className="max-w-6xl mx-auto px-6 py-12">
				<header className="mb-16 space-y-4">
					<div className="flex items-center gap-2 text-primary">
						<HugeiconsIcon icon={BookOpen01Icon} size={18} />
						<span className="text-[10px] font-black uppercase tracking-[0.25em]">
							System Architecture
						</span>
					</div>
					<h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">
						Infrastructure & Modules
					</h1>
					<p className="text-muted-foreground text-sm max-w-2xl leading-relaxed font-medium">
						A comprehensive guide to the architecture, workflows, and
						strict-typed infrastructure powering the HRMS platform.
					</p>
				</header>

				<div className="space-y-16">
					{sections.map((section, idx) => (
						<div
							key={idx}
							className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
							style={{ animationDelay: `${idx * 100}ms` }}
						>
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
									<HugeiconsIcon icon={section.icon} size={20} />
								</div>
								<h2 className="text-xl font-bold tracking-tight text-foreground/90 uppercase">
									{section.category}
								</h2>
								<div className="h-px flex-1 bg-border/5 ml-4" />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{section.modules.map((m, i) => (
									<Frame key={i} className="h-full group/module">
										<FramePanel className="bg-card flex flex-col h-full border-border/40 hover:border-primary/20 transition-all duration-500">
											<FrameHeader className="border-b-0 px-8 pt-8">
												<div>
													<FrameTitle className="text-primary text-base font-bold normal-case">
														{m.title}
													</FrameTitle>
													<FrameDescription className="text-xs font-semibold line-clamp-1 mt-1 opacity-60 uppercase tracking-widest">
														{m.desc}
													</FrameDescription>
												</div>
											</FrameHeader>
											<FrameContent className="flex-1 space-y-8 px-8 py-6">
												<p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
													{m.desc}
												</p>

												<div className="space-y-4">
													<h4 className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">
														Core Capabilities
													</h4>
													<ul className="space-y-3">
														{m.features.map((f, k) => (
															<li
																key={k}
																className="text-xs font-semibold text-foreground/70 flex items-start gap-3 leading-relaxed"
															>
																<div className="size-4 rounded-full bg-success/10 flex items-center justify-center mt-0.5 shrink-0">
																	<HugeiconsIcon
																		icon={CheckmarkCircle01Icon}
																		size={10}
																		className="text-success"
																	/>
																</div>
																{f}
															</li>
														))}
													</ul>
												</div>
											</FrameContent>
											<FrameFooter className="flex flex-wrap gap-2 p-6 bg-muted/5 border-t border-border/5">
												{m.links.map((l, j) => (
													<Button
														key={j}
														variant="outline"
														size="xs"
														onClick={() => navigate({ to: l.to as any })}
													>
														{l.label}
														<HugeiconsIcon icon={ArrowRight01Icon} />
													</Button>
												))}
											</FrameFooter>
										</FramePanel>
									</Frame>
								))}
							</div>
						</div>
					))}
				</div>
			</main>

			<footer className="py-20 border-t border-border/5 bg-background/50">
				<div className="max-w-6xl mx-auto px-6 text-center space-y-8">
					<div className="flex items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
						<Logo className="size-6 grayscale" />
						<span className="text-[10px] font-black uppercase tracking-[0.5em]">
							HRMS Infrastructure
						</span>
					</div>
					<p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.25em]">
						&copy; 2024 • Engineered for Operational Excellence • All Rights
						Reserved
					</p>
				</div>
			</footer>
		</div>
	);
}
