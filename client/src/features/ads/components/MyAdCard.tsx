import { Link } from "wouter";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, MapPin } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { formatDate } from "@/shared/lib/utils";
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
  status: string;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  owner: User;
}

interface MyAdCardProps {
  ad: Ad;
  index: number;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function MyAdCard({ ad, index, onDelete, isDeleting }: MyAdCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-4" data-testid={`card-my-ad-${ad.id}`}>
        <div className="flex items-start gap-4">
          {ad.images && ad.images.length > 0 && (
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-white/5">
              <img 
                src={ad.images[0]} 
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <Link href={`/ads/${ad.id}`}>
                  <h3 className="font-heading font-semibold text-lg hover:text-purple-400 transition-colors cursor-pointer">
                    {ad.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{ad.category}</Badge>
                  {ad.isFeatured && <Badge variant="purple">Featured</Badge>}
                  <Badge variant={ad.status === "published" ? "default" : "secondary"}>
                    {ad.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link href={`/ads/${ad.id}/edit`}>
                  <Button variant="ghost" size="icon" data-testid={`button-edit-${ad.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(ad.id)}
                  disabled={isDeleting}
                  data-testid={`button-delete-${ad.id}`}
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </div>
            
            {ad.description && (
              <p className="text-white/60 text-sm line-clamp-2 mb-2">
                {ad.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              {ad.price && (
                <span className="text-purple-400 font-medium">{ad.price}</span>
              )}
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
              <span>Posted {formatDate(ad.createdAt)}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
