import { useState } from "react";
import { Link } from "wouter";
import { Search, Plus, Tag } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Tabs } from "@/shared/ui/Tabs";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAds, useFilteredAds } from "./hooks";
import { AdCard } from "./components";

const categories = [
  { id: "all", label: "All" },
  { id: "services", label: "Services" },
  { id: "events", label: "Events" },
  { id: "fashion", label: "Fashion" },
  { id: "beauty", label: "Beauty" },
  { id: "other", label: "Other" },
];

export default function AdsListPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { ads, isLoading } = useAds();
  const filteredAds = useFilteredAds(ads, search, activeCategory);

  return (
    <div className="py-6">
      <PageHeader
        title="Marketplace"
        subtitle="Browse advertisements from the community"
        action={
          user && (
            <Link href="/ads/new">
              <Button data-testid="button-create-ad">
                <Plus className="w-4 h-4" />
                Post Ad
              </Button>
            </Link>
          )
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search ads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            data-testid="input-search-ads"
          />
        </div>
      </div>

      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        onChange={setActiveCategory}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredAds.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No ads found"
          description={search ? "Try adjusting your search" : "Be the first to post an ad!"}
          action={
            user && (
              <Link href="/ads/new">
                <Button>Post an Ad</Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredAds.map((ad, index) => (
            <AdCard key={ad.id} ad={ad} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
