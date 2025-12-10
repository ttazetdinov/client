import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, X, Image, User } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { EmptyState } from "@/shared/ui/EmptyState";
import { User as UserType } from "@/shared/hooks/useAuth";
import { useProfile } from "./hooks";

import { ProfileHeader, BasicInfoCard, ProfileTabsContent } from "./components";
import { ProfilePicturesCard } from "./components/ProfilePictures";

export default function ProfilePage() {
  const { profile, isLoading, isOwnProfile, updateProfile, isUpdating } =
    useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserType>>({});

  const handleEdit = () => {
    setEditData({
      name: profile?.name || "",
      bio: profile?.bio || "",
      city: profile?.city || "",
      country: profile?.country || "",
      interests: profile?.interests || [],
      languages: profile?.languages || [],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editData, {
      onSuccess: () => setIsEditing(false),
    });
  };

  

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <EmptyState
        icon={User}
        title="Profile not found"
        description="This user doesn't exist or has been removed"
      />
    );
  }

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

        <div className="mt-20 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="text-2xl font-bold max-w-xs"
                    data-testid="input-edit-name"
                  />
                ) : (
                  <h1
                    className="text-[32px] font-semibold italic tracking-tight"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {profile.name}
                  </h1>
                )}
                {profile.isVip && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    VIP Member
                  </span>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  className="w-full h-20 bg-white/5 rounded-xl p-3 text-white/70 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
                  placeholder="Tell us about yourself..."
                  data-testid="input-edit-bio"
                />
              ) : (
                <p className="text-white/50 text-[15px] max-w-md mt-1">
                  {profile.bio ||
                    "Lover of art, fashion, and good conversation. Here to connect with amazing people."}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isOwnProfile ? (
                isEditing ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditing(false)}
                      className="border border-white/10 text-white/70 hover:bg-white/5"
                      data-testid="button-cancel-edit"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isUpdating}
                      data-testid="button-save-profile"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    {/*
                    <button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors"
                      data-testid="button-view-media"
                    >
                      <Image className="w-4 h-4" />
                      View Media
                    </button>
                    */}
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 font-medium transition-colors"
                      data-testid="button-edit-profile"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </>
                )
              ) : (
                <>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors"
                    data-testid="button-view-media"
                  >
                    <Image className="w-4 h-4" />
                    View Media
                  </button>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 font-medium transition-colors"
                    data-testid="button-message"
                  >
                    Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <BasicInfoCard
              name={profile.name}
              age={22}
              city={profile.city}
              country={profile.country}
              memberSince={"memberSince"}
              isVip={profile.isVip}
              connectionCount={22}
            />
          </div>
          <div className="md:col-span-8 space-y-6">
            <ProfilePicturesCard  interests={profile.interests || []} />
          </div>
        </div> */}

        <ProfileTabsContent
          profile={profile}
          isOwnProfile={isOwnProfile}
        />
      </motion.div>
    </div>
  );
}
