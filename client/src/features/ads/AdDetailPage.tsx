import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Eye, Calendar, Tag, Edit } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useAuth } from "@/shared/hooks/useAuth";
import { formatDate } from "@/shared/lib/utils";
import { useAd } from "./hooks";
import { AdImageGallery, AdOwnerCard, AdContactCard } from "./components";

export default function AdDetailPage() {
  const { user } = useAuth();
  const { ad, isLoading } = useAd();

  const isOwner = user?.id === ad?.ownerId;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ad) {
    return (
      <EmptyState
        icon={Tag}
        title="Ad not found"
        description="This advertisement doesn't exist or has been removed"
        action={
          <Link href="/ads">
            <Button>Browse Ads</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="py-6">
      <Link href="/ads">
        <Button variant="ghost" className="mb-4" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <AdImageGallery images={ad.images || []} title={ad.title} />

          <Card className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{ad.category}</Badge>
                  {ad.isFeatured && <Badge variant="purple">Featured</Badge>}
                </div>
                <h1 className="font-heading text-2xl font-bold" data-testid="text-ad-title">
                  {ad.title}
                </h1>
              </div>
              
              {isOwner && (
                <div className="flex gap-2">
                  <Link href={`/ads/${ad.id}/edit`}>
                    <Button variant="ghost" size="icon" data-testid="button-edit-ad">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {ad.price && (
              <div className="text-2xl font-bold text-purple-400 mb-4">
                {ad.price}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6">
              {ad.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {ad.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {ad.views} views
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(ad.createdAt)}
              </span>
            </div>

            {ad.description && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-white/70 whitespace-pre-wrap">{ad.description}</p>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AdOwnerCard owner={ad.owner} />
          <AdContactCard
            contactEmail={ad.contactEmail}
            contactPhone={ad.contactPhone}
            showMessageButton={!!user && !isOwner}
          />
        </motion.div>
      </div>
    </div>
  );
}
