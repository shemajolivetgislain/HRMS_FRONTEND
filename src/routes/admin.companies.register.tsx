import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Building03Icon,
  CheckmarkCircle01Icon,
  Shield01Icon,
  UserEdit01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateCompanyMutation,
  useCreateUserMutation,
  useGetCompanyCategoriesQuery,
  useCreateCompanyCategoryMutation,
  useGetLocationsQuery,
} from "@/lib/redux/api";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const registrationSchema = z
  .object({
    regMode: z.enum(["only_company", "with_admin"]),
    name: z.string().min(2, "Company name must be at least 2 characters"),
    tin: z.string().min(9, "TIN must be at least 9 digits"),
    identificationNumber: z.coerce.number().min(1, "Required"),
    categoryId: z.string().min(1, "Category is required"),
    ownershipType: z.enum(["PRIVATE", "PUBLIC", "GOVERNMENT_OWNED"]),
    type: z.enum(["LIMITED_BY_SHARES", "PARTNERSHIP", "SOLE_TRADER"]),
    villageId: z.string().optional(),
    adminFirstName: z.string().optional(),
    adminLastName: z.string().optional(),
    adminEmail: z.string().email("Invalid email").optional().or(z.literal("")),
    adminPhone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.regMode === "with_admin") {
      if (!data.adminFirstName || data.adminFirstName.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Required",
          path: ["adminFirstName"],
        });
      }
      if (!data.adminLastName || data.adminLastName.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Required",
          path: ["adminLastName"],
        });
      }
      if (!data.adminEmail || data.adminEmail.length < 5) {
        ctx.addIssue({
          code: "custom",
          message: "Required",
          path: ["adminEmail"],
        });
      }
    }
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const Route = createFileRoute("/admin/companies/register")({
  component: RegisterCompanyPage,
});

function RegisterCompanyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: mode select, 1: company, 2: admin, 3: confirm
  const [isSuccess, setIsSuccess] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const id = React.useId();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCompanyCategoriesQuery(undefined);
  const { data: locationsData, isLoading: locationsLoading } =
    useGetLocationsQuery({ type: "VILLAGE" });

  const [createCompanyApi] = useCreateCompanyMutation();
  const [createUserApi] = useCreateUserMutation();
  const [createCategoryApi] = useCreateCompanyCategoryMutation();

  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [catDialogOpen, setCatDialogOpen] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      regMode: "only_company",
      name: "",
      tin: "",
      identificationNumber: 0,
      categoryId: "",
      ownershipType: "PRIVATE",
      type: "LIMITED_BY_SHARES",
      villageId: "",
      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      adminPhone: "",
    },
    mode: "onTouched",
  });

  const {
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const regMode = watch("regMode");
  const formData = watch();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleModeSelect = (mode: "only_company" | "with_admin") => {
    setValue("regMode", mode);
    setStep(1);
  };

  // per-step validation fields
  const step1Fields: (keyof RegistrationFormValues)[] = [
    "name",
    "tin",
    "identificationNumber",
    "categoryId",
    "ownershipType",
    "type",
    "villageId",
  ];
  const step2Fields: (keyof RegistrationFormValues)[] = [
    "adminFirstName",
    "adminLastName",
    "adminEmail",
    "adminPhone",
  ];

  const steps = regMode === "only_company" ? [1, 3] : [1, 2, 3];

  const handleNext = async () => {
    try {
      const fieldsToValidate =
        step === 1 ? step1Fields : step === 2 ? step2Fields : [];

      const valid =
        fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

      if (!valid) return;
      const idx = steps.indexOf(step);
      if (idx !== -1 && idx < steps.length - 1) {
        setStep(steps[idx + 1]);
      }
    } catch (err) {
      console.error("Error in handleNext:", err);
    }
  };

  const handlePrev = () => {
    const idx = steps.indexOf(step);
    if (idx === 0) {
      setStep(0);
      setValue("regMode", "only_company");
    } else {
      setStep(steps[idx - 1]);
    }
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    setGlobalError(null);
    try {
      const companyResponse = await createCompanyApi({
        name: data.name,
        tin: data.tin,
        identificationNumber: data.identificationNumber,
        categoryId: data.categoryId,
        ownershipType: data.ownershipType,
        type: data.type,
        villageId: data.villageId || "c07551a8-e736-4de1-a048-ad066a619dbc", // placeholder for empty api
      }).unwrap();

      if (regMode === "with_admin" && data.adminEmail) {
        await createUserApi({
          firstName: data.adminFirstName,
          lastName: data.adminLastName,
          email: data.adminEmail,
          phoneNumber: data.adminPhone,
          role: "COMPANY_ADMIN",
          companyId: companyResponse.id,
        }).unwrap();
      }

      setIsSuccess(true);
      toast.success("Organization provisioned successfully");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      setGlobalError(
        err?.data?.message ?? err?.message ?? "Failed to register company",
      );
    }
  };

  const handleCreateCategory = async () => {
    if (!newCatName) {
      toast.error("Category name is required");
      return;
    }
    setIsAddingCat(true);
    try {
      await createCategoryApi({
        name: newCatName,
        description: newCatDesc,
      }).unwrap();
      toast.success("Category created successfully");
      setNewCatName("");
      setNewCatDesc("");
      setCatDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || "Failed to create category");
    } finally {
      setIsAddingCat(false);
    }
  };

  // --- success screen ---
  if (isSuccess) {
    return (
      <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
        <DashboardHeader
          category="administration"
          title="Tenant Provisioned"
          description="The new organization has been successfully registered."
        />
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-8 pb-20 pt-2">
          <Frame className="max-w-md w-full">
            <FramePanel className="bg-card p-10">
              <div className="h-20 w-20 bg-success/10 text-success rounded-2xl flex items-center justify-center mb-8 animate-in zoom-in duration-500">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={40} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">
                Setup Complete
              </h2>
              <p className="text-sm text-muted-foreground font-medium mb-10 leading-relaxed">
                <span className="text-foreground font-semibold">
                  {formData.name}
                </span>{" "}
                is now active.{" "}
                {formData.regMode === "with_admin" ? (
                  <>
                    Initial admin account for{" "}
                    <span className="text-foreground font-semibold">
                      {formData.adminEmail}
                    </span>{" "}
                    has been created.{" "}
                    <span className="text-primary font-bold">
                      They must verify their email using the OTP sent to them
                      before logging in.
                    </span>
                  </>
                ) : (
                  "You can now proceed to manage its settings."
                )}
              </p>
              <Button onClick={() => navigate({ to: "/admin/companies" })}>
                Go to Company List
              </Button>
            </FramePanel>
          </Frame>
        </div>
      </main>
    );
  }

  // --- hydration guard ---
  if (!mounted) {
    return (
      <main className="flex flex-1 flex-col h-full bg-background animate-pulse">
        <div className="p-8 space-y-4">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="h-4 w-96 bg-muted rounded-lg" />
        </div>
      </main>
    );
  }

  // --- mode select ---
  if (step === 0) {
    return (
      <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
        <DashboardHeader
          category="administration"
          title="Provision New Tenant"
          description="Choose how you want to register the new organization."
        >
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/admin/companies" })}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Back to Registry
          </Button>
        </DashboardHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-8 pb-20 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <button
              type="button"
              onClick={() => handleModeSelect("only_company")}
              className="group relative flex flex-col text-left p-8 rounded-3xl border border-border/40 bg-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <HugeiconsIcon icon={Building03Icon} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">
                Create New Company
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Register a new organization with its profile. Admin accounts can
                be added later.
              </p>
              <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Start Provisioning
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleModeSelect("with_admin")}
              className="group relative flex flex-col text-left p-8 rounded-3xl border border-border/40 bg-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="relative">
                  <HugeiconsIcon icon={Building03Icon} size={32} />
                  <div className="absolute -right-2 -bottom-2 h-6 w-6 rounded-lg bg-background border border-border/40 flex items-center justify-center">
                    <HugeiconsIcon icon={UserEdit01Icon} size={14} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">
                Create with Admin
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full setup including organization profile and master
                administrator account.
              </p>
              <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Start Provisioning
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </div>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- step indicator ---
  const isLastStep = steps.indexOf(step) === steps.length - 1;

  return (
    <Form {...form}>
      <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
        <DashboardHeader
          category="administration"
          title="Register New Company"
          description={
            regMode === "only_company"
              ? "Provision a new tenant."
              : "Provision a new tenant and its initial master administrator."
          }
        >
          <Button
            variant="outline"
            onClick={() => {
              setStep(0);
              setValue("regMode", "only_company");
            }}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Change Method
          </Button>
        </DashboardHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-8 pb-20 pt-2">
          <div className="max-w-3xl w-full">
            <div className="flex items-center gap-3 mb-10 max-w-3xl">
              {steps.map((s, idx) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      step === s
                        ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                        : steps.indexOf(step) > idx
                          ? "bg-primary/40"
                          : "bg-border/40",
                    )}
                  />
                </div>
              ))}
            </div>

            {globalError && (
              <Alert
                variant="destructive"
                className="mb-6 animate-in fade-in slide-in-from-top-2"
              >
                <HugeiconsIcon icon={Alert01Icon} />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}

            <Frame>
              <FramePanel className="bg-card">
                <FrameHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <HugeiconsIcon
                        icon={
                          step === 1
                            ? Building03Icon
                            : step === 2
                              ? UserEdit01Icon
                              : Shield01Icon
                        }
                        size={18}
                      />
                    </div>
                    <div>
                      <FrameTitle>
                        {step === 1
                          ? "Organization Profile"
                          : step === 2
                            ? "Initial Administrator"
                            : "Confirm & Submit"}
                      </FrameTitle>
                      <FrameDescription>
                        Step {steps.indexOf(step) + 1} of {steps.length}
                      </FrameDescription>
                    </div>
                  </div>
                </FrameHeader>

                <FrameContent className="p-8">
                  {/* step 1 — company details */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField
                        control={form.control as any}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                              Legal Entity Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Igihe Logistics Inc."
                                className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[11px] font-medium" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control as any}
                          name="tin"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                TIN Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="9+ digits"
                                  className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control as any}
                          name="identificationNumber"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Identification Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="e.g. 12345"
                                  className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control as any}
                          name="ownershipType"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Ownership Type
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PRIVATE">
                                      Private
                                    </SelectItem>
                                    <SelectItem value="PUBLIC">
                                      Public
                                    </SelectItem>
                                    <SelectItem value="GOVERNMENT_OWNED">
                                      Government Owned
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control as any}
                          name="type"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Legal Type
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="LIMITED_BY_SHARES">
                                      Limited by Shares
                                    </SelectItem>
                                    <SelectItem value="PARTNERSHIP">
                                      Partnership
                                    </SelectItem>
                                    <SelectItem value="SOLE_TRADER">
                                      Sole Trader
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control as any}
                        name="villageId"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                              Village / Location
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background">
                                  <SelectValue
                                    placeholder={
                                      locationsLoading
                                        ? "Loading..."
                                        : "Select Village"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {locationsData?.items.map((loc) => (
                                    <SelectItem key={loc.id} value={loc.id}>
                                      {loc.name}
                                    </SelectItem>
                                  ))}
                                  {!locationsLoading &&
                                    !locationsData?.items.length && (
                                      <div className="px-3 py-2 text-xs text-muted-foreground">
                                        No locations found
                                      </div>
                                    )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-[11px] font-medium" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control as any}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <div className="flex items-center justify-between gap-4">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Company Category
                              </FormLabel>

                              <Dialog
                                open={catDialogOpen}
                                onOpenChange={setCatDialogOpen}
                              >
                                <DialogTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/5"
                                    >
                                      <HugeiconsIcon
                                        icon={PlusSignIcon}
                                        size={12}
                                        className="mr-1"
                                      />
                                      Add Category
                                    </Button>
                                  }
                                />
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Create Company Category
                                    </DialogTitle>
                                    <DialogDescription>
                                      Add a new category to group similar
                                      organizations.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`${id}-cat-name`}>
                                        Category Name
                                      </Label>
                                      <Input
                                        id={`${id}-cat-name`}
                                        value={newCatName}
                                        onChange={(e) =>
                                          setNewCatName(e.target.value)
                                        }
                                        placeholder="e.g. Healthcare, Manufacturing"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`${id}-cat-desc`}>
                                        Description (Optional)
                                      </Label>
                                      <Input
                                        id={`${id}-cat-desc`}
                                        value={newCatDesc}
                                        onChange={(e) =>
                                          setNewCatDesc(e.target.value)
                                        }
                                        placeholder="Briefly describe this category"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setCatDialogOpen(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleCreateCategory}
                                      disabled={isAddingCat}
                                    >
                                      {isAddingCat
                                        ? "Creating..."
                                        : "Create Category"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                            <FormControl>
                              <Select
                                value={field.value as string}
                                onValueChange={(val) => {
                                  try {
                                    field.onChange(val);
                                  } catch (err) {
                                    console.error(
                                      "Error setting category:",
                                      err,
                                    );
                                  }
                                }}
                              >
                                <SelectTrigger
                                  id={`${id}-categoryId`}
                                  className={cn(
                                    "h-11 bg-muted/5 border-border/40 focus:bg-background",
                                    errors.categoryId &&
                                      "border-destructive/50 ring-destructive/20",
                                  )}
                                >
                                  <SelectValue
                                    placeholder={
                                      categoriesLoading
                                        ? "Loading categories..."
                                        : "Select Category"
                                    }
                                  >
                                    {field.value &&
                                      categoriesData?.items.find(
                                        (c) => c.id === field.value,
                                      )?.name}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {categoriesData?.items.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </SelectItem>
                                  ))}
                                  {!categoriesLoading &&
                                    !categoriesData?.items.length && (
                                      <div className="px-3 py-2 text-xs text-muted-foreground">
                                        No categories found
                                      </div>
                                    )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-[11px] font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* step 2 — admin (only in with_admin mode) */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control as any}
                          name="adminFirstName"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Jean"
                                  className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control as any}
                          name="adminLastName"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Paul"
                                  className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[11px] font-medium" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control as any}
                        name="adminEmail"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                              Work Email (Login)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="admin@company.com"
                                className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[11px] font-medium" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control as any}
                        name="adminPhone"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+250..."
                                className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[11px] font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* step 3 — confirmation */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <h4 className="text-sm font-bold mb-2">
                          Review & Confirm
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Please review the details below before finalizing the
                          registration.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">
                            Organization
                          </p>
                          <p className="text-sm font-bold truncate">
                            {formData.name || "N/A"}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">
                            TIN
                          </p>
                          <p className="text-sm font-bold">
                            {formData.tin || "N/A"}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">
                            Lead Admin
                          </p>
                          <p className="text-sm font-bold truncate">
                            {formData.regMode === "with_admin"
                              ? `${formData.adminFirstName ?? ""} ${formData.adminLastName ?? ""}`.trim() ||
                                "—"
                              : "To be added later"}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">
                            Admin Email
                          </p>
                          <p className="text-sm font-bold truncate">
                            {formData.regMode === "with_admin"
                              ? formData.adminEmail || "—"
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </FrameContent>

                <FrameFooter className="p-6 bg-muted/5 flex items-center justify-between">
                  <Button type="button" variant="ghost" onClick={handlePrev}>
                    Previous
                  </Button>

                  {!isLastStep ? (
                    <Button type="button" onClick={handleNext}>
                      Next Stage
                      <HugeiconsIcon icon={ArrowRight01Icon} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => form.handleSubmit(onSubmit as any)()}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2" />
                          Provisioning...
                        </>
                      ) : (
                        <>
                          Finalize Setup
                          <HugeiconsIcon icon={CheckmarkCircle01Icon} />
                        </>
                      )}
                    </Button>
                  )}
                </FrameFooter>
              </FramePanel>
            </Frame>
          </div>
        </div>
      </main>
    </Form>
  );
}
