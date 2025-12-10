import { cn } from "../lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto scrollbar-hide pb-1", className)}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          count={tab.count}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}

interface TabProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

export function Tab({ children, active, onClick, count }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
        active
          ? "gradient-bg text-white"
          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
      {count !== undefined && count > 0 && (
        <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-white/20">
          {count}
        </span>
      )}
    </button>
  );
}
