export type Status = "active" | "inactive" | "pending" | "paid" | "processing" | "delayed" | "published" | "draft" | "on-hold";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "online" | "away" | "offline";
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "pending";
  hireDate: string;
  avatar?: string;
  phone?: string;
  manager?: string;
  dob?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

export interface PayrollRecord {
  id: string;
  employee: string;
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
  applicants: number;
  status: "published" | "draft" | "on-hold";
  date: string;
}

export interface Activity {
  user: string;
  avatar?: string;
  action: string;
  target: string;
  time: string;
  status: "online" | "away" | "offline";
}
