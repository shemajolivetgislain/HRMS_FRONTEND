import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  const modules = [
    {
      title: "1. System Admin (Platform Console)",
      desc: "The global view for platform owners. Manage all registered tenants (e.g., Igihe Logistics, Vision Finance) from a single control center.",
      features: [
        "Company Registry: A complete list of every company using the app, including their TIN, sector, and employee count.",
        "Tenant Control: Instantly suspend, activate, or deactivate platform access for any company.",
        "System Logs: Comprehensive security trails recording major events (e.g., new tenant onboarding, compliance suspensions).",
        "Company Setup: Register new companies, assign their unique master password, and provision company admin accounts.",
      ],
      links: [
        { label: "Platform Overview", to: "/admin" },
        { label: "Manage Companies", to: "/admin/companies" },
        { label: "Security Logs", to: "/admin/logs" },
      ],
    },
    {
      title: "2. Company Admin Setup",
      desc: "The localized control panel for an individual company's HR manager to configure their specific workspace.",
      features: [
        "Department & Title Management: Configure organizational structures like 'Operations' or 'Engineering' and define roles.",
        "Policy Configuration: Set mandatory onboarding documents (CV, ID, Medical Report) and offboarding requirements (Resignation Letter).",
        "Theme & Appearance: Customize the dashboard aesthetic (Light, Dark, System) for the company.",
      ],
      links: [
        { label: "Company Settings", to: "/dashboard/settings" },
      ],
    },
    {
      title: "3. Employee & Compliance Records",
      desc: "The digital source of truth for the workforce, handling the entire employment lifecycle.",
      features: [
        "Status Tracking: Manage employees across different lifecycle states: Active, Probation, Resigned, and Terminated.",
        "Onboarding Tracker: Track mandatory documents and setup processes for new hires to ensure full legal compliance.",
        "Detailed Profiles: Store rich data including Line Managers, Dates of Birth, contact info, and digital document vaults.",
      ],
      links: [
        { label: "Employee Directory", to: "/dashboard/employees" },
        {
          label: "View Employee Profile",
          to: "/dashboard/employees/$id",
          params: { id: "EMP-001" },
        },
        { label: "Browse Document Vault", to: "/dashboard/documents" },
      ],
    },
    {
      title: "4. The Payroll Engine",
      desc: "A compliant, step-by-step wizard ensuring accurate compensation and statutory deductions.",
      features: [
        "6-Step Verification: Enforces a strict pipeline from Attendance Sheets -> HR Check -> Approval -> Salary Prep -> Final Verification.",
        "RRA Tax Brackets: Automatically applies Rwanda Revenue Authority rates: 0% (0-60k), 10% (60k-100k), 20% (100k-200k), and 30% (200k+).",
        "Statutory Deductions: Handles RSSB Pension (6% employee / 8% employer), CBHI (0.5%), and Maternity funds.",
      ],
      links: [
        { label: "Run Monthly Payroll", to: "/dashboard/payroll" },
      ],
    },
    {
      title: "5. Leave & Time-Off Management",
      desc: "Automated tracking for employee absences based on configured company policies.",
      features: [
        "Statutory Accruals: Handles standard allowances like 1.5 days of annual leave per month.",
        "Specialized Leaves: Pre-configured for Sick Leave (5 days/year) and Maternity Leave (3 months and 2 weeks).",
        "Approval Workflows: Line managers and HR can review, approve, or reject employee requests with comments.",
      ],
      links: [{ label: "Manage Team Leaves", to: "/dashboard/leaves" }],
    },
    {
      title: "6. Performance (Balanced Scorecard)",
      desc: "Strategic performance management aligning employee goals with company objectives.",
      features: [
        "4 Perspectives: Goals are categorized into Financial, Customer, Internal Process, and Growth.",
        "Standardized Rating: Uses a 1-4 scale (1: Does not meet, 2: Almost meets, 3: Meets, 4: Exceeds).",
        "Appraisal Process: Involves self-review, manager review, and a final appraisal meeting for documentation.",
      ],
      links: [{ label: "Staff Appraisals", to: "/dashboard/performance" }],
    },
    {
      title: "7. Recruitment Pipeline",
      desc: "An integrated ATS (Applicant Tracking System) to move candidates from application to contract.",
      features: [
        "Rigorous Stages: Track candidates through: Shortlisted, Online Assessment, First Interview, Second and Final Interview, Reserved, or Rejected.",
        "Seamless Onboarding: Approved candidates can be converted directly into active Employees within the system.",
      ],
      links: [{ label: "Hiring Command Center", to: "/dashboard/recruitment" }],
    },
  ];

  return (
    <div className="p-10 space-y-12 font-sans max-w-5xl bg-background min-h-screen">
      <header className="space-y-4 border-b border-border/10 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground/90">
          HRMS Documentation
        </h1>
        <p className="text-muted-foreground font-medium text-lg max-w-3xl">
          A comprehensive guide to the Multi-Company Human Resource Management System. Explore the architecture, workflows, and compliance tools available to System and Company Administrators.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {modules.map((m, i) => (
          <div key={i} className="space-y-5 group">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary group-hover:underline transition-all">
                {m.title}
              </h2>
              <p className="text-[15px] font-medium leading-relaxed text-foreground/80">
                {m.desc}
              </p>
            </div>

            <div className="bg-muted/5 border border-border/10 p-6 rounded-2xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                Key Capabilities:
              </p>
              <ul className="space-y-3">
                {m.features.map((f, k) => (
                  <li
                    key={k}
                    className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed"
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
                  key={j}
                  variant="outline"
                  size="sm"
                  className="font-semibold shadow-none border-border/60 hover:bg-muted/50"
                  render={<Link to={l.to} params={l.params} />}
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-border/10 pb-20">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold shadow-md shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Enter Main Dashboard
        </Link>
      </div>
    </div>
  );
}
