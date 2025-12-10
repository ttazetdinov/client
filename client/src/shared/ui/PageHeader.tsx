import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-white/50 mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
