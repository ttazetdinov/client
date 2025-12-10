import { Camera, User } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { User as UserType } from "@/shared/hooks/useAuth";

interface ProfileHeaderProps {
  profile: UserType;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="relative mb-6">
      <div 
        className="h-52 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #c084fc 60%, #d8b4fe 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {isOwnProfile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50"
            data-testid="button-change-cover"
          >
            <Camera className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="absolute -bottom-14 left-8">
        <div className="relative">
          <div className="w-[120px] h-[120px] rounded-full bg-[#1a1a2e] border-4 border-[#0a0a0f] flex items-center justify-center shadow-xl">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-14 h-14 text-purple-400" />
            )}
          </div>
          {isOwnProfile && (
            <button 
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#1a1a2e] border-[3px] border-[#0a0a0f] flex items-center justify-center hover:bg-purple-500/20 transition-colors"
              data-testid="button-change-avatar"
            >
              <Camera className="w-4 h-4 text-purple-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
