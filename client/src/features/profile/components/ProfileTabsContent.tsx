import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";
import { ProfileTabs } from "./ProfileTabs";
import { InterestsCard } from "./InterestsCard";
import { SocialLinksCard } from "./SocialLinksCard";
import { BasicInfoCard } from "./BasicInfoCard";

interface ProfileTabsContentProps {
  profile: {
    name: string;
    username: string;
    city?: string;
    country?: string;
    isVip?: boolean;
    interests?: string[];
  };
  isOwnProfile: boolean;
  photoCount?: number;
  videoCount?: number;
  connectionCount?: number;
  memberSince?: string;
  age?: number;
}

const DUMMY_PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488161628813-04466f0e8e4f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&h=400&fit=crop",
];

const DUMMY_VIDEOS = [
  { thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop", title: "Beach Sunset", duration: "2:34" },
  { thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop", title: "Ocean Waves", duration: "1:45" },
  { thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", title: "Tropical Paradise", duration: "3:12" },
  { thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop", title: "Mountain Adventure", duration: "4:20" },
  { thumbnail: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop", title: "Camping Night", duration: "2:58" },
  { thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop", title: "Road Trip", duration: "5:15" },
];

export function ProfileTabsContent({
  profile,
  isOwnProfile,
  photoCount = 48,
  videoCount = 8,
  connectionCount = 156,
  memberSince = "January 2024",
  age = 28,
}: ProfileTabsContentProps) {
  const [activeTab, setActiveTab] = useState("about");

  const interests = profile.interests?.length
    ? profile.interests
    : ["Art & Culture", "Fine Dining", "Fashion", "Travel", "Music"];

  return (
    <>
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        photoCount={photoCount}
        videoCount={videoCount}
      />

      {activeTab === "about" && (
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <BasicInfoCard
              name={profile.name}
              age={age}
              city={profile.city}
              country={profile.country}
              memberSince={memberSince}
              isVip={profile.isVip}
              connectionCount={connectionCount}
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <InterestsCard interests={interests} />
            <SocialLinksCard
              username={profile.username}
              isOwnProfile={isOwnProfile}
            />
          </div>
        </div>
      )}

      {activeTab === "photos" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DUMMY_PHOTOS.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={src}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_VIDEOS.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl overflow-hidden bg-white/5 cursor-pointer group"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Video className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                  {video.duration}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-white/90">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
