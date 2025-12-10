import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Eye } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge, VipBadge } from "@/shared/ui/Badge";
import { User } from "@/shared/hooks/useAuth";

interface Ad {
  id: number;
  ownerId: number;
  title: string;
  description?: string;
  category: string;
  price?: string;
  location?: string;
  images?: string[];
  isFeatured: boolean;
  views: number;
  createdAt: string;
  owner: User;
}

interface AdCardProps {
  ad: Ad;
  index: number;
}

export function AdCard({ ad, index }: AdCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/ads/${ad.id}`}>
        <Card 
          className="p-0 overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer"
          data-testid={`card-ad-${ad.id}`}
        >
          {ad.images && ad.images.length > 0 && (
            <div className="h-40 bg-white/5">
              <img 
                src={ad.images[0]} 
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-heading font-semibold text-lg line-clamp-1">
                {ad.title}
              </h3>
              {ad.isFeatured && (
                <Badge variant="purple" className="shrink-0">Featured</Badge>
              )}
            </div>
            
            {ad.description && (
              <p className="text-white/60 text-sm line-clamp-2 mb-3">
                {ad.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
              {ad.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {ad.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {ad.views} views
              </span>
            </div>
            
            {ad.price && (
              <div className="text-purple-400 font-semibold mb-3">
                {ad.price}
              </div>
            )}
            
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <Avatar
                src={ad.owner.avatar}
                name={ad.owner.name}
                size="sm"
                isOnline={ad.owner.isOnline}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium truncate">
                    {ad.owner.name}
                  </span>
                  {ad.owner.isVip && <VipBadge />}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
