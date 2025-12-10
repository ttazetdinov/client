import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, LogOut, Check } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Card, CardHeader } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";
import { useSettings } from "./hooks";
import { SettingsSection, ProfileCard } from "./components";

interface SettingSectionConfig {
  id: string;
  title: string;
  icon: any;
  items: {
    id: string;
    label: string;
    description: string;
    type: "toggle" | "link" | "select";
    options?: string[];
  }[];
}

const settingSections: SettingSectionConfig[] = [
  {
    id: "account",
    title: "Account",
    icon: User,
    items: [
      { id: "email", label: "Email", description: "Update your email address", type: "link" },
      { id: "password", label: "Password", description: "Change your password", type: "link" },
      { id: "username", label: "Username", description: "Change your username", type: "link" },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: Shield,
    items: [
      { id: "profile_visible", label: "Profile Visibility", description: "Make your profile visible to everyone", type: "toggle" },
      { id: "show_online", label: "Show Online Status", description: "Let others see when you're online", type: "toggle" },
      { id: "show_location", label: "Show Location", description: "Display your city on your profile", type: "toggle" },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    items: [
      { id: "push_notifs", label: "Push Notifications", description: "Receive push notifications", type: "toggle" },
      { id: "email_notifs", label: "Email Notifications", description: "Receive email notifications", type: "toggle" },
      { id: "event_reminders", label: "Event Reminders", description: "Get reminded about upcoming events", type: "toggle" },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    items: [
      { id: "theme", label: "Theme", description: "Choose your preferred theme", type: "select", options: ["Dark", "Light", "System"] },
      { id: "language", label: "Language", description: "Choose your language", type: "select", options: ["English", "French", "Dutch"] },
    ],
  },
];

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { settings, toggleSetting, selectSetting } = useSettings();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="py-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {settingSections.map((section, index) => (
            <SettingsSection
              key={section.id}
              id={section.id}
              title={section.title}
              items={section.items}
              settings={settings}
              onToggle={toggleSetting}
              onSelect={selectSetting}
              index={index}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-red-500/20" data-testid="settings-danger-zone">
              <CardHeader title="Danger Zone" />
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  data-testid="button-delete-account"
                >
                  Delete Account
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-4">
          {user && <ProfileCard user={user} />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="gradient-bg" data-testid="settings-upgrade-card">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold mb-1">Upgrade to VIP</h3>
                <p className="text-sm text-white/80 mb-4">
                  Get exclusive access to premium features
                </p>
                <Button variant="secondary" className="w-full" data-testid="button-upgrade">
                  Upgrade Now
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
