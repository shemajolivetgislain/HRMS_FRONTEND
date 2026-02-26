"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Education",
  "Consulting",
  "Other",
];

const companySizes = ["1-50", "51-200", "201-500", "501-1000", "1000+"];

export default function CompanyRegistrationPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    companySize: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error on field change
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }
    if (!formData.companySize) {
      newErrors.companySize = "Please select company size";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Navigate to company admin registration
    }
  };

  return (
    <AuthCard
      title="Register Your Company"
      subtitle="Get started with HRMS in minutes"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            1
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Company Details
          </span>
          <div className="flex-1 h-0.5 mx-2 bg-muted rounded" />
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-bold text-muted-foreground">
            2
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Admin Setup
          </span>
          <div className="flex-1 h-0.5 mx-2 bg-muted rounded" />
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-bold text-muted-foreground">
            3
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Verify
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className={
                errors.companyName
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            />
            {errors.companyName && (
              <p className="text-xs text-destructive">{errors.companyName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="company@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={
                errors.email ? "border-destructive focus:ring-destructive" : ""
              }
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={
                errors.phone ? "border-destructive focus:ring-destructive" : ""
              }
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm">
              Industry
            </Label>
            <Select
              value={formData.industry}
              onValueChange={(value) =>
                handleInputChange("industry", value || "")
              }
            >
              <SelectTrigger
                className={
                  errors.industry
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }
              >
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-xs text-destructive">{errors.industry}</p>
            )}
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label htmlFor="companySize" className="text-sm">
              Company Size
            </Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) =>
                handleInputChange("companySize", value || "")
              }
            >
              <SelectTrigger
                className={
                  errors.companySize
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }
              >
                <SelectValue placeholder="Number of employees" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size} employees
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-xs text-destructive">{errors.companySize}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
        >
          Next
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
          />
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
