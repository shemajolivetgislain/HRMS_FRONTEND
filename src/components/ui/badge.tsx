import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"h-5 gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-widest transition-colors inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:size-3! overflow-hidden group/badge uppercase",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground border-transparent",
				secondary: "bg-secondary text-secondary-foreground border-transparent",
				outline: "border-border text-foreground bg-transparent",

				// Professional Status Variants
				success: [
					"bg-emerald-500/8 text-emerald-700 border-emerald-500/20",
					"dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
				],
				warning: [
					"bg-amber-500/8 text-amber-700 border-amber-500/20",
					"dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
				],
				destructive: [
					"bg-red-500/8 text-red-700 border-red-500/20",
					"dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
				],
				info: [
					"bg-blue-500/8 text-blue-700 border-blue-500/20",
					"dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
				],
				accent: [
					"bg-indigo-500/8 text-indigo-700 border-indigo-500/20",
					"dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
				],

				// Subtle Variant for metrics/trends
				muted: "bg-muted/50 text-muted-foreground border-transparent",
			},
			showDot: {
				true: "",
				false: "",
			},
		},
		defaultVariants: {
			variant: "default",
			showDot: false,
		},
	},
);

const dotVariants = cva("size-1 rounded-full shrink-0", {
	variants: {
		variant: {
			default: "bg-primary-foreground",
			secondary: "bg-secondary-foreground",
			outline: "bg-foreground",
			success: "bg-emerald-500",
			warning: "bg-amber-500",
			destructive: "bg-red-500",
			info: "bg-blue-500",
			accent: "bg-indigo-500",
			muted: "bg-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface BadgeProps
	extends useRender.ComponentProps<"span">,
		VariantProps<typeof badgeVariants> {
	showDot?: boolean;
}

function Badge({
	className,
	variant = "default",
	showDot = false,
	children,
	render,
	...props
}: BadgeProps) {
	const content = (
		<>
			{showDot && <span className={cn(dotVariants({ variant }))} />}
			{children}
		</>
	);

	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant, showDot }), className),
				children: content,
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
			showDot,
		},
	});
}

export { Badge, badgeVariants };
