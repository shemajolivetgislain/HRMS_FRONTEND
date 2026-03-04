import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/mock-api";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
  UserRemove01Icon,
  Calendar03Icon,
  NoteIcon,
  FileUploadIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/employees/resign")({
  loader: async () => {
    const employees = await api.getEmployees();
    return {
      employees: employees.filter(
        (e) => e.status === "active" || e.status === "probation",
      ),
    };
  },
  pendingComponent: DashboardPending,
  component: ResignEmployeePage,
});

const RESIGNATION_REASONS = [
  "Better Opportunity",
  "Personal Reasons",
  "Career Change",
  "Relocation",
  "Health Reasons",
  "Further Education",
  "Other",
];

function ResignEmployeePage() {
  const { employees } = Route.useLoaderData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    resignationDate: new Date().toISOString().split("T")[0],
    lastWorkingDay: "",
    reason: "",
    notes: "",
    // Documents
    resignationLetter: false,
    experienceLetter: false,
    clearanceLetter: false,
  });

  const selectedEmployee = employees.find((e) => e.id === formData.employeeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.reason || !formData.lastWorkingDay) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.updateEmployee(formData.employeeId, {
        status: "resigned",
      });
      setIsSuccess(true);
      toast.success("Resignation processed successfully");
    } catch (err) {
      toast.error("Failed to process resignation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
        <DashboardHeader
          category="Lifecycle"
          title="Offboarding Initialized"
          description="The employee record has been transitioned to resigned state."
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <Frame className="max-w-md w-full">
            <FramePanel className="bg-card">
              <FrameContent className="p-10 text-center">
                <div className="h-20 w-20 bg-success/10 text-success rounded-2xl flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={40} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-3">
                  Processed Successfully
                </h2>
                <p className="text-sm text-muted-foreground font-medium mb-10 leading-relaxed">
                  <span className="text-foreground font-semibold">{selectedEmployee?.name}</span> is no longer active in the primary directory. Payroll processing has been halted.
                </p>
                <Button
                  onClick={() => navigate({ to: "/dashboard/employees" })}
                >
                  Return to Directory
                </Button>
              </FrameContent>
            </FramePanel>
          </Frame>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="Lifecycle"
        title="Employee Resignation"
        description="Formalize the exit process ensuring full compliance and system accuracy."
      >
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/dashboard/employees" })}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          Cancel
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-20 pt-2">
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Details */}
              <div className="lg:col-span-7 space-y-6">
                <Frame>
                  <FramePanel className="bg-card">
                    <FrameHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted/5 flex items-center justify-center text-muted-foreground/60 border border-border/40">
                          <HugeiconsIcon icon={UserRemove01Icon} size={18} />
                        </div>
                        <div>
                          <FrameTitle>Exit Registration</FrameTitle>
                          <FrameDescription>Primary offboarding details</FrameDescription>
                        </div>
                      </div>
                    </FrameHeader>
                    <FrameContent className="p-8 space-y-8">
                      <div className="space-y-2">
                        <Label htmlFor="employee" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
                          Select Employee <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.employeeId}
                          onValueChange={(val) =>
                            setFormData({ ...formData, employeeId: val || "" })
                          }
                        >
                          <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors font-semibold">
                            <SelectValue placeholder="Search or select employee..." />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((emp) => (
                              <SelectItem key={emp.id} value={emp.id}>
                                <div className="flex flex-col text-left">
                                  <span className="font-bold">{emp.name}</span>
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                    {emp.position} • {emp.department}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="resignationDate" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1 flex items-center gap-2">
                            <HugeiconsIcon icon={Calendar03Icon} size={12} />
                            Resignation Date
                          </Label>
                          <Input
                            id="resignationDate"
                            type="date"
                            className="h-11 bg-muted/5 border-border/40 focus:bg-background font-medium"
                            value={formData.resignationDate}
                            onChange={(e) =>
                              setFormData({ ...formData, resignationDate: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastWorkingDay" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1 flex items-center gap-2">
                            <HugeiconsIcon icon={Calendar03Icon} size={12} />
                            Last Working Day <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastWorkingDay"
                            type="date"
                            className="h-11 bg-muted/5 border-border/40 focus:bg-background font-medium"
                            value={formData.lastWorkingDay}
                            onChange={(e) =>
                              setFormData({ ...formData, lastWorkingDay: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1 flex items-center gap-2">
                          <HugeiconsIcon icon={NoteIcon} size={12} />
                          Primary Reason <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.reason}
                          onValueChange={(val) =>
                            setFormData({ ...formData, reason: val || "" })
                          }
                        >
                          <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background font-semibold">
                            <SelectValue placeholder="Select a reason..." />
                          </SelectTrigger>
                          <SelectContent>
                            {RESIGNATION_REASONS.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
                          Handover Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Provide details about handover process..."
                          className="min-h-[120px] rounded-xl border-border/40 bg-muted/5 focus:bg-background font-medium resize-none"
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                        />
                      </div>
                    </FrameContent>
                    <FrameFooter className="p-6 flex items-center justify-end bg-muted/5">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Submit Resignation"}
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} />
                      </Button>
                    </FrameFooter>
                  </FramePanel>
                </Frame>
              </div>

              {/* Right Column: Policies & Documents */}
              <div className="lg:col-span-5 space-y-6">
                <Frame>
                  <FramePanel className="bg-primary/[0.02] border-primary/10">
                    <FrameContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <HugeiconsIcon icon={AlertCircleIcon} size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground/90">Operational Impact</p>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-1">
                            Transitioning an employee to "Resigned" state will automatically halt active payroll processing and disable system access.
                          </p>
                        </div>
                      </div>
                    </FrameContent>
                  </FramePanel>

                  <FramePanel className="bg-card">
                    <FrameHeader>
                      <FrameTitle className="text-xs uppercase tracking-widest">Offboarding Policy</FrameTitle>
                    </FrameHeader>
                    <FrameContent className="p-4 space-y-4">
                      {[
                        { key: "resignationLetter", label: "Resignation Letter" },
                        { key: "experienceLetter", label: "Experience Letter" },
                        { key: "clearanceLetter", label: "Clearance Letter" },
                      ].map((doc) => (
                        <div
                          key={doc.key}
                          className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-muted/5 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-md flex items-center justify-center border transition-all",
                              (formData as any)[doc.key] 
                                ? "bg-primary/10 text-primary border-primary/20" 
                                : "bg-background text-muted-foreground/40 border-border/40"
                            )}>
                              <HugeiconsIcon 
                                icon={(formData as any)[doc.key] ? CheckmarkCircle01Icon : FileUploadIcon} 
                                size={16} 
                              />
                            </div>
                            <span className="text-xs font-bold text-foreground/80">{doc.label}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, [doc.key]: !(formData as any)[doc.key] })}
                            className={cn(
                              "h-7 text-[10px] font-black uppercase tracking-widest",
                              (formData as any)[doc.key] ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            {(formData as any)[doc.key] ? "Ready" : "Upload"}
                          </Button>
                        </div>
                      ))}
                    </FrameContent>
                  </FramePanel>
                </Frame>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
