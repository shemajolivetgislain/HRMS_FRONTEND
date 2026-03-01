import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  const modules = [
    {
      title: "1. System Admin (Super Admin)",
      desc: "This is the 'Master' view for the people who own the whole platform. They don't just see one company; they see all of them.",
      features: [
        "Company Registry: A list of every company using the app. You can see their TIN number and how many employees they have.",
        "Account Control: If a company doesn't pay or breaks rules, the Super Admin can 'Suspend' them with one click.",
        "Platform Health: Real-time stats on how many people are using the app and if the system is running fast.",
        "Audit Logs: A security trail that records everything important that happens across the whole platform.",
      ],
      links: [
        { label: "Platform Overview", to: "/admin" },
        { label: "Manage All Companies", to: "/admin/companies" },
        { label: "Security Logs", to: "/admin/logs" },
      ],
    },
    {
      title: "2. Multi-Tenant Registration",
      desc: "This is how new companies join the platform. It is designed to gather everything needed for Rwandan business laws.",
      features: [
        "TIN Collection: New companies must provide their 9-digit Tax ID during sign-up.",
        "Master Password: Every company sets a unique 'Master Password' that their staff will need to join their specific workspace.",
        "Owner Setup: The person who registers the company automatically becomes the 'Company Admin'.",
      ],
      links: [{ label: "Register New Company", to: "/auth/register" }],
    },
    {
      title: "3. Employee & Compliance Records",
      desc: "More than just a list of names. This is where HR manages the 'legal life' of an employee.",
      features: [
        "Onboarding Tracker: A progress bar shows how far a new hire is in their setup process.",
        "Compliance Alerts: If an employee is missing a 'Criminal Record' or 'Medical Report', the system shows a red warning banner on their profile.",
        "Digital Vault: Securely store CVs, ID cards, and Contracts. No more paper files.",
      ],
      links: [
        { label: "Employee Directory", to: "/dashboard/employees" },
        {
          label: "Check Non-Compliant Staff",
          to: "/dashboard/employees/$id",
          params: { id: "EMP-002" },
        },
        { label: "Browse All Files", to: "/dashboard/documents" },
      ],
    },
    {
      title: "4. The Payroll Engine",
      desc: "A step-by-step wizard that makes sure people are paid correctly and all taxes are sent to the government.",
      features: [
        "6-Step Process: It walks you through Attendance -> HR Check -> Manager Approval -> Tax Calculation -> Final Sign-off -> Payment.",
        "RRA Tax Brackets: Automatically calculates the 0%, 10%, 20%, and 30% tax tiers used in Rwanda.",
        "Pension & Funds: Automatically subtracts the RSSB Pension (6% from employee, 8% from employer) and the Maternity fund.",
        "Net Calculation: The system shows exactly how much is Gross salary and how much is actually paid to the bank.",
      ],
      links: [
        { label: "Run Monthly Payroll", to: "/dashboard/payroll" },
        { label: "View Tax Settings", to: "/dashboard/settings" },
      ],
    },
    {
      title: "5. Leave & Time-Off Management",
      desc: "Automated rules for when staff take breaks. No more manual counting of days.",
      features: [
        "Accrual Rules: Automatically gives 1.5 days of leave every month. It also handles 5 days of sick leave and 3.5 months for maternity.",
        "Approval Pipeline: Employees apply, and HR can see a list of 'Pending' requests to approve or reject.",
        "Balance View: Every person can see exactly how many days they have left to use.",
      ],
      links: [{ label: "Manage Team Leaves", to: "/dashboard/leaves" }],
    },
    {
      title: "6. Performance (Balanced Scorecard)",
      desc: "A modern way to review staff performance using the 'Balanced Scorecard' method.",
      features: [
        "4 Perspectives: Reviews are split into Financial, Customer, Internal Process, and Growth goals.",
        "1 to 4 Rating: A simple scale where 1 means 'Not Met' and 4 means 'Exceeded Targets'.",
        "Dual Appraisal: The employee rates themselves first, then the manager gives their final rating and feedback.",
      ],
      links: [{ label: "Staff Appraisals", to: "/dashboard/performance" }],
    },
    {
      title: "7. Recruitment Pipeline",
      desc: "A tool to find and hire new talent without using messy spreadsheets.",
      features: [
        "Pipeline Stages: Drag candidates from 'Applied' to 'Interview' to 'Offer Sent'.",
        "Hire Action: Once a candidate is ready, click 'Hire' to automatically turn them into an active Employee in the system.",
      ],
      links: [{ label: "Hiring Command Center", to: "/dashboard/recruitment" }],
    },
  ];

  return (
    <div className="p-10 space-y-12 font-sans max-w-5xl bg-background min-h-screen">
      <header className="space-y-4 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          HRMS Product Documentation
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {modules.map((m, i) => (
          <div key={i} className="space-y-5 group">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary group-hover:underline transition-all">
                {m.title}
              </h2>
              <p className="text-[15px] font-medium leading-relaxed">
                {m.desc}
              </p>
            </div>

            <div className="bg-muted/10 border border-border/5 p-6 rounded-2xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                What's covered:
              </p>
              <ul className="space-y-3">
                {m.features.map((f, k) => (
                  <li
                    key={k}
                    className="text-sm text-muted-foreground flex items-start gap-3"
                  >
                    <span className="size-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {m.links.map((l, j) => (
                <Button
                  variant={"link"}
                  render={<Link key={j} to={l.to} params={l.params} />}
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-border/5">
        <Link
          to="/dashboard"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold shadow-md shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Enter Main Dashboard
        </Link>
      </div>
    </div>
  );
}
