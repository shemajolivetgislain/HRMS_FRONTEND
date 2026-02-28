"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1.1fr] bg-background selection:bg-primary/10 selection:text-primary">
      <div className="flex flex-col p-8 md:p-12 lg:p-20 justify-between">
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/10 transition-transform duration-500">
              <span className="text-base font-bold tracking-tighter">HR</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground/90">
              HRMS
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[340px] mx-auto py-12">{children}</div>

        <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground/20 uppercase tracking-widest">
          <p>© 2026 HRMS</p>
          <div className="flex items-center gap-4">
            <Link href="/help" className="hover:text-primary transition-colors">
              Help
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:flex flex-col bg-muted/10 overflow-hidden border-l border-border/5">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-0 right-0 h-[1000px] w-[1000px] bg-primary/[0.03] blur-[160px] rounded-full translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-primary/[0.01] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />

          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-20 justify-center">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground/90">
              Work better,
              <br />
              together.
            </h2>
            <div className="h-px w-12 bg-primary/20" />
            <p className="text-xl font-medium text-muted-foreground/50 leading-relaxed">
              The modern standard for high-performance organizations to manage
              their global workforce.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-20 right-20 flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-[0.3em]">
            Precision Interface v4.2
          </p>
        </div>
      </div>
    </div>
  );
}
