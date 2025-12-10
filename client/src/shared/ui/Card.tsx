import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 glass-card",
        hover && "transition-all hover:border-purple-500/30 hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div>
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
        {subtitle && (
          <p className="text-sm text-white/50">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
