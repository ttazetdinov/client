import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/shared/ui/Card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: "purple" | "pink";
  index: number;
}

export function StatCard({ icon: Icon, label, value, color, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-4" data-testid={`stat-card-${index}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${color === 'purple' ? 'bg-purple-500/20' : 'bg-pink-500/20'} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color === 'purple' ? 'text-purple-400' : 'text-pink-400'}`} />
          </div>
          <div>
            <div className="font-heading text-2xl font-bold">{value}</div>
            <div className="text-sm text-white/50">{label}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
