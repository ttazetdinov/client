import { Link } from "wouter";
import { Plus, Tag } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useMyAds, useDeleteAd } from "./hooks";
import { MyAdCard } from "./components";

export default function MyAdsPage() {
  const { ads, isLoading } = useMyAds();
  const { deleteAd, isDeleting } = useDeleteAd();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      deleteAd(id);
    }
  };

  return (
    <div className="py-6">
      <PageHeader
        title="My Advertisements"
        subtitle="Manage your posted ads"
        action={
          <Link href="/ads/new">
            <Button data-testid="button-create-ad">
              <Plus className="w-4 h-4" />
              Post New Ad
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : ads.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No ads yet"
          description="Start sharing your services or products with the community"
          action={
            <Link href="/ads/new">
              <Button>Post Your First Ad</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {ads.map((ad, index) => (
            <MyAdCard
              key={ad.id}
              ad={ad}
              index={index}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
