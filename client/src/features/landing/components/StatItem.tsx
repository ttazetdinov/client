import { motion } from "framer-motion";

interface StatItemProps {
  value: string;
  label: string;
  index: number;
}

export function StatItem({ value, label, index }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
      data-testid={`stat-${index}`}
    >
      <div className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-white/50 text-sm">{label}</div>
    </motion.div>
  );
}
