import { useState } from "react";

interface Settings {
  profile_visible: boolean;
  show_online: boolean;
  show_location: boolean;
  push_notifs: boolean;
  email_notifs: boolean;
  event_reminders: boolean;
  theme: string;
  language: string;
}

const defaultSettings: Settings = {
  profile_visible: true,
  show_online: true,
  show_location: true,
  push_notifs: true,
  email_notifs: false,
  event_reminders: true,
  theme: "Dark",
  language: "English",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleSetting = (id: keyof Settings) => {
    setSettings({ ...settings, [id]: !settings[id] });
  };

  const selectSetting = (id: keyof Settings, value: string | boolean) => {
    setSettings({ ...settings, [id]: value });
  };

  return {
    settings,
    toggleSetting,
    selectSetting,
  };
}
