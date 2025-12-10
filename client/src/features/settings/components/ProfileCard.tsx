import { motion } from "framer-motion";
import { Card } from "@/shared/ui/Card";
import { User } from "@/shared/hooks/useAuth";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card data-testid="settings-profile-card">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold">{user?.name}</h3>
          <p className="text-white/50 text-sm">@{user?.username}</p>
          <p className="text-white/40 text-xs mt-2">{user?.email}</p>
        </div>
      </Card>
    </motion.div>
  );
}
