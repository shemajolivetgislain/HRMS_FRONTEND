import {
	ArrowRight01Icon,
	Briefcase01Icon,
	Calendar01Icon,
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
import {
	useChangeJobPostingStatusMutation,
	useCreateJobPostingMutation,
	useGetJobPostingsQuery,
} from "@/lib/redux/api/job-posting";
import { useGetJobTitlesQuery } from "@/lib/redux/api/job-title";
import type {
	JobPostingSkill,
	JobPostingStatus,
	SkillCategory,
	WorkMode,
} from "@/types";

export const Route = createFileRoute("/dashboard/recruitment/")({
	component: RecruitmentPage,
});

const STATUS_VARIANT: Record<JobPostingStatus, "success" | "muted" | "destructive" | "warning"> = {
	PUBLISHED: "success",
	DRAFT: "muted",
	CLOSED: "warning",
	ARCHIVED: "destructive",
};

function RecruitmentPage() {
	const {
		data: postingsData,
		isLoading,
		isError,
	} = useGetJobPostingsQuery(undefined);
	const { data: applicantsData } = useGetApplicantsQuery(undefined);
	const { data: jobTitlesData } = useGetJobTitlesQuery(undefined);
	const [createJobPosting] = useCreateJobPostingMutation();
	const [changeStatus] = useChangeJobPostingStatusMutation();

	const [searchTerm, setSearchTerm] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState({
		title: "",
		jobTitleId: "",
		aboutRole: "",
		mission: "",
		location: "",
		workMode: "HYBRID" as WorkMode,
		applicationDeadline: "",
	});

	const [skills, setSkills] = useState<JobPostingSkill[]>([
		{ name: "", category: "TECHNICAL", isRequired: true },
	]);

	const [sectionItems, setSectionItems] = useState([{ content: "", order: 1 }]);

	const resetForm = () => {
		setForm({
			title: "",
			jobTitleId: "",
			aboutRole: "",
			mission: "",
			location: "",
			workMode: "HYBRID",
			applicationDeadline: "",
		});
		setSkills([{ name: "", category: "TECHNICAL", isRequired: true }]);
		setSectionItems([{ content: "", order: 1 }]);
	};

	if (isLoading) return <DashboardPending />;
	if (isError) return <div>Error loading job postings.</div>;

	const postings = postingsData?.items || [];
	const applicants = applicantsData?.items || [];
	const jobTitles = jobTitlesData?.items || [];

	const filteredPostings = postings.filter(
		(p) =>
			p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.location.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const publishedCount = postings.filter((p) => p.status === "PUBLISHED").length;

	const handleCreate = async () => {
		if (!form.title || !form.jobTitleId || !form.location || !form.applicationDeadline) {
			toast.error("Title, position, location and deadline are required");
			return;
		}
		setIsSubmitting(true);
		try {
			await createJobPosting({
				...form,
				applicationDeadline: new Date(form.applicationDeadline).toISOString(),
				skills: skills.filter((s) => s.name.trim()),
				sections: [
					{
						type: "KEY_RESPONSIBILITIES",
						title: "What You'll Work On",
						order: 1,
						items: sectionItems
							.filter((i) => i.content.trim())
							.map((i, idx) => ({ content: i.content.trim(), order: idx + 1 })),
					},
				],
			}).unwrap();
			toast.success("Job posting created successfully");
			setIsDialogOpen(false);
			resetForm();
		} catch (err) {
			console.error(err);
			toast.error("Failed to create job posting");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCopyLink = (postingId: string) => {
		const url = `${window.location.origin}/apply/${postingId}`;
		navigator.clipboard.writeText(url);
		toast.success("Application link copied to clipboard");
	};

	const handleChangeStatus = async (id: string, status: JobPostingStatus) => {
		try {
			await changeStatus({ id, status }).unwrap();
			toast.success(`Posting ${status.toLowerCase()} successfully`);
		} catch (err) {
			console.error(err);
			toast.error("Failed to update posting status");
		}
	};

	const addSkill = () =>
		setSkills((prev) => [
			...prev,
			{ name: "", category: "TECHNICAL", isRequired: false },
		]);

	const removeSkill = (i: number) =>
		setSkills((prev) => prev.filter((_, idx) => idx !== i));

	const updateSkill = (i: number, patch: Partial<JobPostingSkill>) =>
		setSkills((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

	const addSectionItem = () =>
		setSectionItems((prev) => [
			...prev,
			{ content: "", order: prev.length + 1 },
		]);

	const removeSectionItem = (i: number) =>
		setSectionItems((prev) => prev.filter((_, idx) => idx !== i));

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
					<DialogContent className="sm:max-w-160 rounded-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Publish New Job Posting</DialogTitle>
							<DialogDescription>
								Define a new job opening for the recruitment portal.
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-6 py-4">
							{/* Basic info */}
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2 space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Posting Title
									</Label>
									<Input
										placeholder="e.g. Open Engineering Application (Mid-Senior)"
										value={form.title}
										onChange={(e) => setForm({ ...form, title: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Position
									</Label>
									<Select
										value={form.jobTitleId}
										onValueChange={(v) => setForm({ ...form, jobTitleId: v })}
									>
										<SelectTrigger>
											<SelectValue>
												{(value: string | null) => {
													if (!value) return "Select a position";
													const jt = jobTitles.find((t) => t.id === value);
													return jt?.name ?? value;
												}}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{jobTitles.length ? (
												jobTitles.map((jt) => (
													<SelectItem key={jt.id} value={jt.id}>
														{jt.name}
													</SelectItem>
												))
											) : (
												<SelectItem value="none" disabled>
													No positions available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Work Mode
									</Label>
									<Select
										value={form.workMode}
										onValueChange={(v) =>
											setForm({ ...form, workMode: v as WorkMode })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="HYBRID">Hybrid</SelectItem>
											<SelectItem value="REMOTE">Remote</SelectItem>
											<SelectItem value="ONSITE">On-site</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Location
									</Label>
									<Input
										placeholder="e.g. Kigali, Rwanda"
										value={form.location}
										onChange={(e) => setForm({ ...form, location: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Application Deadline
									</Label>
									<Input
										type="date"
										value={form.applicationDeadline}
										onChange={(e) =>
											setForm({ ...form, applicationDeadline: e.target.value })
										}
									/>
								</div>
							</div>

							{/* About */}
							<div className="space-y-2">
								<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
									About the Role
								</Label>
								<Textarea
									placeholder="Describe the role, team, and what success looks like..."
									className="min-h-20 resize-none"
									value={form.aboutRole}
									onChange={(e) => setForm({ ...form, aboutRole: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
									Mission
								</Label>
								<Textarea
									placeholder="What will this person build or achieve?"
									className="min-h-16 resize-none"
									value={form.mission}
									onChange={(e) => setForm({ ...form, mission: e.target.value })}
								/>
							</div>

							{/* Key Responsibilities */}
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Key Responsibilities
									</Label>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-xs h-7"
										onClick={addSectionItem}
									>
										+ Add item
									</Button>
								</div>
								{sectionItems.map((item, i) => (
									<div key={i} className="flex gap-2 items-center">
										<Input
											placeholder={`Responsibility ${i + 1}`}
											value={item.content}
											onChange={(e) =>
												setSectionItems((prev) =>
													prev.map((s, idx) =>
														idx === i ? { ...s, content: e.target.value } : s,
													),
												)
											}
										/>
										{sectionItems.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="icon-sm"
												onClick={() => removeSectionItem(i)}
												className="text-destructive hover:text-destructive shrink-0"
											>
												×
											</Button>
										)}
									</div>
								))}
							</div>

							{/* Skills */}
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
										Skills
									</Label>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-xs h-7"
										onClick={addSkill}
									>
										+ Add skill
									</Button>
								</div>
								{skills.map((skill, i) => (
									<div key={i} className="flex gap-2 items-center">
										<Input
											placeholder="e.g. TypeScript"
											className="flex-1"
											value={skill.name}
											onChange={(e) => updateSkill(i, { name: e.target.value })}
										/>
										<Select
											value={skill.category}
											onValueChange={(v) =>
												updateSkill(i, { category: v as SkillCategory })
											}
										>
											<SelectTrigger className="w-32">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="TECHNICAL">Technical</SelectItem>
												<SelectItem value="SOFT">Soft</SelectItem>
												<SelectItem value="OTHER">Other</SelectItem>
											</SelectContent>
										</Select>
										<label className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap cursor-pointer">
											<input
												type="checkbox"
												checked={skill.isRequired}
												onChange={(e) =>
													updateSkill(i, { isRequired: e.target.checked })
												}
												className="rounded"
											/>
											Required
										</label>
										{skills.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="icon-sm"
												onClick={() => removeSkill(i)}
												className="text-destructive hover:text-destructive shrink-0"
											>
												×
											</Button>
										)}
									</div>
								))}
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
								onClick={handleCreate}
								disabled={isSubmitting}
								className="font-bold px-8 h-10 rounded-xl"
							>
								{isSubmitting ? "Publishing..." : "Publish Posting"}
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
							value={publishedCount}
							icon={JobShareIcon}
							variant="primary"
							sub="Postings published"
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
											placeholder="Search postings or location…"
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
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-8 py-3 w-[320px]">
													Posting
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
													Mode
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
													Status
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
													Deadline
												</TableHead>
												<TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3 text-right pr-8">
													Management
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredPostings.map((posting) => (
												<TableRow
													key={posting.id}
													className="border-border/5 hover:bg-muted/5 transition-colors group"
												>
													<TableCell className="pl-8 py-5">
														<div>
															<p className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors leading-none">
																{posting.title}
															</p>
															<div className="flex items-center gap-3 mt-2 text-xs font-semibold text-muted-foreground/40 uppercase tracking-widest">
																<span className="flex items-center gap-1.5">
																	<HugeiconsIcon icon={Briefcase01Icon} size={12} />
																	{posting.workMode}
																</span>
																<span>•</span>
																<span className="flex items-center gap-1.5">
																	<HugeiconsIcon icon={Location01Icon} size={12} />
																	{posting.location}
																</span>
															</div>
														</div>
													</TableCell>
													<TableCell className="px-4">
														<div className="flex items-center justify-center h-8 px-2 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tabular-nums border border-primary/10">
															{posting.workMode}
														</div>
													</TableCell>
													<TableCell className="px-4">
														<Badge
															variant={
																STATUS_VARIANT[posting.status] ?? "muted"
															}
															showDot
															className="font-bold text-[10px] uppercase tracking-widest h-6"
														>
															{posting.status}
														</Badge>
													</TableCell>
													<TableCell className="px-4">
														<div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/60">
															<HugeiconsIcon
																icon={Calendar01Icon}
																size={12}
															/>
															{new Date(posting.applicationDeadline).toLocaleDateString()}
														</div>
													</TableCell>
													<TableCell className="text-right pr-8">
														<div className="flex items-center justify-end gap-2">
															<Button
																variant="ghost"
																size="sm"
																render={
																	<Link
																		to="/dashboard/recruitment/$id"
																		params={{ id: posting.id }}
																	/>
																}
															>
																Details
															</Button>
															<DropdownMenu>
																<DropdownMenuTrigger
																	render={
																		<Button variant="ghost" size="icon-sm">
																			<HugeiconsIcon icon={MoreHorizontalIcon} />
																		</Button>
																	}
																/>
																<DropdownMenuContent
																	align="end"
																	className="w-52 rounded-2xl border-border/40 shadow-2xl p-2"
																>
																	<DropdownMenuItem
																		className="rounded-xl py-1.5 font-semibold text-sm"
																		onClick={() => handleCopyLink(posting.id)}
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
																	{posting.status !== "PUBLISHED" && (
																		<DropdownMenuItem
																			className="rounded-xl py-1.5 font-semibold text-sm text-success focus:bg-success/5 focus:text-success"
																			onClick={() => handleChangeStatus(posting.id, "PUBLISHED")}
																		>
																			<HugeiconsIcon icon={JobShareIcon} className="size-4 mr-3" />
																			<span>Publish</span>
																		</DropdownMenuItem>
																	)}
																	{posting.status !== "CLOSED" && (
																		<DropdownMenuItem
																			className="rounded-xl py-1.5 font-semibold text-sm text-warning focus:bg-warning/5 focus:text-warning"
																			onClick={() => handleChangeStatus(posting.id, "CLOSED")}
																		>
																			<HugeiconsIcon icon={Delete02Icon} className="size-4 mr-3" />
																			<span>Close Opening</span>
																		</DropdownMenuItem>
																	)}
																	{posting.status !== "ARCHIVED" && (
																		<AlertDialog>
																			<AlertDialogTrigger
																				render={
																					<DropdownMenuItem
																						onSelect={(e) => e.preventDefault()}
																						className="rounded-xl py-1.5 font-semibold text-sm text-destructive focus:bg-destructive/5"
																					>
																						<HugeiconsIcon icon={Delete02Icon} className="size-4 mr-3" />
																						<span>Archive</span>
																					</DropdownMenuItem>
																				}
																			/>
																			<AlertDialogContent>
																				<AlertDialogHeader>
																					<AlertDialogTitle>Archive this posting?</AlertDialogTitle>
																					<AlertDialogDescription>
																						This will permanently archive the posting and notify
																						pending candidates. This action is recorded for metrics.
																					</AlertDialogDescription>
																				</AlertDialogHeader>
																				<AlertDialogFooter>
																					<AlertDialogCancel>Cancel</AlertDialogCancel>
																					<AlertDialogAction
																						className="bg-destructive hover:bg-destructive/90"
																						onClick={() => handleChangeStatus(posting.id, "ARCHIVED")}
																					>
																						Archive Posting
																					</AlertDialogAction>
																				</AlertDialogFooter>
																			</AlertDialogContent>
																		</AlertDialog>
																	)}
																</DropdownMenuContent>
															</DropdownMenu>
														</div>
													</TableCell>
												</TableRow>
											))}
											{filteredPostings.length === 0 && (
												<TableRow>
													<TableCell
														colSpan={5}
														className="py-12 text-center text-muted-foreground/50 text-sm font-medium"
													>
														No job postings found.
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</FrameContent>

								<FrameFooter className="px-8 py-5 border-t border-border/5">
									<p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">
										Registry Ledger: {filteredPostings.length} requisitions
									</p>
								</FrameFooter>
							</FramePanel>
						</Frame>
					</section>
				</div>

				<div className="w-full xl:w-100 space-y-8">
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
															{new Date(candidate.createdAt).toLocaleDateString()}
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
						<FramePanel className="p-8 flex flex-col gap-6 bg-primary/2 border-primary/10 rounded-[2rem] relative overflow-hidden group">
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
