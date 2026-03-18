import {
	ArrowRight01Icon,
	Briefcase01Icon,
	Copy01Icon,
	Delete02Icon,
	Download01Icon,
	FilterIcon,
	JobShareIcon,
	Location01Icon,
	Mail01Icon,
	MoreHorizontalIcon,
	PlusSignCircleIcon,
	Search01Icon,
	Sorting05Icon,
	UserAdd01Icon,
	UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { StatCard } from "@/components/dashboard/stat-card";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Frame,
	FrameContent,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useGetApplicantsQuery } from "@/lib/redux/api/applicant";
import { useGetCompanyDepartmentsQuery } from "@/lib/redux/api/department";
import {
	useCreateJobTitleMutation,
	useGetJobTitlesQuery,
} from "@/lib/redux/api/job-title";
import type { RootState } from "@/lib/redux/store";

export const Route = createFileRoute("/dashboard/recruitment/")({
	component: RecruitmentPage,
});

function RecruitmentPage() {
	const activeCompanyId = useSelector(
		(state: RootState) => state.auth.activeCompanyId,
	);
	const {
		data: jobTitlesData,
		isLoading: isLoadingJobs,
		isError: isErrorJobs,
	} = useGetJobTitlesQuery(undefined);
	const { data: applicantsData } = useGetApplicantsQuery(undefined);
	const { data: departmentsData } = useGetCompanyDepartmentsQuery(
		{ companyId: activeCompanyId || "" },
		{ skip: !activeCompanyId },
	);
	const [createJobTitle] = useCreateJobTitleMutation();

	const [searchTerm, setSearchTerm] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newJob, setNewJob] = useState({
		name: "",
		departmentId: "",
		description: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (isLoadingJobs) return <DashboardPending />;
	if (isErrorJobs) return <div>Error loading job titles.</div>;

	const jobs = jobTitlesData?.items || [];
	const applicants = applicantsData?.items || [];
	const departments = departmentsData?.items || [];

	const filteredJobs = jobs.filter(
		(job) =>
			job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.description?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handlePublishJob = async () => {
		if (!newJob.name.trim() || !newJob.departmentId || !activeCompanyId) {
			toast.error("Role name and department are required");
			return;
		}
		setIsSubmitting(true);
		try {
			await createJobTitle({
				name: newJob.name.trim(),
				departmentId: newJob.departmentId,
				companyId: activeCompanyId,
				description: newJob.description?.trim() || "",
			}).unwrap();
			toast.success("job position published");
			setIsDialogOpen(false);
			setNewJob({
				name: "",
				departmentId: "",
				description: "",
			});
		} catch (_err) {
			toast.error("failed to publish job opening");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCopyLink = (jobId: string) => {
		const url = `${window.location.origin}/apply/${jobId}`;
		navigator.clipboard.writeText(url);
		toast.success("Application link copied to clipboard");
	};

	return (
		<main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
			<DashboardHeader
				category="talent"
				title="Recruitment"
				description="source and manage hiring pipelines"
			>
				<Button variant="outline">
					<HugeiconsIcon icon={Download01Icon} />
					Report
				</Button>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger
						render={
							<Button>
								<HugeiconsIcon icon={PlusSignCircleIcon} />
								Create
							</Button>
						}
					/>
					<DialogContent className="sm:max-w-[600px] rounded-2xl">
						<DialogHeader>
							<DialogTitle>publish new role</DialogTitle>
							<DialogDescription>
								define a new job opening for the global recruitment portal.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-6 py-6">
							<div className="grid grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
									>
										name
									</Label>
									<Input
										id="name"
										placeholder="e.g. Product Manager"
										className="h-10 bg-muted/5 border-border/40 focus:bg-background"
										value={newJob.name}
										onChange={(e) =>
											setNewJob({ ...newJob, name: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="dept"
										className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
									>
										department
									</Label>
									<Select
										value={newJob.departmentId}
										onValueChange={(val) =>
											setNewJob({ ...newJob, departmentId: val || "" })
										}
									>
										<SelectTrigger
											id="dept"
											className="h-10 bg-muted/5 border-border/40 focus:bg-background"
										>
											<SelectValue placeholder="select unit" />
										</SelectTrigger>
										<SelectContent>
											{departments.map((dept) => (
												<SelectItem key={dept.id} value={dept.id}>
													{dept.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="description"
									className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
								>
									description (optional)
								</Label>
								<Textarea
									id="description"
									placeholder="responsibilities and requirements..."
									className="min-h-[120px] bg-muted/5 border-border/40 focus:bg-background resize-none"
									value={newJob.description}
									onChange={(e) =>
										setNewJob({ ...newJob, description: e.target.value })
									}
								/>
							</div>
						</div>
						<DialogFooter className="bg-muted/5 -mx-6 -mb-6 p-6 rounded-b-2xl border-t border-border/5">
							<Button
								variant="ghost"
								onClick={() => setIsDialogOpen(false)}
								className="font-bold text-xs uppercase tracking-widest"
							>
								cancel
							</Button>
							<Button
								type="submit"
								onClick={handlePublishJob}
								disabled={isSubmitting}
								className="font-bold px-8 h-10 rounded-xl"
							>
								{isSubmitting ? "Publishing..." : "Publish Role"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DashboardHeader>

			<div className="flex flex-col xl:flex-row gap-8 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
				<div className="flex-1 min-w-0 space-y-8">
					<section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<StatCard
							label="Active Openings"
							value={jobs.length}
							icon={JobShareIcon}
							variant="primary"
							sub="Roles published"
						/>
						<StatCard
							label="Total Applicants"
							value={applicants.length.toString()}
							icon={UserMultiple02Icon}
							variant="info"
							sub="Pipeline across roles"
						/>
						<StatCard
							label="Time to Hire"
							value="18d"
							icon={Sorting05Icon}
							variant="success"
							sub="Average duration"
						/>
					</section>

					<section>
						<Frame className="group/frame">
							<FramePanel className="p-0 overflow-hidden bg-card border-border/40">
								<FrameHeader className="border-b-0 pb-2 px-8 pt-8">
									<div>
										<FrameTitle className="text-lg font-bold">
											Active Pipelines
										</FrameTitle>
										<FrameDescription className="text-xs font-medium">
											Monitor and manage active hiring cycles
										</FrameDescription>
									</div>
								</FrameHeader>

								<div className="px-8 pb-6 pt-4 flex flex-col xl:flex-row items-center justify-between gap-4 border-b border-border/5">
									<div className="relative flex-1 w-full max-xl">
										<HugeiconsIcon
											icon={Search01Icon}
											className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40"
											strokeWidth={2}
										/>
										<Input
											placeholder="Search roles or units…"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="pl-9 h-10 rounded-xl border-border/40 bg-muted/5 focus:bg-background transition-all text-sm"
										/>
									</div>
									<Button variant="outline" size="sm">
										<HugeiconsIcon icon={FilterIcon} />
										Refine
									</Button>
								</div>

								<FrameContent className="p-0">
									<Table>
										<TableHeader className="bg-muted/5">
											<TableRow className="hover:bg-transparent border-border/5">
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-8 py-3 w-[300px]">
													Specification
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
													Density
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
													Status
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3 text-right pr-8">
													Management
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredJobs.map((job) => (
												<TableRow
													key={job.id}
													className="border-border/5 hover:bg-muted/5 transition-colors group"
												>
													<TableCell className="pl-8 py-5">
														<div>
															<p className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors leading-none">
																{job.name}
															</p>
															<div className="flex items-center gap-3 mt-2 text-xs font-semibold text-muted-foreground/40 uppercase tracking-widest">
																<span className="flex items-center gap-1.5">
																	<HugeiconsIcon
																		icon={Briefcase01Icon}
																		size={12}
																	/>
																	{departments.find(
																		(d) => d.id === job.departmentId,
																	)?.name || "N/A"}
																</span>
																<span>•</span>
																<span className="flex items-center gap-1.5">
																	<HugeiconsIcon
																		icon={Location01Icon}
																		size={12}
																	/>
																	Remote
																</span>
															</div>
														</div>
													</TableCell>
													<TableCell className="px-4">
														<div className="flex items-center gap-3">
															<div className="flex items-center justify-center h-8 px-2 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tabular-nums border border-primary/10">
																{job.status === "active" ? "Open" : "Closed"}
															</div>
															<span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">
																status
															</span>
														</div>
													</TableCell>
													<TableCell className="px-4">
														<Badge
															variant={
																job.status === "active" ? "success" : "muted"
															}
															showDot
															className="font-bold text-[10px] uppercase tracking-widest h-6"
														>
															{job.status}
														</Badge>
													</TableCell>
													<TableCell className="text-right pr-8">
														<div className="flex items-center justify-end gap-2">
															<Button
																variant="ghost"
																size="sm"
																render={
																	<Link
																		to="/dashboard/recruitment/$id"
																		params={{ id: job.id }}
																	/>
																}
															>
																Details
															</Button>
															<DropdownMenu>
																<DropdownMenuTrigger
																	render={
																		<Button variant="ghost" size="icon-sm">
																			<HugeiconsIcon
																				icon={MoreHorizontalIcon}
																			/>
																		</Button>
																	}
																/>{" "}
																<DropdownMenuContent
																	align="end"
																	className="w-52 rounded-2xl border-border/40 shadow-2xl p-2"
																>
																	<DropdownMenuItem
																		className="rounded-xl py-1.5 font-semibold text-sm"
																		onClick={() => handleCopyLink(job.id)}
																	>
																		<HugeiconsIcon
																			icon={Copy01Icon}
																			className="size-4 mr-3 text-muted-foreground/60"
																		/>
																		<span>Copy Job Link</span>
																	</DropdownMenuItem>
																	<DropdownMenuItem className="rounded-xl py-1.5 font-semibold text-sm">
																		<HugeiconsIcon
																			icon={UserAdd01Icon}
																			className="size-4 mr-3 text-muted-foreground/60"
																		/>
																		<span>Add Candidate</span>
																	</DropdownMenuItem>
																	<DropdownMenuItem className="rounded-xl py-1.5 font-semibold text-sm">
																		<HugeiconsIcon
																			icon={Mail01Icon}
																			className="size-4 mr-3 text-muted-foreground/60"
																		/>
																		<span>Broadcast</span>
																	</DropdownMenuItem>
																	<DropdownMenuSeparator className="bg-border/5 my-1" />
																	<AlertDialog>
																		<AlertDialogTrigger
																			render={
																				<DropdownMenuItem
																					onSelect={(e) => e.preventDefault()}
																					className="rounded-xl py-1.5 font-semibold text-sm text-destructive focus:bg-destructive/5"
																				>
																					<HugeiconsIcon
																						icon={Delete02Icon}
																						className="size-4 mr-3"
																					/>
																					<span>Close Opening</span>
																				</DropdownMenuItem>
																			}
																		/>
																		<AlertDialogContent>
																			<AlertDialogHeader>
																				<AlertDialogTitle>
																					close job opening?
																				</AlertDialogTitle>
																				<AlertDialogDescription>
																					this will archive the role and notify
																					pending candidates. this action is
																					recorded for metrics.
																				</AlertDialogDescription>
																			</AlertDialogHeader>
																			<AlertDialogFooter>
																				<AlertDialogCancel>
																					keep open
																				</AlertDialogCancel>
																				<AlertDialogAction className="bg-destructive hover:bg-destructive/90">
																					Archive Role
																				</AlertDialogAction>
																			</AlertDialogFooter>
																		</AlertDialogContent>
																	</AlertDialog>
																</DropdownMenuContent>
															</DropdownMenu>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</FrameContent>

								<FrameFooter className="px-8 py-5 border-t border-border/5">
									<p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">
										Registry Ledger: {filteredJobs.length} active requisitions
									</p>
								</FrameFooter>
							</FramePanel>
						</Frame>
					</section>
				</div>

				<div className="w-full xl:w-[400px] space-y-8">
					<Frame>
						<FramePanel className="p-0 overflow-hidden bg-card border-border/40 shadow-sm">
							<FrameHeader className="px-8 pt-8 border-b-0 pb-2">
								<div>
									<FrameTitle className="text-base font-bold">
										Recent Candidates
									</FrameTitle>
									<FrameDescription className="text-xs font-medium uppercase tracking-widest opacity-60">
										Latest movements
									</FrameDescription>
								</div>
							</FrameHeader>
							<FrameContent className="p-0 pt-4">
								<div className="divide-y divide-border/5">
									{applicants.slice(0, 5).map((candidate) => (
										<div
											key={candidate.id}
											className="p-6 hover:bg-muted/5 transition-all group/candidate cursor-pointer"
										>
											<div className="flex items-start gap-4">
												<UserAvatar
													name={
														candidate.firstName
															? `${candidate.firstName} ${candidate.lastName}`
															: candidate.referenceCode
													}
													src={candidate.image}
													size="lg"
													className="rounded-xl ring-2 ring-background shadow-sm"
												/>
												<div className="flex-1 min-w-0 pt-0.5">
													<div className="flex items-start justify-between gap-2">
														<p className="text-sm font-bold text-foreground/90 leading-tight truncate group-hover/candidate:text-primary transition-colors">
															{candidate.firstName
																? `${candidate.firstName} ${candidate.lastName}`
																: candidate.referenceCode}
														</p>
														<span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest shrink-0 mt-0.5 tabular-nums">
															{new Date(
																candidate.createdAt,
															).toLocaleDateString()}
														</span>
													</div>
													<p className="text-[10px] font-semibold text-muted-foreground/60 mt-1 truncate uppercase tracking-wider">
														{candidate.status}
													</p>
													<div className="mt-4">
														<Badge
															variant="info"
															className="h-5 rounded-lg px-2 text-[9px] font-black uppercase tracking-widest"
														>
															{candidate.status}
														</Badge>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</FrameContent>
							<FrameFooter className="border-t border-border/5 px-8 py-6">
								<Button variant="outline" className="w-full">
									View Global Talent Pool
								</Button>
							</FrameFooter>
						</FramePanel>
					</Frame>

					<Frame>
						<FramePanel className="p-8 flex flex-col gap-6 bg-primary/[0.02] border-primary/10 rounded-[2rem] relative overflow-hidden group">
							<div className="flex items-center gap-4 relative z-10">
								<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
									<HugeiconsIcon icon={UserAdd01Icon} size={24} />
								</div>
								<div>
									<p className="text-base font-bold text-foreground/90 leading-none mb-1.5">
										External Agencies
									</p>
									<p className="text-xs font-semibold text-muted-foreground/50 tracking-tight">
										Invite recruiters to collaborate
									</p>
								</div>
							</div>
							<Button variant="outline" className="w-full">
								Provision Access
								<HugeiconsIcon icon={ArrowRight01Icon} />
							</Button>
						</FramePanel>
					</Frame>
				</div>
			</div>
		</main>
	);
}
