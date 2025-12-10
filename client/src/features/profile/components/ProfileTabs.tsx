import { User, Image, Video } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  photoCount: number;
  videoCount: number;
}

export function ProfileTabs({ activeTab, onTabChange, photoCount, videoCount }: ProfileTabsProps) {
  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => onTabChange("about")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          activeTab === "about"
            ? "bg-purple-500 text-white"
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
        }`}
        data-testid="tab-about"
      >
        <User className="w-4 h-4" />
        About
      </button>
      <button
        onClick={() => onTabChange("photos")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          activeTab === "photos"
            ? "bg-purple-500 text-white"
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
        }`}
        data-testid="tab-photos"
      >
        <Image className="w-4 h-4" />
        Photos
        <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[#2a2a38] text-white/60">{photoCount}</span>
      </button>
      <button
        onClick={() => onTabChange("videos")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          activeTab === "videos"
            ? "bg-purple-500 text-white"
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
        }`}
        data-testid="tab-videos"
      >
        <Video className="w-4 h-4" />
        Videos
        <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[#2a2a38] text-white/60">{videoCount}</span>
      </button>
    </div>
  );
}
