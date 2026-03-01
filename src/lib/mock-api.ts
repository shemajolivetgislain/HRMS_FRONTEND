import type { Employee, PayrollRecord, JobOpening, Company, LeaveRequest, LeaveBalance, PerformanceReview, TaxConfig, PayrollRun, Applicant, EmployeeDocument, SystemLog } from "@/types";

export const mockCompanies: Company[] = [
  {
    id: "COMP-001",
    name: "Igihe Logistics",
    sector: "Logistics",
    tin: "102938475",
    email: "ops@igihe.rw",
    phone: "+250 788 100 200",
    status: "active",
    registeredAt: "2024-01-15",
    employeeCount: 143,
  },
  {
    id: "COMP-002",
    name: "Vision Finance",
    sector: "Finance",
    tin: "556677889",
    email: "hr@vision.rw",
    phone: "+250 788 300 400",
    status: "active",
    registeredAt: "2024-02-10",
    employeeCount: 89,
  },
  {
    id: "COMP-003",
    name: "Kivu Heights",
    sector: "Hospitality",
    tin: "112233445",
    email: "admin@kivuheights.com",
    phone: "+250 788 500 600",
    status: "suspended",
    registeredAt: "2023-11-20",
    employeeCount: 56,
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "Jean Paul Nkurunziza",
    email: "jp.nkurunziza@igihe.rw",
    department: "Operations",
    position: "Fleet Manager",
    status: "active",
    hireDate: "2021-03-15",
    complianceStatus: "compliant",
    onboardingProgress: 100,
    phone: "+250 781 000 001",
    address: "KN 254 St, Kigali",
    city: "Kigali",
    country: "Rwanda",
    dob: "1990-05-12",
    manager: "Skylar Calzoni",
  },
  {
    id: "EMP-002",
    name: "Divine Uwase",
    email: "d.uwase@vision.rw",
    department: "Accounting",
    position: "Senior Accountant",
    status: "probation",
    hireDate: "2024-01-22",
    complianceStatus: "non-compliant",
    onboardingProgress: 85,
    phone: "+250 781 000 002",
    address: "KK 312 Ave, Kicukiro",
    city: "Kigali",
    country: "Rwanda",
    dob: "1994-11-30",
    manager: "Jean Paul Nkurunziza",
  },
  {
    id: "EMP-003",
    name: "Claude Mugisha",
    email: "c.mugisha@kivuheights.com",
    department: "Sales",
    position: "Sales Representative",
    status: "terminated",
    hireDate: "2022-05-10",
    complianceStatus: "compliant",
    onboardingProgress: 100,
    phone: "+250 781 000 003",
    address: "Rubavu Waterfront 12",
    city: "Gisenyi",
    country: "Rwanda",
    dob: "1988-02-15",
    manager: "Divine Uwase",
  },
  {
    id: "EMP-004",
    name: "Alice Umutoni",
    email: "a.umutoni@igihe.rw",
    department: "HR",
    position: "HR Specialist",
    status: "resigned",
    hireDate: "2020-11-12",
    complianceStatus: "compliant",
    onboardingProgress: 100,
    phone: "+250 781 000 004",
    address: "Nyarutarama Close 5",
    city: "Kigali",
    country: "Rwanda",
    dob: "1992-08-22",
    manager: "System Admin",
  }
];

export const mockDocuments: EmployeeDocument[] = [
  {
    id: "DOC-001",
    employeeId: "EMP-001",
    employeeName: "Jean Paul Nkurunziza",
    type: "CONTRACT",
    fileName: "architect_contract_final.pdf",
    fileSize: "1.2 MB",
    uploadedAt: "2021-03-15",
    status: "active",
  },
  {
    id: "DOC-002",
    employeeId: "EMP-001",
    employeeName: "Jean Paul Nkurunziza",
    type: "ID",
    fileName: "national_id_card.jpg",
    fileSize: "850 KB",
    uploadedAt: "2021-03-10",
    status: "active",
  }
];

export const mockSystemLogs: SystemLog[] = [
  {
    id: "LOG-001",
    timestamp: "2024-03-28 14:30:22",
    level: "security",
    event: "Company 'Kivu Heights' suspended for compliance review",
    actor: "System Admin",
    ipAddress: "197.243.10.5",
  },
  {
    id: "LOG-002",
    timestamp: "2024-03-28 12:15:05",
    level: "info",
    event: "New tenant 'Igihe Logistics' onboarding initiated",
    actor: "Super Admin",
    ipAddress: "41.216.100.12",
  }
];

