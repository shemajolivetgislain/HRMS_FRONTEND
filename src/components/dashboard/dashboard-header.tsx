"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
	title: string;
	description?: string;
	category?: string;
	children?: React.ReactNode;
	className?: string;
}

export function DashboardHeader({
	title,
	description,
	category,
	children,
	className,
}: DashboardHeaderProps) {
	return (
		<header
			className={cn(
				"flex items-center justify-between pt-10 pb-8 px-6 lg:px-8",
				className,
			)}
		>
			<div className="flex flex-col gap-1">
				{category ? (
					<p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-[0.2em]">
						{category}
					</p>
				) : null}
				<h1 className="text-2xl font-bold tracking-tight text-foreground/90 leading-tight">
					{title}
				</h1>
				{description ? (
					<p className="text-sm font-medium text-muted-foreground/50 max-w-2xl leading-relaxed mt-0.5">
						{description}
					</p>
				) : null}
			</div>

			{children ? (
				<div className="flex items-center gap-2">{children}</div>
			) : null}
		</header>
	);
}
