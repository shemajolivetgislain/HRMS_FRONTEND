export type Role = "SYSTEM_ADMIN" | "COMPANY_ADMIN" | "EMPLOYEE";

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "paid"
  | "processing"
  | "delayed"
  | "published"
  | "draft"
  | "on-hold"
  | "approved"
  | "rejected"
  | "compliant"
  | "non-compliant";

export type RecruitmentStage =
  | "New Applied"
  | "Screening"
  | "Online Assessment"
  | "First Interview"
  | "Second and Final Interview"
  | "Final Interview"
  | "Offer Sent"
  | "Recruited"
  | "Rejected"
  | "Reserved"
  | "Shortlisted";

export type DocumentType =
  | "CV"
  | "ID"
  | "CONTRACT"
  | "CRIMINAL_CERTIFICATE"
  | "MEDICAL_REPORT"
  | "RESIGNATION_LETTER"
  | "EXPERIENCE_LETTER"
  | "CLEARENCE_LETTER"
  | "POLICY_MANUAL"
  | "TEMPLATE";

export interface Company {
  id: string;
  name: string;
  sector: string;
  tin: string;
  logoUrl?: string;
  phone: string;
  email: string;
  status: "active" | "suspended" | "inactive";
  registeredAt: string;
  employeeCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
  image?: string;
  status: "online" | "away" | "offline";
}

export interface PayrollDetails {
  baseSalary: number;
  currency: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  taxId: string;
}

export interface Employee {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  department: string;
  position: string;
  status:
    | "active"
    | "inactive"
    | "pending"
    | "probation"
    | "resigned"
    | "terminated";
  hireDate: string;
  image?: string;
  phone?: string;
  manager?: string;
  dob?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  complianceStatus: "compliant" | "non-compliant";
  onboardingProgress: number;
  payroll?: PayrollDetails;
}

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  type: DocumentType;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: "active" | "replaced";
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "security";
  event: string;
  actor: string;
  companyId?: string;
  ipAddress: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  employeeCount: number;
}

export interface JobTitle {
  id: string;
  title: string;
  departmentId: string;
  status: "active" | "inactive";
  employeeCount: number;
}

export interface PolicyCompliance {
  onboarding: {
    compliant: number;
    nonCompliant: number;
    total: number;
    nonCompliantEmployees: { id: string; name: string; missingDoc: string }[];
  };
  offboarding: {
    compliant: number;
    nonCompliant: number;
    total: number;
    nonCompliantEmployees: { id: string; name: string; missingDoc: string }[];
  };
}

export interface ApplicantPipelineStage {
  stage: RecruitmentStage;
  count: number;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  jobTitleId: string;
  applicationReference: string;
  stage: RecruitmentStage;
  score: number;
  appliedAt: string;
  history: {
    status: RecruitmentStage;
    doneBy: string;
    doneAt: string;
    comment: string;
  }[];
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  image?: string;
  type: "Annual" | "Sick" | "Maternity" | "Paternity" | "Unpaid";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

export interface LeaveBalance {
  employeeId: string;
  annual: number;
  sick: number;
  maternity: number;
  used: number;
}

export interface PerformanceGoal {
  id: string;
  perspective: "Financial" | "Customer" | "Internal Process" | "Growth";
  objective: string;
  target: string;
  weight: number;
  rating?: 1 | 2 | 3 | 4;
  feedback?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  image?: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  status: "draft" | "submitted" | "reviewed" | "completed";
  goals: PerformanceGoal[];
  selfRating?: number;
  managerRating?: number;
  overallFeedback?: string;
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxConfig {
  rraBrackets: TaxBracket[];
  rssbEmployee: number;
  rssbEmployer: number;
  maternityEmployee: number;
  maternityEmployer: number;
  cbhiRate: number;
}

export interface PayrollRun {
  id: string;
  month: string;
  year: number;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
  status: "draft" | "processing" | "completed";
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
}

export interface PayrollRecord {
  id: string;
  employee: string;
  image?: string;
  role: string;
  amount: number;
  method: string;
  date: string;
  status: "paid" | "processing" | "delayed";
  account?: string;
  base?: number;
  bonus?: number;
  tax?: number;
  deductions?: number;
  net?: number;
}

export interface JobOpening {
  id: string;
  title: string;
  dept: string;
  type: string;
  location: string;
  description?: string;
  applicants: number;
  status: "published" | "draft" | "on-hold";
  date: string;
}

export interface Activity {
  user: string;
  image?: string;
  action: string;
  target: string;
  time: string;
  status: "online" | "away" | "offline";
}