export const mockApplicants: Applicant[] = [
  {
    id: "CAN-001",
    firstName: "Moses",
    lastName: "Mugisha",
    email: "m.mugisha@gmail.com",
    phone: "+250 780 111 222",
    jobTitleId: "JOB-101",
    applicationReference: "APP-RW-001",
    stage: "Shortlisted",
    score: 4.8,
    appliedAt: "2024-03-20",
    history: []
  },
  {
    id: "CAN-002",
    firstName: "Sarah",
    lastName: "Kwizera",
    email: "s.kwizera@yahoo.com",
    phone: "+250 780 333 444",
    jobTitleId: "JOB-101",
    applicationReference: "APP-RW-002",
    stage: "First Interview",
    score: 4.2,
    appliedAt: "2024-03-21",
    history: []
  },
  {
    id: "CAN-003",
    firstName: "Patrick",
    lastName: "Habimana",
    email: "p.habimana@gmail.com",
    phone: "+250 780 555 666",
    jobTitleId: "JOB-101",
    applicationReference: "APP-RW-003",
    stage: "Online Assessment",
    score: 3.9,
    appliedAt: "2024-03-22",
    history: []
  },
  {
    id: "CAN-004",
    firstName: "Gisele",
    lastName: "Umuhoza",
    email: "g.umuhoza@gmail.com",
    phone: "+250 780 777 888",
    jobTitleId: "JOB-101",
    applicationReference: "APP-RW-004",
    stage: "Second and Final Interview",
    score: 4.9,
    appliedAt: "2024-03-23",
    history: []
  },
  {
    id: "CAN-005",
    firstName: "Eric",
    lastName: "Gasana",
    email: "e.gasana@gmail.com",
    phone: "+250 780 999 000",
    jobTitleId: "JOB-101",
    applicationReference: "APP-RW-005",
    stage: "Rejected",
    score: 2.1,
    appliedAt: "2024-03-18",
    history: []
  }
];

export const mockTaxConfig: TaxConfig = {
  rraBrackets: [
    { min: 0, max: 60000, rate: 0 },
    { min: 60001, max: 100000, rate: 10 },
    { min: 100001, max: 200000, rate: 20 },
    { min: 200001, max: null, rate: 30 },
  ],
  rssbEmployee: 6,
  rssbEmployer: 8,
  maternityEmployee: 0.3,
  maternityEmployer: 0.3,
  cbhiRate: 0.5,
};

export const mockActivePayroll: PayrollRun = {
  id: "RUN-2024-03",
  month: "March",
  year: 2024,
  currentStep: 1,
  status: "draft",
  totalGross: 12500000,
  totalDeductions: 3200000,
  totalNet: 9300000,
};

export const mockLeaves: LeaveRequest[] = [
  {
    id: "LR-101",
    employeeId: "EMP-001",
    employeeName: "Jean Paul Nkurunziza",
    type: "Annual",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    days: 5,
    reason: "Holiday in Gisenyi",
    status: "pending",
    appliedAt: "2024-03-28",
  }
];

export const mockLeaveBalances: LeaveBalance[] = [
  {
    employeeId: "EMP-001",
    annual: 18,
    sick: 5,
    maternity: 0,
    used: 4,
  }
];

export const mockPerformance: PerformanceReview[] = [
  {
    id: "REV-001",
    employeeId: "EMP-001",
    employeeName: "Jean Paul Nkurunziza",
    quarter: "Q1",
    year: 2024,
    status: "submitted",
    goals: [
      {
        id: "G-1",
        perspective: "Financial",
        objective: "Cost optimization",
        target: "5% reduction",
        weight: 30,
        rating: 3,
      }
    ],
    selfRating: 3.5,
  }
];

export const mockPayroll: PayrollRecord[] = [
  {
    id: "PAY-001",
    employee: "Jean Paul Nkurunziza",
    role: "Software Architect",
    amount: 1500000,
    method: "Bank Transfer (BK)",
    date: "2023-12-27",
    status: "paid",
  }
];

export const mockJobs: JobOpening[] = [
  {
    id: "JOB-101",
    title: "Senior Developer",
    dept: "Engineering",
    type: "Full-time",
    location: "Kigali (Remote)",
    applicants: 42,
    status: "published",
    date: "2 days ago",
  }
];

export const api = {
  getDocuments: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDocuments;
  },
  getSystemLogs: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockSystemLogs;
  },
  getApplicants: async (jobId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (jobId) return mockApplicants.filter(a => a.jobTitleId === jobId);
    return mockApplicants;
  },
  getApplicant: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockApplicants.find(a => a.id === id) || null;
  },
  getTaxConfig: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTaxConfig;
  },
  getActivePayrollRun: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockActivePayroll;
  },
  getCompanies: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockCompanies;
  },
  getCompany: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCompanies.find(c => c.id === id) || null;
  },
  getEmployees: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEmployees;
  },
  getEmployee: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEmployees.find(e => e.id === id) || null;
  },
  getLeaves: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockLeaves;
  },
  getLeaveBalance: async (empId: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockLeaveBalances.find(b => b.employeeId === empId) || null;
  },
  getPerformanceReviews: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPerformance;
  },
  getPayroll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPayroll;
  },
  getPayrollRecord: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPayroll.find(p => p.id === id) || null;
  },
  getJobs: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockJobs;
  },
  getJob: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockJobs.find(j => j.id === id) || null;
  }
};
