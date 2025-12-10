import { Heart, Utensils, Globe, Music, Sparkles } from "lucide-react";

const interestIcons: Record<string, any> = {
  "Art & Culture": Sparkles,
  "Fine Dining": Utensils,
  "Fashion": Music,
  "Travel": Globe,
  "Music": Music,
};

interface InterestsCardProps {
  interests: string[];
}

export function InterestsCard({ interests }: InterestsCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#12121a] p-6">
      <div className="flex items-center gap-2 mb-5">
        <Heart className="w-5 h-5 text-pink-400" />
        <h3 className="font-semibold">Interests & Passions</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest: string) => {
          const IconComponent = interestIcons[interest] || Heart;
          return (
            <span
              key={interest}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a1a2e] border border-white/10 text-sm"
            >
              <IconComponent className="w-4 h-4 text-pink-400" />
              {interest}
            </span>
          );
        })}
      </div>
    </div>
  );
}
