import {
	Analytics01Icon,
	Calendar01Icon,
	Clock01Icon,
	Download01Icon,
	File02Icon,
	FilterIcon,
	MoreHorizontalIcon,
	UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const reports = [
	{
		id: "REP-001",
		name: "Q4 Attendance Summary",
		type: "Attendance",
		date: "Jan 12, 2024",
		status: "ready",
		size: "2.4 MB",
	},
	{
		id: "REP-002",
		name: "Annual Performance Review",
		type: "Performance",
		date: "Jan 10, 2024",
		status: "ready",
		size: "4.1 MB",
	},
	{
		id: "REP-003",
		name: "Monthly Payroll Export",
		type: "Financial",
		date: "Jan 05, 2024",
		status: "processing",
		size: "-",
	},
	{
		id: "REP-004",
		name: "Departmental Growth",
		type: "Analytics",
		date: "Dec 28, 2023",
		status: "ready",
		size: "1.8 MB",
	},
	{
		id: "REP-005",
		name: "Compliance Audit Log",
		type: "System",
		date: "Dec 20, 2023",
		status: "archived",
		size: "5.2 MB",
	},
];

export const Route = createFileRoute("/dashboard/reports")({
	errorComponent: ErrorComponent,
	component: ReportsPage,
});

function ReportsPage() {
	return (
		<main className="flex flex-1 flex-col gap-0 overflow-hidden">
			<DashboardHeader
				category="Intelligence"
				title="Reports"
				description="Generate and manage organizational data exports"
			>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="lg"
						className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
					>
						<HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={2} />
						Filter
					</Button>
					<Button size="lg" className="text-xs font-bold gap-2 capitalize">
						<HugeiconsIcon icon={Analytics01Icon} size={14} strokeWidth={2} />
						Generate New
					</Button>
				</div>
			</DashboardHeader>

			<div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
				{/* Quick Report Categories using StatCard */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard
						label="Attendance"
						value="12 Reports"
						icon={Calendar01Icon}
						variant="primary"
						sub="Last 30 days"
					/>
					<StatCard
						label="Financial"
						value="8 Reports"
						icon={Clock01Icon}
						variant="success"
						sub="Audit ready"
					/>
					<StatCard
						label="Performance"
						value="24 Reports"
						icon={UserGroupIcon}
						variant="info"
						sub="Quarterly reviews"
					/>
					<StatCard
						label="System"
						value="5 Reports"
						icon={Analytics01Icon}
						variant="accent"
						sub="Audit logs"
					/>
				</section>

				{/* Reports Table */}
				<section>
					<Frame className="group/frame">
						<FramePanel className="p-0 overflow-hidden bg-card">
							<FrameHeader>
								<div>
									<FrameTitle>Recent Generated Reports</FrameTitle>
									<FrameDescription>
										Download or manage your most recent data exports
									</FrameDescription>
								</div>
							</FrameHeader>
							<FrameContent className="p-0">
								<Table>
									<TableHeader className="bg-muted/10">
										<TableRow className="hover:bg-transparent border-border/5">
											<TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest pl-6">
												Report Name
											</TableHead>
											<TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
												Type
											</TableHead>
											<TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
												Date
											</TableHead>
											<TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
												Status
											</TableHead>
											<TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">
												Actions
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{reports.map((report) => (
											<TableRow
												key={report.id}
												className="border-border/5 hover:bg-muted/5 transition-colors group"
											>
												<TableCell className="pl-6 py-3">
													<div className="flex items-center gap-3">
														<div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
															<HugeiconsIcon icon={File02Icon} size={16} />
														</div>
														<div>
															<p className="text-sm font-semibold text-foreground/90 leading-none">
																{report.name}
															</p>
															<p className="text-xs font-bold text-muted-foreground/30 tabular-nums uppercase tracking-tight mt-1">
																{report.id}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell className="px-2">
													<span className="text-xs font-medium text-foreground/60">
														{report.type}
													</span>
												</TableCell>
												<TableCell className="px-2">
													<span className="text-xs font-bold text-muted-foreground/40 tabular-nums">
														{report.date}
													</span>
												</TableCell>
												<TableCell className="px-2">
													<Badge
														variant={
															report.status === "ready"
																? "success"
																: report.status === "processing"
																	? "warning"
																	: "muted"
														}
														showDot
													>
														{report.status}
													</Badge>
												</TableCell>
												<TableCell className="text-right pr-6">
													<div className="flex items-center justify-end gap-1">
														{report.status === "ready" && (
															<Button
																variant="outline"
																size="icon-sm"
																className="rounded-lg hover:bg-primary/5 hover:text-primary"
															>
																<HugeiconsIcon
																	icon={Download01Icon}
																	className="size-4"
																/>
															</Button>
														)}
														<Button
															variant="outline"
															size="icon-sm"
															className="rounded-lg opacity-40 group-hover:opacity-100 transition-opacity"
														>
															<HugeiconsIcon
																icon={MoreHorizontalIcon}
																className="size-4"
															/>
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</FrameContent>
							<FrameFooter>
								<p className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
									Showing latest 5 of 48 reports
								</p>
							</FrameFooter>
						</FramePanel>
					</Frame>
				</section>
			</div>
		</main>
	);
}
