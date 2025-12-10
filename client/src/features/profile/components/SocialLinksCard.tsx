import { Instagram, ExternalLink, Plus } from "lucide-react";

interface SocialLinksCardProps {
  username?: string;
  isOwnProfile?: boolean;
}

export function SocialLinksCard({ username, isOwnProfile }: SocialLinksCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#12121a] p-6">
      <div className="flex items-center gap-2 mb-5">
        <Instagram className="w-5 h-5 text-pink-400" />
        <h3 className="font-semibold">Social Links</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-pink-400" />
          <span className="text-white/80">@{username || "alexandra"}.be</span>
          <ExternalLink className="w-4 h-4 text-white/40 ml-auto" />
        </div>
        
        {isOwnProfile && (
          <button className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition-colors w-full py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 mt-2">
            <Plus className="w-4 h-4" />
            <span>Add Social Link</span>
          </button>
        )}
      </div>
    </div>
  );
}
