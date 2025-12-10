import { motion } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";
import { Card, CardHeader } from "@/shared/ui/Card";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  type: "toggle" | "link" | "select";
  options?: string[];
}

interface SettingsSectionProps {
  id: string;
  title: string;
  items: SettingItem[];
  settings: Record<string, any>;
  onToggle: (id: string) => void;
  onSelect: (id: string, value: string) => void;
  index: number;
}

export function SettingsSection({ 
  id, 
  title, 
  items, 
  settings, 
  onToggle, 
  onSelect,
  index 
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card data-testid={`settings-section-${id}`}>
        <CardHeader
          title={title}
          subtitle={`${items.length} settings`}
        />
        
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
              data-testid={`setting-item-${item.id}`}
            >
              <div className="flex-1">
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-white/50">{item.description}</p>
              </div>
              
              {item.type === "toggle" && (
                <button
                  onClick={() => onToggle(item.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[item.id] ? "gradient-bg" : "bg-white/20"
                  }`}
                  data-testid={`toggle-${item.id}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      settings[item.id] ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              )}
              
              {item.type === "link" && (
                <ChevronRight className="w-5 h-5 text-white/30" />
              )}
              
              {item.type === "select" && (
                <select
                  value={settings[item.id]}
                  onChange={(e) => onSelect(item.id, e.target.value)}
                  className="bg-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  data-testid={`select-${item.id}`}
                >
                  {item.options?.map((option) => (
                    <option key={option} value={option} className="bg-[#0a0a0f]">
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
