import type {
	Applicant,
	ApplicantPipelineStage,
	Company,
	Department,
	Employee,
	EmployeeDocument,
	JobOpening,
	JobTitle,
	LeaveBalance,
	LeaveRequest,
	PayrollRecord,
	PayrollRun,
	PerformanceReview,
	PolicyCompliance,
	SystemLog,
	TaxConfig,
	User,
} from "@/types";

export const mockCompanies: Company[] = [
	{
		id: "COMP-001",
		name: "Igihe Logistics",
		tin: "102938475",
		identificationNumber: 123,
		categoryId: "Logistics",
		ownershipType: "PRIVATE",
		type: "LIMITED_BY_SHARES",
		email: "ops@igihe.rw",
		phone: "+250 788 100 200",
		status: "active",
		registeredAt: "2024-01-15",
		employeeCount: 143,
	},
];

export const mockEmployees: Employee[] = [
	{
		id: "EMP-001",
		name: "Jean Paul Nkurunziza",
		firstName: "Jean Paul",
		lastName: "Nkurunziza",
		idNumber: "1199080012345678",
		email: "jp.nkurunziza@igihe.rw",
		department: "Operations",
		position: "Fleet Manager",
		status: "active",
		hireDate: "2024-01-20",
		complianceStatus: "compliant",
		onboardingProgress: 100,
		phone: "+250 788 111 222",
		manager: "Saddy Nkurunziza",
		dob: "1990-05-15",
		address: "KN 3 Rd, Kigali",
		city: "Kigali",
		country: "Rwanda",
		zipCode: "0000",
		payroll: {
			baseSalary: 1200000,
			currency: "RWF",
			bankName: "BK",
			accountName: "Jean Paul Nkurunziza",
			accountNumber: "100012345678",
			taxId: "102938475",
		},
	},
];

export const mockDepartments: Department[] = [
	{
		id: "DEPT-001",
		name: "Operations",
		description: "Core business operations and fleet management",
		status: "active",
		employeeCount: 45,
	},
];

export const mockJobOpenings: JobOpening[] = [
	{
		id: "JOB-OP-001",
		title: "Senior Logistics Coordinator",
		dept: "Logistics",
		type: "Full-time",
		location: "Kigali",
		applicants: 45,
		status: "published",
		date: "2024-03-05",
	},
];

export const mockLeaveRequests: LeaveRequest[] = [
	{
		id: "LV-001",
		employeeId: "EMP-001",
		employeeName: "Jean Paul Nkurunziza",
		type: "Annual",
		startDate: "2024-04-10",
		endDate: "2024-04-15",
		days: 5,
		reason: "Family vacation",
		status: "pending",
		appliedAt: "2024-03-01",
	},
];

export const mockPayrollRuns: PayrollRun[] = [
	{
		id: "RUN-001",
		month: "February",
		year: 2024,
		currentStep: 6,
		status: "completed",
		totalGross: 145000000,
		totalDeductions: 32000000,
		totalNet: 113000000,
	},
];

export const mockPayrollRecords: PayrollRecord[] = [
	{
		id: "REC-001",
		employee: "Jean Paul Nkurunziza",
		role: "Fleet Manager",
		amount: 1200000,
		method: "Bank Transfer",
		date: "2024-02-28",
		status: "paid",
		base: 1200000,
		tax: 360000,
		deductions: 50000,
		net: 790000,
	},
];

export const mockCompliance: PolicyCompliance = {
	onboarding: {
		compliant: 124,
		nonCompliant: 14,
		total: 138,
		nonCompliantEmployees: [],
	},
	offboarding: {
		compliant: 12,
		nonCompliant: 2,
		total: 14,
		nonCompliantEmployees: [],
	},
};

export const mockPipeline: ApplicantPipelineStage[] = [
	{ stage: "New Applied", count: 145 },
	{ stage: "Screening", count: 82 },
];

export const mockTaxConfig: TaxConfig = {
	rraBrackets: [
		{ min: 0, max: 60000, rate: 0 },
		{ min: 60001, max: 100000, rate: 10 },
		{ min: 100001, max: null, rate: 30 },
	],
	rssbEmployee: 3,
	rssbEmployer: 5,
	maternityEmployee: 0.3,
	maternityEmployer: 0.3,
	cbhiRate: 0.5,
};

export const mockUsers: User[] = [
	{
		id: "USER-001",
		name: "Saddy Nkurunziza",
		email: "saddy@precision.rw",
		role: "ADMIN",
		status: "online",
	},
];

export const api = {
	getCompanies: async () => mockCompanies as Company[],
	getCompany: async (id: string) =>
		mockCompanies.find((c) => c.id === id) as Company | undefined,
	deleteCompany: async (_id: string) => true,
	getEmployees: async () => mockEmployees as Employee[],
	getEmployee: async (id: string) =>
		mockEmployees.find((e) => e.id === id) as Employee | undefined,
	deleteEmployee: async (_id: string) => true,
	addEmployee: async (emp: any) => ({ ...emp, id: "NEW-EMP" }),
	updateEmployee: async (_id: string, data: any) => ({ ...data }),
	getDepartments: async () => mockDepartments as Department[],
	addDepartment: async (dept: any) => ({ ...dept, id: "NEW-DEPT" }),
	getJobTitles: async () => [] as JobTitle[],
	getPayrollRuns: async () => mockPayrollRuns as PayrollRun[],
	getPayrollRecords: async () => mockPayrollRecords as PayrollRecord[],
	getPayroll: async () => mockPayrollRecords as PayrollRecord[],
	getActivePayrollRun: async () => mockPayrollRuns[0] as PayrollRun,
	getPayrollRecord: async (id: string) =>
		mockPayrollRecords.find((r) => r.id === id) as PayrollRecord | undefined,
	getLeaveRequests: async () => mockLeaveRequests as LeaveRequest[],
	getLeaves: async () => mockLeaveRequests as LeaveRequest[],
	getLeaveBalance: async (_id: string) =>
		({ annual: 18, sick: 12, maternity: 0, used: 4 }) as LeaveBalance,
	getPerformanceReviews: async () => [] as PerformanceReview[],
	getJobOpenings: async () => mockJobOpenings as JobOpening[],
	getJobs: async () => mockJobOpenings as JobOpening[],
	getJob: async (id: string) =>
		mockJobOpenings.find((j) => j.id === id) as JobOpening | undefined,
	addJobOpening: async (job: any) => ({ ...job, id: "NEW-JOB" }),
	getApplicants: async (_id?: string) => [] as Applicant[],
	getDocuments: async () => [] as EmployeeDocument[],
	getSystemLogs: async () => [] as SystemLog[],
	getTaxConfig: async () => mockTaxConfig as TaxConfig,
	getCompliance: async () => mockCompliance as PolicyCompliance,
	getPolicyCompliance: async () => mockCompliance as PolicyCompliance,
	getPipeline: async () => mockPipeline as ApplicantPipelineStage[],
	getRecruitmentPipeline: async () => mockPipeline as ApplicantPipelineStage[],
	getUsers: async () => mockUsers as User[],
	addUser: async (user: any) => ({ ...user, id: "NEW-USER" }),
	deleteUser: async (_id: string) => true,
	addApplicant: async (app: any) => ({ ...app, id: "NEW-APP" }),
};
