import { cn } from "../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "vip" | "online" | "count" | "purple" | "secondary";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
        {
          "bg-white/10 text-white/70": variant === "default",
          "gradient-bg text-white": variant === "vip",
          "bg-green-500/20 text-green-400": variant === "online",
          "bg-purple-500 text-white min-w-[20px] h-5 justify-center": variant === "count",
          "bg-purple-500/20 text-purple-400": variant === "purple",
          "bg-white/5 text-white/60": variant === "secondary",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

export function VipBadge({ className }: { className?: string }) {
  return (
    <Badge variant="vip" className={cn("gap-1", className)}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      VIP
    </Badge>
  );
}
