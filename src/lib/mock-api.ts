import type { Employee, PayrollRecord, JobOpening, Activity } from "@/types";

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "active",
    hireDate: "2021-03-15",
    phone: "+1 (555) 123-4567",
    manager: "Alice Johnson",
    dob: "1990-05-22",
    address: "123 Main Street",
    city: "San Francisco",
    country: "United States",
    zipCode: "94102",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    department: "HR",
    position: "HR Manager",
    status: "active",
    hireDate: "2020-07-22",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    department: "Sales",
    position: "Sales Executive",
    status: "active",
    hireDate: "2022-01-10",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    department: "Finance",
    position: "Finance Analyst",
    status: "pending",
    hireDate: "2024-02-01",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    department: "Engineering",
    position: "DevOps Engineer",
    status: "inactive",
    hireDate: "2019-06-12",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    hireDate: "2021-11-05",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james@example.com",
    department: "Engineering",
    position: "QA Engineer",
    status: "active",
    hireDate: "2022-03-20",
  },
  {
    id: "8",
    name: "Rachel Green",
    email: "rachel@example.com",
    department: "Operations",
    position: "Operations Coordinator",
    status: "active",
    hireDate: "2021-09-14",
  },
];

export const mockPayroll: PayrollRecord[] = [
  {
    id: "PAY-001",
    employee: "Ahmed Levin",
    role: "Product Manager",
    amount: 8450.0,
    method: "Bank Transfer",
    date: "2023-12-27",
    status: "paid",
    net: 6190.0,
    base: 7200.0,
    bonus: 1250.0,
    tax: 1840.0,
    deductions: 420.0,
    account: "Standard Chartered · **** 4291",
  },
  {
    id: "PAY-002",
    employee: "Alena Dokidis",
    role: "Product Designer",
    amount: 7200.0,
    method: "Bank Transfer",
    date: "2023-12-25",
    status: "paid",
  },
  {
    id: "PAY-003",
    employee: "Mira Schleifer",
    role: "UI/UX Designer",
    amount: 6800.0,
    method: "PayPal",
    date: "2023-12-25",
    status: "paid",
  },
  {
    id: "PAY-004",
    employee: "Marcus Rosser",
    role: "Frontend Engineer",
    amount: 9100.0,
    method: "Bank Transfer",
    date: "2023-12-24",
    status: "processing",
  },
  {
    id: "PAY-005",
    employee: "Sarah Jenkins",
    role: "QA Lead",
    amount: 7850.0,
    method: "Bank Transfer",
    date: "2023-12-22",
    status: "delayed",
  },
];

export const mockJobs: JobOpening[] = [
  {
    id: "JOB-101",
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    applicants: 42,
    status: "published",
    date: "2 days ago",
  },
  {
    id: "JOB-102",
    title: "Product Designer",
    dept: "Design",
    type: "Full-time",
    location: "New York, NY",
    applicants: 28,
    status: "published",
    date: "5 days ago",
  },
  {
    id: "JOB-103",
    title: "HR Specialist",
    dept: "Human Resources",
    type: "Contract",
    location: "London, UK",
    applicants: 15,
    status: "draft",
    date: "1 week ago",
  },
  {
    id: "JOB-104",
    title: "QA Engineer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    applicants: 12,
    status: "on-hold",
    date: "2 weeks ago",
  },
];

export const api = {
  getEmployees: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockEmployees;
  },
  getEmployee: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockEmployees.find((e) => e.id === id) || null;
  },
  getPayroll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPayroll;
  },
  getPayrollRecord: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockPayroll.find((p) => p.id === id) || null;
  },
  getJobs: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockJobs;
  },
  getJob: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockJobs.find((j) => j.id === id) || null;
  },
};
