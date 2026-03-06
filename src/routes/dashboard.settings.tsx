import {
	Building03Icon,
	Coins01Icon,
	ComputerIcon,
	File02Icon,
	HierarchyIcon,
	Layout01Icon,
	Moon01Icon,
	MoreHorizontalIcon,
	Notification01Icon,
	Shield01Icon,
	Sun01Icon,
	TaskDaily01Icon,
	Tick01Icon,
	UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { ErrorComponent } from "@/components/error-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/settings")({
	loader: async () => await api.getTaxConfig(),
	errorComponent: ErrorComponent,
	pendingComponent: DashboardPending,
	component: SettingsPage,
});

function SettingsPage() {
	const taxConfig = Route.useLoaderData();
	const { theme, setTheme } = useTheme();
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => setIsSaving(false), 800);
	};

	return (
		<main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
			<DashboardHeader
				category="Administration"
				title="Settings"
				description="Global system configuration and access control"
			>
				<Button onClick={handleSave} disabled={isSaving}>
					{isSaving ? (
						<div className="size-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
					) : (
						<HugeiconsIcon icon={Tick01Icon} />
					)}
					{isSaving ? "Saving…" : "Save Changes"}
				</Button>
			</DashboardHeader>

			<div className="flex flex-col flex-1 overflow-hidden px-4 lg:px-6 pb-6 h-full">
				<Tabs
					defaultValue="general"
					orientation="vertical"
					className="flex flex-1 gap-0 border border-border/40 rounded-[20px] bg-card overflow-hidden h-full"
				>
					<div className="w-[240px] flex flex-col bg-muted/5 border-r border-border/5">
						<div className="px-6 py-6 border-b border-border/5">
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
								System Settings
							</p>
						</div>

						<TabsList className="flex flex-col h-auto w-full bg-transparent border-none p-2 space-y-0.5 items-stretch justify-start">
							<SettingsTabTrigger
								value="general"
								icon={Building03Icon}
								title="General"
							/>
							<SettingsTabTrigger
								value="appearance"
								icon={Layout01Icon}
								title="Appearance"
							/>
							<SettingsTabTrigger
								value="notifications"
								icon={Notification01Icon}
								title="Notifications"
							/>

							<div className="px-4 py-4 mt-2">
								<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
									Business Logic
								</p>
							</div>
							<SettingsTabTrigger
								value="departments"
								icon={HierarchyIcon}
								title="Departments"
							/>
							<SettingsTabTrigger
								value="job-titles"
								icon={TaskDaily01Icon}
								title="Job Titles"
							/>
							<SettingsTabTrigger
								value="tax"
								icon={Coins01Icon}
								title="Tax & Finance"
							/>
							<SettingsTabTrigger
								value="policy"
								icon={File02Icon}
								title="Policies"
							/>

							<div className="px-4 py-4 mt-2">
								<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
									Security & Team
								</p>
							</div>
							<SettingsTabTrigger
								value="security"
								icon={Shield01Icon}
								title="Security"
							/>
							<SettingsTabTrigger
								value="team"
								icon={UserGroupIcon}
								title="Admin Team"
							/>
						</TabsList>
					</div>

					<div className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar bg-background/40">
						<div className="max-w-4xl p-10 space-y-12">
							<TabsContent value="general" className="mt-0">
								<div className="space-y-6">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Company Profile
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Manage organizational identity and branding.
										</p>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<SettingsField
											label="Legal Entity Name"
											defaultValue="Igihe Logistics Inc."
										/>
										<SettingsField
											label="TIN Number"
											defaultValue="123-456-789"
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value="departments"
								className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300"
							>
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Managed Departments
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Configure organizational departments.
										</p>
									</div>
									<Button size="sm" className="h-8 font-bold gap-2">
										<HugeiconsIcon icon={HierarchyIcon} size={14} />
										Add Department
									</Button>
								</div>
								<div className="border border-border/5 rounded-2xl overflow-hidden bg-muted/5">
									<table className="w-full text-left text-sm">
										<thead className="bg-muted/10 border-b border-border/5">
											<tr>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40">
													Dept Name
												</th>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40">
													Status
												</th>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40 text-right">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border/5">
											{[
												"Operations",
												"Engineering",
												"Sales",
												"Human Resources",
											].map((dept) => (
												<tr key={dept} className="hover:bg-muted/5">
													<td className="px-6 py-4 font-semibold">{dept}</td>
													<td className="px-6 py-4">
														<Badge variant="success" showDot>
															Active
														</Badge>
													</td>
													<td className="px-6 py-4 text-right">
														<Button variant="ghost" size="icon-xs">
															<HugeiconsIcon
																icon={MoreHorizontalIcon}
																size={14}
															/>
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabsContent>

							<TabsContent
								value="job-titles"
								className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300"
							>
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Job Titles
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Define and assign employee designations.
										</p>
									</div>
									<Button size="sm" className="h-8 font-bold gap-2">
										<HugeiconsIcon icon={TaskDaily01Icon} size={14} />
										Add Title
									</Button>
								</div>
								<div className="border border-border/5 rounded-2xl overflow-hidden bg-muted/5">
									<table className="w-full text-left text-sm">
										<thead className="bg-muted/10 border-b border-border/5">
											<tr>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40">
													Title
												</th>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40">
													Dept
												</th>
												<th className="px-6 py-3 font-bold text-xs uppercase text-muted-foreground/40 text-right">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border/5">
											{[
												{ t: "Senior Developer", d: "Engineering" },
												{ t: "Fleet Manager", d: "Operations" },
												{ t: "Accountant", d: "Finance" },
											].map((j) => (
												<tr key={j.t} className="hover:bg-muted/5">
													<td className="px-6 py-4 font-semibold">{j.t}</td>
													<td className="px-6 py-4 text-muted-foreground/60">
														{j.d}
													</td>
													<td className="px-6 py-4 text-right">
														<Button variant="ghost" size="icon-xs">
															<HugeiconsIcon
																icon={MoreHorizontalIcon}
																size={14}
															/>
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabsContent>

							{/* Tax & Financials Content */}
							<TabsContent
								value="tax"
								className="mt-0 space-y-10 animate-in fade-in slide-in-from-right-1 duration-300"
							>
								<section className="space-y-6">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Tax Brackets (RRA)
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Income tax tiers for localized payroll calculation.
										</p>
									</div>
									<div className="border border-border/5 rounded-2xl overflow-hidden">
										<table className="w-full text-left text-sm">
											<thead className="bg-muted/10 border-b border-border/5">
												<tr>
													<th className="px-6 py-3 font-bold text-xs uppercase tracking-widest text-muted-foreground/40">
														Tier
													</th>
													<th className="px-6 py-3 font-bold text-xs uppercase tracking-widest text-muted-foreground/40">
														Range (USD)
													</th>
													<th className="px-6 py-3 font-bold text-xs uppercase tracking-widest text-muted-foreground/40">
														Rate
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border/5">
												{taxConfig.rraBrackets.map((b, i) => (
													<tr
														key={i}
														className="hover:bg-muted/5 transition-colors"
													>
														<td className="px-6 py-4 font-semibold text-foreground/70">
															Level {i + 1}
														</td>
														<td className="px-6 py-4 tabular-nums text-muted-foreground/60">
															{b.min.toLocaleString()} —{" "}
															{b.max ? b.max.toLocaleString() : "Above"}
														</td>
														<td className="px-6 py-4 font-bold text-primary">
															{b.rate}%
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</section>

								<section className="pt-10 border-t border-border/5 space-y-6">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Statutory Deductions
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Configure pension and healthcare contribution rates.
										</p>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<SettingsField
											label="RSSB Pension (Employee)"
											defaultValue={`${taxConfig.rssbEmployee}%`}
										/>
										<SettingsField
											label="RSSB Pension (Employer)"
											defaultValue={`${taxConfig.rssbEmployer}%`}
										/>
										<SettingsField
											label="Maternity Fund (Combined)"
											defaultValue="0.6%"
										/>
										<SettingsField
											label="CBHI Contribution"
											defaultValue={`${taxConfig.cbhiRate}%`}
										/>
									</div>
								</section>
							</TabsContent>

							{/* Policy Content */}
							<TabsContent
								value="policy"
								className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300"
							>
								<div className="space-y-1">
									<h3 className="text-lg font-semibold text-foreground/90">
										Compliance Policies
									</h3>
									<p className="text-sm font-medium text-muted-foreground/50">
										Define mandatory documents required for employee status.
									</p>
								</div>
								<div className="divide-y divide-border/5 border-y border-border/5">
									<ToggleRow
										icon={File02Icon}
										title="Onboarding Policy"
										description="Enforce CV, ID, Contract, Criminal Record, and Medical Report for all new hires."
										defaultChecked
									/>
									<ToggleRow
										icon={File02Icon}
										title="Offboarding Policy"
										description="Require Resignation Letter and Clearance for termination."
										defaultChecked
									/>
									<ToggleRow
										icon={Shield01Icon}
										title="Identity Verification"
										description="Force 2FA for all users with access to financial records."
										defaultChecked
									/>
								</div>
							</TabsContent>

							<TabsContent value="appearance" className="mt-0">
								<div className="space-y-1">
									<h3 className="text-lg font-semibold text-foreground/90">
										Interface Theme
									</h3>
									<p className="text-sm font-medium text-muted-foreground/50">
										Customize the dashboard aesthetic.
									</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
									<ThemeCard
										active={theme === "light"}
										onClick={() => setTheme("light")}
										icon={Sun01Icon}
										title="Light"
										description="Clean & sharp"
									/>
									<ThemeCard
										active={theme === "dark"}
										onClick={() => setTheme("dark")}
										icon={Moon01Icon}
										title="Dark"
										description="Ink Navy feel"
									/>
									<ThemeCard
										active={theme === "system"}
										onClick={() => setTheme("system")}
										icon={ComputerIcon}
										title="System"
										description="Device default"
									/>
								</div>
							</TabsContent>

							<TabsContent value="team" className="mt-0 space-y-8">
								<div className="flex items-end justify-between">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Administrator Team
										</h3>
										<p className="text-sm font-medium text-muted-foreground/50">
											Manage users with elevated system permissions.
										</p>
									</div>
									<Button
										size="sm"
										className="h-8 px-4 text-xs font-bold rounded-lg shadow-sm"
									>
										Invite Admin
									</Button>
								</div>
								<div className="divide-y divide-border/5 border-y border-border/5">
									<div className="flex items-center justify-between py-4">
										<div className="flex items-center gap-4">
											<UserAvatar
												src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&auto=format&fit=crop"
												name="Admin User"
												size="sm"
											/>
											<div>
												{" "}
												<p className="text-sm font-semibold text-foreground/90 leading-none">
													Admin User
												</p>
												<p className="text-xs font-medium text-muted-foreground/40 mt-1">
													admin@igihe.rw
												</p>
											</div>
										</div>
										<Badge
											variant="success"
											showDot
											className="h-5 px-2 text-xs uppercase font-bold border-none"
										>
											Active
										</Badge>
									</div>
								</div>
							</TabsContent>
						</div>
					</div>
				</Tabs>
			</div>
		</main>
	);
}

function SettingsTabTrigger({
	value,
	icon: Icon,
	title,
}: {
	value: string;
	icon: any;
	title: string;
}) {
	return (
		<TabsTrigger
			value={value}
			className="relative w-full flex items-center justify-start gap-3 px-3 py-2 rounded-md transition-all text-left data-active:bg-primary/10! data-active:text-primary! text-muted-foreground/60 hover:bg-muted/50 hover:text-foreground/80 group overflow-hidden border-none! shadow-none!"
		>
			<HugeiconsIcon
				icon={Icon}
				size={18}
				strokeWidth={2}
				className="group-data-active:text-primary! transition-colors"
			/>
			<span className="text-base font-bold tracking-tight">{title}</span>
		</TabsTrigger>
	);
}

function SettingsField({
	label,
	defaultValue,
	type = "text",
	prefix,
	icon: Icon,
	className,
}: {
	label: string;
	defaultValue: string;
	type?: string;
	prefix?: string;
	icon?: any;
	className?: string;
}) {
	return (
		<div className={cn("space-y-2", className)}>
			<Label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40">
				{label}
			</Label>
			<div className="relative group/input">
				{prefix && (
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/30">
						{prefix}
					</span>
				)}
				<Input
					defaultValue={defaultValue}
					type={type}
					className={cn(
						"h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-sm font-medium shadow-none",
						prefix ? "pl-16" : "pl-3",
					)}
				/>
				{Icon && (
					<HugeiconsIcon
						icon={Icon}
						size={14}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-hover/input:text-muted-foreground/40 transition-colors"
					/>
				)}
			</div>
		</div>
	);
}

function ToggleRow({
	icon: Icon,
	title,
	description,
	defaultChecked,
}: {
	icon: any;
	title: string;
	description: string;
	defaultChecked?: boolean;
}) {
	return (
		<div className="flex items-center justify-between py-5 hover:bg-muted/5 transition-all group px-2 -mx-2 rounded-xl">
			<div className="flex items-start gap-4">
				<div className="h-9 w-9 rounded-xl bg-muted/5 border border-border/5 flex items-center justify-center text-muted-foreground/20 group-hover:border-primary/20 group-hover:text-primary transition-all">
					<HugeiconsIcon icon={Icon} size={16} strokeWidth={1.5} />
				</div>
				<div className="space-y-1">
					<p className="text-[14px] font-semibold text-foreground/80">
						{title}
					</p>
					<p className="text-xs font-medium text-muted-foreground/40 max-w-md leading-relaxed">
						{description}
					</p>
				</div>
			</div>
			<Switch defaultChecked={defaultChecked} className="scale-[0.75]" />
		</div>
	);
}

function ThemeCard({
	active,
	onClick,
	icon: Icon,
	title,
	description,
}: {
	active: boolean;
	onClick: () => void;
	icon: any;
	title: string;
	description: string;
}) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"flex flex-col gap-4 p-5 rounded-2xl border text-left transition-all duration-300",
				active
					? "bg-primary/[0.03] border-primary/20 shadow-xs"
					: "bg-muted/5 border-border/5 hover:border-border/20",
			)}
		>
			<div
				className={cn(
					"size-9 rounded-xl flex items-center justify-center border transition-colors",
					active
						? "bg-primary text-white border-primary"
						: "bg-muted/10 text-muted-foreground/40 border-border/5",
				)}
			>
				<HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
			</div>
			<div>
				<p
					className={cn(
						"text-sm font-semibold leading-none",
						active ? "text-foreground" : "text-muted-foreground/70",
					)}
				>
					{title}
				</p>
				<p className="text-xs font-medium text-muted-foreground/40 mt-1.5">
					{description}
				</p>
			</div>
		</button>
	);
}
