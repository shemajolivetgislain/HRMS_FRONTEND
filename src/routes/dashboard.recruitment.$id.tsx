import {
	ArrowLeft01Icon,
	Briefcase01Icon,
	Calendar01Icon,
	Copy01Icon,
	Download01Icon,
	Location01Icon,
	MoreHorizontalIcon,
	PlusSignCircleIcon,
	Sorting05Icon,
	Tick01Icon,
	UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { ErrorComponent } from "@/components/error-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetApplicantsQuery } from "@/lib/redux/api/applicant";
import { useGetJobTitleQuery } from "@/lib/redux/api/job-title";
import type { RecruitmentStage } from "@/types";

export const Route = createFileRoute("/dashboard/recruitment/$id")({
	pendingComponent: DashboardPending,
	errorComponent: ErrorComponent,
	component: RecruitmentDetailsPage,
});

const STAGES: RecruitmentStage[] = [
	"New Applied",
	"Screening",
	"Online Assessment",
	"First Interview",
	"Second and Final Interview",
	"Final Interview",
	"Offer Sent",
	"Recruited",
	"Rejected",
	"Reserved",
	"Shortlisted",
];

function RecruitmentDetailsPage() {
	const { id } = Route.useParams();
	const {
		data: role,
		isLoading: isLoadingJob,
		isError: isErrorJob,
	} = useGetJobTitleQuery(id);
	const {
		data: applicantsData,
		isLoading: isLoadingApps,
		isError: isErrorApps,
	} = useGetApplicantsQuery({ jobTitleId: id });

	if (isLoadingJob || isLoadingApps) return <DashboardPending />;
	if (isErrorJob || !role) return <div>Error loading job details.</div>;

	// Use server-filtered results directly. 
	// We stop filtering on the client because the backend list doesn't return jobTitleId.
	const candidates = applicantsData?.items || [];

	const handleUpdateStage = async (
		applicantId: string,
		newStage: RecruitmentStage,
	) => {
		// Prepare for the missing PATCH/PUT endpoint
		toast.info(`Stage update to "${newStage}" requested (API Pending)`);
		console.log(`Update applicant ${applicantId} to stage ${newStage}`);
	};

	const handleCopyLink = () => {
		const url = `${window.location.origin}/apply/${id}`;
		navigator.clipboard.writeText(url);
		toast.success("Application link copied to clipboard");
	};

	return (
		<main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
			<DashboardHeader
				category="Talent Pipeline"
				title={role.name}
				description={`Management console for role ID: ${role.id}`}
			>
				<Button
					variant="outline"
					size="lg"
					className="text-xs font-semibold border-border/40 shadow-none hover:bg-muted/50 gap-2 capitalize h-9"
					onClick={handleCopyLink}
				>
					<HugeiconsIcon icon={Copy01Icon} size={14} strokeWidth={2} />
					Copy Link
				</Button>
				<Button
					variant="outline"
					size="lg"
					className="text-xs font-semibold border-border/40 shadow-none hover:bg-muted/50 gap-2 capitalize h-9"
					render={<Link to="/dashboard/recruitment" />}
				>
					<HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
					Back
				</Button>
				<Button
					size="lg"
					className="h-9 px-4 rounded-xl text-xs font-bold shadow-sm gap-2 capitalize"
				>
					<HugeiconsIcon icon={UserAdd01Icon} size={14} strokeWidth={2} />
					Add Candidate
				</Button>
			</DashboardHeader>

			<div className="flex flex-col xl:flex-row gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
				{/* Left: Candidates Table */}
				<div className="flex-1 min-w-0 space-y-6">
					<Frame className="group/frame">
						<FramePanel className="p-0 overflow-hidden bg-card border-border/40 shadow-sm">
							<FrameHeader className="border-b-0 px-8 pt-8 pb-4">
								<div>
									<FrameTitle className="text-lg font-bold">
										Active Applications
									</FrameTitle>
									<FrameDescription className="text-xs font-medium opacity-60">
										Manage candidates through the hiring pipeline
									</FrameDescription>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="font-bold text-xs uppercase tracking-widest gap-2 rounded-xl"
								>
									<HugeiconsIcon icon={Sorting05Icon} size={14} />
									Ranking
								</Button>
							</FrameHeader>
							<FrameContent className="p-0">
								<div className="divide-y divide-border/5">
									{candidates.map((can) => (
										<div
											key={can.id}
											className="p-6 hover:bg-muted/5 transition-all group/can"
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
												<div className="flex items-center gap-4 min-w-0">
													<UserAvatar
														src={can.image}
														name={
															can.firstName
																? `${can.firstName} ${can.lastName}`
																: can.referenceCode
														}
														size="lg"
														className="shadow-sm border border-border/10 ring-2 ring-background rounded-xl"
													/>
													<div className="min-w-0">
														<p className="text-[15px] font-bold text-foreground/90 leading-tight">
															{can.firstName
																? `${can.firstName} ${can.lastName}`
																: can.referenceCode}
														</p>
														<div className="flex items-center gap-2 mt-2">
															<p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
																{can.email || can.status}
															</p>
															<span className="size-1 rounded-full bg-border/40" />
															<p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
																Applied {new Date(can.createdAt).toLocaleDateString()}
															</p>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-8 shrink-0">
													<div className="flex flex-col items-end gap-1.5">
														<p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">
															Candidate Score
														</p>
														<div className="flex items-center gap-1.5">
															<span className="text-sm font-black tabular-nums text-foreground/90">
																{(can.score || 0).toFixed(1)}
															</span>
															<div className="h-1.5 w-12 bg-muted/20 rounded-full overflow-hidden">
																<div
																	className="h-full bg-primary"
																	style={{
																		width: `${(can.score || 0) * 10}%`,
																	}}
																/>
															</div>
														</div>
													</div>

													<div className="flex flex-col gap-1.5 w-40">
														<p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">
															Pipeline Stage
														</p>
														<Select
															value={can.status}
															onValueChange={(val) =>
																handleUpdateStage(can.id, val as RecruitmentStage)
															}
														>
															<SelectTrigger className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest border-border/40 bg-muted/5 hover:bg-background transition-colors px-2">
																<SelectValue placeholder="Select Stage" />
															</SelectTrigger>
															<SelectContent className="rounded-xl border-border/40 shadow-2xl p-2">
																{STAGES.map((s) => (
																	<SelectItem
																		key={s}
																		value={s}
																		className="rounded-lg py-1.5 text-[10px] font-bold uppercase tracking-widest"
																	>
																		{s}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>

													<div className="flex items-center gap-2 pl-6 border-l border-border/10">
														{can.status === "Offer Sent" ? (
															<Button
																size="sm"
																className="bg-success hover:bg-success/90 text-white font-bold text-[10px] uppercase tracking-widest gap-2 h-9 rounded-xl px-4"
															>
																<HugeiconsIcon
																	icon={Tick01Icon}
																	size={12}
																	strokeWidth={3}
																/>
																Hire
															</Button>
														) : (
															<Button
																variant="outline"
																size="sm"
																className="font-bold text-[10px] uppercase tracking-widest h-9 px-4 rounded-xl border-border/40 hover:bg-primary/5 hover:text-primary transition-all"
															>
																Review
															</Button>
														)}

														<DropdownMenu>
															<DropdownMenuTrigger
																render={
																	<Button
																		variant="ghost"
																		size="icon-sm"
																		className="rounded-xl opacity-40 hover:opacity-100 transition-opacity"
																	>
																		<HugeiconsIcon
																			icon={MoreHorizontalIcon}
																			className="size-4"
																		/>
																	</Button>
																}
															/>
															<DropdownMenuContent
																align="end"
																className="w-52 rounded-2xl border-border/40 shadow-2xl p-2"
															>
																<DropdownMenuLabel className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] px-3 py-2">
																	Candidate Actions
																</DropdownMenuLabel>
																<DropdownMenuItem
																	className="rounded-xl py-2 font-bold text-xs uppercase tracking-widest"
																	onClick={handleCopyLink}
																>
																	<HugeiconsIcon
																		icon={Copy01Icon}
																		className="size-4 mr-3"
																	/>
																	<span>Copy Job Link</span>
																</DropdownMenuItem>
																<DropdownMenuItem className="rounded-xl py-2 font-bold text-xs uppercase tracking-widest">
																	View Application
																</DropdownMenuItem>
																<DropdownMenuItem className="rounded-xl py-2 font-bold text-xs uppercase tracking-widest">
																	Download CV
																</DropdownMenuItem>
																<DropdownMenuSeparator className="bg-border/5 my-1" />
																<DropdownMenuItem className="rounded-xl py-2 font-bold text-xs uppercase tracking-widest text-destructive focus:bg-destructive/5 focus:text-destructive">
																	Archive Application
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
											</div>
										</div>
									))}

									{candidates.length === 0 && (
										<div className="py-20 text-center">
											<div className="h-16 w-16 bg-muted/5 rounded-2xl flex items-center justify-center text-muted-foreground/20 mx-auto mb-4 border border-dashed border-border/40">
												<HugeiconsIcon icon={UserAdd01Icon} size={24} />
											</div>
											<p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
												No applications yet for this role
											</p>
											<p className="text-[10px] font-medium text-muted-foreground/30 mt-2">
												Once candidates apply, they will appear here.
											</p>
										</div>
									)}
								</div>
							</FrameContent>
							<FrameFooter className="flex items-center justify-between px-8 py-5 border-t border-border/5 bg-muted/[0.02]">
								<span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">
									Registry: {candidates.length} processed applications
								</span>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 text-[10px] font-black text-primary/60 hover:text-primary hover:bg-primary/5 uppercase tracking-widest rounded-xl"
								>
									Batch Export Resumes
								</Button>
							</FrameFooter>
						</FramePanel>
					</Frame>
				</div>

				{/* Right: Role Metadata */}
				<div className="w-full xl:w-[360px] space-y-6">
					<Frame>
						<FramePanel className="p-0 overflow-hidden bg-card border-border/40 shadow-sm">
							<FrameHeader className="px-8 pt-8 pb-4">
								<FrameTitle className="text-base font-bold">Role Specification</FrameTitle>
							</FrameHeader>
							<FrameContent className="px-8 pb-8 pt-0 space-y-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">
											Lifecycle
										</p>
										<Badge
											variant={role.status === "active" ? "success" : "muted"}
											showDot
											className="h-6 rounded-lg text-[9px] font-black uppercase tracking-widest px-2"
										>
											{role.status}
										</Badge>
									</div>
									<div className="space-y-1.5">
										<p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">
											Organization
										</p>
										<p className="text-xs font-bold text-foreground/80 truncate">
											{role.departmentId ? "Assigned Unit" : "Global Pool"}
										</p>
									</div>
								</div>
								<div className="space-y-5 pt-6 border-t border-border/10">
									<MetaItem
										icon={Briefcase01Icon}
										label="Contract Type"
										value="Full-time"
									/>
									<MetaItem
										icon={Location01Icon}
										label="Working Model"
										value="Remote / On-site"
									/>
									<MetaItem
										icon={Calendar01Icon}
										label="Reference ID"
										value={role.id.split("-")[0].toUpperCase()}
									/>
								</div>

								{role.description && (
									<div className="pt-6 border-t border-border/10">
										<p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest mb-3">
											Role Requirements
										</p>
										<p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-4 italic">
											"{role.description}"
										</p>
									</div>
								)}
							</FrameContent>
							<FrameFooter className="p-8 border-t border-border/5 bg-muted/[0.02]">
								<Button
									variant="outline"
									size="lg"
									className="w-full font-bold capitalize gap-2 text-[10px] uppercase tracking-widest hover:bg-muted/50 h-11 rounded-xl border-border/40 transition-all"
								>
									<HugeiconsIcon icon={Download01Icon} size={14} />
									Export Job Pack
								</Button>
							</FrameFooter>
						</FramePanel>
					</Frame>

					<Frame>
						<FramePanel className="p-8 flex flex-col gap-6 bg-primary/[0.02] border-primary/10 rounded-[2rem] relative overflow-hidden group">
							<div className="flex items-center gap-4 relative z-10">
								<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5 transition-transform group-hover:scale-110 duration-500">
									<HugeiconsIcon icon={UserAdd01Icon} size={24} />
								</div>
								<div>
									<p className="text-base font-bold text-foreground/90 leading-none mb-1.5">
										Hiring Board
									</p>
									<p className="text-xs font-semibold text-muted-foreground/50 tracking-tight">
										4 collaborators active
									</p>
								</div>
							</div>
							<div className="flex items-center -space-x-3">
								{[1, 2, 3].map((i) => (
									<div key={i} className="size-10 rounded-2xl border-2 border-background overflow-hidden ring-2 ring-primary/5">
										<img
											src={`https://i.pravatar.cc/150?u=${i + 10}`}
											alt="Collaborator"
											className="size-full object-cover"
										/>
									</div>
								))}
								<div className="size-10 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer">
									<HugeiconsIcon icon={PlusSignCircleIcon} size={16} />
								</div>
							</div>
						</FramePanel>
					</Frame>
				</div>
			</div>
		</main>
	);
}

function MetaItem({
	icon: Icon,
	label,
	value,
}: {
	icon: any;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3">
			<div className="text-primary/40 mt-0.5">
				<HugeiconsIcon icon={Icon} size={14} strokeWidth={2.5} />
			</div>
			<div>
				<p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none mb-2">
					{label}
				</p>
				<p className="text-sm font-bold text-foreground/80 leading-tight truncate max-w-[180px]">{value}</p>
			</div>
		</div>
	);
}
