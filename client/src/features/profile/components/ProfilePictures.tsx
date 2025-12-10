import { Heart, Utensils, Globe, Music, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const interestIcons: Record<string, any> = {
  "Art & Culture": Sparkles,
  "Fine Dining": Utensils,
  "Fashion": Music,
  "Travel": Globe,
  "Music": Music,
};

interface ProfilePicturesCardProps {
  interests: string[];
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

export function ProfilePicturesCard({ interests }: ProfilePicturesCardProps) {
  return (
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
  );
}
